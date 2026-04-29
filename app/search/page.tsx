import { apiRequest } from '@/lib/api'
import Link from 'next/link'
import { SearchInput } from '@/components/SearchInput'
import { Pagination } from '@/components/Pagination'
import { Profile } from '@/lib/types'

async function searchProfiles(query: string, page: string) {
  if (!query) return { data: [], total: 0 }
  const data = await apiRequest(
    `/api/profiles/search?q=${encodeURIComponent(query)}&page=${page}&limit=10`
  )
  return data
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>
}) {
  const params = await searchParams
  const query = params.q ?? ''
  const page = Number(params.page ?? 1)
  const data = await searchProfiles(query, String(page))
  const results = data.data ?? []
  const total = data.total ?? 0
  const totalPages = data.total_pages ?? 0

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white-900">Search</h1>
      <SearchInput defaultValue={query} />

      {query && (
        <p className="text-sm text-white-500">
          {total} result{total !== 1 ? 's' : ''} for &quot;{query}&quot;
        </p>
      )}

      {results.length > 0 && (
        <>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 
                          divide-y divide-gray-100">
            {results.map((p: Profile) => (
              <Link
                key={p.id}
                href={`/profiles/${p.id}`}
                className="flex items-center justify-between px-6 py-4 
                           hover:bg-gray-50 transition"
              >
                <div>
                  <p className="font-medium text-gray-900">{p.name}</p>
                  <p className="text-sm text-gray-500 capitalize">
                    {p.gender} · {p.age_group} · {p.age} · {p.country_name}
                  </p>
                </div>
                <span className="text-blue-600 text-sm">View →</span>
              </Link>
            ))}
          </div>
          <Pagination page={page} totalPages={totalPages} />
        </>
      )}

      {query && results.length === 0 && (
        <p className="text-center py-12 text-gray-400">No results found</p>
      )}
    </div>
  )
}