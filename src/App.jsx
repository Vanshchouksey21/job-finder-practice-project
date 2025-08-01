import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import JobList from './pages/JobList.jsx'
import ApplyJob from './pages/ApplyJob.jsx'
import MyApplications from './pages/MyApplications.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'

import { getToken, getUserRole } from './utils/auth.js'

function ProtectedRoute({ children, roles }) {
  const token = getToken()
  const role = getUserRole()

  if (!token || !roles.includes(role)) {
    return <Navigate to="/login" replace />
  }
  return children
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/jobs" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/jobs"
          element={
            <ProtectedRoute roles={['user', 'admin']}>
              <JobList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs/:jobId/apply"
          element={
            <ProtectedRoute roles={['user']}>
              <ApplyJob />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-applications"
          element={
            <ProtectedRoute roles={['user']}>
              <MyApplications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<h2>Page not found</h2>} />
      </Routes>
    </Router>
  )
}
