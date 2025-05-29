"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Trophy, FileText, Heart, Plus, Upload } from "lucide-react"
import Link from "next/link"
import type { Player, Team, Contract, Donation } from "@/lib/database"

export default function Dashboard() {
  const [players, setPlayers] = useState<Player[]>([])
  const [teams, setTeams] = useState<Team[]>([])
  const [contracts, setContracts] = useState<Contract[]>([])
  const [donations, setDonations] = useState<Donation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
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
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading sda min hvlee...</div>
      </div>
    )
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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Players</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{players.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Teams</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teams.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Contracts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contracts.filter((c) => c.status === "active").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalDonations.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="players" className="space-y-4">
        <TabsList>
          <TabsTrigger value="players">Players</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
          <TabsTrigger value="contracts">Contracts</TabsTrigger>
          <TabsTrigger value="donations">Donations</TabsTrigger>
        </TabsList>

        <TabsContent value="players" className="space-y-4">
          <div className="grid gap-4">
            {players.map((player) => (
              <Card key={player.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{player.name}</CardTitle>
                      <CardDescription>
                        {player.position} • Age {player.age}
                      </CardDescription>
                    </div>
                    <Badge variant={player.team_id ? "default" : "secondary"}>
                      {player.team_id ? "Signed" : "Free Agent"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                    <div>
                      <div className="font-medium">Games</div>
                      <div>{player.stats.games_played}</div>
                    </div>
                    <div>
                      <div className="font-medium">Goals</div>
                      <div>{player.stats.points}</div>
                    </div>
                    <div>
                      <div className="font-medium">Assists</div>
                      <div>{player.stats.assists}</div>
                    </div>
                    <div>
                      <div className="font-medium">Points</div>
                      <div>{player.stats.points}</div>
                    </div>
                    <div>
                      <div className="font-medium">Rating</div>
                      <div>{player.stats.rating}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="teams" className="space-y-4">
          <div className="grid gap-4">
            {teams.map((team) => (
              <Card key={team.id}>
                <CardHeader>
                  <CardTitle>{team.name}</CardTitle>
                  <CardDescription>{team.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">Founded: {team.founded_year}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="contracts" className="space-y-4">
          <div className="grid gap-4">
            {contracts.map((contract) => (
              <Card key={contract.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Contract #{contract.id}</CardTitle>
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
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="font-medium">Salary</div>
                      <div>${contract.salary.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="font-medium">Duration</div>
                      <div>{contract.duration_months} months</div>
                    </div>
                    <div>
                      <div className="font-medium">Start Date</div>
                      <div>{contract.start_date}</div>
                    </div>
                    <div>
                      <div className="font-medium">End Date</div>
                      <div>{contract.end_date}</div>
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
              <Card key={donation.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{donation.donor_name}</CardTitle>
                      <CardDescription>{donation.donor_email}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">${donation.amount}</div>
                      <Badge
                        variant={
                          donation.payment_status === "completed"
                            ? "default"
                            : donation.payment_status === "pending"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {donation.payment_status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                {donation.message && (
                  <CardContent>
                    <p className="text-sm text-muted-foreground">"{donation.message}"</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
