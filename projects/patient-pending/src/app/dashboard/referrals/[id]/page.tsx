import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import {
  STATUS_COLORS,
  STATUS_LABELS,
  URGENCY_COLORS,
  URGENCY_LABELS,
  PIPELINE_COLUMNS,
  type Referral,
  type Note,
} from '@/types'
import { formatDateTime, timeAgo } from '@/lib/utils'
import { StatusUpdater } from '@/components/dashboard/StatusUpdater'
import { NoteEditor } from '@/components/dashboard/NoteEditor'
import { Phone, Mail, Clock, ArrowLeft, MessageSquare } from 'lucide-react'

export default async function ReferralDetailPage(props: {
  params: Promise<{ id: string }>
}) {
  const { id } = await props.params
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

  const { data: referral } = await supabase
    .from('referrals')
    .select('*')
    .eq('id', id)
    .eq('provider_id', provider.id)
    .single()

  if (!referral) notFound()

  const { data: notes } = await supabase
    .from('notes')
    .select('*')
    .eq('referral_id', id)
    .order('created_at', { ascending: false })

  const ref = referral as Referral
  const noteList = (notes ?? []) as Note[]

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/referrals"
          className="text-gray-400 hover:text-gray-600 flex items-center gap-1 text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Referrals
        </Link>
      </div>

      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{ref.patient_full_name}</h1>
          <p className="text-gray-500 mt-0.5">
            Referred by {ref.referring_provider_name}
            {ref.referring_clinic && ` — ${ref.referring_clinic}`}
          </p>
          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <Badge className={STATUS_COLORS[ref.status]}>{STATUS_LABELS[ref.status]}</Badge>
            <Badge className={URGENCY_COLORS[ref.urgency]}>{URGENCY_LABELS[ref.urgency]}</Badge>
            <span className="text-sm text-gray-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Received {timeAgo(ref.created_at)}
            </span>
          </div>
        </div>
        <StatusUpdater
          id={ref.id}
          table="referrals"
          currentStatus={ref.status}
          statuses={PIPELINE_COLUMNS.map((s) => ({ value: s, label: STATUS_LABELS[s] }))}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h2 className="font-semibold text-gray-900 mb-4">Patient Information</h2>
            <dl className="grid grid-cols-2 gap-4">
              {ref.patient_phone && (
                <div>
                  <dt className="text-xs text-gray-500 mb-1">Phone</dt>
                  <dd className="text-sm font-medium text-gray-900 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-gray-400" /> {ref.patient_phone}
                  </dd>
                </div>
              )}
              {ref.patient_email && (
                <div>
                  <dt className="text-xs text-gray-500 mb-1">Email</dt>
                  <dd className="text-sm font-medium text-gray-900 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-gray-400" /> {ref.patient_email}
                  </dd>
                </div>
              )}
              {ref.patient_dob && (
                <div>
                  <dt className="text-xs text-gray-500 mb-1">Date of birth</dt>
                  <dd className="text-sm text-gray-900">{ref.patient_dob}</dd>
                </div>
              )}
              {ref.insurance_provider && (
                <div>
                  <dt className="text-xs text-gray-500 mb-1">Insurance</dt>
                  <dd className="text-sm text-gray-900">{ref.insurance_provider}</dd>
                </div>
              )}
              <div className="col-span-2">
                <dt className="text-xs text-gray-500 mb-1">Reason for referral</dt>
                <dd className="text-sm text-gray-900 leading-relaxed">{ref.reason}</dd>
              </div>
              {ref.notes && (
                <div className="col-span-2">
                  <dt className="text-xs text-gray-500 mb-1">Referring provider notes</dt>
                  <dd className="text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-lg p-3">{ref.notes}</dd>
                </div>
              )}
            </dl>
          </Card>

          <Card>
            <h2 className="font-semibold text-gray-900 mb-2">Referring Provider</h2>
            <dl className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <dt className="text-xs text-gray-500 mb-1">Provider</dt>
                <dd className="text-sm font-medium text-gray-900">{ref.referring_provider_name}</dd>
              </div>
              {ref.referring_clinic && (
                <div>
                  <dt className="text-xs text-gray-500 mb-1">Clinic</dt>
                  <dd className="text-sm text-gray-900">{ref.referring_clinic}</dd>
                </div>
              )}
              {ref.referring_phone && (
                <div>
                  <dt className="text-xs text-gray-500 mb-1">Phone</dt>
                  <dd className="text-sm text-gray-900">{ref.referring_phone}</dd>
                </div>
              )}
              {ref.referring_email && (
                <div>
                  <dt className="text-xs text-gray-500 mb-1">Email</dt>
                  <dd className="text-sm text-gray-900">{ref.referring_email}</dd>
                </div>
              )}
              <div>
                <dt className="text-xs text-gray-500 mb-1">Received</dt>
                <dd className="text-sm text-gray-900">{formatDateTime(ref.received_at)}</dd>
              </div>
            </dl>
          </Card>

          <Card>
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-4 h-4 text-gray-500" />
              <h2 className="font-semibold text-gray-900">Notes</h2>
              <span className="text-xs text-gray-400">({noteList.length})</span>
            </div>

            <NoteEditor referralId={ref.id} providerId={provider.id} userId={user.id} />

            <div className="mt-4 space-y-3">
              {noteList.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-4">No notes yet.</p>
              ) : (
                noteList.map((note) => (
                  <div key={note.id} className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-700 leading-relaxed">{note.content}</p>
                    <p className="text-xs text-gray-400 mt-2">{timeAgo(note.created_at)}</p>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        <div>
          <Card>
            <h2 className="font-semibold text-gray-900 mb-4">Pipeline Stage</h2>
            <div className="space-y-1.5">
              {PIPELINE_COLUMNS.map((stage) => {
                const isCurrent = ref.status === stage
                const currentIdx = PIPELINE_COLUMNS.indexOf(ref.status as any)
                const stageIdx = PIPELINE_COLUMNS.indexOf(stage)
                const isPast = stageIdx < currentIdx
                return (
                  <div
                    key={stage}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm ${
                      isCurrent
                        ? 'bg-blue-50 text-blue-800 font-medium border border-blue-100'
                        : isPast
                        ? 'text-gray-400'
                        : 'text-gray-500'
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        isCurrent ? 'bg-blue-500' : isPast ? 'bg-gray-300' : 'bg-gray-200'
                      }`}
                    />
                    {STATUS_LABELS[stage]}
                  </div>
                )
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
