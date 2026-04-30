import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const challenge = searchParams.get('code_challenge')
  const state = searchParams.get('state')

  if (!challenge || !state) {
    return NextResponse.json({ error: 'Missing params' }, { status: 400 })
  }

  const redirectUri = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/auth/callback`

  const res = await fetch(
    `${process.env.API_BASE_URL}/auth/github?code_challenge=${challenge}&code_challenge_method=S256&state=${state}&redirect_uri=${encodeURIComponent(redirectUri)}`
  )

  const url = await res.text()
  return NextResponse.json({ url })
}