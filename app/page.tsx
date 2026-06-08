"use client"
import { useState } from "react"
import { LoginForm } from "./components/auth/LoginForm"
import { Header } from "./components/layout/Header"
import { Dashboard } from "./components/dashboard/Dashboard"
import { EquipmentTable } from "./components/equipment/EquipmentTable"
import { EquipmentSearch } from "./components/equipment/EquipmentSearch"
import { EquipmentModal } from "./components/equipment/EquipmentModal"
import { AIChat } from "./components/ai/AIChat"
import { useAuth } from "./hooks/useAuth"
import { useEquipment } from "./hooks/useEquipment"
import { useAIChat } from "./hooks/useAIChat"
import { Equipment } from "./types"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog"

export default function Home() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "equipment" | "ai">("dashboard")
  const [showModal, setShowModal] = useState(false)
  const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; label: string } | null>(null)
  const auth = useAuth()
  const equipmentState = useEquipment()
  const ai = useAIChat(equipmentState.equipment, equipmentState.stats)

  if (!auth.isAuthenticated) {
    return <LoginForm />
  }

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return

    try {
      await equipmentState.deleteEquipment(deleteTarget.id)
    } catch (error) {
      console.error(error)
    } finally {
      setDeleteTarget(null)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="p-6">
        {activeTab === "dashboard" && (
          <Dashboard stats={equipmentState.stats} equipment={equipmentState.equipment} />
        )}

        {activeTab === "equipment" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Equipment</h2>
              <button onClick={() => setShowModal(true)} className="bg-primary text-white px-4 py-2 rounded-lg">
                Add Equipment
              </button>
            </div>

            <EquipmentSearch value={equipmentState.searchTerm} onChange={equipmentState.setSearchTerm} />

            {equipmentState.isLoading ? (
              <div className="rounded-xl border border-border p-4 text-center text-muted-foreground">Loading equipment...</div>
            ) : equipmentState.error ? (
              <div className="rounded-xl border border-destructive/50 bg-destructive/5 p-4 text-center text-destructive">
                {equipmentState.error}
              </div>
            ) : (
              <EquipmentTable
                equipment={equipmentState.filteredEquipment}
                onDelete={(id) => {
                  const item = equipmentState.equipment.find((entry) => entry.id === id)
                  if (item) {
                    setDeleteTarget({ id: item.id, label: item.designation })
                  }
                }}
                onEdit={(item) => {
                  setEditingEquipment(item)
                  setShowModal(true)
                }}
              />
            )}

            <AlertDialog open={Boolean(deleteTarget)} onOpenChange={(open) => { if (!open) setDeleteTarget(null) }}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete equipment?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete "{deleteTarget?.label}"? This cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteConfirm}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}

        {activeTab === "ai" && <AIChat messages={ai.messages} onSend={ai.sendMessage} />}
      </main>

      <EquipmentModal
        open={showModal}
        editingEquipment={editingEquipment}
        onClose={() => {
          setShowModal(false)
          setEditingEquipment(null)
        }}
        onSave={equipmentState.saveEquipment}
      />
    </div>
  )
}
