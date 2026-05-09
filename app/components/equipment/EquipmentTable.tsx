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
                  {equipment.map(item => (
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
                            onClick={() => onEdit(item)}
                            className="p-2 hover:bg-muted rounded-lg transition"
                          >
                            <Edit className="h-4 w-4 text-primary" />
                          </button>
                          <button
                            onClick={() => onDelete(item.id)}
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
)
}