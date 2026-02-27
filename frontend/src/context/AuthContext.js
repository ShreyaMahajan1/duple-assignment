import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [refreshToken, setRefreshToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load user data from sessionStorage on mount
    const storedUser = sessionStorage.getItem('user')
    const storedToken = sessionStorage.getItem('token')
    const storedRefreshToken = sessionStorage.getItem('refreshToken')

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser))
      setToken(storedToken)
      setRefreshToken(storedRefreshToken)
    }
    setLoading(false)
  }, [])

  const login = (userData, accessToken, refreshTokenValue) => {
    setUser(userData)
    setToken(accessToken)
    setRefreshToken(refreshTokenValue)
    
    sessionStorage.setItem('user', JSON.stringify(userData))
    sessionStorage.setItem('token', accessToken)
    sessionStorage.setItem('refreshToken', refreshTokenValue)
    sessionStorage.setItem('email', userData.email)
    sessionStorage.setItem('name', userData.name)
    sessionStorage.setItem('_id', userData._id)
    sessionStorage.setItem('userType', userData.userType)
    if (userData.employeeId) {
      sessionStorage.setItem('employeeId', userData.employeeId)
    }
  }

  const logout = async () => {
    try {
      // Call logout API to invalidate refresh token
      if (refreshToken) {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/logout`, {
          refreshToken: refreshToken
        })
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Clear state and storage
      setUser(null)
      setToken(null)
      setRefreshToken(null)
      sessionStorage.clear()
    }
  }

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/refresh`, {
        refreshToken: refreshToken
      })

      if (response.data.success) {
        const newToken = response.data.token
        setToken(newToken)
        sessionStorage.setItem('token', newToken)
        return newToken
      }
    } catch (error) {
      console.error('Token refresh failed:', error)
      logout()
      return null
    }
  }

  const value = {
    user,
    token,
    refreshToken,
    loading,
    login,
    logout,
    refreshAccessToken,
    isAuthenticated: !!token
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
