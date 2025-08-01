import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getToken } from '../utils/auth.js'
import { Link, useNavigate } from 'react-router-dom'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export default function JobList() {
  const [jobs, setJobs] = useState([])
  const token = getToken()
  const navigate = useNavigate()

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/jobs`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setJobs(res.data)
    } catch (err) {
      console.error(err)
    }
  }



  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  const handleMyApplications = () =>{
    navigate('/my-applications')
  }

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>Available Jobs</h2>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleMyApplications}>My Applications</button>
      <ul>
        {jobs.map(job => (
          <li key={job._id} style={{ marginBottom: 10 }}>
            <strong>{job.title}</strong> at {job.company?.name || 'Unknown Company'}
            <br />
            <Link to={`/jobs/${job._id}/apply`}>Apply</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
