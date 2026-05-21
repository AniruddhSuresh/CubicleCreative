export type PatientStatus =
  | 'new'
  | 'contacted'
  | 'awaiting_response'
  | 'scheduled'
  | 'completed'
  | 'archived'

export type Urgency = 'low' | 'normal' | 'high' | 'urgent'

export type ContactMethod = 'phone' | 'email' | 'text'

export type PatientSource = 'intake' | 'referral' | 'manual'

export interface Provider {
  id: string
  user_id: string
  practice_name: string
  specialty: string | null
  phone: string | null
  email: string | null
  address: string | null
  city: string | null
  state: string | null
  zip: string | null
  intake_slug: string
  logo_url: string | null
  notification_email: string | null
  created_at: string
  updated_at: string
}

export interface Patient {
  id: string
  provider_id: string
  full_name: string
  phone: string | null
  email: string | null
  date_of_birth: string | null
  insurance_provider: string | null
  insurance_id: string | null
  preferred_contact: ContactMethod
  status: PatientStatus
  source: PatientSource
  urgency: Urgency
  service_requested: string | null
  description: string | null
  referral_source: string | null
  assigned_to: string | null
  created_at: string
  updated_at: string
  notes?: Note[]
}

export interface Referral {
  id: string
  provider_id: string
  patient_id: string | null
  referring_provider_name: string
  referring_clinic: string | null
  referring_phone: string | null
  referring_email: string | null
  patient_full_name: string
  patient_phone: string | null
  patient_email: string | null
  patient_dob: string | null
  reason: string
  urgency: Urgency
  insurance_provider: string | null
  notes: string | null
  status: PatientStatus
  received_at: string
  created_at: string
  updated_at: string
  note_entries?: Note[]
}

export interface Note {
  id: string
  provider_id: string
  patient_id: string | null
  referral_id: string | null
  author_id: string
  content: string
  created_at: string
  updated_at: string
}

export interface ActivityLog {
  id: string
  provider_id: string
  user_id: string | null
  patient_id: string | null
  referral_id: string | null
  action: string
  details: Record<string, unknown>
  created_at: string
}

export interface DashboardStats {
  total_patients: number
  new_requests: number
  contacted: number
  scheduled: number
  total_referrals: number
  new_referrals: number
  monthly_referrals: number
  conversion_rate: number
  avg_response_hours: number
}

export const STATUS_LABELS: Record<PatientStatus, string> = {
  new: 'New',
  contacted: 'Contacted',
  awaiting_response: 'Awaiting Response',
  scheduled: 'Scheduled',
  completed: 'Completed',
  archived: 'Archived',
}

export const STATUS_COLORS: Record<PatientStatus, string> = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-yellow-100 text-yellow-800',
  awaiting_response: 'bg-orange-100 text-orange-800',
  scheduled: 'bg-green-100 text-green-800',
  completed: 'bg-gray-100 text-gray-700',
  archived: 'bg-gray-100 text-gray-500',
}

export const URGENCY_LABELS: Record<Urgency, string> = {
  low: 'Low',
  normal: 'Normal',
  high: 'High',
  urgent: 'Urgent',
}

export const URGENCY_COLORS: Record<Urgency, string> = {
  low: 'bg-gray-100 text-gray-600',
  normal: 'bg-blue-100 text-blue-700',
  high: 'bg-amber-100 text-amber-800',
  urgent: 'bg-red-100 text-red-800',
}

export const PIPELINE_COLUMNS: PatientStatus[] = [
  'new',
  'contacted',
  'awaiting_response',
  'scheduled',
  'completed',
]
