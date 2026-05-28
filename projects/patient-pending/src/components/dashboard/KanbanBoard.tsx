'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { createClient } from '@/lib/supabase/client'
import { URGENCY_COLORS, URGENCY_LABELS, STATUS_LABELS, type PatientStatus, type Urgency } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { Users, GitBranch, GripVertical } from 'lucide-react'
import { timeAgo } from '@/lib/utils'

type KanbanItem = {
  id: string
  name: string
  status: string
  urgency: string
  subtitle: string
  type: 'patient' | 'referral'
  href: string
}

interface KanbanBoardProps {
  columns: Record<string, KanbanItem[]>
}

function KanbanCard({ item, isDragging = false }: { item: KanbanItem; isDragging?: boolean }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm hover:shadow-md group">
        <div className="flex items-start gap-2">
          <button {...listeners} className="mt-0.5 text-gray-300 hover:text-gray-500 cursor-grab active:cursor-grabbing flex-shrink-0">
            <GripVertical className="w-3.5 h-3.5" />
          </button>
          <div className="flex-1 min-w-0">
            <Link href={item.href} className="block">
              <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 truncate">
                {item.name}
              </p>
              <p className="text-xs text-gray-400 mt-0.5 truncate">{item.subtitle}</p>
            </Link>
            <div className="flex items-center gap-2 mt-2">
              <Badge className={URGENCY_COLORS[item.urgency as Urgency]}>
                {URGENCY_LABELS[item.urgency as Urgency]}
              </Badge>
              <span className="text-gray-300">
                {item.type === 'patient' ? (
                  <Users className="w-3 h-3" />
                ) : (
                  <GitBranch className="w-3 h-3" />
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function KanbanCardOverlay({ item }: { item: KanbanItem }) {
  return (
    <div className="bg-white rounded-lg border border-blue-300 p-3 shadow-lg rotate-2">
      <p className="text-sm font-medium text-gray-900">{item.name}</p>
      <p className="text-xs text-gray-400 mt-0.5">{item.subtitle}</p>
    </div>
  )
}

const COLUMN_ORDER = ['new', 'contacted', 'awaiting_response', 'scheduled']

export function KanbanBoard({ columns: initialColumns }: KanbanBoardProps) {
  const [columns, setColumns] = useState(initialColumns)
  const [activeItem, setActiveItem] = useState<KanbanItem | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  )

  function findColumn(itemId: string) {
    for (const [colId, items] of Object.entries(columns)) {
      if (items.find((i) => i.id === itemId)) return colId
    }
    return null
  }

  function findItem(itemId: string) {
    for (const items of Object.values(columns)) {
      const item = items.find((i) => i.id === itemId)
      if (item) return item
    }
    return null
  }

  function handleDragStart(event: DragStartEvent) {
    setActiveItem(findItem(event.active.id as string))
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event
    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    const activeCol = findColumn(activeId)
    const overCol = COLUMN_ORDER.includes(overId) ? overId : findColumn(overId)

    if (!activeCol || !overCol || activeCol === overCol) return

    setColumns((prev) => {
      const newCols = { ...prev }
      const item = newCols[activeCol].find((i) => i.id === activeId)
      if (!item) return prev
      newCols[activeCol] = newCols[activeCol].filter((i) => i.id !== activeId)
      newCols[overCol] = [{ ...item, status: overCol }, ...newCols[overCol]]
      return newCols
    })
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over) {
      setActiveItem(null)
      return
    }

    const activeId = active.id as string
    const newCol = findColumn(activeId)

    if (newCol) {
      const item = findItem(activeId)
      if (item && item.status !== newCol) {
        const supabase = createClient()
        const table = item.type === 'patient' ? 'patients' : 'referrals'
        await supabase.from(table).update({ status: newCol }).eq('id', activeId)
      }
    }

    setActiveItem(null)
  }

  const allItems = Object.values(columns).flat()

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4">
        {COLUMN_ORDER.map((colId) => {
          const items = columns[colId] ?? []
          return (
            <div key={colId} className="flex-shrink-0 w-72">
              <div className="bg-gray-100 rounded-xl p-3">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-700">
                    {STATUS_LABELS[colId as PatientStatus]}
                  </h3>
                  <span className="text-xs font-medium text-gray-500 bg-white rounded-full px-2 py-0.5 border border-gray-200">
                    {items.length}
                  </span>
                </div>
                <SortableContext
                  id={colId}
                  items={items.map((i) => i.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-2 min-h-24">
                    {items.map((item) => (
                      <KanbanCard
                        key={item.id}
                        item={item}
                        isDragging={activeItem?.id === item.id}
                      />
                    ))}
                    {items.length === 0 && (
                      <div className="text-center text-xs text-gray-400 py-6 border-2 border-dashed border-gray-200 rounded-lg">
                        Drop here
                      </div>
                    )}
                  </div>
                </SortableContext>
              </div>
            </div>
          )
        })}
      </div>

      <DragOverlay>
        {activeItem ? <KanbanCardOverlay item={activeItem} /> : null}
      </DragOverlay>
    </DndContext>
  )
}
