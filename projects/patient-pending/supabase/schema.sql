-- PatientPending Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- PROVIDERS
-- =============================================
CREATE TABLE providers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  practice_name TEXT NOT NULL,
  specialty TEXT,
  phone TEXT,
  email TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  intake_slug TEXT UNIQUE NOT NULL, -- used for public intake link: /intake/{slug}
  logo_url TEXT,
  notification_email TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- PATIENTS
-- =============================================
CREATE TABLE patients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider_id UUID REFERENCES providers(id) ON DELETE CASCADE NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  date_of_birth DATE,
  insurance_provider TEXT,
  insurance_id TEXT,
  preferred_contact TEXT DEFAULT 'phone', -- phone | email | text
  status TEXT DEFAULT 'new', -- new | contacted | awaiting_response | scheduled | completed | archived
  source TEXT DEFAULT 'intake', -- intake | referral | manual
  urgency TEXT DEFAULT 'normal', -- low | normal | high | urgent
  service_requested TEXT,
  description TEXT,
  referral_source TEXT,
  assigned_to UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- REFERRALS
-- =============================================
CREATE TABLE referrals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider_id UUID REFERENCES providers(id) ON DELETE CASCADE NOT NULL,
  patient_id UUID REFERENCES patients(id) ON DELETE SET NULL,
  referring_provider_name TEXT NOT NULL,
  referring_clinic TEXT,
  referring_phone TEXT,
  referring_email TEXT,
  patient_full_name TEXT NOT NULL,
  patient_phone TEXT,
  patient_email TEXT,
  patient_dob DATE,
  reason TEXT NOT NULL,
  urgency TEXT DEFAULT 'normal', -- low | normal | high | urgent
  insurance_provider TEXT,
  notes TEXT,
  status TEXT DEFAULT 'new', -- new | contacted | awaiting_response | scheduled | completed | archived
  received_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- NOTES
-- =============================================
CREATE TABLE notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider_id UUID REFERENCES providers(id) ON DELETE CASCADE NOT NULL,
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  referral_id UUID REFERENCES referrals(id) ON DELETE CASCADE,
  author_id UUID REFERENCES auth.users(id) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT note_has_parent CHECK (patient_id IS NOT NULL OR referral_id IS NOT NULL)
);

-- =============================================
-- ACTIVITY LOG
-- =============================================
CREATE TABLE activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider_id UUID REFERENCES providers(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  patient_id UUID REFERENCES patients(id) ON DELETE SET NULL,
  referral_id UUID REFERENCES referrals(id) ON DELETE SET NULL,
  action TEXT NOT NULL, -- status_change | note_added | patient_created | referral_received | contacted
  details JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- INDEXES
-- =============================================
CREATE INDEX idx_patients_provider_id ON patients(provider_id);
CREATE INDEX idx_patients_status ON patients(status);
CREATE INDEX idx_patients_created_at ON patients(created_at DESC);
CREATE INDEX idx_referrals_provider_id ON referrals(provider_id);
CREATE INDEX idx_referrals_status ON referrals(status);
CREATE INDEX idx_notes_patient_id ON notes(patient_id);
CREATE INDEX idx_notes_referral_id ON notes(referral_id);
CREATE INDEX idx_activity_provider_id ON activity_log(provider_id);
CREATE INDEX idx_activity_created_at ON activity_log(created_at DESC);

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

-- Providers: only owner can see/edit
CREATE POLICY "providers_owner" ON providers
  FOR ALL USING (auth.uid() = user_id);

-- Patients: providers can see their own patients
CREATE POLICY "patients_owner" ON patients
  FOR ALL USING (
    provider_id IN (SELECT id FROM providers WHERE user_id = auth.uid())
  );

-- Referrals: providers can see their own referrals
CREATE POLICY "referrals_owner" ON referrals
  FOR ALL USING (
    provider_id IN (SELECT id FROM providers WHERE user_id = auth.uid())
  );

-- Notes: providers can see notes for their patients/referrals
CREATE POLICY "notes_owner" ON notes
  FOR ALL USING (
    provider_id IN (SELECT id FROM providers WHERE user_id = auth.uid())
  );

-- Activity log: providers see their own activity
CREATE POLICY "activity_owner" ON activity_log
  FOR ALL USING (
    provider_id IN (SELECT id FROM providers WHERE user_id = auth.uid())
  );

-- =============================================
-- PUBLIC INSERT POLICIES (for intake/referral forms)
-- =============================================

-- Allow anyone to insert a patient (intake form - validated by provider slug)
CREATE POLICY "patients_public_insert" ON patients
  FOR INSERT WITH CHECK (true);

-- Allow anyone to insert a referral
CREATE POLICY "referrals_public_insert" ON referrals
  FOR INSERT WITH CHECK (true);

-- Allow public select on providers (to validate intake slug)
CREATE POLICY "providers_public_read" ON providers
  FOR SELECT USING (true);

-- =============================================
-- UPDATED_AT TRIGGER
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER providers_updated_at BEFORE UPDATE ON providers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER patients_updated_at BEFORE UPDATE ON patients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER referrals_updated_at BEFORE UPDATE ON referrals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER notes_updated_at BEFORE UPDATE ON notes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
