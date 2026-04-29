'use client'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

export function Pagination({ page, totalPages }: { 
  page: number
  totalPages: number 
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function goTo(p: number) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', String(p))
    router.push(`${pathname}?${params.toString()}`)
  }

  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => goTo(page - 1)}
        disabled={page <= 1}
        className="px-4 py-2 rounded-lg text-sm border border-gray-200 
                   disabled:opacity-40 hover:bg-gray-50 transition"
      >
        Previous
      </button>
      <span className="text-sm text-gray-500">
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() => goTo(page + 1)}
        disabled={page >= totalPages}
        className="px-4 py-2 rounded-lg text-sm border border-gray-200 
                   disabled:opacity-40 hover:bg-gray-50 transition"
      >
        Next
      </button>
    </div>
  )
}