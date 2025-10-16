import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TrendingUp, TrendingDown, Filter } from "lucide-react"

export default function PlayersPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Player Insights</h1>
          <p className="text-muted-foreground">Deep analytics and projections for every player</p>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input placeholder="Search players..." className="w-full" />
            </div>
            <select className="px-4 py-2 bg-background border border-input rounded-md">
              <option>All Positions</option>
              <option>Pitcher</option>
              <option>Catcher</option>
              <option>1B</option>
              <option>2B</option>
              <option>3B</option>
              <option>SS</option>
              <option>OF</option>
            </select>
            <select className="px-4 py-2 bg-background border border-input rounded-md">
              <option>All Teams</option>
              <option>LAD</option>
              <option>NYY</option>
              <option>ATL</option>
            </select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </Card>

        {/* Player Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "Shohei Ohtani",
              team: "LAD",
              pos: "DH",
              salary: "$6,200",
              proj: "18.5",
              avg: "17.2",
              trend: "up",
              matchup: "vs ARI",
              odds: "-145",
            },
            {
              name: "Aaron Judge",
              team: "NYY",
              pos: "OF",
              salary: "$5,800",
              proj: "16.2",
              avg: "15.8",
              trend: "up",
              matchup: "vs BOS",
              odds: "-120",
            },
            {
              name: "Mookie Betts",
              team: "LAD",
              pos: "OF",
              salary: "$5,500",
              proj: "15.8",
              avg: "16.1",
              trend: "down",
              matchup: "vs ARI",
              odds: "-145",
            },
            {
              name: "Freddie Freeman",
              team: "LAD",
              pos: "1B",
              salary: "$5,200",
              proj: "14.5",
              avg: "14.2",
              trend: "up",
              matchup: "vs ARI",
              odds: "-145",
            },
            {
              name: "Juan Soto",
              team: "NYY",
              pos: "OF",
              salary: "$5,400",
              proj: "15.1",
              avg: "14.9",
              trend: "up",
              matchup: "vs BOS",
              odds: "-120",
            },
            {
              name: "Ronald Acuña Jr.",
              team: "ATL",
              pos: "OF",
              salary: "$5,600",
              proj: "16.8",
              avg: "15.5",
              trend: "up",
              matchup: "vs MIA",
              odds: "-180",
            },
          ].map((player, i) => (
            <Card key={i} className="p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-1">{player.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {player.team} • {player.pos}
                  </p>
                </div>
                {player.trend === "up" ? (
                  <TrendingUp className="w-5 h-5 text-secondary" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-destructive" />
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Salary</p>
                  <p className="text-lg font-bold">{player.salary}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Projection</p>
                  <p className="text-lg font-bold text-primary">{player.proj} pts</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Season Avg</p>
                  <p className="text-sm font-semibold">{player.avg} pts</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Matchup</p>
                  <p className="text-sm font-semibold">{player.matchup}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Moneyline</p>
                  <p className="text-sm font-bold text-secondary">{player.odds}</p>
                </div>
                <Button size="sm" variant="outline">
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
