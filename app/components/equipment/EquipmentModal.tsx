"use client"
import { X } from "lucide-react"
import { Equipment } from "../../types"
interface EquipmentModalProps {
open: boolean
editingEquipment: Equipment | null
onClose: () => void
onSave: (equipment: Equipment) => void
}
export function EquipmentModal({
open,
editingEquipment,
onClose,
onSave,
}: EquipmentModalProps) {
if (!open) return null
const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
) => {
e.preventDefault()
const formData = new FormData(e.currentTarget)
const item: Equipment = {
id:
editingEquipment?.id ||
Date.now().toString(),
inventoryNo: formData.get("inventoryNo") as string,
barcode: formData.get("barcode") as string,
designation: formData.get("designation") as string,
acquisitionDate: formData.get(
"acquisitionDate"
) as string,
status: formData.get(
"status"
) as Equipment["status"],
office: formData.get("office") as string,
brand: formData.get("brand") as string,
processor: formData.get("processor") as string,
hardDrive: formData.get("hardDrive") as string,
ram: formData.get("ram") as string,
os: formData.get("os") as string,
direction: formData.get("direction") as string,
serialNumber: formData.get(
"serialNumber"
) as string,
}
onSave(item)
onClose()
}  
return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center
    p-4 z-50">
    <div className="bg-card rounded-xl p-6 w-full max-w-lg">
    <div className="flex items-center justify-between mb-4">
    <h3 className="text-lg font-bold">
    {editingEquipment
    ? "Edit Equipment"
    : "Add Equipment"}
    </h3>
    <button onClick={onClose}>
    <X className="h-5 w-5" /> 
    </button>
</div>
<form
onSubmit={handleSubmit}
className="space-y-4"
>
<input
name="inventoryNo"
defaultValue={editingEquipment?.inventoryNo}
placeholder="Inventory Number"
className="w-full border p-2 rounded"
/>
<input
name="designation"
defaultValue={editingEquipment?.designation}
placeholder="Designation"
className="w-full border p-2 rounded"
/>
<input
name="office"
defaultValue={editingEquipment?.office}
placeholder="Office"
className="w-full border p-2 rounded"
/>
<button
type="submit"
className="w-full bg-primary text-white py-2 rounded"
>
Save Equipment
</button>
</form>
</div>
</div>
)
}
