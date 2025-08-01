import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getToken } from '../utils/auth.js'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export default function MyApplications() {
  const [applications, setApplications] = useState([])
  const token = getToken()

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/applications/my`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setApplications(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>My Applications</h2>

      <ul>
        {applications.map(app => (
          <li key={app._id} style={{ marginBottom: 10 }}>
            <strong>{app.job?.title}</strong> at {app.job?.company?.name || 'Unknown Company'}
            <br />
            Applied on: {new Date(app.appliedAt).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  )
}
