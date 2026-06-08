"use client";
import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Monitor,
  Bot,
  UserCheck,
  LogOut,
} from "lucide-react";
import { useUser, useClerk } from "@clerk/nextjs"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../components/ui/alert-dialog"

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: "dashboard" | "equipment" | "ai") => void;
}

export function Header({ activeTab, setActiveTab }: HeaderProps) {
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const router = useRouter()
  const { user } = useUser()
  const { signOut } = useClerk()

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push("/")
    } catch (error) {
      console.error("Sign out failed:", error)
    }
  }

  const onLogoutConfirm = () => {
    setShowLogoutModal(false)
    handleSignOut()
  }
  return (
    <header className="bg-primary text-primary-foreground px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Monitor className="h-8 w-8" />
          <h1 className="text-xl font-bold">IT Equipment Manager</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-4 py-2 rounded-lg transition ${
              activeTab === "dashboard" ? "bg-white/20" : "hover:bg-white/10"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("equipment")}
            className={`px-4 py-2 rounded-lg transition ${
              activeTab === "equipment" ? "bg-white/20" : "hover:bg-white/10"
            }`}
          >
            Equipment
          </button>
          <button
            onClick={() => setActiveTab("ai")}
            className={`px-4 py-2 rounded-lg transition flex items-center gap-2 ${
              activeTab === "ai" ? "bg-white/20" : "hover:bg-white/10"
            }`}
          >
          
            <Bot className="h-8 w-8" />
            AI Assistant
          </button>
          <div className="flex items-center gap-2">
            <UserCheck className="h-8 w-8" />
            <p className="text-sm font-medium">{user?.fullName || user?.firstName || user?.username}</p>
          </div>
          <div>
            <button 
              onClick={() => setShowLogoutModal(true)}
              className="p-2 hover:bg-white/10 rounded-lg transition" 
              title="Sign out"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <AlertDialog open={showLogoutModal} onOpenChange={setShowLogoutModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sign out?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to sign out? You will need to sign in again to access the application.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end gap-3">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onLogoutConfirm}>Sign Out</AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </header>
  );
}
