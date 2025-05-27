"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Plus, Upload, Building, DollarSign } from "lucide-react"
import Link from "next/link"
import type { Player, Team, Contract, TeamOwner } from "@/lib/database"

export default function TeamOwnerDashboard() {
  const [owner, setOwner] = useState<TeamOwner | null>(null)
  const [myTeams, setMyTeams] = useState<Team[]>([])
  const [myContracts, setMyContracts] = useState<Contract[]>([])
  const [availablePlayers, setAvailablePlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)

  // Mock current owner ID - in real app, get from auth
  const currentOwnerId = "1"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teamsRes, contractsRes, playersRes] = await Promise.all([
          fetch("/api/teams"),
          fetch("/api/contracts"),
          fetch("/api/players"),
        ])

        const [teamsData, contractsData, playersData] = await Promise.all([
          teamsRes.json(),
          contractsRes.json(),
          playersRes.json(),
        ])

        // Filter data for current owner
        const ownerTeams = teamsData.filter((team: Team) => team.owner_id === currentOwnerId)
        const ownerContracts = contractsData.filter((contract: Contract) => contract.owner_id === currentOwnerId)
        const freeAgents = playersData.filter((player: Player) => !player.team_id)

        setMyTeams(ownerTeams)
        setMyContracts(ownerContracts)
        setAvailablePlayers(freeAgents)

        // Mock owner data
        setOwner({
          id: currentOwnerId,
          name: "John Smith",
          email: "john@thunderhawks.com",
          company: "Thunder Hawks Esports",
          verified: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
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
        <div className="text-lg">Loading team owner dashboard...</div>
      </div>
    )
  }

  const activeContracts = myContracts.filter((c) => c.status === "active")
  const pendingContracts = myContracts.filter((c) => c.status === "pending")
  const totalSalaryCommitment = activeContracts.reduce((sum, contract) => sum + contract.salary, 0)

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Team Owner Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {owner?.name} • {owner?.company}
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/dashboard/team-owner/contracts/create">
              <Plus className="w-4 h-4 mr-2" />
              Create Contract
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard/team-owner/contracts/upload">
              <Upload className="w-4 h-4 mr-2" />
              Upload Contract
            </Link>
          </Button>
        </div>
      </div>

      {/* Owner Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Teams</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myTeams.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Contracts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeContracts.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Contracts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingContracts.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Salary Commitment</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSalaryCommitment.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="teams" className="space-y-4">
        <TabsList>
          <TabsTrigger value="teams">My Teams</TabsTrigger>
          <TabsTrigger value="contracts">Contracts</TabsTrigger>
          <TabsTrigger value="players">Available Players</TabsTrigger>
        </TabsList>

        <TabsContent value="teams" className="space-y-4">
          <div className="grid gap-4">
            {myTeams.map((team) => (
              <Card key={team.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{team.name}</CardTitle>
                      <CardDescription>{team.description}</CardDescription>
                    </div>
                    <Badge variant="default">Owner</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">Founded: {team.founded_year}</div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/team-owner/contracts/create?team=${team.id}`}>Add Player</Link>
                      </Button>
                      <Button variant="outline" size="sm">
                        Manage Team
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {myTeams.length === 0 && (
              <Card>
                <CardContent className="text-center py-8">
                  <Building className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No Teams Yet</h3>
                  <p className="text-muted-foreground mb-4">Create your first team to start managing players</p>
                  <Button asChild>
                    <Link href="/dashboard/teams/new">Create Team</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="contracts" className="space-y-4">
          <div className="grid gap-4">
            {myContracts.map((contract) => (
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
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
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
                  <div className="flex gap-2">
                    {contract.contract_file_url && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={contract.contract_file_url} target="_blank" rel="noopener noreferrer">
                          View Contract
                        </a>
                      </Button>
                    )}
                    {contract.status === "pending" && <Button size="sm">Activate Contract</Button>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="players" className="space-y-4">
          <div className="grid gap-4">
            {availablePlayers.map((player) => (
              <Card key={player.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{player.name}</CardTitle>
                      <CardDescription>
                        {player.position} • Age {player.age}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">Free Agent</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm mb-4">
                    <div>
                      <div className="font-medium">Games</div>
                      <div>{player.stats.games_played}</div>
                    </div>
                    <div>
                      <div className="font-medium">Goals</div>
                      <div>{player.stats.goals}</div>
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
                  <Button size="sm" asChild>
                    <Link href={`/dashboard/team-owner/contracts/create?player=${player.id}`}>Offer Contract</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
