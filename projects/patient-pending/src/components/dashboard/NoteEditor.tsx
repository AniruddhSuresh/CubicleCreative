'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'

interface NoteEditorProps {
  patientId?: string
  referralId?: string
  providerId: string
  userId: string
}

export function NoteEditor({ patientId, referralId, providerId, userId }: NoteEditorProps) {
  const router = useRouter()
  const [content, setContent] = useState('')
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!content.trim()) return
    setSaving(true)

    const supabase = createClient()
    await supabase.from('notes').insert({
      patient_id: patientId ?? null,
      referral_id: referralId ?? null,
      provider_id: providerId,
      author_id: userId,
      content: content.trim(),
    })

    setContent('')
    setSaving(false)
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <Textarea
        placeholder="Add a note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={2}
      />
      <Button type="submit" size="sm" loading={saving} disabled={!content.trim()}>
        Add note
      </Button>
    </form>
  )
}
