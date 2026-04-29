'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function SearchInput({ defaultValue }: { defaultValue: string }) {
  const router = useRouter()
  const [value, setValue] = useState(defaultValue)

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (value.trim()) router.push(`/search?q=${encodeURIComponent(value)}`)
  }

  return (
    <form onSubmit={handleSearch} className="flex gap-3">
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder='Try "young males from Nigeria"'
        className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm 
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm 
                   hover:bg-blue-700 transition"
      >
        Search
      </button>
    </form>
  )
}