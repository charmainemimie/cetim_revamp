"use client"
import { Equipment } from "../../types"
import { RecentEquipment } from "./RecentEquipment"
import { StatsCards } from "./StatsCards"
interface DashboardProps {
stats: {
total: number
working: number
broken: number
retired: number
}
equipment: Equipment[]
}
export function Dashboard({
stats,
equipment,
}: DashboardProps) {
    return (
    <div className="space-y-6">
    <h2 className="text-2xl font-bold">
    Dashboard
    </h2>
    <StatsCards stats={stats} />
    <RecentEquipment equipment={equipment} />
    </div>
    )
    }
    