'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts'
import { Card, CardTitle } from '@/components/ui/Card'
import { STATUS_LABELS, type PatientStatus } from '@/types'

const PIE_COLORS: Record<string, string> = {
  new: '#3b82f6',
  contacted: '#f59e0b',
  awaiting_response: '#f97316',
  scheduled: '#22c55e',
  completed: '#6b7280',
  archived: '#d1d5db',
}

interface AnalyticsChartsProps {
  chartData: { month: string; patients: number; referrals: number }[]
  statusCounts: Record<string, number>
}

export function AnalyticsCharts({ chartData, statusCounts }: AnalyticsChartsProps) {
  const pieData = Object.entries(statusCounts).map(([status, count]) => ({
    name: STATUS_LABELS[status as PatientStatus] ?? status,
    value: count,
    status,
  }))

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Monthly volume bar chart */}
      <Card className="lg:col-span-2">
        <CardTitle className="mb-6">Monthly Volume</CardTitle>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
            <Tooltip
              contentStyle={{
                fontSize: '12px',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Bar dataKey="patients" name="Patients" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="referrals" name="Referrals" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Status distribution */}
      <Card>
        <CardTitle className="mb-6">Status Breakdown</CardTitle>
        {pieData.length === 0 ? (
          <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
            No data yet
          </div>
        ) : (
          <>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {pieData.map((entry) => (
                    <Cell
                      key={entry.status}
                      fill={PIE_COLORS[entry.status] ?? '#6b7280'}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    fontSize: '12px',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 mt-2">
              {pieData.map((entry) => (
                <div key={entry.status} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: PIE_COLORS[entry.status] ?? '#6b7280' }}
                    />
                    <span className="text-gray-600">{entry.name}</span>
                  </div>
                  <span className="font-medium text-gray-900">{entry.value}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </Card>
    </div>
  )
}
