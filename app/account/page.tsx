import { LogoutButton } from '@/components/LogoutButton'
import { apiRequest } from '@/lib/api'
import Image from 'next/image'

export default async function AccountPage() {
  const user = (await apiRequest('/auth/me')).data

  return (
    <div className="space-y-6 max-w-lg">
      <h1 className="text-2xl font-bold text-gray-900">Account</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 
                      flex items-center gap-4">
        {user.avatar_url && (
          <Image
            src={user.avatar_url}
            alt={user.username}
            width={64}
            height={64}
            className="rounded-full"
          />
        )}
        <div>
          <p className="font-semibold text-gray-900">{user.username}</p>
          <p className="text-sm text-gray-500">{user.email ?? "N/A"}</p>
          <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-medium
            ${user.role === 'admin' 
              ? 'bg-purple-100 text-purple-700' 
              : 'bg-gray-100 text-gray-600'}`}>
            {user.role ? user.role.toUpperCase() : "N/A"}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {[
          { label: 'Username', value: user.username },
          { label: 'Email', value: user.email ?? "N/A" },
          { label: 'Role', value: user.role ? user.role.toUpperCase() : "N/A" },
          { label: 'Member since', value: new Date(user.created_at).toLocaleDateString() },
          { label: 'Last login', value: new Date(user.last_login_at).toLocaleDateString() },
        ].map(({ label, value }) => (
          <div key={label} className="flex justify-between px-6 py-4 
                                      border-b border-gray-100 last:border-0">
            <span className="text-sm text-gray-500">{label}</span>
            <span className="text-sm font-medium text-gray-900 capitalize">{value}</span>
          </div>
        ))}
      </div>

      <LogoutButton />
    </div>
  )
}