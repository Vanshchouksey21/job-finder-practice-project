import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getToken, clearToken, clearUserRole } from '../utils/auth.js'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export default function AdminDashboard() {
  const [companyName, setCompanyName] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [jobDesc, setJobDesc] = useState('')
  const [selectedCompany, setSelectedCompany] = useState('')
  const [message, setMessage] = useState('')
  const [companies,setCompanies] = useState([]);

  const token = getToken()
  const headers = { Authorization: `Bearer ${token}` }

  // For simplicity, company list fetching omitted, can add if needed
  useEffect(()=>{
    handleGetCompanies();
  },[companyName])
  


  const handleCreateCompany = async (e) => {
    e.preventDefault()
    setMessage('')
    try {
      const res = await axios.post(`${API_BASE_URL}/api/companies`, { name: companyName }, { headers })
      setMessage(`Company created: ${res.data.name}`)
      setCompanyName('')
    } catch (err) {
      setMessage(err.response?.data?.error || 'Error creating company')
    }
  }

  const handleGetCompanies = async() => {
    try{
      const res = await axios.get(`${API_BASE_URL}/api/companies`,{ headers });
      const data = res?.data;
      setCompanies(data);
    }catch{
      alert("Companies api failed");
    }
  }

  const handleCreateJob = async (e) => {
    e.preventDefault()
    setMessage('')
    if (!selectedCompany) {
      setMessage('Please select a company or create one first.')
      return
    }
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/jobs`,
        { title: jobTitle, description: jobDesc, company: selectedCompany },
        { headers }
      )
      setMessage(`Job created: ${res.data.title}`)
      setJobTitle('')
      setJobDesc('')
    } catch (err) {
      setMessage(err.response?.data?.error || 'Error creating job')
    }
  }

  const handleLogout = () => {
    clearToken()
    clearUserRole()
    window.location.href = '/login'
  }

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>Admin Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>

      <section>
        <h3>Create Company</h3>
        <form onSubmit={handleCreateCompany}>
          <input
            type="text"
            value={companyName}
            onChange={e => setCompanyName(e.target.value)}
            placeholder="Company Name"
            required
          />
          <button type="submit">Create</button>
        </form>
      </section>

      <section style={{ marginTop: 20 }}>
        <h3>Create Job</h3>
        <form onSubmit={handleCreateJob}>
          <select value={selectedCompany} onChange={e => setSelectedCompany(e.target.value)} required>
            {companies.map((company)=>{
              return < option key={company?._id} value={company?._id}>{company?.name}</option>
            })}
          </select>
          <br />
          <input
            type="text"
            value={jobTitle}
            onChange={e => setJobTitle(e.target.value)}
            placeholder="Job Title"
            required
          />
          <br />
          <textarea
            value={jobDesc}
            onChange={e => setJobDesc(e.target.value)}
            placeholder="Job Description"
          />
          <br />
          <button type="submit">Create Job</button>
        </form>
      </section>

      {message && <p>{message}</p>}
    </div>
  )
}
