import { apiRequest } from '@/lib/api'
import { notFound } from 'next/navigation'
import { BackButton } from '@/components/BackButton'
import { Profile } from '@/lib/types'

export default async function ProfileDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params
  let profile: Profile

  try {
    profile = (await apiRequest(`/api/profiles/${id}`)).data
  } catch (e: unknown) {
    const err = e as { status: number }
    if (err.status === 404) notFound()
    throw e
  }

  const fields = [
	{ label: 'Name', value: profile.name },
	{ label: 'Gender', value: profile.gender },
	{ label: 'Gender Probability', value: `${(profile.gender_probability * 100).toFixed(1)}%` },
	{ label: 'Age', value: profile.age },
	{ label: 'Age Group', value: profile.age_group },
	{ label: 'Country', value: profile.country_name },
	{ label: 'Country ID', value: profile.country_id },
	{ label: 'Country Probability', value: `${(profile.country_probability * 100).toFixed(1)}%` },
	{ label: 'Created', value: new Date(profile.created_at).toLocaleDateString() },
  ]

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <BackButton />
        <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {fields.map(({ label, value }) => (
          <div
            key={label}
            className="flex justify-between px-6 py-4 border-b border-gray-100 
                       last:border-0"
          >
            <span className="text-sm text-gray-500">{label}</span>
            <span className="text-sm font-medium text-gray-900 capitalize">
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}