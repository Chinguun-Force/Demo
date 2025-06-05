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
            Хувийн статистик
          </CardTitle>
          <CardDescription>Таны улиралын stats</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-2">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold">{stats.gamesPlayed}</div>
              <p className="text-sm text-muted-foreground">Нийт орлоцсон тоглолт</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-2">
                <Trophy className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold">{stats.winRate}</div>
              <p className="text-sm text-muted-foreground">Хожлын хувь</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-2">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold">{stats.avgKDA}</div>
              <p className="text-sm text-muted-foreground">Нэг тоглолтонд авсан дундаж онооны хувь</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg mx-auto mb-2">
                <Target className="h-6 w-6 text-red-600" />
              </div>
              <div className="text-2xl font-bold">{stats.headshots}</div>
              <p className="text-sm text-muted-foreground">Холын зайн довтолгооны хувь </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Aмжилт</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span>MVP Awards</span>
              <Badge variant="secondary">{stats.mvpAwards}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Аваргын тоо</span>
              <Badge variant="secondary">{stats.tournamentWins}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Нийт авсан орлого</span>
              <Badge variant="secondary" className="text-green-600">
                {stats.earnings}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Энэ улиралд</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Багийн амжилт</span>
              <Badge className="bg-yellow-500">{stats.rank}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Энэ улиралын хожил</span>
              <Badge variant="outline">19-8</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Энэ улиралд олсон олсон орлого</span>
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
 