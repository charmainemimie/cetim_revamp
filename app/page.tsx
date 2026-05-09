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
export default function Home() {
const [activeTab, setActiveTab] = useState<
"dashboard" | "equipment" | "ai"
>("dashboard")
const [showModal, setShowModal] = useState(false)
const [editingEquipment, setEditingEquipment] =
useState<Equipment | null>(null)
const auth = useAuth()
const equipmentState = useEquipment()
const ai = useAIChat(
equipmentState.equipment,
equipmentState.stats
)
if (!auth.isAuthenticated) {
return (
<LoginForm
onLogin={auth.login}
isLoading={auth.isLoading}
loginError={auth.loginError}
isLocked={auth.isLocked}
lockTimer={auth.lockTimer}
/>
)
}
return (
  <div className="min-h-screen bg-background">
  <Header
  currentUser={auth.currentUser}
  activeTab={activeTab}
  setActiveTab={setActiveTab}
  onLogout={auth.logout}
  />
  <main className="p-6">
  {activeTab === "dashboard" && (
  <Dashboard
  stats={equipmentState.stats}
  equipment={equipmentState.equipment}
  />
)}
{activeTab === "equipment" && (
<div className="space-y-6">
<div className="flex items-center justify-between">
<h2 className="text-2xl font-bold">
Equipment
</h2>
<button
onClick={() => setShowModal(true)}
className="bg-primary text-white px-4 py-2 rounded-lg"
>
Add Equipment
</button>
</div>
<EquipmentSearch
value={equipmentState.searchTerm}
onChange={
equipmentState.setSearchTerm
}
/>
<EquipmentTable
equipment={
equipmentState.filteredEquipment
}
onDelete={
equipmentState.deleteEquipment
}
onEdit={(item) => {
setEditingEquipment(item)
setShowModal(true)
}}
/>
</div>
)}
{activeTab === "ai" && (
<AIChat
messages={ai.messages}
onSend={ai.sendMessage}
/>
)}
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