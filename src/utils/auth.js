export function getToken() {
  return localStorage.getItem('token')
}

export function setToken(token) {
  localStorage.setItem('token', token)
}

export function clearToken() {
  localStorage.removeItem('token')
}

export function getUserRole() {
  return localStorage.getItem('role')
}

export function setUserRole(role) {
  localStorage.setItem('role', role)
}

export function clearUserRole() {
  localStorage.removeItem('role')
}
