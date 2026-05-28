'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { Link2, Copy, Check } from 'lucide-react'
import type { Provider } from '@/types'

export function SettingsForm({ provider }: { provider: Provider }) {
  const router = useRouter()
  const [form, setForm] = useState({
    practice_name: provider.practice_name,
    specialty: provider.specialty ?? '',
    phone: provider.phone ?? '',
    email: provider.email ?? '',
    address: provider.address ?? '',
    city: provider.city ?? '',
    state: provider.state ?? '',
    zip: provider.zip ?? '',
    notification_email: provider.notification_email ?? '',
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase
      .from('providers')
      .update({
        practice_name: form.practice_name,
        specialty: form.specialty || null,
        phone: form.phone || null,
        email: form.email || null,
        address: form.address || null,
        city: form.city || null,
        state: form.state || null,
        zip: form.zip || null,
        notification_email: form.notification_email || null,
      })
      .eq('id', provider.id)

    if (error) {
      setError(error.message)
    } else {
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
      router.refresh()
    }

    setSaving(false)
  }

  const intakeUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/intake/${provider.intake_slug}`

  async function copyLink() {
    await navigator.clipboard.writeText(intakeUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Intake link */}
      <Card>
        <h2 className="font-semibold text-gray-900 mb-1">Your Intake Link</h2>
        <p className="text-sm text-gray-500 mb-4">Share this link with patients so they can submit intake requests.</p>
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
          <Link2 className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span className="text-sm text-blue-600 font-mono flex-1 truncate">{intakeUrl}</span>
          <button onClick={copyLink} className="flex-shrink-0 text-gray-500 hover:text-gray-700">
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          Your intake slug: <code className="font-mono bg-gray-100 px-1 rounded">{provider.intake_slug}</code>
        </p>
      </Card>

      {/* Practice info */}
      <Card>
        <h2 className="font-semibold text-gray-900 mb-6">Practice Information</h2>
        <form onSubmit={handleSave} className="space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Input
                label="Practice name"
                required
                value={form.practice_name}
                onChange={(e) => update('practice_name', e.target.value)}
              />
            </div>
            <Input
              label="Specialty"
              placeholder="Physical Therapy"
              value={form.specialty}
              onChange={(e) => update('specialty', e.target.value)}
            />
            <Input
              label="Phone"
              type="tel"
              placeholder="(555) 555-5555"
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
            />
            <div className="col-span-2">
              <Input
                label="Business email"
                type="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
              />
            </div>
            <div className="col-span-2">
              <Input
                label="Street address"
                value={form.address}
                onChange={(e) => update('address', e.target.value)}
              />
            </div>
            <Input
              label="City"
              value={form.city}
              onChange={(e) => update('city', e.target.value)}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="State"
                value={form.state}
                onChange={(e) => update('state', e.target.value)}
              />
              <Input
                label="ZIP"
                value={form.zip}
                onChange={(e) => update('zip', e.target.value)}
              />
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100">
            <Input
              label="Notification email"
              type="email"
              value={form.notification_email}
              onChange={(e) => update('notification_email', e.target.value)}
              hint="Receive email alerts for new patient requests and referrals."
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Button type="submit" loading={saving}>
              {saved ? 'Saved!' : 'Save changes'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
