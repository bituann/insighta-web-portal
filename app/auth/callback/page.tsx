'use client'
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function CallbackPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
	async function complete() {
		const code = searchParams.get('code')
		const returnedState = searchParams.get('state')
		const verifier = sessionStorage.getItem('pkce_verifier')
		const savedState = sessionStorage.getItem('pkce_state')

		sessionStorage.removeItem('pkce_verifier')
		sessionStorage.removeItem('pkce_state')

		if (!code || !verifier || !returnedState || !savedState) {
			router.push('/login')
			return
		}

		if (returnedState !== savedState) {
			router.push('/login')
			return
		}

		const res = await fetch(`/api/auth/callback?code=${code}&code_verifier=${verifier}`)

		if (res.ok) {
			router.push('/dashboard')
		} else {
			router.push('/login')
		}
	}
	complete()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Completing login...</p>
    </div>
  )
}