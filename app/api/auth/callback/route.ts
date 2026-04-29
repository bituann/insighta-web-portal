import { apiRequest } from '@/lib/api'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Fetch user role
  const res = await apiRequest('/auth/me')

  if (!res.ok) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const user = (await res.json()).data
  console.log('auth/me response:', user)
  const response = NextResponse.redirect(new URL('/dashboard', request.url))
  
  // Store role in readable cookie for client components
  response.cookies.set('role', user.role, {
    httpOnly: false,
    path: '/',
  })

  return response
}