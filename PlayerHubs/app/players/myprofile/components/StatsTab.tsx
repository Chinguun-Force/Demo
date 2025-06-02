import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Target, Zap } from "lucide-react"

interface Stats {
  gamesPlayed: number
  winRate: string
  avgKDA: string
  headshots: string
  mvpAwards: number
  tournamentWins: number
  earnings: string
  rank: string
}

interface StatsTabProps {
  stats: Stats
}

export function StatsTab({ stats }: StatsTabProps) {
  return (
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
  )
}
