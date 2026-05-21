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
  type Referral,
} from '@/types'
import { timeAgo } from '@/lib/utils'

export default async function ReferralsPage() {
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

  const { data: referrals } = await supabase
    .from('referrals')
    .select('*')
    .eq('provider_id', provider.id)
    .order('created_at', { ascending: false })

  const refList = (referrals ?? []) as Referral[]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Referrals</h1>
        <p className="text-gray-500 mt-1">{refList.length} referral{refList.length !== 1 ? 's' : ''}</p>
      </div>

      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 text-left">
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Patient</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Referred by</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Reason</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Status</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Urgency</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Received</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {refList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    No referrals yet. Share your referral link with clinics to receive referrals.
                  </td>
                </tr>
              ) : (
                refList.map((ref) => (
                  <tr key={ref.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <Link href={`/dashboard/referrals/${ref.id}`} className="block group">
                        <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                          {ref.patient_full_name}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {ref.patient_phone ?? ref.patient_email ?? 'No contact info'}
                        </p>
                      </Link>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm text-gray-700">{ref.referring_provider_name}</p>
                      {ref.referring_clinic && (
                        <p className="text-xs text-gray-400 mt-0.5">{ref.referring_clinic}</p>
                      )}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600 max-w-xs truncate">
                      {ref.reason}
                    </td>
                    <td className="px-4 py-4">
                      <Badge className={STATUS_COLORS[ref.status]}>{STATUS_LABELS[ref.status]}</Badge>
                    </td>
                    <td className="px-4 py-4">
                      <Badge className={URGENCY_COLORS[ref.urgency]}>{URGENCY_LABELS[ref.urgency]}</Badge>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-400">{timeAgo(ref.created_at)}</td>
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
