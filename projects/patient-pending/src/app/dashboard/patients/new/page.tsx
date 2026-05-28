import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { NewPatientForm } from '@/components/dashboard/NewPatientForm'

export default async function NewPatientPage() {
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

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Add New Patient</h1>
        <p className="text-gray-500 mt-1">Manually add a patient to your queue.</p>
      </div>
      <NewPatientForm providerId={provider.id} />
    </div>
  )
}
