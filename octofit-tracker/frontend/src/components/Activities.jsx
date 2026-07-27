import { useEffect, useState } from 'react'

const codespaceEndpointTemplate =
  `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`

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

function Activities({ apiBaseUrl }) {
  const [activities, setActivities] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadActivities() {
      setIsLoading(true)
      setError('')

      try {
        void codespaceEndpointTemplate
        const response = await fetch(`${apiBaseUrl}/activities/`)
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        setActivities(normalizeCollection(payload))
      } catch (requestError) {
        const message =
          requestError instanceof Error ? requestError.message : 'Unable to load activities'
        setError(message)
      } finally {
        setIsLoading(false)
      }
    }

    loadActivities()
  }, [apiBaseUrl])

  return (
    <section className="card shadow-sm border-0 mt-3">
      <div className="card-body">
        <h2 className="h4 mb-3">Activities</h2>

        {isLoading && <p className="mb-0">Loading activities...</p>}
        {error && <div className="alert alert-danger py-2">{error}</div>}

        {!isLoading && !error && (
          <>
            <p className="text-secondary mb-3">{activities.length} activity record(s) found</p>
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle mb-0">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>User</th>
                    <th>Duration</th>
                    <th>Calories</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity) => (
                    <tr key={activity._id}>
                      <td className="text-capitalize">{activity.type}</td>
                      <td>{activity.userId?.name ?? 'Unknown user'}</td>
                      <td>{activity.durationMinutes} min</td>
                      <td>{activity.caloriesBurned}</td>
                      <td>{new Date(activity.activityDate).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Activities
