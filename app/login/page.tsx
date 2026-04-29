async function getGithubUrl() {
  try {
	const res = await fetch(`${process.env.API_BASE_URL}/auth/github`)
	  const data = await res.text()
	  return data
  } catch {
	return null
  }
}

export default async function LoginPage() {
  const githubUrl = await getGithubUrl()

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-xl shadow-sm text-center space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Insighta</h1>
          <p className="text-gray-500 mt-1 text-sm">Sign in to continue</p>
        </div>
        
		{githubUrl ? (
        <a  href={githubUrl}
          className="flex items-center justify-center gap-3 w-full bg-gray-900 
                     text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385..." />
          </svg>
          Continue with GitHub
        </a> ) : (
			<p className="text-sm text-red-500">Backend unavailable</p>
		)}
      </div>
    </main>
  )
}