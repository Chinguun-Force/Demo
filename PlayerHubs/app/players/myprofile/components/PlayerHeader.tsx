"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera } from "lucide-react"
import { useProfileStore } from "@/store/profileStore"
import { useState, useEffect } from "react"
import { Team } from "@/types/team"
import Spinner from "@/components/ui/spinner"


interface PlayerHeaderProps {
  stats: {
    rank: string
  }
}

export function PlayerHeader({stats }: PlayerHeaderProps) {
  const profile = useProfileStore.getState().profile
  console.log(profile?.teamId)
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/teams/${profile?.teamId}`);
      const data = await response.json();
      setTeam(data.team);
      setLoading(false);
    };

    if (profile?.teamId) {
      fetchTeam();
    }
  }, []);
  console.log(team?.teamName)
  return (
    <Card>
      <CardContent className="pt-6">
        {
        loading ? (
          <div className="flex justify-center items-center h-20">
            <Spinner />
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar className="h-20 w-20">
                <AvatarImage src={useProfileStore.getState().profile?.profilePicture || "/placeholder.svg"} alt={useProfileStore.getState().profile?.name} />
                <AvatarFallback className="text-2xl">AR</AvatarFallback>
              </Avatar>
              <Button size="sm" variant="outline" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0">
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold">{useProfileStore.getState().profile?.name || useProfileStore.getState().profile?.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                {useProfileStore.getState().profile?.jerseyNumber && <Badge variant="outline">{useProfileStore.getState().profile?.jerseyNumber}</Badge>}
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">{team?.teamName}</div>
              <p className="text-sm text-muted-foreground">{useProfileStore.getState().profile?.position}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
