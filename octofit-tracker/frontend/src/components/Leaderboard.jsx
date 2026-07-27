import { useEffect, useState } from 'react'

const codespaceEndpointTemplate =
  `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`

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

function Leaderboard({ apiBaseUrl }) {
  const [entries, setEntries] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadLeaderboard() {
      setIsLoading(true)
      setError('')

      try {
        void codespaceEndpointTemplate
        const response = await fetch(`${apiBaseUrl}/leaderboard/`)
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        setEntries(normalizeCollection(payload))
      } catch (requestError) {
        const message =
          requestError instanceof Error ? requestError.message : 'Unable to load leaderboard'
        setError(message)
      } finally {
        setIsLoading(false)
      }
    }

    loadLeaderboard()
  }, [apiBaseUrl])

  return (
    <section className="card shadow-sm border-0 mt-3">
      <div className="card-body">
        <h2 className="h4 mb-3">Leaderboard</h2>

        {isLoading && <p className="mb-0">Loading leaderboard...</p>}
        {error && <div className="alert alert-danger py-2">{error}</div>}

        {!isLoading && !error && (
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Team</th>
                  <th>Points</th>
                  <th>Period</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry._id ?? `${entry.period}-${entry.rank}`}>
                    <td>#{entry.rank}</td>
                    <td>{entry.teamId?.name ?? 'N/A'}</td>
                    <td>{entry.totalPoints}</td>
                    <td>{entry.period}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}

export default Leaderboard
