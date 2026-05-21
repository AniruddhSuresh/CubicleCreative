'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ClipboardList, MailCheck } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { generateSlug } from '@/lib/utils'

export default function SignupPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    email: '',
    password: '',
    practiceName: '',
    specialty: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()

    const { data, error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      // Store practice info in user metadata so onboarding can read it
      options: {
        data: {
          practice_name: form.practiceName,
          specialty: form.specialty || null,
        },
      },
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    if (!data.user) {
      setError('Signup failed. Please try again.')
      setLoading(false)
      return
    }

    // No session = email confirmation required by Supabase
    if (!data.session) {
      setEmailSent(true)
      setLoading(false)
      return
    }

    // Session exists — create provider profile immediately
    const baseSlug = generateSlug(form.practiceName)
    const slug = `${baseSlug}-${Math.random().toString(36).slice(2, 7)}`

    const { error: providerError } = await supabase.from('providers').insert({
      user_id: data.user.id,
      practice_name: form.practiceName,
      specialty: form.specialty || null,
      email: form.email,
      intake_slug: slug,
      notification_email: form.email,
    })

    if (providerError) {
      // Show the real error so it's diagnosable
      setError(`Database error: ${providerError.message}. Make sure you've run supabase/schema.sql in your Supabase project.`)
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  // Email confirmation state
  if (emailSent) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4">
        <div className="max-w-md w-full mx-auto text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MailCheck className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Check your email</h1>
          <p className="text-gray-500 mb-6">
            We sent a confirmation link to <strong>{form.email}</strong>. Click it to activate your account, then sign in.
          </p>
          <p className="text-sm text-gray-400 bg-gray-100 rounded-lg px-4 py-3">
            <strong>Tip for development:</strong> Disable email confirmation in your Supabase dashboard under{' '}
            <strong>Authentication → Email → Confirm email</strong> to skip this step.
          </p>
          <Link href="/login" className="inline-block mt-6 text-blue-600 font-medium hover:underline text-sm">
            Go to sign in →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">PatientPending</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
          <p className="text-gray-500 mt-1">Set up your practice in minutes</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleSignup} className="space-y-5">
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

            <Input
              label="Email address"
              type="email"
              required
              autoComplete="email"
              placeholder="you@practice.com"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
            />

            <Input
              label="Password"
              type="password"
              required
              autoComplete="new-password"
              placeholder="At least 8 characters"
              value={form.password}
              onChange={(e) => update('password', e.target.value)}
              hint="Minimum 8 characters"
            />

            <Button type="submit" loading={loading} className="w-full" size="lg">
              Create account
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          By signing up you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  )
}
