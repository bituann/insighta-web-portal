'use client'
import { useState } from 'react'

async function generatePKCE() {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  const verifier = btoa(String.fromCharCode(...array))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')

  const encoder = new TextEncoder()
  const data = encoder.encode(verifier)
  const hash = await crypto.subtle.digest('SHA-256', data)
  const challenge = btoa(String.fromCharCode(...new Uint8Array(hash)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')

  const stateArray = new Uint8Array(16)
  crypto.getRandomValues(stateArray)
  const state = btoa(String.fromCharCode(...stateArray))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')

  return { verifier, challenge, state }
}

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  async function handleLogin() {
    setLoading(true)
    setError(false)
    try {
      const { verifier, challenge, state } = await generatePKCE()

      sessionStorage.setItem('pkce_verifier', verifier)
      sessionStorage.setItem('pkce_state', state)
      
      const res = await fetch(`/api/auth/url?code_challenge=${challenge}&state=${state}`)
      
      if (!res.ok) throw new Error()

      const { url } = await res.json()
      window.location.href = url
    } catch (e){
      setError(true)
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-xl shadow-sm text-center space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Insighta</h1>
          <p className="text-gray-500 mt-1 text-sm">Sign in to continue</p>
        </div>

        {error && <p className="text-sm text-red-500">Something went wrong. Please try again.</p>}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="flex items-center justify-center gap-3 w-full bg-gray-900 
                     text-white py-3 px-6 rounded-lg hover:bg-gray-700 
                     transition disabled:opacity-50"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385..." />
          </svg>
          {loading ? 'Redirecting...' : 'Continue with GitHub'}
        </button>
      </div>
    </main>
  )
}