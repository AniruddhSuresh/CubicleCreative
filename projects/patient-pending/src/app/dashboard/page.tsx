import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Card } from '@/components/ui/Card'
import {
  Users,
  GitBranch,
  Clock,
  CalendarCheck,
  ArrowRight,
  TrendingUp,
  Copy,
  ExternalLink,
} from 'lucide-react'
import { formatDate, timeAgo } from '@/lib/utils'
import { STATUS_COLORS, STATUS_LABELS, URGENCY_COLORS, URGENCY_LABELS, type Patient, type Referral } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { CopySlugButton } from '@/components/dashboard/CopySlugButton'

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: provider } = await supabase
    .from('providers')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (!provider) redirect('/onboarding')

  // Fetch stats in parallel
  const [patientsRes, referralsRes, recentPatientsRes, recentReferralsRes] = await Promise.all([
    supabase
      .from('patients')
      .select('status, created_at')
      .eq('provider_id', provider.id),
    supabase
      .from('referrals')
      .select('status, created_at, urgency')
      .eq('provider_id', provider.id),
    supabase
      .from('patients')
      .select('id, full_name, status, service_requested, urgency, created_at')
      .eq('provider_id', provider.id)
      .order('created_at', { ascending: false })
      .limit(5),
    supabase
      .from('referrals')
      .select('id, patient_full_name, status, urgency, reason, created_at, referring_provider_name')
      .eq('provider_id', provider.id)
      .order('created_at', { ascending: false })
      .limit(5),
  ])

  const patients = patientsRes.data ?? []
  const referrals = referralsRes.data ?? []
  const recentPatients = (recentPatientsRes.data ?? []) as Patient[]
  const recentReferrals = (recentReferralsRes.data ?? []) as Referral[]

  const now = new Date()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)

  const stats = {
    totalNew: patients.filter((p) => p.status === 'new').length +
      referrals.filter((r) => r.status === 'new').length,
    totalContacted: patients.filter((p) => p.status === 'contacted').length +
      referrals.filter((r) => r.status === 'contacted').length,
    totalScheduled: patients.filter((p) => p.status === 'scheduled').length +
      referrals.filter((r) => r.status === 'scheduled').length,
    monthlyTotal:
      patients.filter((p) => new Date(p.created_at) >= monthStart).length +
      referrals.filter((r) => new Date(r.created_at) >= monthStart).length,
  }

  const intakeUrl = `${process.env.NEXT_PUBLIC_APP_URL ?? ''}/intake/${provider.intake_slug}`

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back{provider.practice_name ? `, ${provider.practice_name}` : ''}
          </h1>
          <p className="text-gray-500 mt-1">Here&apos;s what&apos;s happening with your patients today.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/patients/new"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-sm"
          >
            Add patient
          </Link>
        </div>
      </div>

      {/* Intake link banner */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between">
        <div>
          <p className="text-sm font-medium text-blue-900">Your intake link is live</p>
          <p className="text-sm text-blue-600 font-mono mt-0.5 truncate max-w-sm">{intakeUrl}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <CopySlugButton url={intakeUrl} />
          <a
            href={`/intake/${provider.intake_slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-blue-700 font-medium hover:underline"
          >
            Open <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'New Requests',
            value: stats.totalNew,
            icon: Users,
            color: 'blue',
            href: '/dashboard/patients?status=new',
          },
          {
            label: 'Contacted',
            value: stats.totalContacted,
            icon: Clock,
            color: 'yellow',
            href: '/dashboard/patients?status=contacted',
          },
          {
            label: 'Scheduled',
            value: stats.totalScheduled,
            icon: CalendarCheck,
            color: 'green',
            href: '/dashboard/patients?status=scheduled',
          },
          {
            label: 'This Month',
            value: stats.monthlyTotal,
            icon: TrendingUp,
            color: 'purple',
            href: '/dashboard/analytics',
          },
        ].map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="hover:shadow-md cursor-pointer">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
                  <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent patients */}
        <Card padding="none">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Recent Patients</h2>
            <Link href="/dashboard/patients" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentPatients.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-400 text-sm">
                No patients yet. Share your intake link to get started.
              </div>
            ) : (
              recentPatients.map((patient) => (
                <Link
                  key={patient.id}
                  href={`/dashboard/patients/${patient.id}`}
                  className="flex items-center justify-between px-6 py-3.5 hover:bg-gray-50"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{patient.full_name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{patient.service_requested ?? 'General inquiry'} · {timeAgo(patient.created_at)}</p>
                  </div>
                  <Badge className={STATUS_COLORS[patient.status]}>{STATUS_LABELS[patient.status]}</Badge>
                </Link>
              ))
            )}
          </div>
        </Card>

        {/* Recent referrals */}
        <Card padding="none">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Recent Referrals</h2>
            <Link href="/dashboard/referrals" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentReferrals.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-400 text-sm">
                No referrals yet.
              </div>
            ) : (
              recentReferrals.map((ref) => (
                <Link
                  key={ref.id}
                  href={`/dashboard/referrals/${ref.id}`}
                  className="flex items-center justify-between px-6 py-3.5 hover:bg-gray-50"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{ref.patient_full_name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      From {ref.referring_provider_name} · {timeAgo(ref.created_at)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={URGENCY_COLORS[ref.urgency]}>{URGENCY_LABELS[ref.urgency]}</Badge>
                  </div>
                </Link>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
