import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { PIPELINE_COLUMNS, STATUS_LABELS, type Patient, type Referral } from '@/types'
import { KanbanBoard } from '@/components/dashboard/KanbanBoard'

export default async function PipelinePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: provider } = await supabase
    .from('providers')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (!provider) redirect('/signup')

  const [patientsRes, referralsRes] = await Promise.all([
    supabase
      .from('patients')
      .select('id, full_name, status, urgency, service_requested, created_at, source')
      .eq('provider_id', provider.id)
      .not('status', 'in', '("archived","completed")')
      .order('created_at', { ascending: false }),
    supabase
      .from('referrals')
      .select('id, patient_full_name, status, urgency, reason, created_at')
      .eq('provider_id', provider.id)
      .not('status', 'in', '("archived","completed")')
      .order('created_at', { ascending: false }),
  ])

  const patients = (patientsRes.data ?? []) as Patient[]
  const referrals = (referralsRes.data ?? []) as Referral[]

  // Merge into unified items for the board
  type KanbanItem = {
    id: string
    name: string
    status: string
    urgency: string
    subtitle: string
    type: 'patient' | 'referral'
    href: string
  }

  const columns: Record<string, KanbanItem[]> = {}
  for (const col of PIPELINE_COLUMNS.filter((c) => c !== 'completed')) {
    columns[col] = []
  }

  for (const p of patients) {
    const col = p.status as keyof typeof columns
    if (col in columns) {
      columns[col].push({
        id: p.id,
        name: p.full_name,
        status: p.status,
        urgency: p.urgency,
        subtitle: p.service_requested ?? 'Patient intake',
        type: 'patient',
        href: `/dashboard/patients/${p.id}`,
      })
    }
  }

  for (const r of referrals) {
    const col = r.status as keyof typeof columns
    if (col in columns) {
      columns[col].push({
        id: r.id,
        name: r.patient_full_name,
        status: r.status,
        urgency: r.urgency,
        subtitle: r.reason,
        type: 'referral',
        href: `/dashboard/referrals/${r.id}`,
      })
    }
  }

  return (
    <div className="space-y-6 h-full">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pipeline</h1>
        <p className="text-gray-500 mt-1">Drag patients between stages to update their status.</p>
      </div>
      <KanbanBoard columns={columns} />
    </div>
  )
}
