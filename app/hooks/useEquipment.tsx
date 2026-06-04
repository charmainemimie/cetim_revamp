"use client"
import { useEffect, useMemo, useState } from "react"
import { Equipment } from "../types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://cetimbackend-spring.onrender.com/api"

const mapEquipment = (item: any): Equipment => ({
  id: String(item.id),
  inventoryNo: item.inventoryNo ?? "",
  barcode: item.barcode ?? "",
  designation: item.designation ?? "",
  acquisitionDate: item.acquisitionDate ?? "",
  status: item.status ?? "Bon",
  office: item.office ?? "",
  brand: item.brand ?? "",
  processor: item.processor ?? "",
  hardDrive: item.hardDrive ?? "",
  ram: item.ram ?? "",
  os: item.os ?? "",
  direction: item.direction ?? "",
  serialNumber: item.serialNumber ?? "",
})

export function useEquipment() {
  const [equipment, setEquipment] = useState<Equipment[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadEquipment = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`${API_BASE_URL}/equipment`, {
          cache: "no-store",
        })

        if (!response.ok) {
          throw new Error("Unable to load equipment")
        }

        const data = await response.json()
        setEquipment(Array.isArray(data) ? data.map(mapEquipment) : [])
        setError(null)
      } catch (err) {
        console.error(err)
        setError("Failed to fetch equipment from backend.")
      } finally {
        setIsLoading(false)
      }
    }

    loadEquipment()
  }, [])

  const filteredEquipment = useMemo(() => {
    return equipment.filter(
      (item) =>
        item.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.inventoryNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.office.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [equipment, searchTerm])

  const stats = {
    total: equipment.length,
    working: equipment.filter((e) => e.status === "Bon").length,
    broken: equipment.filter((e) => e.status === "En panne").length,
    retired: equipment.filter((e) => e.status === "Réformé").length,
  }

  const deleteEquipment = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/equipment/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Unable to delete equipment")
      }

      setEquipment((prev) => prev.filter((e) => e.id !== id))
      setError(null)
    } catch (err) {
      console.error(err)
      setError("Failed to delete equipment.")
      throw err
    }
  }

  const saveEquipment = async (item: Equipment) => {
    try {
      const isUpdate = equipment.some((e) => e.id === item.id)
      const url = `${API_BASE_URL}/equipment${isUpdate ? `/${item.id}` : ""}`
      const response = await fetch(url, {
        method: isUpdate ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inventoryNo: item.inventoryNo,
          barcode: item.barcode,
          designation: item.designation,
          acquisitionDate: item.acquisitionDate,
          status: item.status,
          office: item.office,
          brand: item.brand,
          processor: item.processor,
          hardDrive: item.hardDrive,
          ram: item.ram,
          os: item.os,
          direction: item.direction,
          serialNumber: item.serialNumber,
        }),
      })

      if (!response.ok) {
        throw new Error("Unable to save equipment")
      }

      const data = await response.json()
      const savedItem = mapEquipment(data)

      setEquipment((prev) => {
        const exists = prev.some((e) => e.id === savedItem.id)
        if (exists) {
          return prev.map((e) => (e.id === savedItem.id ? savedItem : e))
        }
        return [...prev, savedItem]
      })
      setError(null)
    } catch (err) {
      console.error(err)
      setError("Failed to save equipment.")
      throw err
    }
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
    isLoading,
    error,
  }
}
