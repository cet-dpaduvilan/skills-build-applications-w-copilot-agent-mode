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

function Users({ apiBaseUrl }) {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadUsers() {
      setIsLoading(true)
      setError('')

      try {
        const response = await fetch(`${apiBaseUrl}/users/`)
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        setUsers(normalizeCollection(payload))
      } catch (requestError) {
        const message =
          requestError instanceof Error ? requestError.message : 'Unable to load users'
        setError(message)
      } finally {
        setIsLoading(false)
      }
    }

    loadUsers()
  }, [apiBaseUrl])

  return (
    <section className="card shadow-sm border-0 mt-3">
      <div className="card-body">
        <h2 className="h4 mb-3">Users</h2>

        {isLoading && <p className="mb-0">Loading users...</p>}
        {error && <div className="alert alert-danger py-2">{error}</div>}

        {!isLoading && !error && (
          <>
            <p className="text-secondary mb-3">{users.length} user(s) found</p>
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle mb-0">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Level</th>
                    <th>Weekly Goal (min)</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id ?? user.email}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td className="text-capitalize">{user.fitnessLevel}</td>
                      <td>{user.weeklyGoalMinutes}</td>
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

export default Users
