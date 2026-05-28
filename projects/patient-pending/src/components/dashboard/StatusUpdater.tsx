'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Select } from '@/components/ui/Select'
import type { PatientStatus } from '@/types'

interface StatusUpdaterProps {
  id: string
  table: 'patients' | 'referrals'
  currentStatus: PatientStatus
  statuses: { value: string; label: string }[]
}

export function StatusUpdater({ id, table, currentStatus, statuses }: StatusUpdaterProps) {
  const router = useRouter()
  const [status, setStatus] = useState(currentStatus)
  const [saving, setSaving] = useState(false)

  async function handleChange(newStatus: string) {
    setSaving(true)
    const supabase = createClient()
    await supabase.from(table).update({ status: newStatus }).eq('id', id)
    setStatus(newStatus as PatientStatus)
    setSaving(false)
    router.refresh()
  }

  return (
    <div className="flex items-center gap-2">
      {saving && <span className="text-xs text-gray-400">Saving...</span>}
      <Select
        options={statuses}
        value={status}
        onChange={(e) => handleChange(e.target.value)}
        className="min-w-40"
      />
    </div>
  )
}
