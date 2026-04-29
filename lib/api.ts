import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function refreshAccessToken(): Promise<string | null> {
  const cookieStore = await cookies()
  const refreshToken = cookieStore.get('refresh_token')?.value
  if (!refreshToken) return null

  try {
    const res = await fetch(`${process.env.API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken }),
    })

    if (!res.ok) return null

    const data = await res.json()

    // Update cookies with new tokens
    cookieStore.set('access_token', data.access_token, { httpOnly: true, path: '/' })
    cookieStore.set('refresh_token', data.refresh_token, { httpOnly: true, path: '/' })

    return data.access_token
  } catch {
    return null
  }
}

export async function apiRequest(
  endpoint: string,
  options: RequestInit = {},
  isRetry = false
) {
  const cookieStore = await cookies()
  const token = cookieStore.get('access_token')?.value

  const res = await fetch(`${process.env.API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-API-Version': '1',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })

  if (res.status === 401) {
    if (isRetry) {
      // Refresh already failed, clear and redirect
      redirect('/api/auth/unauthorized')
    }

    const newToken = await refreshAccessToken()
    if (!newToken) {
      redirect('/api/auth/unauthorized')
    }

    // Retry original request with new token
    return apiRequest(endpoint, options, true)
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw { status: res.status, message: error.message || 'Request failed' }
  }

  return res.json()
}