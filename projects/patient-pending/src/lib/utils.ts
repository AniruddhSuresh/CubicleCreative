import { type ClassValue, clsx } from 'clsx'
import { formatDistanceToNow, format, differenceInHours } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return inputs.filter(Boolean).join(' ')
}

export function timeAgo(date: string) {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

export function formatDate(date: string) {
  return format(new Date(date), 'MMM d, yyyy')
}

export function formatDateTime(date: string) {
  return format(new Date(date), 'MMM d, yyyy h:mm a')
}

export function hoursSince(date: string) {
  return differenceInHours(new Date(), new Date(date))
}

export function generateSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
