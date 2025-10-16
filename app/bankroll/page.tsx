import { Navigation } from "@/components/navigation"
import { StatCard } from "@/components/stat-card"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DollarSign, TrendingUp, Target, PieChart, Download } from "lucide-react"

export default function BankrollPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Bankroll Manager</h1>
          <p className="text-muted-foreground">Track your performance and manage your betting bankroll</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Current Bankroll"
            value="$8,450"
            change="+$1,240 this week"
            changeType="positive"
            icon={DollarSign}
          />
          <StatCard
            title="Total Profit"
            value="$12,847"
            change="+23.5% all-time"
            changeType="positive"
            icon={TrendingUp}
          />
          <StatCard title="ROI" value="18.4%" change="+2.1% vs last month" changeType="positive" icon={Target} />
          <StatCard
            title="Win Rate"
            value="42.8%"
            description="156 wins / 365 entries"
            changeType="neutral"
            icon={PieChart}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Performance Chart */}
          <Card className="lg:col-span-2 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Performance Over Time</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  7D
                </Button>
                <Button variant="outline" size="sm">
                  30D
                </Button>
                <Button variant="outline" size="sm">
                  90D
                </Button>
                <Button variant="default" size="sm">
                  All
                </Button>
              </div>
            </div>

            <div className="h-64 flex items-end justify-between gap-2">
              {[45, 52, 48, 65, 58, 72, 68, 75, 82, 78, 88, 92].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-primary rounded-t transition-all hover:bg-primary/80"
                    style={{ height: `${height}%` }}
                  />
                  <p className="text-xs text-muted-foreground">{i + 1}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Bankroll Breakdown */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Bankroll Breakdown</h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium">DFS Contests</p>
                  <p className="text-sm font-bold">$5,200</p>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: "62%" }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium">Sports Betting</p>
                  <p className="text-sm font-bold">$2,450</p>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-secondary" style={{ width: "29%" }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium">Reserve</p>
                  <p className="text-sm font-bold">$800</p>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-muted-foreground" style={{ width: "9%" }} />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground mb-2">Recommended Allocation</p>
              <p className="text-xs text-muted-foreground">
                Based on your risk profile and historical performance, we recommend keeping 60% in DFS, 30% in sports
                betting, and 10% in reserve.
              </p>
            </div>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Recent Transactions</h2>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 font-semibold text-sm">Date</th>
                  <th className="text-left py-3 px-2 font-semibold text-sm">Contest</th>
                  <th className="text-left py-3 px-2 font-semibold text-sm">Type</th>
                  <th className="text-right py-3 px-2 font-semibold text-sm">Entry</th>
                  <th className="text-right py-3 px-2 font-semibold text-sm">Winnings</th>
                  <th className="text-right py-3 px-2 font-semibold text-sm">Profit</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    date: "Today",
                    contest: "MLB $100K Moonshot",
                    type: "DFS",
                    entry: "$25",
                    win: "$1,240",
                    profit: "+$1,215",
                  },
                  { date: "Today", contest: "MLB $50K Slugger", type: "DFS", entry: "$10", win: "$45", profit: "+$35" },
                  {
                    date: "Yesterday",
                    contest: "MLB Parlay (3-leg)",
                    type: "Betting",
                    entry: "$50",
                    win: "$0",
                    profit: "-$50",
                  },
                  {
                    date: "Yesterday",
                    contest: "MLB $25K Grand Slam",
                    type: "DFS",
                    entry: "$5",
                    win: "$850",
                    profit: "+$845",
                  },
                  {
                    date: "2 days ago",
                    contest: "MLB Moneyline",
                    type: "Betting",
                    entry: "$100",
                    win: "$180",
                    profit: "+$80",
                  },
                ].map((tx, i) => (
                  <tr key={i} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-2 text-muted-foreground">{tx.date}</td>
                    <td className="py-3 px-2 font-medium">{tx.contest}</td>
                    <td className="py-3 px-2">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          tx.type === "DFS" ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"
                        }`}
                      >
                        {tx.type}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right">{tx.entry}</td>
                    <td className="py-3 px-2 text-right font-semibold">{tx.win}</td>
                    <td
                      className={`py-3 px-2 text-right font-bold ${
                        tx.profit.startsWith("+") ? "text-secondary" : "text-destructive"
                      }`}
                    >
                      {tx.profit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  )
}
