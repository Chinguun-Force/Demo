"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { DollarSign, Edit, FileText, Trophy, Target, Zap, Save, Camera } from "lucide-react"

export default function Component() {
  const [isEditing, setIsEditing] = useState(false)
  const [playerData, setPlayerData] = useState({
    name: "Alex Rodriguez",
    username: "AlexR_Pro",
    email: "alex.rodriguez@email.com",
    bio: "Professional esports player specializing in FPS games. 5+ years of competitive experience.",
    team: "Thunder Esports",
    position: "Rifler",
    country: "United States",
  })

  const contractData = {
    team: "Thunder Esports",
    salary: "$8,500/month",
    startDate: "Jan 15, 2024",
    endDate: "Jan 15, 2026",
    status: "Active",
    bonuses: [
      { type: "Tournament Win", amount: "$2,000" },
      { type: "MVP Award", amount: "$1,500" },
      { type: "Streaming Hours", amount: "$500/month" },
    ],
  }

  const donations = [
    { donor: "GamerFan123", amount: "$50", message: "Great play in the finals!", date: "2024-01-20" },
    { donor: "EsportsLover", amount: "$25", message: "Keep up the amazing work!", date: "2024-01-18" },
    { donor: "Anonymous", amount: "$100", message: "You're my favorite player!", date: "2024-01-15" },
    { donor: "TeamSupporter", amount: "$75", message: "Rooting for you!", date: "2024-01-12" },
  ]

  const stats = {
    gamesPlayed: 156,
    winRate: "68%",
    avgKDA: "1.45",
    headshots: "42%",
    mvpAwards: 23,
    tournamentWins: 8,
    earnings: "$45,200",
    rank: "Global Elite",
  }

  const handleSaveProfile = () => {
    setIsEditing(false)
    // Here you would typically save to a backend
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Player Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/placeholder.svg?height=80&width=80" alt={playerData.name} />
                <AvatarFallback className="text-2xl">AR</AvatarFallback>
              </Avatar>
              <Button size="sm" variant="outline" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0">
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold">{playerData.name}</h1>
              <p className="text-muted-foreground">@{playerData.username}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary">{playerData.team}</Badge>
                <Badge variant="outline">{playerData.position}</Badge>
                <Badge variant="outline">{playerData.country}</Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">{stats.rank}</div>
              <p className="text-sm text-muted-foreground">Current Rank</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="contract" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="contract" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Contract
          </TabsTrigger>
          <TabsTrigger value="donations" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Donations
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Edit Profile
          </TabsTrigger>
          <TabsTrigger value="stats" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Stats
          </TabsTrigger>
        </TabsList>

        {/* Contract Tab */}
        <TabsContent value="contract">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Contract Details
              </CardTitle>
              <CardDescription>Current contract information and terms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Team</Label>
                    <p className="text-lg">{contractData.team}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Monthly Salary</Label>
                    <p className="text-lg font-semibold text-green-600">{contractData.salary}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Status</Label>
                    <Badge className="ml-2" variant="default">
                      {contractData.status}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Contract Start</Label>
                    <p className="text-lg">{contractData.startDate}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Contract End</Label>
                    <p className="text-lg">{contractData.endDate}</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <Label className="text-sm font-medium mb-3 block">Performance Bonuses</Label>
                <div className="space-y-2">
                  {contractData.bonuses.map((bonus, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span>{bonus.type}</span>
                      <span className="font-semibold text-green-600">{bonus.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Donations Tab */}
        <TabsContent value="donations">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Recent Donations
              </CardTitle>
              <CardDescription>Support from your fans and community</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {donations.map((donation, index) => (
                  <div key={index} className="flex items-start justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{donation.donor}</span>
                        <Badge variant="outline" className="text-green-600">
                          {donation.amount}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{donation.message}</p>
                      <p className="text-xs text-muted-foreground">{donation.date}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">$250</div>
                  <p className="text-sm text-muted-foreground">This Month</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">$1,240</div>
                  <p className="text-sm text-muted-foreground">Total Donations</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">47</div>
                  <p className="text-sm text-muted-foreground">Total Supporters</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Edit Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Edit className="h-5 w-5" />
                Edit Profile
              </CardTitle>
              <CardDescription>Update your profile information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={playerData.name}
                    onChange={(e) => setPlayerData({ ...playerData, name: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={playerData.username}
                    onChange={(e) => setPlayerData({ ...playerData, username: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={playerData.email}
                  onChange={(e) => setPlayerData({ ...playerData, email: e.target.value })}
                  disabled={!isEditing}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="team">Team</Label>
                  <Input
                    id="team"
                    value={playerData.team}
                    onChange={(e) => setPlayerData({ ...playerData, team: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    value={playerData.position}
                    onChange={(e) => setPlayerData({ ...playerData, position: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={playerData.bio}
                  onChange={(e) => setPlayerData({ ...playerData, bio: e.target.value })}
                  disabled={!isEditing}
                  rows={3}
                />
              </div>

              <div className="flex gap-2 pt-4">
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button onClick={handleSaveProfile}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Stats Tab */}
        <TabsContent value="stats">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Performance Statistics
                </CardTitle>
                <CardDescription>Your competitive gaming statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-2">
                      <Target className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold">{stats.gamesPlayed}</div>
                    <p className="text-sm text-muted-foreground">Games Played</p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-2">
                      <Trophy className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold">{stats.winRate}</div>
                    <p className="text-sm text-muted-foreground">Win Rate</p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-2">
                      <Zap className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="text-2xl font-bold">{stats.avgKDA}</div>
                    <p className="text-sm text-muted-foreground">Avg K/D/A</p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg mx-auto mb-2">
                      <Target className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="text-2xl font-bold">{stats.headshots}</div>
                    <p className="text-sm text-muted-foreground">Headshot %</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>MVP Awards</span>
                    <Badge variant="secondary">{stats.mvpAwards}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Tournament Wins</span>
                    <Badge variant="secondary">{stats.tournamentWins}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Total Earnings</span>
                    <Badge variant="secondary" className="text-green-600">
                      {stats.earnings}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Current Season</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Rank</span>
                    <Badge className="bg-yellow-500">{stats.rank}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Season Wins</span>
                    <Badge variant="outline">34</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Season Earnings</span>
                    <Badge variant="outline" className="text-green-600">
                      $12,500
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
