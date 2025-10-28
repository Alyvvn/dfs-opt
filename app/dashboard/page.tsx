import { Navigation } from "@/components/navigation"
import { StatCard } from "@/components/stat-card"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, DollarSign, Target, Zap, ArrowUpRight, ArrowDownRight } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Track your performance and optimize your strategy</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Winnings"
            value="$12,847"
            change="+23.5% this month"
            changeType="positive"
            icon={DollarSign}
          />
          <StatCard title="ROI" value="18.4%" change="+2.1% vs last month" changeType="positive" icon={TrendingUp} />
          <StatCard title="Win Rate" value="42.8%" change="-1.2% vs last month" changeType="negative" icon={Target} />
          <StatCard
            title="Active Lineups"
            value="24"
            description="8 contests live now"
            changeType="neutral"
            icon={Zap}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Optimizations */}
          <Card className="lg:col-span-2 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Recent Optimizations</h2>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {[
                { sport: "MLB", slate: "Main Slate", lineups: 20, status: "Live", time: "2h ago" },
                { sport: "MLB", slate: "Afternoon", lineups: 15, status: "Completed", time: "5h ago" },
                { sport: "MLB", slate: "Night Slate", lineups: 10, status: "Pending", time: "1d ago" },
              ].map((opt, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="font-bold text-primary">{opt.sport}</span>
                    </div>
                    <div>
                      <p className="font-semibold">{opt.slate}</p>
                      <p className="text-sm text-muted-foreground">{opt.lineups} lineups generated</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        opt.status === "Live"
                          ? "bg-secondary/10 text-secondary"
                          : opt.status === "Completed"
                            ? "bg-muted text-muted-foreground"
                            : "bg-primary/10 text-primary"
                      }`}
                    >
                      {opt.status}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">{opt.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
            <div className="space-y-3">
              <Link href="/optimizer">
                <Button className="w-full justify-start" size="lg">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Build Lineup
                </Button>
              </Link>
              <Link href="/live">
                <Button className="w-full justify-start bg-transparent" variant="outline" size="lg">
                  <Zap className="w-4 h-4 mr-2" />
                  View Live Contests
                </Button>
              </Link>
              <Link href="/players">
                <Button className="w-full justify-start bg-transparent" variant="outline" size="lg">
                  <Target className="w-4 h-4 mr-2" />
                  Player Research
                </Button>
              </Link>
              <Link href="/bankroll">
                <Button className="w-full justify-start bg-transparent" variant="outline" size="lg">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Bankroll Report
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* Top Performers */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Top Performing Players (Last 7 Days)</h2>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: "Shohei Ohtani", team: "LAD", position: "DH", points: 42.5, trend: "up" },
              { name: "Aaron Judge", team: "NYY", position: "OF", points: 38.2, trend: "up" },
              { name: "Mookie Betts", team: "LAD", position: "OF", points: 35.8, trend: "down" },
            ].map((player, i) => (
              <div key={i} className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold">{player.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {player.team} • {player.position}
                    </p>
                  </div>
                  {player.trend === "up" ? (
                    <ArrowUpRight className="w-5 h-5 text-secondary" />
                  ) : (
                    <ArrowDownRight className="w-5 h-5 text-destructive" />
                  )}
                </div>
                <p className="text-2xl font-bold text-primary">{player.points} pts</p>
                <p className="text-xs text-muted-foreground mt-1">Avg per game</p>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  )
}
