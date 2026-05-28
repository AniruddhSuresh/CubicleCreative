import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { IntakeForm } from '@/components/forms/IntakeForm'
import { ClipboardList, CheckCircle2 } from 'lucide-react'

export default async function IntakePage(props: {
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
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{provider.practice_name}</h1>
          {provider.specialty && (
            <p className="text-gray-500 mt-1">{provider.specialty}</p>
          )}
          <p className="text-gray-600 mt-3">
            Please fill out the form below to submit a patient request. We&apos;ll be in touch shortly.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <IntakeForm providerId={provider.id} />
        </div>

        <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-gray-400">
          <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
          Powered by PatientPending · Secure intake form
        </div>
      </div>
    </div>
  )
}
