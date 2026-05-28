'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { Card } from '@/components/ui/Card'

const URGENCY_OPTIONS = [
  { value: 'low', label: 'Low' },
  { value: 'normal', label: 'Normal' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' },
]

const CONTACT_OPTIONS = [
  { value: 'phone', label: 'Phone' },
  { value: 'email', label: 'Email' },
  { value: 'text', label: 'Text' },
]

export function NewPatientForm({ providerId }: { providerId: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    full_name: '',
    phone: '',
    email: '',
    service_requested: '',
    description: '',
    urgency: 'normal',
    preferred_contact: 'phone',
    insurance_provider: '',
    referral_source: '',
  })

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { error: insertError } = await supabase.from('patients').insert({
      provider_id: providerId,
      full_name: form.full_name,
      phone: form.phone || null,
      email: form.email || null,
      service_requested: form.service_requested || null,
      description: form.description || null,
      urgency: form.urgency,
      preferred_contact: form.preferred_contact,
      insurance_provider: form.insurance_provider || null,
      referral_source: form.referral_source || null,
      source: 'manual',
      status: 'new',
    })

    if (insertError) {
      setError(insertError.message)
      setLoading(false)
      return
    }

    router.push('/dashboard/patients')
    router.refresh()
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        <Input
          label="Full name"
          required
          placeholder="Jane Smith"
          value={form.full_name}
          onChange={(e) => update('full_name', e.target.value)}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Phone"
            type="tel"
            placeholder="(555) 555-5555"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
          />
          <Input
            label="Email"
            type="email"
            placeholder="jane@example.com"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
          />
        </div>

        <Input
          label="Service requested"
          placeholder="Physical therapy evaluation"
          value={form.service_requested}
          onChange={(e) => update('service_requested', e.target.value)}
        />

        <Textarea
          label="Description / reason"
          placeholder="Brief description of patient's needs..."
          value={form.description}
          onChange={(e) => update('description', e.target.value)}
          rows={3}
        />

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Urgency"
            options={URGENCY_OPTIONS}
            value={form.urgency}
            onChange={(e) => update('urgency', e.target.value)}
          />
          <Select
            label="Preferred contact"
            options={CONTACT_OPTIONS}
            value={form.preferred_contact}
            onChange={(e) => update('preferred_contact', e.target.value)}
          />
        </div>

        <Input
          label="Insurance provider"
          placeholder="Blue Cross Blue Shield"
          value={form.insurance_provider}
          onChange={(e) => update('insurance_provider', e.target.value)}
        />

        <Input
          label="Referral source"
          placeholder="Dr. Smith at ABC Clinic"
          value={form.referral_source}
          onChange={(e) => update('referral_source', e.target.value)}
        />

        <div className="flex gap-3 pt-2">
          <Button type="submit" loading={loading}>
            Add patient
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  )
}
