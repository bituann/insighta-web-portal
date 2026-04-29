'use client'
import { useRouter } from 'next/navigation'

export function BackButton() {
  const router = useRouter()
  return (
    <button
      onClick={() => router.back()}
      className="text-gray-400 hover:text-gray-600 text-sm"
    >
      ← Back
    </button>
  )
}