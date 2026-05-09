"use client"

import { Cpu, HardDrive, Monitor, Trash2 } from "lucide-react"

interface StatsCardsProps {
stats: {
total: number
working: number
broken: number
retired: number
}
}
export function StatsCards({
    stats,
}: StatsCardsProps) {
return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Monitor className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Total Equipment</p>
          <p className="text-2xl font-bold text-foreground">{stats.total}</p>
        </div>
      </div>
    </div>
    
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-green-100 rounded-lg">
          <Cpu className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Working</p>
          <p className="text-2xl font-bold text-green-600">{stats.working}</p>
        </div>
      </div>
    </div>
    
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-amber-100 rounded-lg">
          <HardDrive className="h-6 w-6 text-amber-600" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Broken</p>
          <p className="text-2xl font-bold text-amber-600">{stats.broken}</p>
        </div>
      </div>
    </div>
    
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-red-100 rounded-lg">
          <Trash2 className="h-6 w-6 text-red-600" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Retired</p>
          <p className="text-2xl font-bold text-red-600">{stats.retired}</p>
        </div>
      </div>
    </div>
  </div>
)
}