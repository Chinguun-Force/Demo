"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Trophy, FileText, Heart, Plus, Upload, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import type { Player, Team, Contract, Donation } from "@/lib/database"
import Loader from '@/components/Loader'

export default function Dashboard() {
  const [players, setPlayers] = useState<Player[]>([])
  const [teams, setTeams] = useState<Team[]>([])
  const [contracts, setContracts] = useState<Contract[]>([])
  const [donations, setDonations] = useState<Donation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const [playersRes, teamsRes, contractsRes, donationsRes] = await Promise.all([
          fetch("/api/players"),
          fetch("/api/teams"),
          fetch("/api/contracts"),
          fetch("/api/donations"),
        ])

        if (!playersRes.ok || !teamsRes.ok || !contractsRes.ok || !donationsRes.ok) {
          throw new Error("Failed to fetch data from one or more endpoints")
        }

        const [playersData, teamsData, contractsData, donationsData] = await Promise.all([
          playersRes.json(),
          teamsRes.json(),
          contractsRes.json(),
          donationsRes.json(),
        ])

        setPlayers(playersData)
        setTeams(teamsData)
        setContracts(contractsData)
        setDonations(donationsData)
      } catch (error) {
        console.error("Failed to fetch data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <Loader />
  }

  const totalDonations = donations.reduce((sum, donation) => sum + donation.amount, 0)

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">PlayerHub Dashboard</h1>
          <p className="text-muted-foreground">Manage players, teams, contracts, and donations</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/players/createPlayer">
              <Plus className="w-4 h-4 mr-2" />
              Add Player
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard/teams/new">
              <Plus className="w-4 h-4 mr-2" />
              Add Team
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard/contracts/upload">
              <Upload className="w-4 h-4 mr-2" />
              Upload Contract
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Players</CardTitle>
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              <Users className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{players.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Active players in the system</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Teams</CardTitle>
            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
              <Trophy className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teams.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Teams currently active</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Contracts</CardTitle>
            <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
              <FileText className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contracts.filter((c) => c.status === "active").length}</div>
            <p className="text-xs text-muted-foreground mt-1">Current active contracts</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
            <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
              <Heart className="h-4 w-4 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalDonations.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Total donations received</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="players" className="space-y-4">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="players">Players</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
          <TabsTrigger value="contracts">Contracts</TabsTrigger>
          <TabsTrigger value="donations">Donations</TabsTrigger>
        </TabsList>

        <TabsContent value="players" className="space-y-4">
          <div className="grid gap-4">
            {players.map((player) => (
              <Card key={player.id} className="hover:shadow-md transition-shadow overflow-hidden group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                  <div className="h-48 bg-muted relative">
                    {player.profile_image ? (
                      <img 
                        src={player.profile_image} 
                        alt={player.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <Users className="w-16 h-16 text-white/50" />
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                    <CardTitle className="text-white flex items-center gap-2">
                      {player.name}
                      <Link href={`/players/${player.id}`} className="text-white/70 hover:text-white transition-colors">
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-white/80">
                      {player.position} • Age {player.age}
                    </CardDescription>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                    <div className="bg-black/5 dark:bg-white/5 p-3 rounded-lg group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-colors">
                      <div className="font-medium text-muted-foreground">Games</div>
                      <div className="text-lg font-semibold">{player.stats.games_played}</div>
                    </div>
                    <div className="bg-black/5 dark:bg-white/5 p-3 rounded-lg group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-colors">
                      <div className="font-medium text-muted-foreground">Goals</div>
                      <div className="text-lg font-semibold">{player.stats.points}</div>
                    </div>
                    <div className="bg-black/5 dark:bg-white/5 p-3 rounded-lg group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-colors">
                      <div className="font-medium text-muted-foreground">Assists</div>
                      <div className="text-lg font-semibold">{player.stats.assists}</div>
                    </div>
                    <div className="bg-black/5 dark:bg-white/5 p-3 rounded-lg group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-colors">
                      <div className="font-medium text-muted-foreground">Points</div>
                      <div className="text-lg font-semibold">{player.stats.points}</div>
                    </div>
                    <div className="bg-black/5 dark:bg-white/5 p-3 rounded-lg group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-colors">
                      <div className="font-medium text-muted-foreground">Rating</div>
                      <div className="text-lg font-semibold">{player.stats.rating}</div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Badge variant={player.team_id ? "default" : "secondary"} className="ml-auto">
                      {player.team_id ? "Signed" : "Free Agent"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="teams" className="space-y-4">
          <div className="grid gap-4">
            {teams.map((team) => (
              <Card key={team.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {team.name}
                        <Link href={`/teams/${team.id}`} className="text-muted-foreground hover:text-primary">
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </CardTitle>
                      <CardDescription>{team.description}</CardDescription>
                    </div>
                    <Badge variant="outline">Founded {team.founded_year}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="font-medium text-muted-foreground">Players</div>
                      <div className="text-lg font-semibold">{players.filter(p => p.team_id === team.id).length}</div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="font-medium text-muted-foreground">Active Contracts</div>
                      <div className="text-lg font-semibold">
                        {contracts.filter(c => c.team_id === team.id && c.status === "active").length}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="contracts" className="space-y-4">
          <div className="grid gap-4">
            {contracts.map((contract) => (
              <Card key={contract.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        Contract #{contract.id}
                        <Link href={`/contracts/${contract.id}`} className="text-muted-foreground hover:text-primary">
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </CardTitle>
                      <CardDescription>
                        Player ID: {contract.player_id} • Team ID: {contract.team_id}
                      </CardDescription>
                    </div>
                    <Badge
                      variant={
                        contract.status === "active"
                          ? "default"
                          : contract.status === "pending"
                            ? "secondary"
                            : contract.status === "expired"
                              ? "destructive"
                              : "outline"
                      }
                    >
                      {contract.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="font-medium text-muted-foreground">Salary</div>
                      <div className="text-lg font-semibold">${contract.salary.toLocaleString()}</div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="font-medium text-muted-foreground">Duration</div>
                      <div className="text-lg font-semibold">{contract.duration_months} months</div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="font-medium text-muted-foreground">Start Date</div>
                      <div className="text-lg font-semibold">{contract.start_date}</div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="font-medium text-muted-foreground">End Date</div>
                      <div className="text-lg font-semibold">{contract.end_date}</div>
                    </div>
                  </div>
                  {contract.contract_file_url && (
                    <div className="mt-4">
                      <Button variant="outline" size="sm" asChild>
                        <a href={contract.contract_file_url} target="_blank" rel="noopener noreferrer">
                          View Contract
                        </a>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="donations" className="space-y-4">
          <div className="grid gap-4">
            {donations.map((donation) => (
              <Card key={donation.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Donation #{donation.id}</CardTitle>
                      <CardDescription>From: {donation.donor_name}</CardDescription>
                    </div>
                    <Badge variant="outline">${donation.amount.toLocaleString()}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    Date: {new Date(donation.created_at).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
