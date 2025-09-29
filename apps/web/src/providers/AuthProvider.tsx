import React, { createContext, useContext, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { type AuthUser } from '@sibea/shared'

interface AuthContextType {
  user: AuthUser | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  refetch: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

async function fetchCurrentUser(): Promise<AuthUser | null> {
  const token = localStorage.getItem('accessToken')
  if (!token) return null

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('accessToken')
      }
      return null
    }

    return response.json()
  } catch {
    return null
  }
}

async function loginUser(email: string, password: string): Promise<{ accessToken: string }> {
  try {
    console.log('Attempting login to:', `${import.meta.env.VITE_API_URL}/auth/login`)
    
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important for httpOnly cookies
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network error' }))
      throw new Error(error.message || `HTTP ${response.status}: ${response.statusText}`)
    }

    return response.json()
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Tidak dapat terhubung ke server. Pastikan API server berjalan di http://localhost:3000')
    }
    throw error
  }
}

async function logoutUser(): Promise<void> {
  const token = localStorage.getItem('accessToken')
  if (!token) return

  try {
    await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    })
  } catch {
    // Ignore logout errors
  } finally {
    localStorage.removeItem('accessToken')
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem('accessToken')
  )

  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['currentUser', accessToken],
    queryFn: fetchCurrentUser,
    enabled: !!accessToken,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  useEffect(() => {
    // Try to refresh token on app start
    const token = localStorage.getItem('accessToken')
    if (token) {
      setAccessToken(token)
    }
  }, [])

  const login = async (email: string, password: string) => {
    const { accessToken: newToken } = await loginUser(email, password)
    localStorage.setItem('accessToken', newToken)
    setAccessToken(newToken)
  }

  const logout = async () => {
    await logoutUser()
    setAccessToken(null)
  }

  const value: AuthContextType = {
    user: user || null,
    isLoading: isLoading && !!accessToken,
    login,
    logout,
    refetch,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

