'use client'
import { useRouter, usePathname } from 'next/navigation'
import { useState } from 'react'

export function ProfileFilters({ current }: { current: Record<string, string | undefined> }) {
  const router = useRouter()
  const pathname = usePathname()
  const [filters, setFilters] = useState(current)

  function apply() {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([k, v]) => {
      if (v) params.set(k, v)
    })
    params.set('page', '1')
    router.push(`${pathname}?${params.toString()}`)
  }

  function reset() {
    setFilters({})
    router.push(pathname)
  }

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <select
		value={filters.gender ?? ''}
		onChange={e => setFilters(f => ({ ...f, gender: e.target.value }))}
		className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900"
		>
		<option value="">All Genders</option>
		<option value="male">Male</option>
		<option value="female">Female</option>
		</select>

		<select
		value={filters.age_group ?? ''}
		onChange={e => setFilters(f => ({ ...f, age_group: e.target.value }))}
		className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900"
		>
		<option value="">All Age Groups</option>
		<option value="child">Child</option>
		<option value="teenager">Teenager</option>
		<option value="adult">Adult</option>
		<option value="senior">Senior</option>
		</select>

		<input
		placeholder="Country ID (e.g. NG)"
		value={filters.country_id ?? ''}
		onChange={e => setFilters(f => ({ ...f, country_id: e.target.value }))}
		className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900"
		/>

		<input
		type="number"
		placeholder="Min age"
		value={filters.min_age ?? ''}
		onChange={e => setFilters(f => ({ ...f, min_age: e.target.value }))}
		className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900"
		/>

		<input
		type="number"
		placeholder="Max age"
		value={filters.max_age ?? ''}
		onChange={e => setFilters(f => ({ ...f, max_age: e.target.value }))}
		className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900"
		/>

		<select
		value={filters.sort_by ?? ''}
		onChange={e => setFilters(f => ({ ...f, sort_by: e.target.value }))}
		className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900"
		>
		<option value="">Sort by</option>
		<option value="name">Name</option>
		<option value="gender">Gender</option>
		<option value="genderProbability">Gender Probability</option>
		<option value="age">Age</option>
		<option value="ageGroup">Age Group</option>
		<option value="countryId">Country ID</option>
		<option value="countryName">Country Name</option>
		<option value="countryProbability">Country Probability</option>
		<option value="createdAt">Created</option>
		</select>

		<select
		value={filters.order ?? ''}
		onChange={e => setFilters(f => ({ ...f, order: e.target.value }))}
		className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900"
		>
		<option value="">Order</option>
		<option value="asc">Ascending</option>
		<option value="desc">Descending</option>
		</select>
      </div>

      <div className="flex gap-3 mt-4">
        <button
          onClick={apply}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm 
                     hover:bg-blue-700 transition"
        >
          Apply Filters
        </button>
        <button
          onClick={reset}
          className="text-gray-500 px-4 py-2 rounded-lg text-sm 
                     hover:bg-gray-100 transition"
        >
          Reset
        </button>
      </div>
    </div>
  )
}