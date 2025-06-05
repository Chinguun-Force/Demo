"use client"

import React, { useEffect, useState, useCallback, useMemo } from "react"
import { useLoaderStore } from "@/store/loaderStore"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Users,
  Trophy,
  FileText,
  Heart,
  Plus,
  Upload,
  ArrowUpRight,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"

// Basic type definitions to avoid errors.
// These should ideally be imported from a central types file.
interface Player {
  _id: string;
  name: string;
  profilePicture: string;
  position: string;
  age: number;
  teamId?: string;
  stats: {
    games_played: number;
    goals: number;
    assists: number;
    points: number;
    rating: number;
  };
}

interface Team {
  _id: string;
  teamName: string;
  teamLogo: string;
  description: string;
  foundedYear: number;
  teamMembers: string[];
}

interface Contract {
    _id: string;
    playerId: string;
    teamId: string;
    salary: number;
    duration_months: number;
    status: 'active' | 'pending' | 'expired';
    startDate: string;
    endDate: string;
    contract_file_url?: string;
}

type Tab = "players" | "teams" | "contracts";

const Dashboard = () => {
  const [players, setPlayers] = useState<Player[]>([])
  const [teams, setTeams] = useState<Team[]>([])
  const [contracts, setContracts] = useState<Contract[]>([])
  const [activeTab, setActiveTab] = useState<Tab>("players");
  const [tabLoading, setTabLoading] = useState<Partial<Record<Tab, boolean>>>({ players: true });
  const [tabError, setTabError] = useState<Partial<Record<Tab, string | null>>>({});
  const { isLoading, setLoading } = useLoaderStore()
  const [error, setError] = useState<string | null>(null)
  const baseUrl = process.env.NEXT_PUBLIC_API_URL

  const fetchDataForTab = useCallback(async (tab: Tab) => {
    if (tabLoading[tab] || (tab === 'players' && players.length > 0) || (tab === 'teams' && teams.length > 0) || (tab === 'contracts' && contracts.length > 0)) {
        return;
    }

    setTabLoading(prev => ({ ...prev, [tab]: true }));
    setTabError(prev => ({ ...prev, [tab]: null }));

    try {
      const response = await fetch(`${baseUrl}/api/v1/${tab}`);
      if (!response.ok) throw new Error(`Failed to fetch ${tab}`);
      const data = await response.json();
      
      if (tab === 'players') setPlayers(data.players || []);
      if (tab === 'teams') setTeams(data.teams || []);
      if (tab === 'contracts') setContracts(data.contracts || []);

    } catch (error) {
      console.error(`Error fetching ${tab}:`, error);
      setTabError(prev => ({ ...prev, [tab]: error instanceof Error ? error.message : `An unknown error occurred` }));
    } finally {
      setTabLoading(prev => ({ ...prev, [tab]: false }));
    }
  }, [baseUrl, contracts.length, players.length, teams.length, tabLoading]);

  useEffect(() => {
    // Initial load for global stats and the first tab
    const fetchInitialData = async () => {
      setLoading(true);
      await Promise.all([
          // We can pre-fetch teams since we need it for player cards anyway
          fetchDataForTab('teams'), 
          fetchDataForTab('players')
      ]);
      setLoading(false);
    };
    fetchInitialData();
  }, [fetchDataForTab, setLoading]);

  const onTabChange = (tab: string) => {
      const newTab = tab as Tab;
      setActiveTab(newTab);
      fetchDataForTab(newTab);
  }

  const teamNameMap = useMemo(() => {
    return teams.reduce((acc, team) => {
      acc[team._id] = team.teamName;
      return acc;
    }, {} as Record<string, string>);
  }, [teams]);

  const playerNameMap = useMemo(() => {
    return players.reduce((acc, player) => {
      acc[player._id] = player.name;
      return acc;
    }, {} as Record<string, string>);
  }, [players]);

  const renderSkeletonCard = (type: 'player' | 'team' | 'contract', index: number) => {
      if (type === 'player') {
          return (
             <Card key={index} className="overflow-hidden">
                <div className="h-48 bg-muted relative"><Skeleton className="h-full w-full"/></div>
                <CardContent className="p-4">
                    <Skeleton className="h-5 w-3/4 mb-2"/>
                    <Skeleton className="h-4 w-1/2 mb-4"/>
                    <div className="grid grid-cols-3 gap-4">
                        <Skeleton className="h-12 w-full"/>
                        <Skeleton className="h-12 w-full"/>
                        <Skeleton className="h-12 w-full"/>
                    </div>
                </CardContent>
             </Card>
          )
      }
       if (type === 'team') {
          return (
             <Card key={index}>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <Skeleton className="w-12 h-12 rounded-full"/>
                        <div className="flex-1">
                            <Skeleton className="h-5 w-3/4 mb-2"/>
                            <Skeleton className="h-4 w-1/2"/>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-4">
                        <Skeleton className="h-16 w-24"/>
                        <Skeleton className="h-16 w-24"/>
                    </div>
                </CardContent>
             </Card>
          )
      }
      return ( // contract
        <Card key={index}>
            <CardHeader><Skeleton className="h-6 w-1/2"/></CardHeader>
            <CardContent className="grid grid-cols-4 gap-4">
                <Skeleton className="h-12 w-full"/>
                <Skeleton className="h-12 w-full"/>
                <Skeleton className="h-12 w-full"/>
                <Skeleton className="h-12 w-full"/>
            </CardContent>
        </Card>
      )
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Card className="bg-destructive/10 border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">An Error Occurred</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
            <Button onClick={() => window.location.reload()} className="mt-4">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const activeContracts = contracts.filter((c) => c.status === "active").length;

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">PlayerHub Dashboard</h1>
          <p className="text-muted-foreground">Manage players, teams, and contracts.</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/players/createPlayer">
              <Plus className="w-4 h-4 mr-2" />
              Add Player
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/teams/createTeam">
              <Plus className="w-4 h-4 mr-2" />
              Add Team
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total Players</CardTitle><Users className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent>{tabLoading.players ? <Skeleton className="h-6 w-1/4 mt-2"/> : <div className="text-2xl font-bold">{players.length}</div>}</CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Active Teams</CardTitle><Trophy className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent>{tabLoading.teams ? <Skeleton className="h-6 w-1/4 mt-2"/> : <div className="text-2xl font-bold">{teams.length}</div>}</CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Active Contracts</CardTitle><FileText className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent>{tabLoading.contracts ? <Skeleton className="h-6 w-1/4 mt-2"/> : <div className="text-2xl font-bold">{activeContracts}</div>}</CardContent></Card>
      </div>

      <Tabs defaultValue="players" className="space-y-4" onValueChange={onTabChange} value={activeTab}>
        <TabsList className="bg-muted/50">
          <TabsTrigger value="players">Players</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
          <TabsTrigger value="contracts">Contracts</TabsTrigger>
        </TabsList>

        <TabsContent value="players" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {tabLoading.players ? (
                    Array.from({length: 6}).map((_, i) => renderSkeletonCard('player', i))
                ) : tabError.players ? (
                    <p className="text-destructive col-span-full">{tabError.players}</p>
                ) : (
                    players.map((player) => (
                    <Card key={player._id} className="hover:shadow-md transition-shadow overflow-hidden group">
                        <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                        <div className="h-48 bg-muted relative">
                            {player.profilePicture ? (
                            <img src={player.profilePicture} alt={player.name} className="w-full h-full object-cover"/>
                            ) : (
                            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                <Users className="w-16 h-16 text-white/50" />
                            </div>
                            )}
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                            <CardTitle className="text-white flex items-center gap-2">
                            {player.name}
                            <Link href={`/players/${player._id}`} className="text-white/70 hover:text-white transition-colors">
                                <ArrowUpRight className="h-4 w-4" />
                            </Link>
                            </CardTitle>
                            <CardDescription className="text-white/80">{player.position} • Age {player.age}</CardDescription>
                        </div>
                        </div>
                        <CardContent className="p-4">
                        <div className="grid grid-cols-3 gap-4 text-sm">
                            <div className="bg-black/5 dark:bg-white/5 p-3 rounded-lg"><div className="font-medium text-muted-foreground">Games</div><div className="text-lg font-semibold">{player.stats?.games_played || 0}</div></div>
                            <div className="bg-black/5 dark:bg-white/5 p-3 rounded-lg"><div className="font-medium text-muted-foreground">Goals</div><div className="text-lg font-semibold">{player.stats?.goals || 0}</div></div>
                            <div className="bg-black/5 dark:bg-white/5 p-3 rounded-lg"><div className="font-medium text-muted-foreground">Rating</div><div className="text-lg font-semibold">{player.stats?.rating || 0}</div></div>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <Badge variant={player.teamId ? "default" : "secondary"} className="ml-auto">
                            {player.teamId ? (teamNameMap[player.teamId] || 'Signed') : "Free Agent"}
                            </Badge>
                        </div>
                        </CardContent>
                    </Card>
                    ))
                )}
            </div>
        </TabsContent>

        <TabsContent value="teams" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
             {tabLoading.teams ? (
                Array.from({length: 4}).map((_, i) => renderSkeletonCard('team', i))
            ) : tabError.teams ? (
                <p className="text-destructive col-span-full">{tabError.teams}</p>
            ) : (
                teams.map((team) => (
                <Card key={team._id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-4">
                        <img src={team.teamLogo} alt={team.teamName} className="w-12 h-12 object-contain rounded-full bg-muted p-1"/>
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                {team.teamName}
                                <Link href={`/teams/${team._id}`} className="text-muted-foreground hover:text-primary"><ArrowUpRight className="h-4 w-4" /></Link>
                            </CardTitle>
                            <CardDescription>{team.description}</CardDescription>
                        </div>
                        </div>
                        <Badge variant="outline">Est. {team.foundedYear}</Badge>
                    </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-4 text-sm">
                            <div className="bg-muted/50 p-3 rounded-lg">
                                <div className="font-medium text-muted-foreground">Players</div>
                                <div className="text-lg font-semibold">{team.teamMembers.length}</div>
                            </div>
                            <div className="bg-muted/50 p-3 rounded-lg">
                                <div className="font-medium text-muted-foreground">Active Contracts</div>
                                <div className="text-lg font-semibold">
                                    {contracts.filter(c => c.teamId === team._id && c.status === "active").length}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="contracts" className="space-y-4">
           <div className="grid gap-4">
             {tabLoading.contracts ? (
                Array.from({length: 3}).map((_, i) => renderSkeletonCard('contract', i))
            ) : tabError.contracts ? (
                <p className="text-destructive col-span-full">{tabError.contracts}</p>
            ) : (
                contracts.map((contract) => (
                <Card key={contract._id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                        <CardTitle className="flex items-center gap-2">Contract Details</CardTitle>
                        <CardDescription>
                            Player: {playerNameMap[contract.playerId] || 'N/A'} • Team: {teamNameMap[contract.teamId] || 'N/A'}
                        </CardDescription>
                        </div>
                        <Badge variant={contract.status === "active" ? "default" : contract.status === "expired" ? "destructive" : "secondary"}>
                        {contract.status}
                        </Badge>
                    </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-muted/50 p-3 rounded-lg"><div className="font-medium text-muted-foreground">Salary</div><div className="text-lg font-semibold">${contract.salary.toLocaleString()}</div></div>
                            <div className="bg-muted/50 p-3 rounded-lg"><div className="font-medium text-muted-foreground">Duration</div><div className="text-lg font-semibold">{contract.duration_months} months</div></div>
                            <div className="bg-muted/50 p-3 rounded-lg"><div className="font-medium text-muted-foreground">Start Date</div><div className="text-lg font-semibold">{new Date(contract.startDate).toLocaleDateString()}</div></div>
                            <div className="bg-muted/50 p-3 rounded-lg"><div className="font-medium text-muted-foreground">End Date</div><div className="text-lg font-semibold">{new Date(contract.endDate).toLocaleDateString()}</div></div>
                        </div>
                    </CardContent>
                </Card>
                ))
            )}
           </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Dashboard
