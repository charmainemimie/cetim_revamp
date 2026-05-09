"use client"
import { Edit, Trash2 } from "lucide-react"
import { Equipment } from "../../types"
interface EquipmentTableProps {
equipment: Equipment[]
onEdit: (item: Equipment) => void
onDelete: (id: string) => void
}
export function EquipmentTable({
equipment,
onEdit,
onDelete,
}: EquipmentTableProps) {
return (
<div className="bg-card rounded-xl border overflow-hidden">
<table className="w-full">
<thead>
<tr>
<th>Inventory</th>
<th>Designation</th>
<th>Office</th>
<th>Status</th>
<th>Actions</th>
</tr>
</thead>
<tbody>
{equipment.map((item) => (
<tr key={item.id}>
<td>{item.inventoryNo}</td>
<td>{item.designation}</td>
<td>{item.office}</td>
<td>{item.status}</td>
<td>
<div className="flex gap-2">
<button
onClick={() => onEdit(item)}
>
<Edit className="h-4 w-4" />
</button>
<button
onClick={() => onDelete(item.id)}
>
<Trash2 className="h-4 w-4" />
</button>
</div>
</td>
</tr>
))}
</tbody>
</table>
</div>
)
}