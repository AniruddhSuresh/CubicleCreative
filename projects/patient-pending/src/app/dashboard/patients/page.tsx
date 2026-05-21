import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import {
  STATUS_COLORS,
  STATUS_LABELS,
  URGENCY_COLORS,
  URGENCY_LABELS,
  type Patient,
  type PatientStatus,
} from '@/types'
import { timeAgo } from '@/lib/utils'
import { PatientsFilter } from '@/components/dashboard/PatientsFilter'
import { UserPlus } from 'lucide-react'

export default async function PatientsPage(props: {
  searchParams: Promise<{ status?: string; search?: string; source?: string }>
}) {
  const searchParams = await props.searchParams
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

  let query = supabase
    .from('patients')
    .select('*')
    .eq('provider_id', provider.id)
    .order('created_at', { ascending: false })

  if (searchParams.status && searchParams.status !== 'all') {
    query = query.eq('status', searchParams.status)
  }
  if (searchParams.search) {
    query = query.ilike('full_name', `%${searchParams.search}%`)
  }
  if (searchParams.source) {
    query = query.eq('source', searchParams.source)
  }

  const { data: patients = [] } = await query

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
          <p className="text-gray-500 mt-1">{patients?.length ?? 0} patient{patients?.length !== 1 ? 's' : ''}</p>
        </div>
        <Link
          href="/dashboard/patients/new"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-sm"
        >
          <UserPlus className="w-4 h-4" />
          Add patient
        </Link>
      </div>

      <PatientsFilter />

      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 text-left">
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Patient</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Service</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Status</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Urgency</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Source</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Received</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {!patients || patients.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    No patients found. Share your intake link to receive requests.
                  </td>
                </tr>
              ) : (
                (patients as Patient[]).map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <Link
                        href={`/dashboard/patients/${patient.id}`}
                        className="block group"
                      >
                        <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                          {patient.full_name}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {patient.phone ?? patient.email ?? 'No contact info'}
                        </p>
                      </Link>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {patient.service_requested ?? '—'}
                    </td>
                    <td className="px-4 py-4">
                      <Badge className={STATUS_COLORS[patient.status]}>
                        {STATUS_LABELS[patient.status]}
                      </Badge>
                    </td>
                    <td className="px-4 py-4">
                      <Badge className={URGENCY_COLORS[patient.urgency]}>
                        {URGENCY_LABELS[patient.urgency]}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 capitalize">
                      {patient.source}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-400">
                      {timeAgo(patient.created_at)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
