import { useEffect, useState } from 'react'

function normalizeCollection(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (payload && typeof payload === 'object') {
    if (Array.isArray(payload.items)) {
      return payload.items
    }

    if (Array.isArray(payload.results)) {
      return payload.results
    }

    if (Array.isArray(payload.data)) {
      return payload.data
    }
  }

  return []
}

function Teams({ apiBaseUrl }) {
  const [teams, setTeams] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadTeams() {
      setIsLoading(true)
      setError('')

      try {
        const response = await fetch(`${apiBaseUrl}/teams/`)
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        setTeams(normalizeCollection(payload))
      } catch (requestError) {
        const message = requestError instanceof Error ? requestError.message : 'Unable to load teams'
        setError(message)
      } finally {
        setIsLoading(false)
      }
    }

    loadTeams()
  }, [apiBaseUrl])

  return (
    <section className="card shadow-sm border-0 mt-3">
      <div className="card-body">
        <h2 className="h4 mb-3">Teams</h2>

        {isLoading && <p className="mb-0">Loading teams...</p>}
        {error && <div className="alert alert-danger py-2">{error}</div>}

        {!isLoading && !error && (
          <div className="row g-3">
            {teams.map((team) => (
              <article key={team._id ?? team.name} className="col-12 col-md-6">
                <div className="p-3 border rounded h-100 bg-body-tertiary">
                  <h3 className="h5 mb-1">{team.name}</h3>
                  <p className="text-secondary mb-2">{team.description}</p>
                  <p className="mb-1">
                    <strong>Captain:</strong> {team.captainId?.name ?? 'N/A'}
                  </p>
                  <p className="mb-0">
                    <strong>Members:</strong> {team.memberIds?.length ?? 0}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Teams
