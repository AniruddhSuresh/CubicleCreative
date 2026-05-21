import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ReferralForm } from '@/components/forms/ReferralForm'
import { ClipboardList, CheckCircle2 } from 'lucide-react'

export default async function ReferralPage(props: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await props.params
  const supabase = await createClient()

  const { data: provider } = await supabase
    .from('providers')
    .select('id, practice_name, specialty, intake_slug')
    .eq('intake_slug', slug)
    .single()

  if (!provider) notFound()

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Refer a Patient</h1>
          <p className="text-gray-600 mt-1">To: <strong>{provider.practice_name}</strong></p>
          {provider.specialty && (
            <p className="text-gray-500 text-sm mt-1">{provider.specialty}</p>
          )}
          <p className="text-gray-600 mt-3">
            Use this form to refer a patient. We&apos;ll contact the patient and confirm the referral.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <ReferralForm providerId={provider.id} />
        </div>

        <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-gray-400">
          <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
          Powered by PatientPending · Secure referral form
        </div>
      </div>
    </div>
  )
}
