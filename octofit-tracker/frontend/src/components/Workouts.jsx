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

function Workouts({ apiBaseUrl }) {
  const [workouts, setWorkouts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadWorkouts() {
      setIsLoading(true)
      setError('')

      try {
        const response = await fetch(`${apiBaseUrl}/workouts/`)
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        setWorkouts(normalizeCollection(payload))
      } catch (requestError) {
        const message =
          requestError instanceof Error ? requestError.message : 'Unable to load workouts'
        setError(message)
      } finally {
        setIsLoading(false)
      }
    }

    loadWorkouts()
  }, [apiBaseUrl])

  return (
    <section className="card shadow-sm border-0 mt-3">
      <div className="card-body">
        <h2 className="h4 mb-3">Workouts</h2>

        {isLoading && <p className="mb-0">Loading workouts...</p>}
        {error && <div className="alert alert-danger py-2">{error}</div>}

        {!isLoading && !error && (
          <div className="row g-3">
            {workouts.map((workout) => (
              <article key={workout._id ?? workout.title} className="col-12 col-lg-6">
                <div className="p-3 border rounded h-100 bg-body-tertiary">
                  <h3 className="h5 mb-1">{workout.title}</h3>
                  <p className="mb-1 text-secondary">
                    {workout.focus} • {workout.durationMinutes} min
                  </p>
                  <p className="mb-2 text-capitalize">Difficulty: {workout.difficulty}</p>
                  <p className="mb-1">
                    <strong>Equipment:</strong> {(workout.equipment ?? []).join(', ') || 'None'}
                  </p>
                  <p className="mb-0">
                    <strong>Tags:</strong> {(workout.tags ?? []).join(', ') || 'None'}
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

export default Workouts
