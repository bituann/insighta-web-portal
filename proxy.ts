import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_ROUTES = ['/login', '/auth/callback']

export function proxy(request: NextRequest) {
  const token = request.cookies.get('access_token')
  const isPublic = PUBLIC_ROUTES.some(route => 
    request.nextUrl.pathname.startsWith(route)
  )

  if (!token && !isPublic) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (token && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}