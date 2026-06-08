"use client"

import { useState, useEffect } from "react"
import { User } from "../types"
import { useUser, useClerk } from "@clerk/nextjs" // Changed SignedOut to useClerk

export function useAuth() {
  const { isSignedIn, user } = useUser()
  const { signOut } = useClerk() // Access the official programmatic sign-out method

  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState("")

  const [loginAttempts, setLoginAttempts] = useState(0)
  const [isLocked, setIsLocked] = useState(false)
  const [lockTimer, setLockTimer] = useState(0)

  useEffect(() => {
    let interval: number | undefined
    if (isLocked) {
      interval = window.setInterval(() => {
        setLockTimer((prev) => {
          if (prev <= 1) {
            window.clearInterval(interval)
            setIsLocked(false)
            setLoginAttempts(0)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => window.clearInterval(interval)
  }, [isLocked])

  const login = async (_loginId: string, _password: string) => {
    // Keeping your signature interface clean for existing login callers
    setIsLoading(false)
    setLoginError("")
    return false
  }

  const logout = async () => {
    setIsLoading(true)
    try {
      // Correctly invokes Clerk sign out and optionally redirects
      await signOut({ redirectUrl: "/" }) 
    } catch (error) {
      console.error("Failed to log out:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Safe mapping to your local User interface type
  const currentUser: User | null = user
    ? {
        id: user.id,
        name: user.fullName || user.firstName || user.username || "",
        // Corrected primaryEmailAddress handling
        email: user.primaryEmailAddress?.emailAddress || user.emailAddresses?.[0]?.emailAddress || "",
        role: "user",
      }
    : null

  return {
    isAuthenticated: !!isSignedIn,
    currentUser,
    login,
    logout,
    loginError,
    isLoading,
    isLocked,
    lockTimer,
  }
}