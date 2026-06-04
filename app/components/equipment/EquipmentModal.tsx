"use client"
import { type FormEvent } from "react"
import { X } from "lucide-react"
import { Equipment } from "../../types"
interface EquipmentModalProps {
  open: boolean
  editingEquipment: Equipment | null
  onClose: () => void
  onSave: (equipment: Equipment) => Promise<void> | void
}
export function EquipmentModal({
  open,
  editingEquipment,
  onClose,
  onSave,
}: EquipmentModalProps) {
  if (!open) return null

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const item: Equipment = {
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

    await onSave(item)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-xl p-6 w-full max-w-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">
            {editingEquipment ? "Edit Equipment" : "Add Equipment"}
          </h3>
          <button onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
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

          <button type="submit" className="w-full bg-primary text-white py-2 rounded">
            Save Equipment
          </button>
        </form>
      </div>
    </div>
  )
}
