"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Zap, TrendingUp, TrendingDown, RefreshCw } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Contest = {
  id: string
  name: string
  sport: string
  platform: string
  entryFee: number
  prizePool: string
  entries: number
  maxEntries: number
  startTime: string
  status: "upcoming" | "live" | "completed"
}

export default function LivePage() {
  const [sport, setSport] = useState("MLB")
  const [platform, setPlatform] = useState("all")
  const [contests, setContests] = useState<Contest[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  // Mock contest data
  const mockContests: Contest[] = [
    {
      id: "dk-mlb-1",
      name: "⚾ $100K Moonshot",
      sport: "MLB",
      platform: "DraftKings",
      entryFee: 25,
      prizePool: "$100,000",
      entries: 3245,
      maxEntries: 5280,
      startTime: "7:05 PM ET",
      status: "upcoming",
    },
    {
      id: "fd-mlb-1",
      name: "⚾ $50K Slugger",
      sport: "MLB",
      platform: "FanDuel",
      entryFee: 10,
      prizePool: "$50,000",
      entries: 4120,
      maxEntries: 8450,
      startTime: "7:05 PM ET",
      status: "upcoming",
    },
    {
      id: "dk-nba-1",
      name: "🏀 $75K Superstar",
      sport: "NBA",
      platform: "DraftKings",
      entryFee: 15,
      prizePool: "$75,000",
      entries: 2890,
      maxEntries: 6200,
      startTime: "7:30 PM ET",
      status: "upcoming",
    },
    {
      id: "fd-nba-1",
      name: "🏀 $40K Ballers",
      sport: "NBA",
      platform: "FanDuel",
      entryFee: 5,
      prizePool: "$40,000",
      entries: 5678,
      maxEntries: 12500,
      startTime: "7:30 PM ET",
      status: "upcoming",
    },
    {
      id: "dk-nfl-1",
      name: "🏈 $200K Sunday Splash",
      sport: "NFL",
      platform: "DraftKings",
      entryFee: 50,
      prizePool: "$200,000",
      entries: 2345,
      maxEntries: 4800,
      startTime: "1:00 PM ET",
      status: "live",
    },
    {
      id: "fd-nfl-1",
      name: "🏈 $100K TouchDown",
      sport: "NFL",
      platform: "FanDuel",
      entryFee: 20,
      prizePool: "$100,000",
      entries: 3456,
      maxEntries: 7200,
      startTime: "1:00 PM ET",
      status: "live",
    },
    {
      id: "yahoo-mlb-1",
      name: "⚾ $25K Grand Slam",
      sport: "MLB",
      platform: "Yahoo",
      entryFee: 5,
      prizePool: "$25,000",
      entries: 1234,
      maxEntries: 3120,
      startTime: "7:05 PM ET",
      status: "upcoming",
    },
  ]

  // Filter contests
  const filteredContests = mockContests.filter((c) => {
    const sportMatch = sport === "all" || c.sport === sport
    const platformMatch = platform === "all" || c.platform === platform.toLowerCase().replace(/fanduel/i, "FanDuel").replace(/draftkings/i, "DraftKings").replace(/yahoo/i, "Yahoo")
    return sportMatch && platformMatch
  })

  // Refresh data
  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setLastUpdated(new Date())
      setIsLoading(false)
    }, 500)
  }

  const platformStats = {
    draftkings: filteredContests.filter(c => c.platform === "DraftKings").length,
    fanduel: filteredContests.filter(c => c.platform === "FanDuel").length,
    yahoo: filteredContests.filter(c => c.platform === "Yahoo").length,
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-secondary rounded-full animate-pulse" />
            <h1 className="text-4xl font-bold">Live Contest Tracker</h1>
          </div>
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            {lastUpdated.toLocaleTimeString()}
          </Button>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm text-muted-foreground mb-2 block">Sport</label>
              <Select value={sport} onValueChange={setSport}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sports</SelectItem>
                  <SelectItem value="MLB">⚾ MLB (Baseball)</SelectItem>
                  <SelectItem value="NBA">🏀 NBA (Basketball)</SelectItem>
                  <SelectItem value="NFL">🏈 NFL (Football)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="text-sm text-muted-foreground mb-2 block">Platform</label>
              <Select value={platform} onValueChange={setPlatform}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Platforms</SelectItem>
                  <SelectItem value="DraftKings">🎮 DraftKings</SelectItem>
                  <SelectItem value="FanDuel">⭐ FanDuel</SelectItem>
                  <SelectItem value="Yahoo">🔵 Yahoo Sports</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Platform Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 border-blue-500/20">
            <p className="text-sm text-muted-foreground mb-2">DraftKings Contests</p>
            <p className="text-3xl font-bold text-blue-500">{platformStats.draftkings}</p>
            <p className="text-xs text-muted-foreground mt-2">Most popular platform</p>
          </Card>
          <Card className="p-6 border-purple-500/20">
            <p className="text-sm text-muted-foreground mb-2">FanDuel Contests</p>
            <p className="text-3xl font-bold text-purple-500">{platformStats.fanduel}</p>
            <p className="text-xs text-muted-foreground mt-2">Daily Fantasy Sports</p>
          </Card>
          <Card className="p-6 border-yellow-500/20">
            <p className="text-sm text-muted-foreground mb-2">Yahoo Contests</p>
            <p className="text-3xl font-bold text-yellow-500">{platformStats.yahoo}</p>
            <p className="text-xs text-muted-foreground mt-2">Traditional DFS</p>
          </Card>
        </div>

        {/* Available Contests */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6">Available Contests</h2>

          <div className="space-y-4">
            {filteredContests.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No contests available for selected filters</p>
              </div>
            ) : (
              filteredContests.map((contest) => (
                <div key={contest.id} className="p-6 rounded-lg bg-muted/50 hover:bg-muted transition-colors border border-border">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold">{contest.name}</h3>
                        <Badge
                          variant={
                            contest.status === "live"
                              ? "destructive"
                              : contest.status === "upcoming"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {contest.status === "live" ? "🔴 LIVE" : contest.status === "upcoming" ? "Upcoming" : "Completed"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="font-medium">Platform: {contest.platform}</span>
                        <span>Entry: ${contest.entryFee}</span>
                        <span>Starts: {contest.startTime}</span>
                      </div>
                    </div>
                    <Button size="sm">{contest.status === "live" ? "View" : "Enter"}</Button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Prize Pool</p>
                      <p className="text-lg font-bold text-secondary">{contest.prizePool}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Entries</p>
                      <p className="text-lg font-bold">
                        {contest.entries.toLocaleString()} / {contest.maxEntries.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Fill %</p>
                      <p className="text-lg font-bold">
                        {Math.round((contest.entries / contest.maxEntries) * 100)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Spots Left</p>
                      <p className={`text-lg font-bold ${contest.maxEntries - contest.entries < 500 ? "text-destructive" : "text-green-500"}`}>
                        {(contest.maxEntries - contest.entries).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Avg Value</p>
                      <p className="text-lg font-bold">
                        {(parseInt(contest.prizePool.replace(/[^0-9]/g, "")) / contest.maxEntries).toFixed(0)}x
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </main>
    </div>
  )
}
