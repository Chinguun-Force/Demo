"use client"

import { useState } from "react"
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

import { ChevronDown, Download, Filter, Plus, Search } from "lucide-react"
import PlayerTable from "./components/PlayerTable"
const players = [
    {
      id: "1",
      name: "Alex Johnson",
      position: "Forward",
      team: "Red Dragons",
      age: 24,
      height: "6'2\"",
      weight: "185 lbs",
      nationality: "USA",
      jerseyNumber: 10,
      status: "Active",
      bio: "Alex Johnson is a dynamic forward known for his speed and finishing ability. He joined the Red Dragons in 2020 and has quickly become a fan favorite.",
      careerHistory: [
        {
          teamId: "101",
          teamName: "Blue Eagles",
          season: "2018-2019",
          role: "Forward",
          startDate: "2018-08-01",
          endDate: "2020-05-30",
        },
        {
          teamId: "102",
          teamName: "Red Dragons",
          season: "2020-Present",
          role: "Forward",
          startDate: "2020-06-15",
          endDate: null,
        },
      ],
      achievements: [
        {
          id: "a1",
          title: "Rookie of the Year",
          description: "Named the league's best rookie player",
          date: "2019-05-15",
          type: "Award",
        },
        {
          id: "a2",
          title: "Top Scorer",
          description: "Led the league in goals scored",
          date: "2022-05-20",
          type: "Award",
        },
      ],
      stats: {
        gamesPlayed: 128,
        goalsScored: 75,
        assists: 32,
        yellowCards: 15,
        redCards: 2,
        minutesPlayed: 10240,
        winRate: 0.65,
      },
      socialLinks: {
        twitter: "https://twitter.com/alexjohnson",
        instagram: "https://instagram.com/alexjohnson",
      },
      donationEnabled: true,
    },
    {
        id: "3",
        name: "Carlos Rodriguez",
        position: "Midfielder",
        team: "Blue Eagles",
        age: 27,
        height: "5'10\"",
        weight: "170 lbs",
        nationality: "Spain",
        jerseyNumber: 8,
        status: "Injured",
        bio: "Carlos Rodriguez is a creative midfielder with exceptional vision and passing ability. He has been with the Blue Eagles for 5 seasons.",
        careerHistory: [
          {
            teamId: "103",
            teamName: "Madrid Stars",
            season: "2016-2018",
            role: "Midfielder",
            startDate: "2016-07-01",
            endDate: "2018-06-30",
          },
          {
            teamId: "101",
            teamName: "Blue Eagles",
            season: "2018-Present",
            role: "Midfielder",
            startDate: "2018-07-15",
            endDate: null,
          },
        ],
        achievements: [
          {
            id: "a3",
            title: "Midfielder of the Year",
            description: "Named the league's best midfielder",
            date: "2020-05-18",
            type: "Award",
          },
          {
            id: "a4",
            title: "League Champion",
            description: "Won the league championship with Blue Eagles",
            date: "2021-05-22",
            type: "Trophy",
          },
        ],
        stats: {
          gamesPlayed: 180,
          goalsScored: 35,
          assists: 82,
          yellowCards: 24,
          redCards: 1,
          minutesPlayed: 15300,
          winRate: 0.72,
        },
        socialLinks: {
          twitter: "https://twitter.com/carlosrodriguez",
          instagram: "https://instagram.com/carlosrodriguez",
          facebook: "https://facebook.com/carlosrodriguez",
        },
        donationEnabled: true,
    },
    {
        id: "4",
        name: "Carlos Rodriguez",
        position: "Midfielder",
        team: "Blue Eagles",
        age: 27,
        height: "5'10\"",
        weight: "170 lbs",
        nationality: "Spain",
        jerseyNumber: 8,
        status: "Suspended",
        bio: "Carlos Rodriguez is a creative midfielder with exceptional vision and passing ability. He has been with the Blue Eagles for 5 seasons.",
        careerHistory: [
          {
            teamId: "103",
            teamName: "Madrid Stars",
            season: "2016-2018",
            role: "Midfielder",
            startDate: "2016-07-01",
            endDate: "2018-06-30",
          },
          {
            teamId: "101",
            teamName: "Blue Eagles",
            season: "2018-Present",
            role: "Midfielder",
            startDate: "2018-07-15",
            endDate: null,
          },
        ],
        achievements: [
          {
            id: "a3",
            title: "Midfielder of the Year",
            description: "Named the league's best midfielder",
            date: "2020-05-18",
            type: "Award",
          },
          {
            id: "a4",
            title: "League Champion",
            description: "Won the league championship with Blue Eagles",
            date: "2021-05-22",
            type: "Trophy",
          },
        ],
        stats: {
          gamesPlayed: 180,
          goalsScored: 35,
          assists: 82,
          yellowCards: 24,
          redCards: 1,
          minutesPlayed: 15300,
          winRate: 0.72,
        },
        socialLinks: {
          twitter: "https://twitter.com/carlosrodriguez",
          instagram: "https://instagram.com/carlosrodriguez",
          facebook: "https://facebook.com/carlosrodriguez",
        },
        donationEnabled: true,
    },
    {
        id: "5",
        name: "Carlos Rodriguez",
        position: "Midfielder",
        team: "Blue Eagles",
        age: 27,
        height: "5'10\"",
        weight: "170 lbs",
        nationality: "Spain",
        jerseyNumber: 8,
        status: "Inactive",
        bio: "Carlos Rodriguez is a creative midfielder with exceptional vision and passing ability. He has been with the Blue Eagles for 5 seasons.",
        careerHistory: [
          {
            teamId: "103",
            teamName: "Madrid Stars",
            season: "2016-2018",
            role: "Midfielder",
            startDate: "2016-07-01",
            endDate: "2018-06-30",
          },
          {
            teamId: "101",
            teamName: "Blue Eagles",
            season: "2018-Present",
            role: "Midfielder",
            startDate: "2018-07-15",
            endDate: null,
          },
        ],
        achievements: [
          {
            id: "a3",
            title: "Midfielder of the Year",
            description: "Named the league's best midfielder",
            date: "2020-05-18",
            type: "Award",
          },
          {
            id: "a4",
            title: "League Champion",
            description: "Won the league championship with Blue Eagles",
            date: "2021-05-22",
            type: "Trophy",
          },
        ],
        stats: {
          gamesPlayed: 180,
          goalsScored: 35,
          assists: 82,
          yellowCards: 24,
          redCards: 1,
          minutesPlayed: 15300,
          winRate: 0.72,
        },
        socialLinks: {
          twitter: "https://twitter.com/carlosrodriguez",
          instagram: "https://instagram.com/carlosrodriguez",
          facebook: "https://facebook.com/carlosrodriguez",
        },
        donationEnabled: true,
    }
  ]
