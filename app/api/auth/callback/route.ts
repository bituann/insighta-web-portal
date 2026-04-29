import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value
  const refreshToken = request.cookies.get('refresh_token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    const res = await fetch(`${process.env.API_BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-API-Version': '1',
      },
    })

    if (!res.ok) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    const body = await res.json()
    const user = body.data ?? body

    const response = NextResponse.redirect(new URL('/dashboard', request.url))

    response.cookies.set('access_token', token, { httpOnly: true, path: '/', secure: true, sameSite: 'lax' })
    response.cookies.set('refresh_token', refreshToken ?? '', { httpOnly: true, path: '/', secure: true, sameSite: 'lax' })
    response.cookies.set('role', user.role, { httpOnly: false, path: '/' })

    return response
  } catch {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}