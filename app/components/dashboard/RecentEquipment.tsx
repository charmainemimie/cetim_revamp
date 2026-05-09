"use client"
import { Equipment } from "../../types"
interface RecentEquipmentProps {
equipment: Equipment[]
}
export function RecentEquipment({
equipment,
}: RecentEquipmentProps) {
return (
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
)
}