export default function PlayersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [positionFilter, setPositionFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredPlayers = players.filter((player) => {
    const matchesSearch =
      player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.nationality.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesPosition = positionFilter === "all" || player.position === positionFilter
    const matchesStatus = statusFilter === "all" || player.status === statusFilter

    return matchesSearch && matchesPosition && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500/20 text-green-700 dark:text-green-400"
      case "Injured":
        return "bg-red-500/20 text-red-700 dark:text-red-400"
      case "Suspended":
        return "bg-amber-500/20 text-amber-700 dark:text-amber-400"
      case "Inactive":
        return "bg-gray-500/20 text-gray-700 dark:text-gray-400"
      default:
        return "bg-gray-500/20 text-gray-700 dark:text-gray-400"
    }
  }
  return (
    <div className="container py-8 mx-auto">


        {/* Энэ хэсэг хэрэггүй гэж үзсэн тул коммэнт хийлээ.*/}


      {/* <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Players</h1>
          <p className="text-muted-foreground">Manage and view all player profiles</p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Player
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div> */}


      <Card>
        <CardHeader>
          <CardTitle>Player Catalog</CardTitle>
          <CardDescription>View and manage all players in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search players..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <div className="w-[180px]">
                <Select value={positionFilter} onValueChange={setPositionFilter}>
                  <SelectTrigger>
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <SelectValue placeholder="Position" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Positions</SelectItem>
                    <SelectItem value="Forward">Forward</SelectItem>
                    <SelectItem value="Midfielder">Midfielder</SelectItem>
                    <SelectItem value="Defender">Defender</SelectItem>
                    <SelectItem value="Goalkeeper">Goalkeeper</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-[180px]">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <SelectValue placeholder="Status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Injured">Injured</SelectItem>
                    <SelectItem value="Suspended">Suspended</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Nationality</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Stats</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPlayers.length > 0 ? (
                  filteredPlayers.map((player) => (
                    <TableRow key={player.id}>
                      <TableCell className="font-medium">{player.name}</TableCell>
                      <TableCell>{player.position}</TableCell>
                      <TableCell>{player.team}</TableCell>
                      <TableCell>{player.age}</TableCell>
                      <TableCell>{player.nationality}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(player.status)} variant="outline">
                          {player.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/players/${player.id}`}>View Stats</Link>
                        </Button>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <span className="sr-only">Open menu</span>
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                              <Link href={`/players/${player.id}`}>View details</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Edit player</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Delete player</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      No players found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            {/* <PlayerTable players={filteredPlayers} getStatusColor={getStatusColor} /> */}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
