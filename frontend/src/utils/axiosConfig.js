import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000'

// Create axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL
})

// Request interceptor to add token
axiosInstance.interceptors.request.use(
  (config) => {
    // Check for both admin and employee tokens
    const adminToken = sessionStorage.getItem('token')
    const empToken = sessionStorage.getItem('Emptoken')
    
    const token = adminToken || empToken
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // If error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = sessionStorage.getItem('refreshToken')
        
        if (!refreshToken) {
          // No refresh token, redirect to login
          sessionStorage.clear()
          window.location.href = '/'
          return Promise.reject(error)
        }

        // Try to refresh the token
        const response = await axios.post(`${BASE_URL}/auth/refresh`, {
          refreshToken: refreshToken
        })

        if (response.data.success) {
          const newToken = response.data.token
          sessionStorage.setItem('token', newToken)
          
          // Retry the original request with new token
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`
          return axiosInstance(originalRequest)
        }
      } catch (refreshError) {
        // Refresh failed, clear session and redirect to login
        sessionStorage.clear()
        window.location.href = '/'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
