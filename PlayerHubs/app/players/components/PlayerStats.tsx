import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Player } from "@/lib/type"
import { BarChart, XAxis, YAxis, CartesianGrid, Legend, Bar, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface PlayerStatsProps {
  player: Player
}

export function PlayerStats({ player }: PlayerStatsProps) {
  // Create some sample performance data for visualization
  const performanceData = [
    { month: "Jan", goals: 30, assists: 20, minutesPlayed: 270 },
    { month: "Feb", goals: 20, assists: 30, minutesPlayed: 360 },
    { month: "Mar", goals: 40, assists: 10, minutesPlayed: 270 },
    { month: "Apr", goals: 10, assists: 40, minutesPlayed: 360 },
    { month: "May", goals: 50, assists: 20, minutesPlayed: 450 },
    { month: "Jun", goals: 22, assists: 30, minutesPlayed: 270 },
  ]
  console.log(player.stats)
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Season Statistics</CardTitle>
          <CardDescription>Performance metrics for the current season</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
            <div className="grid items-center justify-center text-center rounded-lg border p-4">
              <span className="text-sm text-muted-foreground">Тоглолт</span>
              <span className="text-2xl font-bold">{player.stats[0]?.gamesPlayed}</span>
            </div>
            <div className="grid items-center justify-center text-center rounded-lg border p-4">
              <span className="text-sm text-muted-foreground">Оноо</span>
              <span className="text-2xl font-bold">{player.stats[0]?.fieldGoals?.percentage}</span>
            </div>
            <div className="grid items-center justify-center text-center rounded-lg border p-4">
              <span className="text-sm text-muted-foreground">Оновчтой дамжуулалт</span>
              <span className="text-2xl font-bold">{player.stats[0]?.assists}</span>
            </div>
            <div className="grid items-center justify-center text-center rounded-lg border p-4">
              <span className="text-sm text-muted-foreground">Алсын зайн шидэлт</span>
              <span className="text-2xl font-bold">{player.stats[0]?.threePoints?.percentage}</span>
            </div>
            <div className="grid items-center justify-center text-center rounded-lg border p-4">
              <span className="text-sm text-muted-foreground">Чөлөөт шидэлт</span>
              <span className="text-2xl font-bold">{player.stats[0]?.freeThrows?.percentage}</span>
            </div>
            <div className="grid items-center justify-center text-center rounded-lg border p-4">
              <span className="text-sm text-muted-foreground">Самбараас бөмбөг авалт</span>
              <span className="text-2xl font-bold">{player.stats[0]?.rebounds?.total}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Performance Trends</CardTitle>
          <CardDescription>Monthly performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-fit">
            <ChartContainer
              config={{
                goals: {
                  label: "Goals",
                  color: "hsl(var(--chart-1))",
                },
                assists: {
                  label: "Assists",
                  color: "hsl(var(--chart-2))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="goals" fill="var(--color-goals)" name="Goals" />
                  <Bar dataKey="assists" fill="var(--color-assists)" name="Assists" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
