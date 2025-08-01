import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { getToken } from '../utils/auth.js'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export default function ApplyJob() {
  const { jobId } = useParams()
  const [job, setJob] = useState(null)
  const [message, setMessage] = useState('')
  const token = getToken()

  useEffect(() => {
    fetchJobDetails()
  }, [])

  const fetchJobDetails = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/jobs`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const foundJob = res.data.find(j => j._id === jobId)
      setJob(foundJob || null)
    } catch (err) {
      console.error(err)
    }
  }

  const handleApply = async () => {
    setMessage('')
    try {
      await axios.post(`${API_BASE_URL}/api/jobs/${jobId}/apply`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setMessage('Successfully applied!')
    } catch (err) {
      setMessage(err.response?.data?.error || 'Application failed')
    }
  }

  if (!job) return <p>Loading job...</p>

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>Apply for {job.title}</h2>
      <p><strong>Company:</strong> {job.company?.name}</p>
      <p><strong>Description:</strong> {job.description}</p>

      <button onClick={handleApply}>Apply</button>
      {message && <p>{message}</p>}
    </div>
  )
}
