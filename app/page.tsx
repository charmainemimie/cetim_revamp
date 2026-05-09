"use client"

import { useState } from "react"
import { Monitor, HardDrive, Cpu, Search, Plus, Trash2, Edit, X, Bot, Send } from "lucide-react"

interface Equipment {
  id: string
  inventoryNo: string
  barcode: string
  designation: string
  acquisitionDate: string
  status: "Bon" | "En panne" | "Réformé"
  office: string
  brand: string
  processor: string
  hardDrive: string
  ram: string
  os: string
  direction: string
  serialNumber: string
}

const initialEquipment: Equipment[] = [
  {
    id: "1",
    inventoryNo: "F5000005",
    barcode: "F5000005",
    designation: "ONDULEUR TRIP LITE",
    acquisitionDate: "1999-05-30",
    status: "Réformé",
    office: "B2-09",
    brand: "Trip Lite",
    processor: "-",
    hardDrive: "-",
    ram: "-",
    os: "-",
    direction: "DSI",
    serialNumber: "TL-99-001"
  },
  {
    id: "2",
    inventoryNo: "F5000011",
    barcode: "F5000011",
    designation: "Onduleur APC",
    acquisitionDate: "1999-10-13",
    status: "Réformé",
    office: "D2-06",
    brand: "APC",
    processor: "-",
    hardDrive: "-",
    ram: "-",
    os: "-",
    direction: "DRH",
    serialNumber: "APC-99-002"
  },
  {
    id: "3",
    inventoryNo: "F5000102",
    barcode: "F5000102",
    designation: "PC Bureau Dell OptiPlex",
    acquisitionDate: "2022-03-15",
    status: "Bon",
    office: "A1-01",
    brand: "Dell",
    processor: "Intel i5-12400",
    hardDrive: "512GB SSD",
    ram: "16GB",
    os: "Windows 11",
    direction: "DSI",
    serialNumber: "DELL-2022-001"
  },
  {
    id: "4",
    inventoryNo: "F5000103",
    barcode: "F5000103",
    designation: "Laptop HP ProBook",
    acquisitionDate: "2023-01-20",
    status: "Bon",
    office: "B1-03",
    brand: "HP",
    processor: "Intel i7-1260P",
    hardDrive: "1TB SSD",
    ram: "32GB",
    os: "Windows 11",
    direction: "Finance",
    serialNumber: "HP-2023-015"
  },
  {
    id: "5",
    inventoryNo: "F5000104",
    barcode: "F5000104",
    designation: "Imprimante HP LaserJet",
    acquisitionDate: "2021-06-10",
    status: "En panne",
    office: "C2-05",
    brand: "HP",
    processor: "-",
    hardDrive: "-",
    ram: "-",
    os: "-",
    direction: "Marketing",
    serialNumber: "HP-LJ-2021-008"
  }
]

