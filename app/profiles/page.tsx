import { apiRequest } from '@/lib/api'
import Link from 'next/link'
import { ProfileFilters } from '@/components/ProfileFilters'
import { Pagination } from '@/components/Pagination'

interface SearchParams {
  [key: string]: string | undefined
  gender?: string
  age_group?: string
  country_id?: string
  min_age?: string
  max_age?: string
  min_gender_probability?: string
  min_country_probability?: string
  sort_by?: string
  order?: string
  page?: string
  limit?: string
}

async function getProfiles(params: SearchParams) {
  const query = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value) query.set(key, value)
  })
  if (!params.limit) query.set('limit', '10')
  if (!params.page) query.set('page', '1')
  return apiRequest(`/api/profiles?${query.toString()}`)
}

export default async function ProfilesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const data = await getProfiles(params)
  const profiles = data.data ?? []
  const total = data.total ?? 0
  const page = Number(params.page ?? 1)
  const limit = Number(params.limit ?? 10)
  const totalPages = data.total_pages ?? 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Profiles</h1>
        <span className="text-sm text-gray-500">{total} total</span>
      </div>

      <ProfileFilters current={params} />

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              {['Name', 'Gender', 'Age', 'Age Group', 'Country', ''].map(h => (
                <th key={h} className="px-6 py-3 text-left">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {profiles.map((p: any) => (
              <tr key={p.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-gray-900">{p.name}</td>
                <td className="px-6 py-4 capitalize text-gray-600">{p.gender}</td>
                <td className="px-6 py-4 text-gray-600">{p.age}</td>
                <td className="px-6 py-4 capitalize text-gray-600">{p.age_group}</td>
                <td className="px-6 py-4 text-gray-600">{p.country_name}</td>
                <td className="px-6 py-4">
                  <Link
                    href={`/profiles/${p.id}`}
                    className="text-blue-600 hover:underline text-xs font-medium"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {profiles.length === 0 && (
          <p className="text-center py-12 text-gray-400">No profiles found</p>
        )}
      </div>

      <Pagination page={page} totalPages={totalPages} />
    </div>
  )
}