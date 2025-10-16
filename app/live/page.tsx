import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, TrendingUp, TrendingDown } from "lucide-react"

export default function LivePage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center gap-3">
          <div className="w-3 h-3 bg-secondary rounded-full animate-pulse" />
          <h1 className="text-4xl font-bold">Live Contest Tracker</h1>
        </div>

        {/* Live Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 border-secondary/20">
            <p className="text-sm text-muted-foreground mb-2">Active Contests</p>
            <p className="text-3xl font-bold text-secondary">8</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-2">Current Rank</p>
            <p className="text-3xl font-bold text-primary">142 / 5,280</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-2">Live Points</p>
            <p className="text-3xl font-bold">287.5</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-2">Projected Win</p>
            <p className="text-3xl font-bold text-secondary">$1,240</p>
          </Card>
        </div>

        {/* Live Lineups */}
        <Card className="p-6 mb-6">
          <h2 className="text-2xl font-bold mb-6">Your Live Lineups</h2>

          <div className="space-y-4">
            {[
              {
                contest: "MLB $100K Moonshot",
                entry: "$25",
                rank: "142 / 5,280",
                points: "287.5",
                projected: "$1,240",
                status: "In the Money",
                trend: "up",
              },
              {
                contest: "MLB $50K Slugger",
                entry: "$10",
                rank: "892 / 8,450",
                points: "245.2",
                projected: "$45",
                status: "Bubble",
                trend: "down",
              },
              {
                contest: "MLB $25K Grand Slam",
                entry: "$5",
                rank: "45 / 3,120",
                points: "312.8",
                projected: "$850",
                status: "Top 10%",
                trend: "up",
              },
            ].map((lineup, i) => (
              <div key={i} className="p-6 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold mb-1">{lineup.contest}</h3>
                    <p className="text-sm text-muted-foreground">Entry: {lineup.entry}</p>
                  </div>
                  <Badge
                    variant={
                      lineup.status === "In the Money"
                        ? "default"
                        : lineup.status === "Top 10%"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {lineup.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Current Rank</p>
                    <p className="text-lg font-bold">{lineup.rank}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Live Points</p>
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-bold text-primary">{lineup.points}</p>
                      {lineup.trend === "up" ? (
                        <TrendingUp className="w-4 h-4 text-secondary" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-destructive" />
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Projected Win</p>
                    <p className="text-lg font-bold text-secondary">{lineup.projected}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Win Probability</p>
                    <p className="text-lg font-bold">
                      {lineup.status === "In the Money" ? "78%" : lineup.status === "Top 10%" ? "92%" : "34%"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Live Games */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6">Live Games</h2>

          <div className="space-y-3">
            {[
              { home: "LAD", away: "ARI", score: "5-3", inning: "Top 7th", players: 3 },
              { home: "NYY", away: "BOS", score: "2-2", inning: "Bot 5th", players: 2 },
              { home: "ATL", away: "MIA", score: "4-1", inning: "Top 8th", players: 1 },
            ].map((game, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="font-bold">{game.away}</p>
                    <p className="text-xs text-muted-foreground">@</p>
                    <p className="font-bold">{game.home}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{game.score}</p>
                    <p className="text-xs text-muted-foreground">{game.inning}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-secondary" />
                  <p className="text-sm font-medium">{game.players} of your players</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  )
}
