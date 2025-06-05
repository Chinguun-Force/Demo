"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { Filter, Search, AlertCircle, Plus, MoreHorizontal, ChevronRight, Users } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Player {
  _id: string
  profilePicture : string
  name: string
  position: string
  teamId: string
  nationality: string
  age: number
  jerseyNumber: number
  status: "ACTIVE" | "INJURED" | "SUSPENDED" | "INACTIVE"
  height: number
  weight: number
  marketValue: number
}

interface ApiResponse {
  players: Player[]
  total: number
}

export default function PlayersPage() {
  const [data, setData] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [positionFilter, setPositionFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  // const router = useRouter()
  const baseUrl = process.env.NEXT_PUBLIC_API_URL


  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch(`${baseUrl}/api/v1/players`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!res.ok) {
          throw new Error(`Failed to fetch players: ${res.status} ${res.statusText}`)
        }

        const result: ApiResponse = await res.json()
        setData(result.players || [])
      } catch (error) {
        console.error("Error fetching players:", error)
        setError(error instanceof Error ? error.message : "An unknown error occurred")
      } finally {
        setLoading(false)
      }
    }

    getData()
  }, [])

  const handleDeletePlayer = async (playerId: string) => {
    if (!confirm("Are you sure you want to delete this player?")) return

    try {
      const res = await fetch(`/api/v1/players/${playerId}`, {
        method: "DELETE",
      })

      if (!res.ok) {
        throw new Error("Failed to delete player")
      }

      setData((prev) => prev.filter((player) => player._id !== playerId))
    } catch (error) {
      console.error("Error deleting player:", error)
      alert("Failed to delete player")
    }
  }

  const filteredPlayers = data.filter((player) => {
    const matchesSearch =
      player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.teamId.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesPosition = positionFilter === "all" || player.position === positionFilter
    const matchesStatus = statusFilter === "all" || player.status === statusFilter

    return matchesSearch && matchesPosition && matchesStatus
  })

  const getStatusColor = (status: Player["status"]) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/50"
      case "INJURED":
        return "bg-red-500/20 text-red-700 dark:text-red-400 border-red-500/50"
      case "SUSPENDED":
        return "bg-amber-500/20 text-amber-700 dark:text-amber-400 border-amber-500/50"
      case "INACTIVE":
        return "bg-gray-500/20 text-gray-700 dark:text-gray-400 border-gray-500/50"
      default:
        return "bg-gray-500/20 text-gray-700 dark:text-gray-400 border-gray-500/50"
    }
  }

  const clearFilters = () => {
    setSearchTerm("")
    setPositionFilter("all")
    setStatusFilter("all")
  }

  const hasActiveFilters = searchTerm !== "" || positionFilter !== "all" || statusFilter !== "all"

  if (error) {
    return (
      <div className="container py-8 mx-auto">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container py-8 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Players</h1>
          <p className="text-muted-foreground">Manage your team's player roster</p>
        </div>
        <Button asChild>
          <Link href="/players/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Player
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Player Catalog</CardTitle>
          <CardDescription>
            View and manage all players in the system
            {!loading && ` (${filteredPlayers.length} of ${data.length} players)`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, team, or nationality..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="flex gap-2">
              <div className="w-[180px]">
                <Select value={positionFilter} onValueChange={setPositionFilter} disabled={loading}>
                  <SelectTrigger>
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <SelectValue placeholder="Position" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Бүх байрлал</SelectItem>
                    <SelectItem value="Goalkeeper">Point guard</SelectItem>
                    <SelectItem value="Forward">Shooting guard</SelectItem>
                    <SelectItem value="Midfielder">Small forward</SelectItem>
                    <SelectItem value="Defender">Power forward</SelectItem>
                    <SelectItem value="Goalkeeper">Center</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-[180px]">
                <Select value={statusFilter} onValueChange={setStatusFilter} disabled={loading}>
                  <SelectTrigger>
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <SelectValue placeholder="Status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="INJURED">Injured</SelectItem>
                    <SelectItem value="SUSPENDED">Suspended</SelectItem>
                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {hasActiveFilters && (
                <Button variant="outline" onClick={clearFilters} disabled={loading}>
                  Clear Filters
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredPlayers.length > 0 ? (
              filteredPlayers.map((player) => (
                <Card key={player._id} className="group relative overflow-hidden hover:shadow-xl transition-all duration-500 ease-in-out hover:-translate-y-1">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-90" />
                    <div className="h-40 bg-muted relative overflow-hidden">
                      {player.profilePicture ? (
                        <img 
                          src={player.profilePicture} 
                          alt={player.name}
                          className="w-full h-full object-cover transform transition-transform duration-700 ease-in-out group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center transition-all duration-500 group-hover:brightness-110">
                          <Users className="w-16 h-16 text-white/30 transition-transform duration-500 group-hover:scale-110" />
                        </div>
                      )}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-20 transform transition-transform duration-500 group-hover:translate-y-[-4px]">
                      <div className="flex items-center justify-between">
                        <div className="transform transition-all duration-500 group-hover:translate-x-1">
                          <h3 className="text-lg font-bold text-white tracking-tight transition-all duration-500 group-hover:text-white/90">{player.name}</h3>
                          <p className="text-white/90 text-xs mt-0.5 transition-all duration-500 group-hover:text-white/80">{player.position}</p>
                        </div>
                        <Badge className={`${getStatusColor(player.status)} backdrop-blur-sm transition-all duration-500 group-hover:scale-105 text-xs`} variant="outline">
                          {player.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-black/5 dark:bg-white/5 p-2 rounded-lg transition-all duration-500 ease-in-out group-hover:bg-black/10 dark:group-hover:bg-white/10 group-hover:translate-y-[-2px]">
                        <div className="font-medium text-muted-foreground mb-0.5 transition-colors duration-500">Team</div>
                        <div className="font-semibold text-sm transition-colors duration-500">{player.teamId}</div>
                      </div>
                      <div className="bg-black/5 dark:bg-white/5 p-2 rounded-lg transition-all duration-500 ease-in-out group-hover:bg-black/10 dark:group-hover:bg-white/10 group-hover:translate-y-[-2px]">
                        <div className="font-medium text-muted-foreground mb-0.5 transition-colors duration-500">Age</div>
                        <div className="font-semibold text-sm transition-colors duration-500">{player.age}</div>
                      </div>
                      <div className="bg-black/5 dark:bg-white/5 p-2 rounded-lg transition-all duration-500 ease-in-out group-hover:bg-black/10 dark:group-hover:bg-white/10 group-hover:translate-y-[-2px]">
                        <div className="font-medium text-muted-foreground mb-0.5 transition-colors duration-500">Jersey</div>
                        <div className="font-semibold text-sm transition-colors duration-500">#{player.jerseyNumber}</div>
                      </div>
                      <div className="bg-black/5 dark:bg-white/5 p-2 rounded-lg transition-all duration-500 ease-in-out group-hover:bg-black/10 dark:group-hover:bg-white/10 group-hover:translate-y-[-2px]">
                        <div className="font-medium text-muted-foreground mb-0.5 transition-colors duration-500">Nationality</div>
                        <div className="font-semibold text-sm transition-colors duration-500">{player.nationality}</div>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        asChild 
                        className="transition-all duration-500 ease-in-out group-hover:bg-primary/10 hover:bg-primary/20 h-7 text-xs"
                      >
                        <Link href={`/players/${player._id}`} className="flex items-center gap-1">
                          <span className="transition-transform duration-500 group-hover:translate-x-1">View Profile</span>
                          <ChevronRight className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                {hasActiveFilters ? (
                  <div className="flex flex-col items-center gap-2">
                    <p>No players match your current filters.</p>
                    <Button variant="outline" size="sm" onClick={clearFilters}>
                      Clear filters
                    </Button>
                  </div>
                ) : (
                  "No players found."
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
