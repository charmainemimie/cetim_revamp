"use client"
import { Search } from "lucide-react"
interface EquipmentSearchProps {
value: string
onChange: (value: string) => void
}
export function EquipmentSearch({
value,
onChange,
}: EquipmentSearchProps) {
return (
<div className="relative">
<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5" />
<input
type="text"
value={value}
onChange={(e) => onChange(e.target.value)}
placeholder="Search equipment..."
className="w-full pl-10 pr-4 py-3 border rounded-lg"
/>
</div>
)}