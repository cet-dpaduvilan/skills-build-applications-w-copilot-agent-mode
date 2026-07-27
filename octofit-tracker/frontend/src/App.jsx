import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const hasCodespaceName = typeof codespaceName === 'string' && codespaceName.trim().length > 0

  const apiBaseUrl = hasCodespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api`
    : 'http://localhost:8000/api'

  return (
    <main className="app-shell container py-4 py-md-5">
      <header className="mb-4">
        <h1 className="display-6 fw-semibold mb-2">OctoFit Tracker</h1>
        <p className="text-secondary mb-0">
          React 19 presentation tier using router-driven views for users, teams, activities,
          leaderboard, and workouts.
        </p>
      </header>

      <section className="alert alert-info border-0 shadow-sm mb-4" role="status">
        <h2 className="h6 mb-2">Environment Setup</h2>
        <p className="mb-2">
          VITE_CODESPACE_NAME must be defined for Codespaces API routing, for example in
          .env.local.
        </p>
        <p className="mb-0">
          Active API base URL: <code>{apiBaseUrl}</code>
        </p>
      </section>

      <nav className="nav nav-pills gap-2 mb-3" aria-label="OctoFit sections">
        <NavLink
          to="/users"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : 'link-secondary'}`}
        >
          Users
        </NavLink>
        <NavLink
          to="/teams"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : 'link-secondary'}`}
        >
          Teams
        </NavLink>
        <NavLink
          to="/activities"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : 'link-secondary'}`}
        >
          Activities
        </NavLink>
        <NavLink
          to="/leaderboard"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : 'link-secondary'}`}
        >
          Leaderboard
        </NavLink>
        <NavLink
          to="/workouts"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : 'link-secondary'}`}
        >
          Workouts
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/users" replace />} />
        <Route path="/users" element={<Users apiBaseUrl={apiBaseUrl} />} />
        <Route path="/teams" element={<Teams apiBaseUrl={apiBaseUrl} />} />
        <Route path="/activities" element={<Activities apiBaseUrl={apiBaseUrl} />} />
        <Route path="/leaderboard" element={<Leaderboard apiBaseUrl={apiBaseUrl} />} />
        <Route path="/workouts" element={<Workouts apiBaseUrl={apiBaseUrl} />} />
      </Routes>
    </main>
  )
}

export default App
