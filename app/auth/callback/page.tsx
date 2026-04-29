import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { apiRequest } from '@/lib/api'
import { NextResponse } from 'next/server'

export default async function AuthCallbackPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('access_token')

  if (!token) {
    redirect('/login')
  }

  // Fetch user and store role in a readable cookie
  try {
    const user = await apiRequest('/auth/me')
    const response = NextResponse.redirect(new URL('/dashboard', 
      process.env.NEXT_PUBLIC_API_BASE_URL))
    response.cookies.set('role', user.role, { 
      httpOnly: false // intentionally readable by JS
    })
    return response
  } catch {
    redirect('/login')
  }
}