"use client"
import { Equipment } from "../../types"
interface RecentEquipmentProps {
equipment: Equipment[]
}
export function RecentEquipment({
equipment,
}: RecentEquipmentProps) {
return (
<div className="bg-card rounded-xl border p-6">
<h3 className="text-lg font-semibold mb-4">
Recent Equipment
</h3>
<div className="space-y-3">
{equipment.slice(0, 5).map((item) => (
<div
key={item.id}
className="flex items-center justify-between p-3 border rounded-lg"
>
<div>
<p>{item.designation}</p>
<p className="text-sm text-muted-foreground">
{item.inventoryNo}
</p>
</div>
<span>{item.status}</span>
</div>
))}
</div>
</div>
)
}