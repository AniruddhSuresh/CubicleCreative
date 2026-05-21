'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ClipboardList } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { generateSlug } from '@/lib/utils'

export default function OnboardingPage() {
  const router = useRouter()
  const [form, setForm] = useState({ practiceName: '', specialty: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [prefilling, setPrefilling] = useState(true)

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  // Pre-fill from user metadata set during signup
  useEffect(() => {
    async function prefill() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.replace('/login')
        return
      }
      const meta = user.user_metadata
      if (meta?.practice_name) {
        setForm({
          practiceName: meta.practice_name ?? '',
          specialty: meta.specialty ?? '',
        })
      }
      setPrefilling(false)
    }
    prefill()
  }, [router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.practiceName.trim()) return
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      router.replace('/login')
      return
    }

    const baseSlug = generateSlug(form.practiceName)
    const slug = `${baseSlug}-${Math.random().toString(36).slice(2, 7)}`

    const { error: providerError } = await supabase.from('providers').insert({
      user_id: user.id,
      practice_name: form.practiceName,
      specialty: form.specialty || null,
      email: user.email,
      intake_slug: slug,
      notification_email: user.email,
    })

    if (providerError) {
      setError(`Setup failed: ${providerError.message}`)
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  if (prefilling) return null

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">PatientPending</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Set up your practice</h1>
          <p className="text-gray-500 mt-1">Just a couple of details to get you started.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
                {error}
              </div>
            )}

            <Input
              label="Practice name"
              required
              placeholder="Sunrise Physical Therapy"
              value={form.practiceName}
              onChange={(e) => update('practiceName', e.target.value)}
            />

            <Input
              label="Specialty"
              placeholder="Physical Therapy, Speech Pathology, etc."
              value={form.specialty}
              onChange={(e) => update('specialty', e.target.value)}
            />

            <Button type="submit" loading={loading} className="w-full" size="lg">
              Create my practice
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
