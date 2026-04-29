import { cookies } from 'next/headers'
import Link from 'next/link'
import './globals.css'

const navLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/profiles', label: 'Profiles' },
  { href: '/search', label: 'Search' },
  { href: '/account', label: 'Account' },
]

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const isLoggedIn = !!cookieStore.get('access_token')

  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        {isLoggedIn && (
          <nav className="bg-white border-b border-gray-100 px-6 py-4">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <span className="font-bold text-gray-900">Insighta</span>
              <div className="flex items-center gap-6">
                {navLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="text-sm text-gray-600 hover:text-gray-900 transition"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        )}
        <main className="max-w-6xl mx-auto px-6 py-8">{children}</main>
      </body>
    </html>
  )
}