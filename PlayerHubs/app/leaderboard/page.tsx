import Link from "next/link"
import { ArrowLeft, Trophy, Medal, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function LeaderboardPage() {
  const leaderboard = [
    { rank: 1, name: "Хүлэгүүд", score: 19-8, avatar: "/placeholder.svg?height=40&width=40", badge: "gold" },
    { rank: 2, name: "Bob Smith", score: 2380, avatar: "/placeholder.svg?height=40&width=40", badge: "silver" },
    { rank: 3, name: "Carol Davis", score: 2290, avatar: "/placeholder.svg?height=40&width=40", badge: "bronze" },
    { rank: 4, name: "David Wilson", score: 2150, avatar: "/placeholder.svg?height=40&width=40", badge: null },
    { rank: 5, name: "Eva Brown", score: 2080, avatar: "/placeholder.svg?height=40&width=40", badge: null },
    { rank: 6, name: "Frank Miller", score: 1950, avatar: "/placeholder.svg?height=40&width=40", badge: null },
    { rank: 7, name: "Grace Lee", score: 1890, avatar: "/placeholder.svg?height=40&width=40", badge: null },
    { rank: 8, name: "Henry Taylor", score: 1820, avatar: "/placeholder.svg?height=40&width=40", badge: null },
  ]

  const getRankIcon = (rank: number, badge: string | null) => {
    if (badge === "gold") return <Trophy className="h-5 w-5 text-yellow-500" />
    if (badge === "silver") return <Medal className="h-5 w-5 text-gray-400" />
    if (badge === "bronze") return <Award className="h-5 w-5 text-amber-600" />
    return <span className="text-lg font-bold text-gray-600">#{rank}</span>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/">
              <Button variant="ghost" size="sm" className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">Leaderboard</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Card>
            <CardHeader>
              <CardTitle>Top Performers</CardTitle>
              <CardDescription>See how you rank against other players based on assessment scores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboard.map((player) => (
                  <div
                    key={player.rank}
                    className={`flex items-center justify-between p-4 rounded-lg border ${
                      player.rank <= 3 ? "bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200" : "bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-8">
                        {getRankIcon(player.rank, player.badge)}
                      </div>
                      <Avatar>
                        <AvatarImage src={player.avatar || "/placeholder.svg"} alt={player.name} />
                        <AvatarFallback>
                          {player.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900">{player.name}</p>
                        {player.rank <= 3 && (
                          <Badge variant="secondary" className="text-xs">
                            Top {player.rank}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">{player.score}</p>
                      <p className="text-sm text-gray-500">points</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
