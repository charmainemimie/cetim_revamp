"use client"
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
<div className="bg-card rounded-xl p-6 border">
<p>Total</p>
<h2>{stats.total}</h2>
</div>
<div className="bg-card rounded-xl p-6 border">
<p>Working</p>
<h2>{stats.working}</h2>
</div>
<div className="bg-card rounded-xl p-6 border">
<p>Broken</p>
<h2>{stats.broken}</h2>
</div>
<div className="bg-card rounded-xl p-6 border">
<p>Retired</p>
<h2>{stats.retired}</h2>
</div>
</div>
)
}