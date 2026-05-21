'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { CheckCircle2 } from 'lucide-react'

const URGENCY_OPTIONS = [
  { value: 'low', label: 'Low — routine referral' },
  { value: 'normal', label: 'Normal — within a few weeks' },
  { value: 'high', label: 'High — within a week' },
  { value: 'urgent', label: 'Urgent — ASAP' },
]

export function ReferralForm({ providerId }: { providerId: string }) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    referring_provider_name: '',
    referring_clinic: '',
    referring_phone: '',
    referring_email: '',
    patient_full_name: '',
    patient_phone: '',
    patient_email: '',
    patient_dob: '',
    reason: '',
    urgency: 'normal',
    insurance_provider: '',
    notes: '',
  })

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { error: insertError } = await supabase.from('referrals').insert({
      provider_id: providerId,
      referring_provider_name: form.referring_provider_name,
      referring_clinic: form.referring_clinic || null,
      referring_phone: form.referring_phone || null,
      referring_email: form.referring_email || null,
      patient_full_name: form.patient_full_name,
      patient_phone: form.patient_phone || null,
      patient_email: form.patient_email || null,
      patient_dob: form.patient_dob || null,
      reason: form.reason,
      urgency: form.urgency,
      insurance_provider: form.insurance_provider || null,
      notes: form.notes || null,
      status: 'new',
    })

    if (insertError) {
      setError('Something went wrong. Please try again.')
      setLoading(false)
      return
    }

    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-500" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Referral submitted!</h2>
        <p className="text-gray-500">
          Thank you. The referral for {form.patient_full_name} has been received. The practice will follow up shortly.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      {/* Referring provider */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-100">
          Referring Provider
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Provider name"
              required
              placeholder="Dr. Jane Smith"
              value={form.referring_provider_name}
              onChange={(e) => update('referring_provider_name', e.target.value)}
            />
            <Input
              label="Clinic / practice"
              placeholder="ABC Medical Group"
              value={form.referring_clinic}
              onChange={(e) => update('referring_clinic', e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Phone"
              type="tel"
              placeholder="(555) 555-5555"
              value={form.referring_phone}
              onChange={(e) => update('referring_phone', e.target.value)}
            />
            <Input
              label="Email"
              type="email"
              placeholder="provider@clinic.com"
              value={form.referring_email}
              onChange={(e) => update('referring_email', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Patient info */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-100">
          Patient Information
        </h3>
        <div className="space-y-4">
          <Input
            label="Patient full name"
            required
            placeholder="John Doe"
            value={form.patient_full_name}
            onChange={(e) => update('patient_full_name', e.target.value)}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Patient phone"
              type="tel"
              placeholder="(555) 555-5555"
              value={form.patient_phone}
              onChange={(e) => update('patient_phone', e.target.value)}
            />
            <Input
              label="Patient email"
              type="email"
              placeholder="patient@example.com"
              value={form.patient_email}
              onChange={(e) => update('patient_email', e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Date of birth"
              type="date"
              value={form.patient_dob}
              onChange={(e) => update('patient_dob', e.target.value)}
            />
            <Input
              label="Insurance"
              placeholder="Blue Cross Blue Shield"
              value={form.insurance_provider}
              onChange={(e) => update('insurance_provider', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Referral details */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-100">
          Referral Details
        </h3>
        <div className="space-y-4">
          <Textarea
            label="Reason for referral"
            required
            placeholder="Describe the patient's condition and reason for referral..."
            value={form.reason}
            onChange={(e) => update('reason', e.target.value)}
            rows={4}
          />
          <Select
            label="Urgency"
            options={URGENCY_OPTIONS}
            value={form.urgency}
            onChange={(e) => update('urgency', e.target.value)}
          />
          <Textarea
            label="Additional notes (optional)"
            placeholder="Any other relevant information..."
            value={form.notes}
            onChange={(e) => update('notes', e.target.value)}
            rows={2}
          />
        </div>
      </div>

      <Button type="submit" loading={loading} className="w-full" size="lg">
        Submit referral
      </Button>
    </form>
  )
}
