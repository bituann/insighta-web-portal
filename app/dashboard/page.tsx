import { apiRequest } from '@/lib/api'
import { Profile } from '@/lib/types'
import { Users, Globe, UserCheck } from 'lucide-react'

async function getProfiles() {
  return apiRequest('/api/profiles?limit=50&page=1')
}

function computeMetrics(profiles: Profile[]) {
  const total = profiles.length
  const male = profiles.filter(p => p.gender === 'male').length
  const female = profiles.filter(p => p.gender === 'female').length

  const countryCounts = profiles.reduce((acc, p) => {
    acc[p.country_name] = (acc[p.country_name] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const topCountry = Object.entries(countryCounts)
    .sort(([, a], [, b]) => (b as number) - (a as number))[0]

  return { total, male, female, topCountry: topCountry?.[0] ?? 'N/A' }
}

export default async function DashboardPage() {
  const data = await getProfiles()
  const profiles = data.data ?? []
  const { total, male, female, topCountry } = computeMetrics(profiles)

  const stats = [
    { label: 'Total Profiles', value: total, icon: Users },
    { label: 'Male', value: male, icon: UserCheck },
    { label: 'Female', value: female, icon: UserCheck },
    { label: 'Top Country', value: topCountry, icon: Globe },
  ]

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="bg-white rounded-xl p-6 shadow-sm 
                                      border border-gray-100 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">{label}</p>
              <Icon className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}