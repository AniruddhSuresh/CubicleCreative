'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { CheckCircle2 } from 'lucide-react'

const CONTACT_OPTIONS = [
  { value: 'phone', label: 'Phone call' },
  { value: 'text', label: 'Text message' },
  { value: 'email', label: 'Email' },
]

const URGENCY_OPTIONS = [
  { value: 'normal', label: 'No urgency — general inquiry' },
  { value: 'high', label: 'Soon — need appointment within a few weeks' },
  { value: 'urgent', label: 'Urgent — need to be seen quickly' },
]

export function IntakeForm({ providerId }: { providerId: string }) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    full_name: '',
    phone: '',
    email: '',
    service_requested: '',
    description: '',
    preferred_contact: 'phone',
    urgency: 'normal',
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
      preferred_contact: form.preferred_contact,
      urgency: form.urgency,
      insurance_provider: form.insurance_provider || null,
      referral_source: form.referral_source || null,
      source: 'intake',
      status: 'new',
    })

    if (insertError) {
      setError('Something went wrong. Please try again or call us directly.')
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
        <h2 className="text-xl font-bold text-gray-900 mb-2">Request received!</h2>
        <p className="text-gray-500">
          Thank you, {form.full_name}. We&apos;ve received your request and will reach out to you soon via {form.preferred_contact}.
        </p>
      </div>
    )
  }

  return (
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
          label="Phone number"
          type="tel"
          placeholder="(555) 555-5555"
          value={form.phone}
          onChange={(e) => update('phone', e.target.value)}
        />
        <Input
          label="Email address"
          type="email"
          placeholder="jane@example.com"
          value={form.email}
          onChange={(e) => update('email', e.target.value)}
        />
      </div>

      <Input
        label="Service needed"
        placeholder="e.g. Physical therapy evaluation, orthotics fitting..."
        value={form.service_requested}
        onChange={(e) => update('service_requested', e.target.value)}
      />

      <Textarea
        label="Describe your situation"
        placeholder="Please describe your symptoms, injury, or reason for requesting an appointment..."
        value={form.description}
        onChange={(e) => update('description', e.target.value)}
        rows={4}
      />

      <Select
        label="Preferred contact method"
        options={CONTACT_OPTIONS}
        value={form.preferred_contact}
        onChange={(e) => update('preferred_contact', e.target.value)}
      />

      <Select
        label="How soon do you need to be seen?"
        options={URGENCY_OPTIONS}
        value={form.urgency}
        onChange={(e) => update('urgency', e.target.value)}
      />

      <Input
        label="Insurance provider (optional)"
        placeholder="Blue Cross Blue Shield, Aetna, etc."
        value={form.insurance_provider}
        onChange={(e) => update('insurance_provider', e.target.value)}
      />

      <Input
        label="Referred by (optional)"
        placeholder="Dr. Smith, a friend, Google, etc."
        value={form.referral_source}
        onChange={(e) => update('referral_source', e.target.value)}
      />

      <Button type="submit" loading={loading} className="w-full" size="lg">
        Submit request
      </Button>

      <p className="text-xs text-gray-400 text-center">
        Your information is kept private and secure. We will never share it without your consent.
      </p>
    </form>
  )
}
