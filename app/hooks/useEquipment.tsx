"use client"
import { useMemo, useState } from "react"
import { Equipment } from "../types"
import { initialEquipment } from "../data/equipment"
export function useEquipment() {
const [equipment, setEquipment] =
useState<Equipment[]>(initialEquipment)
const [searchTerm, setSearchTerm] = useState("")
const filteredEquipment = useMemo(() => {
return equipment.filter(
(item) =>
item.designation
.toLowerCase()
.includes(searchTerm.toLowerCase()) ||
item.inventoryNo
.toLowerCase()
.includes(searchTerm.toLowerCase()) ||
item.office
.toLowerCase()
.includes(searchTerm.toLowerCase())
)
}, [equipment, searchTerm])
const stats = {
    total: equipment.length,
working: equipment.filter((e) => e.status === "Bon").length,
broken: equipment.filter((e) => e.status === "En panne").length,
retired: equipment.filter((e) => e.status === "Réformé").length,
}
const deleteEquipment = (id: string) => {
setEquipment((prev) => prev.filter((e) => e.id !== id))
}
const saveEquipment = (item: Equipment) => {
setEquipment((prev) => {
const exists = prev.find((e) => e.id === item.id)
if (exists) {
return prev.map((e) =>
e.id === item.id ? item : e
)
}
return [...prev, item]
})
}
return {
equipment,
setEquipment,
searchTerm,
setSearchTerm,
filteredEquipment,
stats,
deleteEquipment,
saveEquipment,
}
}
