import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const code = searchParams.get('code')
  const codeVerifier = searchParams.get('code_verifier')

  if (!code || !codeVerifier) {
    return NextResponse.json({ error: 'Missing params' }, { status: 400 })
  }

  const res = await fetch(
    `${process.env.API_BASE_URL}/auth/github/callback?code=${code}&code_verifier=${codeVerifier}`,
  )

  if (!res.ok) {
    return NextResponse.json({ error: 'Auth failed' }, { status: 401 })
  }

  const data = await res.json()

  // Fetch role
  const meRes = await fetch(`${process.env.API_BASE_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${data.access_token}`,
      'X-API-Version': '1',
    },
  })

  const me = await meRes.json()
  const user = me.data ?? me

  const response = NextResponse.json({ ok: true })

  response.cookies.set('access_token', data.access_token, { httpOnly: true, path: '/', sameSite: 'lax' })
  response.cookies.set('refresh_token', data.refresh_token, { httpOnly: true, path: '/', sameSite: 'lax' })
  response.cookies.set('role', user.role ?? '', { httpOnly: false, path: '/' })

  return response
}