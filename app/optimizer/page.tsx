"use client"

import React, { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ImportCsvButton } from "@/components/import-csv-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Download, Upload, Play, Save, ChevronLeft, ChevronRight } from "lucide-react"

type Player = {
  Name: string
  position?: string
  position_primary?: string
  Salary: number
  "Predicted_DK_Points"?: number
  Team?: string
  [key: string]: any
}

type Lineup = Player[]

export default function OptimizerPage() {
  const [players, setPlayers] = useState<Player[]>([])
  const [csvFile, setCsvFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [sport, setSport] = useState("MLB") // Add sport state

  // Control panel state
  const [minUnique, setMinUnique] = useState("3")
  const [numLineups, setNumLineups] = useState("100")
  const [disableKelly, setDisableKelly] = useState(false)
  const [minSalary, setMinSalary] = useState("45000")
  const [maxSalary, setMaxSalary] = useState("50000")
  const [sortMethod, setSortMethod] = useState("Points")

  // Risk management state
  const [bankroll, setBankroll] = useState("1000")
  const [riskProfile, setRiskProfile] = useState("medium")
  const [enableRisk, setEnableRisk] = useState(true)

  // Stack settings state
  const [selectedStacks, setSelectedStacks] = useState<Record<string, boolean>>({
    "No Stacks": true,
    "4|2": false,
    "5|2": false,
    "3|3": false,
  })

  // Generated lineups
  const [lineups, setLineups] = useState<Lineup[]>([])
  const [selectedLineupIdx, setSelectedLineupIdx] = useState(0)

  // Filters
  const [selectedPlayers, setSelectedPlayers] = useState<Set<string>>(new Set())
  const [playerSearch, setPlayerSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const playersPerPage = 100

  const apiBase = "/api/optimize"  // Use Next.js proxy route instead of Python backend directly

  // Load CSV
  const handleCsvImport = (file: File) => {
    setCsvFile(file)
    setError(null)
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      const lines = text.split("\n")
      const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""))
      const rows: Player[] = []
      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue
        const values = lines[i].split(",").map((v) => v.trim().replace(/"/g, ""))
        const row: Player = {}
        headers.forEach((h, idx) => {
          const val = values[idx]
          if (h === "Salary" || h === "Predicted_DK_Points") {
            row[h] = isNaN(Number(val)) ? 0 : Number(val)
          } else {
            row[h] = val
          }
        })
        rows.push(row)
      }
      setPlayers(rows)
      setSuccess(`Loaded ${rows.length} players`)
    }
    reader.readAsText(file)
  }

  // Run optimization
  const handleRunOptimization = async () => {
    if (!csvFile) {
      setError("Please import a CSV file first")
      return
    }
    try {
      setError(null)
      setSuccess(null)
      setIsLoading(true)

      const form = new FormData()
      form.append("file", csvFile)
      form.append("objective", "maximize_points")
      form.append("num_lineups", numLineups)

      const res = await fetch(apiBase, { method: "POST", body: form })
      if (!res.ok) throw new Error(`API error: ${res.status}`)

      const data = await res.json()
      if (data.status !== "ok" || !data.lineups) throw new Error("Invalid response")

      setLineups(data.lineups)
      setSelectedLineupIdx(0)
      setSuccess(`Generated ${data.count} lineups`)
    } catch (e: any) {
      setError(e.message || "Optimization failed")
    } finally {
      setIsLoading(false)
    }
  }

  // Export lineups to CSV
  const handleExportLineups = () => {
    if (lineups.length === 0) return
    const lineup = lineups[selectedLineupIdx]
    const rows = [["Player", "Position", "Team", "Salary", "Projected Points"]]
    lineup.forEach((p) => {
      rows.push([
        p.Name,
        p.position || p.position_primary || "",
        p.Team || "",
        String(p.Salary),
        String(p["Predicted_DK_Points"] || 0),
      ])
    })
    const csv = rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "lineup.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  const currentLineup = lineups[selectedLineupIdx]
  const filteredPlayers = players.filter(
    (p) =>
      p.Name?.toLowerCase().includes(playerSearch.toLowerCase()) ||
      p.Team?.toLowerCase().includes(playerSearch.toLowerCase())
  )

  const stackOptions = ["No Stacks", "4|2", "5|2", "3|3", "4|2|2", "3|3|2"]
  const positionOptions = ["All Batters", "C", "1B", "2B", "3B", "SS", "OF", "P"]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-48">
              <label className="text-sm text-muted-foreground mb-2 block">Select Sport</label>
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
          <h1 className="text-4xl font-bold mb-2">Advanced {sport === "MLB" ? "⚾ MLB" : sport === "NBA" ? "🏀 NBA" : "🏈 NFL"} DFS Optimizer</h1>
          <p className="text-muted-foreground">
            Optimize {sport === "MLB" ? "⚾ MLB" : sport === "NBA" ? "🏀 NBA" : "🏈 NFL"} lineups with advanced stacking, risk management, and probability analysis
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-4 border-green-500 bg-green-50 text-green-900">
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Control Panel - Right Sidebar */}
          <Card className="lg:col-span-1 p-6 h-fit sticky top-8">
            <h2 className="text-xl font-bold mb-6">Settings</h2>

            <div className="space-y-4">
              <div>
                <Label htmlFor="csv-import">Import CSV</Label>
                <ImportCsvButton onFileSelected={handleCsvImport} className="w-full mt-2" size="sm">
                  Load CSV
                </ImportCsvButton>
                {csvFile && <p className="text-xs text-muted-foreground mt-1">{csvFile.name}</p>}
              </div>

              <div>
                <Label htmlFor="min-unique">Min Unique</Label>
                <Input
                  id="min-unique"
                  type="number"
                  value={minUnique}
                  onChange={(e) => setMinUnique(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="num-lineups">Number of Lineups</Label>
                <Input
                  id="num-lineups"
                  type="number"
                  value={numLineups}
                  onChange={(e) => setNumLineups(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="disable-kelly" checked={disableKelly} onCheckedChange={() => setDisableKelly(!disableKelly)} />
                <Label htmlFor="disable-kelly" className="text-sm">
                  Disable Kelly Sizing
                </Label>
              </div>

              <div>
                <Label htmlFor="min-salary">Min Salary</Label>
                <Input
                  id="min-salary"
                  type="number"
                  value={minSalary}
                  onChange={(e) => setMinSalary(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="max-salary">Max Salary</Label>
                <Input
                  id="max-salary"
                  type="number"
                  value={maxSalary}
                  onChange={(e) => setMaxSalary(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="sort">Sort By</Label>
                <Select value={sortMethod} onValueChange={setSortMethod}>
                  <SelectTrigger id="sort" className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Points">Points</SelectItem>
                    <SelectItem value="Value">Value</SelectItem>
                    <SelectItem value="Salary">Salary</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <hr className="my-4" />

              <div>
                <h3 className="font-semibold text-sm mb-3 text-orange-500">Risk Management</h3>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="bankroll">Bankroll ($)</Label>
                    <Input
                      id="bankroll"
                      type="number"
                      value={bankroll}
                      onChange={(e) => setBankroll(e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="risk-profile">Risk Profile</Label>
                    <Select value={riskProfile} onValueChange={setRiskProfile}>
                      <SelectTrigger id="risk-profile" className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="conservative">Conservative</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="aggressive">Aggressive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="enable-risk"
                      checked={enableRisk}
                      onCheckedChange={() => setEnableRisk(!enableRisk)}
                    />
                    <Label htmlFor="enable-risk" className="text-sm">
                      Enable Risk Management
                    </Label>
                  </div>
                </div>
              </div>

              <hr className="my-4" />

              <Button
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="lg"
                onClick={handleRunOptimization}
                disabled={isLoading || !csvFile}
              >
                <Play className="w-4 h-4 mr-2" />
                {isLoading ? "Running..." : "Run Contest Sim"}
              </Button>

              <Button
                variant="outline"
                className="w-full"
                size="sm"
                onClick={handleExportLineups}
                disabled={lineups.length === 0}
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </Card>

          {/* Main Content - Tabs */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="players" className="w-full">
              <TabsList className="grid w-full grid-cols-6 mb-6">
                <TabsTrigger value="players">Players</TabsTrigger>
                <TabsTrigger value="stacks">Stacks</TabsTrigger>
                <TabsTrigger value="exposure">Exposure</TabsTrigger>
                <TabsTrigger value="combinations">Combos</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
                <TabsTrigger value="entries">Entries</TabsTrigger>
              </TabsList>

              {/* Players Tab */}
              <TabsContent value="players" className="space-y-4">
            <Card className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Player Pool</h2>
                  <div className="flex gap-2 mb-4">
                    <Input
                      placeholder="Search by name or team..."
                      value={playerSearch}
                      onChange={(e) => setPlayerSearch(e.target.value)}
                    />
                    <Select defaultValue="All Batters">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {positionOptions.map((pos) => (
                          <SelectItem key={pos} value={pos}>
                            {pos}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                </div>

                  <div className="flex gap-2 mb-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedPlayers(new Set(players.map((p) => p.Name)))}
                    >
                      Select All
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setSelectedPlayers(new Set())}>
                      Deselect All
                    </Button>
              </div>

                  <div className="overflow-x-auto border rounded">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-8"></TableHead>
                          <TableHead>Player</TableHead>
                          <TableHead>Team</TableHead>
                          <TableHead>Position</TableHead>
                          <TableHead className="text-right">Salary</TableHead>
                          <TableHead className="text-right">Proj</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredPlayers.slice((currentPage - 1) * playersPerPage, currentPage * playersPerPage).map((p, idx) => (
                          <TableRow key={idx}>
                            <TableCell>
                              <Checkbox
                                checked={selectedPlayers.has(p.Name)}
                                onCheckedChange={() => {
                                  const newSet = new Set(selectedPlayers)
                                  if (newSet.has(p.Name)) {
                                    newSet.delete(p.Name)
                                  } else {
                                    newSet.add(p.Name)
                                  }
                                  setSelectedPlayers(newSet)
                                }}
                              />
                            </TableCell>
                            <TableCell className="font-medium">{p.Name}</TableCell>
                            <TableCell>{p.Team}</TableCell>
                            <TableCell>{p.position || p.position_primary}</TableCell>
                            <TableCell className="text-right">${p.Salary?.toLocaleString()}</TableCell>
                            <TableCell className="text-right">{p["Predicted_DK_Points"]?.toFixed(1)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Player Pool Pagination */}
                  {filteredPlayers.length > playersPerPage && (
                    <div className="flex items-center justify-between mt-4 px-4">
                      <p className="text-xs text-muted-foreground">
                        Showing {(currentPage - 1) * playersPerPage + 1}-{Math.min(currentPage * playersPerPage, filteredPlayers.length)} of {filteredPlayers.length} players
                      </p>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                          disabled={currentPage === 1}
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <div className="flex gap-1">
                          {Array.from({ length: Math.ceil(filteredPlayers.length / playersPerPage) }, (_, i) => i + 1)
                            .slice(Math.max(0, currentPage - 2), Math.min(Math.ceil(filteredPlayers.length / playersPerPage), currentPage + 1))
                            .map((page) => (
                              <Button
                                key={page}
                                variant={currentPage === page ? "default" : "outline"}
                                size="sm"
                                onClick={() => setCurrentPage(page)}
                                className="w-8"
                              >
                                {page}
                              </Button>
                            ))}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(Math.min(Math.ceil(filteredPlayers.length / playersPerPage), currentPage + 1))}
                          disabled={currentPage === Math.ceil(filteredPlayers.length / playersPerPage)}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">{selectedPlayers.size} selected</p>
                </Card>
              </TabsContent>

              {/* Stacks Tab */}
              <TabsContent value="stacks" className="space-y-4">
                <Card className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Stack Type Selection</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {stackOptions.map((stack) => (
                      <div key={stack} className="flex items-center space-x-2">
                        <Checkbox
                          id={`stack-${stack}`}
                          checked={selectedStacks[stack] || false}
                          onCheckedChange={(checked) => {
                            setSelectedStacks({ ...selectedStacks, [stack]: !!checked })
                          }}
                        />
                        <Label htmlFor={`stack-${stack}`}>{stack}</Label>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              {/* Exposure Tab */}
              <TabsContent value="exposure" className="space-y-4">
                <Card className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Exposure Settings</h2>
                  <div className="space-y-4">
                    <div>
                      <Label className="mb-2 block">Team Exposure (%)</Label>
                      <Slider defaultValue={[100]} max={100} step={1} />
                    </div>
                    <div>
                      <Label className="mb-2 block">Player Exposure (%)</Label>
                      <Slider defaultValue={[50]} max={100} step={1} />
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Combinations Tab */}
              <TabsContent value="combinations" className="space-y-4">
                <Card className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Team Combinations</h2>
                  <p className="text-muted-foreground">Generate lineups from specific team stacks</p>
                </Card>
              </TabsContent>

              {/* Advanced Tab */}
              <TabsContent value="advanced" className="space-y-4">
                <Card className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Advanced Settings</h2>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="enable-quant" defaultChecked />
                      <Label htmlFor="enable-quant">Enable Advanced Quantitative Optimization</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="enable-prob" defaultChecked />
                      <Label htmlFor="enable-prob">Enable Probability Analysis</Label>
                    </div>
              </div>
            </Card>
              </TabsContent>

              {/* Entries Tab */}
              <TabsContent value="entries" className="space-y-4">
            <Card className="p-6">
                  <h2 className="text-2xl font-bold mb-4">My Entries</h2>
                  <Button variant="outline" className="w-full">
                    <Upload className="w-4 h-4 mr-2" />
                    Load DraftKings Entries CSV
                  </Button>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Generated Lineups */}
            {lineups.length > 0 && (
              <Card className="p-6 mt-6">
                <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Generated Lineups</h2>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedLineupIdx(Math.max(0, selectedLineupIdx - 1))}
                      disabled={selectedLineupIdx === 0}
                    >
                      ← Prev
                    </Button>
                    <span className="px-3 py-1 text-sm text-muted-foreground">
                      {selectedLineupIdx + 1} / {lineups.length}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedLineupIdx(Math.min(lineups.length - 1, selectedLineupIdx + 1))}
                      disabled={selectedLineupIdx === lineups.length - 1}
                    >
                      Next →
                </Button>
                  </div>
              </div>

                {currentLineup && (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Player</TableHead>
                          <TableHead>Position</TableHead>
                          <TableHead>Team</TableHead>
                          <TableHead className="text-right">Salary</TableHead>
                          <TableHead className="text-right">Proj</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentLineup.map((p, idx) => (
                          <TableRow key={idx}>
                            <TableCell className="font-medium">{p.Name}</TableCell>
                            <TableCell>{p.position || p.position_primary}</TableCell>
                            <TableCell>{p.Team}</TableCell>
                            <TableCell className="text-right">${p.Salary?.toLocaleString()}</TableCell>
                            <TableCell className="text-right">{p["Predicted_DK_Points"]?.toFixed(1)}</TableCell>
                          </TableRow>
                        ))}
                        <TableRow className="font-bold">
                          <TableCell colSpan={3}>TOTAL</TableCell>
                          <TableCell className="text-right">
                            ${currentLineup.reduce((sum, p) => sum + (p.Salary || 0), 0).toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right">
                            {currentLineup.reduce((sum, p) => sum + (p["Predicted_DK_Points"] || 0), 0).toFixed(1)}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
              </div>
                )}
            </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
