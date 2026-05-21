import { redirect, notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import {
  STATUS_COLORS,
  STATUS_LABELS,
  URGENCY_COLORS,
  URGENCY_LABELS,
  PIPELINE_COLUMNS,
  type Patient,
  type Note,
} from '@/types'
import { formatDateTime, timeAgo } from '@/lib/utils'
import { StatusUpdater } from '@/components/dashboard/StatusUpdater'
import { NoteEditor } from '@/components/dashboard/NoteEditor'
import { Phone, Mail, Clock, ArrowLeft, MessageSquare } from 'lucide-react'
import Link from 'next/link'

export default async function PatientDetailPage(props: {
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

  const { data: patient } = await supabase
    .from('patients')
    .select('*')
    .eq('id', id)
    .eq('provider_id', provider.id)
    .single()

  if (!patient) notFound()

  const { data: notes } = await supabase
    .from('notes')
    .select('*')
    .eq('patient_id', id)
    .order('created_at', { ascending: false })

  const p = patient as Patient
  const noteList = (notes ?? []) as Note[]

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/patients"
          className="text-gray-400 hover:text-gray-600 flex items-center gap-1 text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Patients
        </Link>
      </div>

      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{p.full_name}</h1>
          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <Badge className={STATUS_COLORS[p.status]}>{STATUS_LABELS[p.status]}</Badge>
            <Badge className={URGENCY_COLORS[p.urgency]}>{URGENCY_LABELS[p.urgency]}</Badge>
            <span className="text-sm text-gray-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Received {timeAgo(p.created_at)}
            </span>
          </div>
        </div>
        <StatusUpdater
          id={p.id}
          table="patients"
          currentStatus={p.status}
          statuses={PIPELINE_COLUMNS.map((s) => ({ value: s, label: STATUS_LABELS[s] }))}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Patient info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h2 className="font-semibold text-gray-900 mb-4">Patient Information</h2>
            <dl className="grid grid-cols-2 gap-4">
              {p.phone && (
                <div>
                  <dt className="text-xs text-gray-500 mb-1">Phone</dt>
                  <dd className="text-sm font-medium text-gray-900 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-gray-400" /> {p.phone}
                  </dd>
                </div>
              )}
              {p.email && (
                <div>
                  <dt className="text-xs text-gray-500 mb-1">Email</dt>
                  <dd className="text-sm font-medium text-gray-900 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-gray-400" /> {p.email}
                  </dd>
                </div>
              )}
              {p.service_requested && (
                <div>
                  <dt className="text-xs text-gray-500 mb-1">Service requested</dt>
                  <dd className="text-sm text-gray-900">{p.service_requested}</dd>
                </div>
              )}
              <div>
                <dt className="text-xs text-gray-500 mb-1">Preferred contact</dt>
                <dd className="text-sm text-gray-900 capitalize">{p.preferred_contact}</dd>
              </div>
              {p.insurance_provider && (
                <div>
                  <dt className="text-xs text-gray-500 mb-1">Insurance</dt>
                  <dd className="text-sm text-gray-900">{p.insurance_provider}</dd>
                </div>
              )}
              {p.referral_source && (
                <div>
                  <dt className="text-xs text-gray-500 mb-1">Referred by</dt>
                  <dd className="text-sm text-gray-900">{p.referral_source}</dd>
                </div>
              )}
              <div>
                <dt className="text-xs text-gray-500 mb-1">Source</dt>
                <dd className="text-sm text-gray-900 capitalize">{p.source}</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500 mb-1">Received</dt>
                <dd className="text-sm text-gray-900">{formatDateTime(p.created_at)}</dd>
              </div>
            </dl>
            {p.description && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <dt className="text-xs text-gray-500 mb-1">Description</dt>
                <dd className="text-sm text-gray-700 leading-relaxed">{p.description}</dd>
              </div>
            )}
          </Card>

          {/* Notes */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-4 h-4 text-gray-500" />
              <h2 className="font-semibold text-gray-900">Notes</h2>
              <span className="text-xs text-gray-400">({noteList.length})</span>
            </div>

            <NoteEditor patientId={p.id} providerId={provider.id} userId={user.id} />

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

        {/* Pipeline sidebar */}
        <div>
          <Card>
            <h2 className="font-semibold text-gray-900 mb-4">Pipeline Stage</h2>
            <div className="space-y-1.5">
              {PIPELINE_COLUMNS.map((stage) => {
                const isCurrent = p.status === stage
                const currentIdx = PIPELINE_COLUMNS.indexOf(p.status as any)
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