export default function Home() {
  const [equipment, setEquipment] = useState<Equipment[]>(initialEquipment)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState<"dashboard" | "equipment" | "ai">("dashboard")
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(null)
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    { role: "assistant", content: "Bonjour! Je suis votre assistant IT. Comment puis-je vous aider avec la gestion de vos équipements?" }
  ])
  const [chatInput, setChatInput] = useState("")

  const filteredEquipment = equipment.filter(item =>
    item.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.inventoryNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.office.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const stats = {
    total: equipment.length,
    working: equipment.filter(e => e.status === "Bon").length,
    broken: equipment.filter(e => e.status === "En panne").length,
    retired: equipment.filter(e => e.status === "Réformé").length
  }

  const handleDelete = (id: string) => {
    setEquipment(equipment.filter(e => e.id !== id))
  }

  const handleAIChat = () => {
    if (!chatInput.trim()) return
    
    const userMessage = chatInput
    setChatMessages(prev => [...prev, { role: "user", content: userMessage }])
    setChatInput("")

    setTimeout(() => {
      let response = ""
      const lowerInput = userMessage.toLowerCase()
      
      if (lowerInput.includes("combien") || lowerInput.includes("total")) {
        response = `Vous avez ${stats.total} équipements au total: ${stats.working} en bon état, ${stats.broken} en panne, et ${stats.retired} réformés.`
      } else if (lowerInput.includes("panne") || lowerInput.includes("broken")) {
        const broken = equipment.filter(e => e.status === "En panne")
        response = broken.length > 0 
          ? `Il y a ${broken.length} équipement(s) en panne: ${broken.map(e => e.designation).join(", ")}`
          : "Aucun équipement n'est actuellement en panne."
      } else if (lowerInput.includes("réformé") || lowerInput.includes("retired")) {
        const retired = equipment.filter(e => e.status === "Réformé")
        response = `Il y a ${retired.length} équipement(s) réformés.`
      } else if (lowerInput.includes("bureau") || lowerInput.includes("office")) {
        const offices = [...new Set(equipment.map(e => e.office))]
        response = `Les équipements sont répartis dans ${offices.length} bureaux: ${offices.join(", ")}`
      } else {
        response = "Je peux vous aider avec: le nombre total d'équipements, les équipements en panne, les équipements réformés, ou la répartition par bureau."
      }
      
      setChatMessages(prev => [...prev, { role: "assistant", content: response }])
    }, 500)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Monitor className="h-8 w-8" />
            <h1 className="text-xl font-bold">IT Equipment Manager</h1>
          </div>
          <nav className="flex gap-2">
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
              <Bot className="h-4 w-4" />
              AI Assistant
            </button>
          </nav>
        </div>
      </header>

      <main className="p-6">
        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Monitor className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Equipment</p>
                    <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Cpu className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Working</p>
                    <p className="text-2xl font-bold text-green-600">{stats.working}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-amber-100 rounded-lg">
                    <HardDrive className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Broken</p>
                    <p className="text-2xl font-bold text-amber-600">{stats.broken}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <Trash2 className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Retired</p>
                    <p className="text-2xl font-bold text-red-600">{stats.retired}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Recent Equipment</h3>
              <div className="space-y-3">
                {equipment.slice(0, 5).map(item => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">{item.designation}</p>
                      <p className="text-sm text-muted-foreground">{item.inventoryNo} - {item.office}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      item.status === "Bon" ? "bg-green-100 text-green-700" :
                      item.status === "En panne" ? "bg-amber-100 text-amber-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Equipment Tab */}
        {activeTab === "equipment" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Equipment List</h2>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition"
              >
                <Plus className="h-4 w-4" />
                Add Equipment
              </button>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name, inventory number, or office..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Inventory No</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Designation</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Office</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Brand</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEquipment.map(item => (
                    <tr key={item.id} className="border-t border-border hover:bg-muted/30">
                      <td className="px-4 py-3 text-sm text-foreground">{item.inventoryNo}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{item.designation}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{item.office}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          item.status === "Bon" ? "bg-green-100 text-green-700" :
                          item.status === "En panne" ? "bg-amber-100 text-amber-700" :
                          "bg-red-100 text-red-700"
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-foreground">{item.brand}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingEquipment(item)}
                            className="p-2 hover:bg-muted rounded-lg transition"
                          >
                            <Edit className="h-4 w-4 text-primary" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 hover:bg-muted rounded-lg transition"
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* AI Assistant Tab */}
        {activeTab === "ai" && (
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-foreground">AI Assistant</h2>
            
            <div className="bg-card rounded-xl border border-border h-[500px] flex flex-col">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] p-3 rounded-lg ${
                      msg.role === "user" 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted text-foreground"
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAIChat()}
                    placeholder="Ask about your equipment..."
                    className="flex-1 px-4 py-2 bg-muted rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    onClick={handleAIChat}
                    className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Add/Edit Modal */}
      {(showAddModal || editingEquipment) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-foreground">
                {editingEquipment ? "Edit Equipment" : "Add Equipment"}
              </h3>
              <button
                onClick={() => { setShowAddModal(false); setEditingEquipment(null) }}
                className="p-2 hover:bg-muted rounded-lg transition"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                const newEquipment: Equipment = {
                  id: editingEquipment?.id || Date.now().toString(),
                  inventoryNo: formData.get("inventoryNo") as string,
                  barcode: formData.get("barcode") as string,
                  designation: formData.get("designation") as string,
                  acquisitionDate: formData.get("acquisitionDate") as string,
                  status: formData.get("status") as Equipment["status"],
                  office: formData.get("office") as string,
                  brand: formData.get("brand") as string,
                  processor: formData.get("processor") as string,
                  hardDrive: formData.get("hardDrive") as string,
                  ram: formData.get("ram") as string,
                  os: formData.get("os") as string,
                  direction: formData.get("direction") as string,
                  serialNumber: formData.get("serialNumber") as string,
                }
                
                if (editingEquipment) {
                  setEquipment(equipment.map(e => e.id === editingEquipment.id ? newEquipment : e))
                } else {
                  setEquipment([...equipment, newEquipment])
                }
                
                setShowAddModal(false)
                setEditingEquipment(null)
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Inventory No</label>
                  <input
                    name="inventoryNo"
                    defaultValue={editingEquipment?.inventoryNo}
                    required
                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Barcode</label>
                  <input
                    name="barcode"
                    defaultValue={editingEquipment?.barcode}
                    required
                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Designation</label>
                <input
                  name="designation"
                  defaultValue={editingEquipment?.designation}
                  required
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Acquisition Date</label>
                  <input
                    name="acquisitionDate"
                    type="date"
                    defaultValue={editingEquipment?.acquisitionDate}
                    required
                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Status</label>
                  <select
                    name="status"
                    defaultValue={editingEquipment?.status || "Bon"}
                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Bon">Bon</option>
                    <option value="En panne">En panne</option>
                    <option value="Réformé">Réformé</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Office</label>
                  <input
                    name="office"
                    defaultValue={editingEquipment?.office}
                    required
                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Brand</label>
                  <input
                    name="brand"
                    defaultValue={editingEquipment?.brand}
                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Processor</label>
                  <input
                    name="processor"
                    defaultValue={editingEquipment?.processor}
                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Hard Drive</label>
                  <input
                    name="hardDrive"
                    defaultValue={editingEquipment?.hardDrive}
                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">RAM</label>
                  <input
                    name="ram"
                    defaultValue={editingEquipment?.ram}
                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">OS</label>
                  <input
                    name="os"
                    defaultValue={editingEquipment?.os}
                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Direction</label>
                  <input
                    name="direction"
                    defaultValue={editingEquipment?.direction}
                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Serial Number</label>
                  <input
                    name="serialNumber"
                    defaultValue={editingEquipment?.serialNumber}
                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => { setShowAddModal(false); setEditingEquipment(null) }}
                  className="flex-1 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
                >
                  {editingEquipment ? "Update" : "Add"} Equipment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
