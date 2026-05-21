import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Card } from '@/components/ui/Card'
import { AnalyticsCharts } from '@/components/dashboard/AnalyticsCharts'
import { TrendingUp, Users, GitBranch, CheckCircle2, Clock } from 'lucide-react'

export default async function AnalyticsPage() {
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

  const sixMonthsAgo = new Date()
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

  const [patientsRes, referralsRes] = await Promise.all([
    supabase
      .from('patients')
      .select('status, created_at, updated_at')
      .eq('provider_id', provider.id)
      .gte('created_at', sixMonthsAgo.toISOString()),
    supabase
      .from('referrals')
      .select('status, created_at, updated_at, urgency')
      .eq('provider_id', provider.id)
      .gte('created_at', sixMonthsAgo.toISOString()),
  ])

  const patients = patientsRes.data ?? []
  const referrals = referralsRes.data ?? []

  const now = new Date()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
  const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1)

  const thisMonth = {
    patients: patients.filter((p) => new Date(p.created_at) >= monthStart).length,
    referrals: referrals.filter((r) => new Date(r.created_at) >= monthStart).length,
    scheduled: [...patients, ...referrals].filter(
      (p) => p.status === 'scheduled' && new Date(p.created_at) >= monthStart
    ).length,
  }

  const lastMonth = {
    patients: patients.filter(
      (p) => new Date(p.created_at) >= lastMonthStart && new Date(p.created_at) < monthStart
    ).length,
    referrals: referrals.filter(
      (r) => new Date(r.created_at) >= lastMonthStart && new Date(r.created_at) < monthStart
    ).length,
  }

  const allItems = [...patients, ...referrals]
  const total = allItems.length
  const scheduled = allItems.filter((p) => p.status === 'scheduled' || p.status === 'completed').length
  const conversionRate = total > 0 ? Math.round((scheduled / total) * 100) : 0

  // Monthly breakdown for chart
  const monthlyData: Record<string, { month: string; patients: number; referrals: number }> = {}
  for (let i = 5; i >= 0; i--) {
    const d = new Date()
    d.setMonth(d.getMonth() - i)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    const label = d.toLocaleString('default', { month: 'short' })
    monthlyData[key] = { month: label, patients: 0, referrals: 0 }
  }

  for (const p of patients) {
    const d = new Date(p.created_at)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    if (monthlyData[key]) monthlyData[key].patients++
  }
  for (const r of referrals) {
    const d = new Date(r.created_at)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    if (monthlyData[key]) monthlyData[key].referrals++
  }

  const chartData = Object.values(monthlyData)

  // Status breakdown
  const statusCounts: Record<string, number> = {}
  for (const item of allItems) {
    statusCounts[item.status] = (statusCounts[item.status] ?? 0) + 1
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-500 mt-1">Performance overview for the last 6 months.</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'This month',
            value: thisMonth.patients + thisMonth.referrals,
            sub: `${lastMonth.patients + lastMonth.referrals} last month`,
            icon: TrendingUp,
            color: 'blue',
          },
          {
            label: 'Total patients',
            value: patients.length,
            sub: '6-month total',
            icon: Users,
            color: 'indigo',
          },
          {
            label: 'Total referrals',
            value: referrals.length,
            sub: '6-month total',
            icon: GitBranch,
            color: 'violet',
          },
          {
            label: 'Conversion rate',
            value: `${conversionRate}%`,
            sub: 'Reached scheduled/completed',
            icon: CheckCircle2,
            color: 'green',
          },
        ].map((kpi) => (
          <Card key={kpi.label}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">{kpi.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{kpi.value}</p>
                <p className="text-xs text-gray-400 mt-1">{kpi.sub}</p>
              </div>
              <div className={`p-2 rounded-lg bg-${kpi.color}-100`}>
                <kpi.icon className={`w-5 h-5 text-${kpi.color}-600`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <AnalyticsCharts chartData={chartData} statusCounts={statusCounts} />
    </div>
  )
}
