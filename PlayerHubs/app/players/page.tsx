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
import { Filter, Search, AlertCircle, Plus, MoreHorizontal, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTeamStore } from "@/store/teamStore"
import Image from "next/image"

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
      (player.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (player.teamId?.toLowerCase().includes(searchTerm.toLowerCase()) || false);

    const matchesPosition = positionFilter === "all" || player.position === positionFilter;
    const matchesStatus = statusFilter === "all" || player.status === statusFilter;

    return matchesSearch && matchesPosition && matchesStatus;
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
                    <SelectItem value="Goalkeeper">Goalkeeper</SelectItem>
                    <SelectItem value="Forward">Forward</SelectItem>
                    <SelectItem value="Midfielder">Midfielder</SelectItem>
                    <SelectItem value="Defender">Defender</SelectItem>
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

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead>Нэр</TableHead>
                  <TableHead>Байрлал</TableHead>
                  <TableHead>Баг</TableHead>
                  <TableHead>Нас</TableHead>
                  <TableHead>Дугаар</TableHead>
                  <TableHead>Төлөв</TableHead>
                  <TableHead className="text-right">Дэлгэрэнгүй</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton className="h-4 w-4" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-24" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-24" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-28" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-12" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-12" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-16" />
                      </TableCell>
                      <TableCell className="text-right">
                        <Skeleton className="h-8 w-8 ml-auto" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : filteredPlayers.length > 0 ? (
                  filteredPlayers.map((player) => (
                    <TableRow key={player._id}
                      className="hover:bg-muted/50 transition-colors cursor-pointer px-10"
                    >
                      <TableCell className="font-medium">
                      <Avatar>
                        <AvatarImage
                          src={player.profilePicture || 'github.com/PlayerHubs/player-hubs/assets/placeholder.png'}
                          alt="User"
                        />
                        <AvatarFallback>US</AvatarFallback>
                      </Avatar>
                      </TableCell>
                      <TableCell className="font-medium">{player.name}</TableCell>
                      <TableCell>{player.position}</TableCell>
                      <TableCell>
                        <Image
                          src={useTeamStore.getState().teams.find((team) => team._id === player.teamId)?.teamLogo || 'github.com/PlayerHubs/player-hubs/assets/placeholder.png'}
                          alt="User"
                          width={20}
                          height={20}
                          className="h-16 w-16 object-contain"
                        />
                      </TableCell>
                      <TableCell>{player.age}</TableCell>
                      <TableCell>#{player.jerseyNumber}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(player.status)} variant="outline">
                          {player.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {/* <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                              <Link href={`/players/${player._id}`}>View details</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/players/${player._id}/edit`}>Edit player</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600" onClick={() => handleDeletePlayer(player._id)}>
                              Delete player
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu> */}
                       
                        <Link href={`/players/${player._id}`} className=""><ChevronRight className="h-5 w-5 text-muted-foreground ml-auto" /></Link>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
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
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
