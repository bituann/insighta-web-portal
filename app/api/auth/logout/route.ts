import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  const cookieStore = await cookies()
  const token = cookieStore.get('access_token')?.value

  const res = await fetch(`${process.env.API_BASE_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'X-API-Version': '1',
    },
  })

  if (!res.ok || res.status !== 401) {
    return NextResponse.json(
      { status: 'error', message: 'Logout failed' },
      { status: res.status }
    )
  }

  const response = NextResponse.redirect(new URL('/login', request.url))
  response.cookies.delete('access_token')
  response.cookies.delete('refresh_token')
  response.cookies.delete('role')
  return response
}