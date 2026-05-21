'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback } from 'react'
import { Search } from 'lucide-react'
import { PIPELINE_COLUMNS, STATUS_LABELS, type PatientStatus } from '@/types'

const STATUSES: { value: string; label: string }[] = [
  { value: 'all', label: 'All' },
  ...PIPELINE_COLUMNS.map((s) => ({ value: s, label: STATUS_LABELS[s] })),
  { value: 'archived', label: 'Archived' },
]

export function PatientsFilter() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const update = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value && value !== 'all') {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      router.push(`${pathname}?${params.toString()}`)
    },
    [router, pathname, searchParams]
  )

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="search"
          placeholder="Search patients..."
          defaultValue={searchParams.get('search') ?? ''}
          onChange={(e) => update('search', e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="flex gap-1 flex-wrap">
        {STATUSES.map((s) => {
          const active = (searchParams.get('status') ?? 'all') === s.value
          return (
            <button
              key={s.value}
              onClick={() => update('status', s.value)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                active
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
              }`}
            >
              {s.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
