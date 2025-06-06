"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
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
import { Filter, Search, AlertCircle, Plus, MoreHorizontal, ChevronRight, Grid, List, Users } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTeamStore } from "@/store/teamStore"
import Image from "next/image"
import { useLoaderStore } from "@/store/loaderStore"

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
  const { isLoading, setLoading } = useLoaderStore();
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [positionFilter, setPositionFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"list" | "gallery">("list");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8); // Default for gallery view
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
  }, [setLoading])

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

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(parseInt(value, 10));
    setCurrentPage(1); // Reset to first page on change
  };

  useEffect(() => {
    // Adjust items per page based on view mode
    if (viewMode === 'list') {
      setItemsPerPage(5); // Or your preferred number for list view
    } else {
      setItemsPerPage(8); // Or your preferred number for gallery view
    }
    setCurrentPage(1); // Reset to first page on view mode change
  }, [viewMode]);

  const filteredPlayers = data.filter((player) => {
    const matchesSearch =
      (player.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (player.teamId?.toLowerCase().includes(searchTerm.toLowerCase()) || false);

    const matchesPosition = positionFilter === "all" || player.position === positionFilter;
    const matchesStatus = statusFilter === "all" || player.status === statusFilter;

    return matchesSearch && matchesPosition && matchesStatus;
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredPlayers.length / itemsPerPage);
  const paginatedPlayers = filteredPlayers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

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
      <Card>
        <CardHeader>
          <CardTitle>Нийт тамирчид</CardTitle>
          <CardDescription>
            Нийт тамирчидын тоо: {data.length}
            {!isLoading && ` (${filteredPlayers.length} / ${data.length} тамирчид)`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Нэр, баг, байрлалаар хайх..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="flex gap-2">
              <div className="w-[180px]">
                <Select value={positionFilter} onValueChange={setPositionFilter} disabled={isLoading}>
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
                <Select value={statusFilter} onValueChange={setStatusFilter} disabled={isLoading}>
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
                <Button variant="outline" onClick={clearFilters} disabled={isLoading}>
                  Clear Filters
                </Button>
              )}
               <div className="flex items-center rounded-md bg-muted p-1">
                <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="sm" className="rounded-sm px-2" onClick={() => setViewMode('list')}>
                    <List className="h-4 w-4" />
                </Button>
                <Button variant={viewMode === 'gallery' ? 'secondary' : 'ghost'} size="sm" className="rounded-sm px-2" onClick={() => setViewMode('gallery')}>
                    <Grid className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {isLoading ? (
            viewMode === 'list' ? (
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
                    {Array.from({ length: 5 }).map((_, index) => (
                      <TableRow key={index}>
                        <TableCell><Skeleton className="h-10 w-10 rounded-full" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                        <TableCell><Skeleton className="h-10 w-10" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                        <TableCell><Skeleton className="h-6 w-16" /></TableCell>
                        <TableCell className="text-right"><Skeleton className="h-5 w-5 ml-auto" /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                 {Array.from({ length: 8 }).map((_, index) => (
                    <Card key={index}><CardContent className="p-4"><div className="flex items-center gap-4"><Skeleton className="h-40 w-full" /></div></CardContent></Card>
                 ))}
              </div>
            )
          ) : filteredPlayers.length > 0 ? (
            viewMode === 'list' ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                     <TableRow>
                      <TableHead className="pl-28">Зураг</TableHead>
                      <TableHead>Нэр</TableHead>
                      <TableHead>Байрлал</TableHead>
                      <TableHead>Баг</TableHead>
                      <TableHead>Нас</TableHead>
                      <TableHead>Дугаар</TableHead>
                      <TableHead>Төлөв</TableHead>
                      <TableHead>Дэлгэрэнгүй</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedPlayers.map((player) => (
                      <TableRow key={player._id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">
                          <Avatar className="w-16 h-16 ml-20">
                            <AvatarImage src={player.profilePicture || undefined} alt={player.name} className="w-16 h-16 object-cover" /><AvatarFallback>{player.name?.slice(0,2)}</AvatarFallback></Avatar>
                        </TableCell>
                        <TableCell className="font-medium">{player.name}</TableCell>
                        <TableCell>{player.position}</TableCell>
                        <TableCell><Image src={useTeamStore.getState().teams.find((team) => team._id === player.teamId)?.teamLogo || 'https://placehold.co/40x40/png'} alt="Team Logo" width={40} height={40} className="h-16 w-16 object-contain rounded-full" /></TableCell>
                        <TableCell>{player.age}</TableCell>
                        <TableCell>#{player.jerseyNumber}</TableCell>
                        <TableCell><Badge className={getStatusColor(player.status)} variant="outline">{player.status}</Badge></TableCell>
                        <TableCell className="text-right"><Link href={`/players/${player._id}`}><ChevronRight className="h-5 w-5 text-muted-foreground" /></Link></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {paginatedPlayers.map((player) => (
                        <Card key={player._id} className="group relative overflow-hidden hover:shadow-xl transition-all duration-500 ease-in-out hover:-translate-y-1">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-90" />
                                <div className="h-40 bg-muted relative overflow-hidden">
                                {player.profilePicture ? (
                                    <img src={player.profilePicture} alt={player.name} className="w-full h-full object-cover transform transition-transform duration-700 ease-in-out group-hover:scale-105" />
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
                                        <Badge className={`${getStatusColor(player.status)} backdrop-blur-sm transition-all duration-500 group-hover:scale-105 text-xs`} variant="outline">{player.status}</Badge>
                                    </div>
                                </div>
                            </div>
                            <CardContent className="p-4">
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                <div className="bg-black/5 dark:bg-white/5 p-2 rounded-lg transition-all duration-500 ease-in-out group-hover:bg-black/10 dark:group-hover:bg-white/10 group-hover:translate-y-[-2px]">
                                    <div className="font-medium text-muted-foreground mb-0.5 transition-colors duration-500">Team</div>
                                    <div className="font-semibold text-sm transition-colors duration-500">{useTeamStore.getState().teams.find(t=>t._id === player.teamId)?.teamName || 'Free Agent'}</div>
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
                                <Button variant="ghost" size="sm" asChild className="transition-all duration-500 ease-in-out group-hover:bg-primary/10 hover:bg-primary/20 h-7 text-xs">
                                    <Link href={`/players/${player._id}`} className="flex items-center gap-1">
                                    <span className="transition-transform duration-500 group-hover:translate-x-1">View Profile</span>
                                    <ChevronRight className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-1" />
                                    </Link>
                                </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )
          ) : (
            <div className="text-center py-20">
              {hasActiveFilters ? (
                <div className="flex flex-col items-center gap-2">
                  <p className="text-muted-foreground">Уучлаарай, тамирчид олдсонгүй.</p>
                  <Button variant="outline" size="sm" onClick={clearFilters} className="mt-2">
                    Хуулах
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <Users className="h-16 w-16 text-muted-foreground" />
                  <h3 className="text-xl font-semibold">Тамирчид олдсонгүй</h3>
                  <p className="text-muted-foreground">Тамирчид нэмэхэд эхлэе.</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
        {totalPages > 1 && (
          <CardFooter className="flex justify-between items-center border-t pt-4">
             <div>
              <Select onValueChange={handleItemsPerPageChange} defaultValue={String(itemsPerPage)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Items per page" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 per page</SelectItem>
                  <SelectItem value="10">10 per page</SelectItem>
                  <SelectItem value="20">20 per page</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
