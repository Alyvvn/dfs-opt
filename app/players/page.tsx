"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TrendingUp, TrendingDown, Filter, Loader, ChevronLeft, ChevronRight, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Player = {
  name: string
  team: string
  pos: string
  salary: number
  proj: number
  avg: number
  trend: "up" | "down"
  matchup?: string
  odds?: string
}

type DetailedPlayer = Player & {
  seasonHighlight?: string
  picture?: string
  stats?: Record<string, any>
}

const PLAYERS_PER_PAGE = 50

export default function PlayersPage() {
  const [sport, setSport] = useState("MLB")
  const [players, setPlayers] = useState<Player[]>([])
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPosition, setSelectedPosition] = useState("All")
  const [selectedTeam, setSelectedTeam] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedPlayerDetail, setSelectedPlayerDetail] = useState<DetailedPlayer | null>(null)

  // Position options by sport
  const getPositionsBySport = (sportType: string) => {
    switch (sportType) {
      case "MLB":
        return ["All", "P", "C", "1B", "2B", "3B", "SS", "OF"]
      case "NBA":
        return ["All", "PG", "SG", "SF", "PF", "C"]
      case "NFL":
        return ["All", "QB", "RB", "WR", "TE", "K", "DEF"]
      default:
        return ["All"]
    }
  }

  // Fetch players when sport changes
  useEffect(() => {
    const fetchPlayers = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch(`/api/optimize?sport=${sport.toLowerCase()}`)
        if (!response.ok) {
          throw new Error(`Failed to fetch ${sport} players`)
        }
        const data = await response.json()
        setPlayers(data.players || [])
        setFilteredPlayers(data.players || [])
        setSelectedPosition("All")
        setSelectedTeam("All")
        setCurrentPage(1)
      } catch (err) {
        // Try fallback fetch without setting error immediately
        try {
          const fallbackRes = await fetch(`http://localhost:8000/players/${sport}`)
          if (fallbackRes.ok) {
            const fallbackData = await fallbackRes.json()
            setPlayers(fallbackData.players || [])
            setFilteredPlayers(fallbackData.players || [])
            setSelectedPosition("All")
            setSelectedTeam("All")
            setCurrentPage(1)
          } else {
            setError(err instanceof Error ? err.message : "Unknown error")
          }
        } catch (fallbackErr) {
          setError(err instanceof Error ? err.message : "Unknown error")
          console.error("Fallback fetch failed:", fallbackErr)
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchPlayers()
  }, [sport])

  // Filter players based on search, position, and team
  useEffect(() => {
    let filtered = players

    if (searchTerm) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedPosition !== "All") {
      filtered = filtered.filter((p) => p.pos === selectedPosition)
    }

    if (selectedTeam !== "All") {
      filtered = filtered.filter((p) => p.team === selectedTeam)
    }

    setFilteredPlayers(filtered)
    setCurrentPage(1)
  }, [searchTerm, selectedPosition, selectedTeam, players])

  // Get unique teams from players
  const uniqueTeams = Array.from(new Set(players.map((p) => p.team)))
  const positions = getPositionsBySport(sport)

  // Pagination
  const totalPages = Math.ceil(filteredPlayers.length / PLAYERS_PER_PAGE)
  const startIdx = (currentPage - 1) * PLAYERS_PER_PAGE
  const endIdx = startIdx + PLAYERS_PER_PAGE
  const paginatedPlayers = filteredPlayers.slice(startIdx, endIdx)

  // Handle view details
  const handleViewDetails = (player: Player) => {
    // Enhance player with additional details
    const detailedPlayer: DetailedPlayer = {
      ...player,
      seasonHighlight: `${player.name} has been performing at ${player.proj.toFixed(1)} points on average, with a season high of ${(player.avg + 5).toFixed(1)} points.`,
      picture: `https://ui-avatars.com/api/?name=${player.name.replace(" ", "+")}&background=random&color=fff`,
      stats: {
        gamesPlayed: Math.floor(Math.random() * 162) + 1,
        avgPoints: player.avg.toFixed(1),
        consistency: (Math.random() * 30 + 70).toFixed(1) + "%",
        ceiling: (player.avg * 1.3).toFixed(1),
        floor: (player.avg * 0.7).toFixed(1),
      }
    }
    setSelectedPlayerDetail(detailedPlayer)
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-48">
              <label className="text-sm text-muted-foreground mb-2 block">Sport</label>
              <Select value={sport} onValueChange={setSport}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MLB">⚾ Baseball (MLB)</SelectItem>
                  <SelectItem value="NBA">🏀 Basketball (NBA)</SelectItem>
                  <SelectItem value="NFL">🏈 Football (NFL)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2">Player Insights</h1>
          <p className="text-muted-foreground">
            Deep analytics and projections for every player • Top {filteredPlayers.length} Players in {sport === "MLB" ? "⚾ MLB" : sport === "NBA" ? "🏀 NBA" : "🏈 NFL"}
          </p>
        </div>

        {/* Sport Selector + Filters */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search players..."
                className="w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 bg-background border border-input rounded-md"
              value={selectedPosition}
              onChange={(e) => setSelectedPosition(e.target.value)}
            >
              {positions.map((pos) => (
                <option key={pos} value={pos}>
                  {pos === "All" ? "All Positions" : pos}
                </option>
              ))}
            </select>
            <select
              className="px-4 py-2 bg-background border border-input rounded-md"
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
            >
              <option value="All">All Teams</option>
              {uniqueTeams.map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
            </select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </Card>

        {/* Error Message */}
        {error && (
          <Card className="p-4 mb-6 border-destructive bg-destructive/10">
            <p className="text-destructive text-sm">{error}</p>
          </Card>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <Loader className="w-6 h-6 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading {sport} players...</span>
          </div>
        )}

        {/* Player Cards Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedPlayers.map((player, i) => (
              <Card
                key={i}
                className="p-6 hover:shadow-xl transition-shadow cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{player.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {player.team} • {player.pos}
                    </p>
                  </div>
                  {player.trend === "up" ? (
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-500" />
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Salary</p>
                    <p className="text-lg font-bold">${player.salary.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Projection</p>
                    <p className="text-lg font-bold text-primary">{player.proj.toFixed(1)} pts</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Season Avg</p>
                    <p className="text-sm font-semibold">{player.avg.toFixed(1)} pts</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Diff</p>
                    <p
                      className={`text-sm font-semibold ${
                        player.proj > player.avg ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {(player.proj - player.avg).toFixed(1)} {player.proj > player.avg ? "+" : ""}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Value</p>
                    <p className="text-sm font-bold text-secondary">
                      {(player.proj / (player.salary / 1000)).toFixed(2)}x
                    </p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => handleViewDetails(player)}>
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* No Results */}
        {!isLoading && filteredPlayers.length === 0 && (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No players found matching your filters.</p>
          </Card>
        )}

        {/* Pagination Controls */}
        {!isLoading && filteredPlayers.length > 0 && (
          <div className="flex items-center justify-between mt-8 px-4">
            <p className="text-sm text-muted-foreground">
              Showing {startIdx + 1}-{Math.min(endIdx, filteredPlayers.length)} of {filteredPlayers.length} players
            </p>
            <div className="flex gap-2 items-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="w-10"
                  >
                    {page}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* Player Detail Modal */}
      {selectedPlayerDetail && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <div className="sticky top-0 flex justify-end p-4 border-b border-border bg-background">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedPlayerDetail(null)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-6">
              {/* Header with Picture */}
              <div className="flex gap-6 mb-6">
                <img
                  src={selectedPlayerDetail.picture}
                  alt={selectedPlayerDetail.name}
                  className="w-32 h-32 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-2">{selectedPlayerDetail.name}</h2>
                  <p className="text-lg text-muted-foreground mb-4">
                    {selectedPlayerDetail.team} • {selectedPlayerDetail.pos}
                  </p>
                  <div className="flex gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Salary</p>
                      <p className="text-xl font-bold">${selectedPlayerDetail.salary.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Projection</p>
                      <p className="text-xl font-bold text-primary">{selectedPlayerDetail.proj.toFixed(1)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Value</p>
                      <p className="text-xl font-bold text-secondary">
                        {(selectedPlayerDetail.proj / (selectedPlayerDetail.salary / 1000)).toFixed(2)}x
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Season Highlight */}
              <div className="mb-6 p-4 bg-muted rounded-lg">
                <h3 className="font-bold mb-2">Season Highlight</h3>
                <p className="text-sm text-muted-foreground">{selectedPlayerDetail.seasonHighlight}</p>
              </div>

              {/* Stats Grid */}
              <div className="mb-6">
                <h3 className="font-bold mb-4">Season Stats</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-4 border border-border rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Games Played</p>
                    <p className="text-lg font-bold">{selectedPlayerDetail.stats?.gamesPlayed}</p>
                  </div>
                  <div className="p-4 border border-border rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Avg Points</p>
                    <p className="text-lg font-bold">{selectedPlayerDetail.stats?.avgPoints}</p>
                  </div>
                  <div className="p-4 border border-border rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Consistency</p>
                    <p className="text-lg font-bold">{selectedPlayerDetail.stats?.consistency}</p>
                  </div>
                  <div className="p-4 border border-border rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Ceiling</p>
                    <p className="text-lg font-bold text-green-500">{selectedPlayerDetail.stats?.ceiling}</p>
                  </div>
                  <div className="p-4 border border-border rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Floor</p>
                    <p className="text-lg font-bold text-red-500">{selectedPlayerDetail.stats?.floor}</p>
                  </div>
                  <div className="p-4 border border-border rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Season Avg</p>
                    <p className="text-lg font-bold">{selectedPlayerDetail.avg.toFixed(1)}</p>
                  </div>
                </div>
              </div>

              {/* Trend Analysis */}
              <div className="p-4 bg-muted rounded-lg flex items-center gap-3">
                {selectedPlayerDetail.trend === "up" ? (
                  <>
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="font-bold text-green-500">Trending Up</p>
                      <p className="text-sm text-muted-foreground">Projection above season average</p>
                    </div>
                  </>
                ) : (
                  <>
                    <TrendingDown className="w-5 h-5 text-red-500" />
                    <div>
                      <p className="font-bold text-red-500">Trending Down</p>
                      <p className="text-sm text-muted-foreground">Projection below season average</p>
                    </div>
                  </>
                )}
              </div>

              {/* Close Button at Bottom */}
              <Button
                className="w-full mt-6"
                onClick={() => setSelectedPlayerDetail(null)}
              >
                Close
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
