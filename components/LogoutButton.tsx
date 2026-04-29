'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function LogoutButton() {
  const router = useRouter()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleLogout() {
    setLoading(true)
    const res = await fetch('/api/auth/logout', { method: 'POST' })
    if (res.ok || res.status === 401) {
      router.push('/login')
    } else {
      setError(true)
      setLoading(false)
    }
  }

  return (
    <div className="space-y-2">
      {error && (
        <p className="text-sm text-red-500 text-center">
          Logout failed, please try again
        </p>
      )}
      <button
        onClick={handleLogout}
        disabled={loading}
        className="w-full border border-red-200 text-red-600 py-2.5 rounded-lg 
                   text-sm hover:bg-red-50 transition disabled:opacity-50"
      >
        {loading ? 'Signing out...' : 'Sign out'}
      </button>
    </div>
  )
}