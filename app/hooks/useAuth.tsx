"use client"

import { useState } from "react"
import { mockUsers } from "../data/users"
import { User } from "../types"

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  const [loginError, setLoginError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const [loginAttempts, setLoginAttempts] = useState(0)
  const [isLocked, setIsLocked] = useState(false)
  const [lockTimer, setLockTimer] = useState(0)

  const login = async (loginId: string, password: string) => {
    if (isLocked) return false

    setIsLoading(true)
    setLoginError("")

    await new Promise((resolve) => setTimeout(resolve, 800))

    const user = mockUsers.find(
      (u) =>
        (u.email.toLowerCase() === loginId.toLowerCase() ||
          u.id.toLowerCase() === loginId.toLowerCase()) &&
        u.password === password
    )

    if (user) {
      setIsAuthenticated(true)

      setCurrentUser({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      })

      setLoginAttempts(0)
      setIsLoading(false)

      return true
    }

    const newAttempts = loginAttempts + 1
    setLoginAttempts(newAttempts)

    if (newAttempts >= 3) {
      setIsLocked(true)
      setLockTimer(30)

      const interval = setInterval(() => {
        setLockTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval)
            setIsLocked(false)
            setLoginAttempts(0)
            return 0
          }

          return prev - 1
        })
      }, 1000)
    }

    setLoginError(
      newAttempts >= 3
        ? "Too many failed attempts."
        : `Invalid credentials. ${3 - newAttempts} attempts remaining.`
    )

    setIsLoading(false)

    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    setCurrentUser(null)
  }

  return {
    isAuthenticated,
    currentUser,
    login,
    logout,
    loginError,
    isLoading,
    isLocked,
    lockTimer,
  }
}