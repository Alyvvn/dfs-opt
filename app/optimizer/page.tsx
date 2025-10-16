import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { TrendingUp, Settings, Zap, Download } from "lucide-react"

export default function OptimizerPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Lineup Optimizer</h1>
          <p className="text-muted-foreground">
            Build optimal lineups with advanced correlation and ownership analysis
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Settings Panel */}
          <Card className="lg:col-span-1 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Settings className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">Settings</h2>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="sport">Sport</Label>
                <select id="sport" className="w-full mt-1.5 px-3 py-2 bg-background border border-input rounded-md">
                  <option>MLB</option>
                  <option disabled>NFL (Coming Soon)</option>
                  <option disabled>NBA (Coming Soon)</option>
                </select>
              </div>

              <div>
                <Label htmlFor="slate">Slate</Label>
                <select id="slate" className="w-full mt-1.5 px-3 py-2 bg-background border border-input rounded-md">
                  <option>Main Slate</option>
                  <option>Afternoon</option>
                  <option>Night Games</option>
                </select>
              </div>

              <div>
                <Label htmlFor="lineups">Number of Lineups</Label>
                <Input id="lineups" type="number" defaultValue="20" className="mt-1.5" />
              </div>

              <div>
                <Label>Projection Weight</Label>
                <Slider defaultValue={[75]} max={100} step={1} className="mt-3" />
                <p className="text-xs text-muted-foreground mt-2">75% - Balanced</p>
              </div>

              <div>
                <Label>Ownership Sensitivity</Label>
                <Slider defaultValue={[50]} max={100} step={1} className="mt-3" />
                <p className="text-xs text-muted-foreground mt-2">50% - Medium</p>
              </div>

              <div>
                <Label>Variance</Label>
                <Slider defaultValue={[60]} max={100} step={1} className="mt-3" />
                <p className="text-xs text-muted-foreground mt-2">60% - Moderate</p>
              </div>

              <Button className="w-full" size="lg">
                <Zap className="w-4 h-4 mr-2" />
                Generate Lineups
              </Button>
            </div>
          </Card>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Player Pool */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Player Pool</h2>
                <div className="flex items-center gap-2">
                  <Input placeholder="Search players..." className="w-64" />
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Import
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-2 font-semibold text-sm">Player</th>
                      <th className="text-left py-3 px-2 font-semibold text-sm">Pos</th>
                      <th className="text-left py-3 px-2 font-semibold text-sm">Team</th>
                      <th className="text-right py-3 px-2 font-semibold text-sm">Salary</th>
                      <th className="text-right py-3 px-2 font-semibold text-sm">Proj</th>
                      <th className="text-right py-3 px-2 font-semibold text-sm">Own%</th>
                      <th className="text-right py-3 px-2 font-semibold text-sm">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        name: "Shohei Ohtani",
                        pos: "DH",
                        team: "LAD",
                        salary: "$6,200",
                        proj: "18.5",
                        own: "32%",
                        value: "3.0x",
                      },
                      {
                        name: "Aaron Judge",
                        pos: "OF",
                        team: "NYY",
                        salary: "$5,800",
                        proj: "16.2",
                        own: "28%",
                        value: "2.8x",
                      },
                      {
                        name: "Mookie Betts",
                        pos: "OF",
                        team: "LAD",
                        salary: "$5,500",
                        proj: "15.8",
                        own: "25%",
                        value: "2.9x",
                      },
                      {
                        name: "Freddie Freeman",
                        pos: "1B",
                        team: "LAD",
                        salary: "$5,200",
                        proj: "14.5",
                        own: "22%",
                        value: "2.8x",
                      },
                      {
                        name: "Juan Soto",
                        pos: "OF",
                        team: "NYY",
                        salary: "$5,400",
                        proj: "15.1",
                        own: "24%",
                        value: "2.8x",
                      },
                    ].map((player, i) => (
                      <tr key={i} className="border-b border-border hover:bg-muted/50 transition-colors">
                        <td className="py-3 px-2 font-medium">{player.name}</td>
                        <td className="py-3 px-2 text-muted-foreground">{player.pos}</td>
                        <td className="py-3 px-2 text-muted-foreground">{player.team}</td>
                        <td className="py-3 px-2 text-right">{player.salary}</td>
                        <td className="py-3 px-2 text-right font-semibold text-primary">{player.proj}</td>
                        <td className="py-3 px-2 text-right text-muted-foreground">{player.own}</td>
                        <td className="py-3 px-2 text-right font-semibold text-secondary">{player.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Generated Lineups Preview */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Generated Lineups</h2>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>

              <div className="text-center py-12 text-muted-foreground">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">No lineups generated yet</p>
                <p className="text-sm">Configure your settings and click "Generate Lineups" to get started</p>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
