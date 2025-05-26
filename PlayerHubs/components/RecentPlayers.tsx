import { Link } from 'lucide-react'
import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card'

const RecentPlayers = () => {
  return (
    <div>
      <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Players</CardTitle>
            <CardDescription>Recently added or updated player profiles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center">
                  <div className="mr-4 h-10 w-10 rounded-full bg-muted" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">Player {i}</p>
                    <p className="text-sm text-muted-foreground">
                      Team {i} • Position: {i % 2 ? "Forward" : "Defender"}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {i} day{i !== 1 ? "s" : ""} ago
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link href="/players" className="text-sm text-primary underline-offset-4 hover:underline">
                View all players
              </Link>
            </div>
          </CardContent>
        </Card> 
    </div>
  )
}

export default RecentPlayers
