"use client"

import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, DollarSign, ExternalLink } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from "react"
import { Player } from "@/lib/type"
import { PlayerTabs } from "./PlayerTabs"
import { useLoaderStore } from '@/store/loaderStore';
import Loader from "@/components/Loader";

export default function PlayerDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const playerId = params.id as string
  const baseUrl = process.env.NEXT_PUBLIC_API_URL
  const [players, setData] = useState<Player>()
  const setLoading = useLoaderStore((state) => state.setLoading);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${baseUrl}/api/v1/players/${playerId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!res.ok) {
          throw new Error(`Failed to fetch players: ${res.status} ${res.statusText}`)
        }
        
        const result = await res.json()
        setData(result)
        console.log(result)
      } catch (error) {
        console.error("Error fetching players:", error)
      } finally {
        setLoading(false);
      }
    }
    getData()
  }, [setLoading, baseUrl, playerId])

  const player = players
  console.log(player , "player")
  if (!player) {
    return (
      <div className="container py-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <h1 className="text-2xl font-bold">Player Not Found</h1>
          <p>The player you are looking for does not exist.</p>
          <Button onClick={() => router.push("/players")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Players
          </Button>
        </div>
      </div>
    )
  }

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
      <Loader />
      <div className="mb-8 flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.push("/players")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Player Profile</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-40 w-40">
                <AvatarImage
                  src={player?.profilePicture}
                  alt={player?.name}
                  className="object-cover"
                />
                <AvatarFallback>{player?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="mt-4 text-2xl font-bold">{player?.name}</h2>
              <div className="mt-1 flex items-center justify-center gap-2">
                <Badge className={getStatusColor(player?.status)} variant="outline">
                  {player?.status}
                </Badge>
                <Badge variant="outline">{player?.position}</Badge>
              </div>
              <div className="mt-4 flex items-center justify-center gap-2">
                <Badge variant="secondary" className="text-lg">
                  #{player?.jerseyNumber}
                </Badge>
              </div>
              <div className="mt-6 grid w-full grid-cols-2 gap-4 text-sm">
                <div className="flex flex-col items-center">
                  <span className="text-muted-foreground">Team</span>
                  <span className="font-medium">{player?.team}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-muted-foreground">Age</span>
                  <span className="font-medium">{player?.age}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-muted-foreground">Height</span>
                  <span className="font-medium">{player?.height}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-muted-foreground">Weight</span>
                    <span className="font-medium">{player?.weight}</span>
                </div>
                <div className="col-span-2 flex flex-col items-center">
                  {/* <span className="text-muted-foreground">Nationality</span> */}
                  {/* <span className="font-medium">{player?.nationality}</span> */}
                </div>
              </div>
              <Separator className="my-6" />
              <div className="flex w-full flex-col gap-4">
                <h3 className="text-lg font-medium">Bio</h3>
                <p className="text-sm text-muted-foreground text-left">{player?.bio}</p>
              </div>
              <Separator className="my-6" />
              <div className="flex w-full flex-col gap-4">
                <h3 className="text-lg font-medium">Social Media</h3>
                <div className="flex justify-center gap-4">
                  {player?.socialLinks.twitter && (
                    <Link href={player?.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="icon">
                        <ExternalLink className="h-4 w-4" />
                        <span className="sr-only">Twitter</span>
                      </Button>
                    </Link>
                  )}
                  {player?.socialLinks.instagram && (
                    <Link href={player?.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="icon">
                        <ExternalLink className="h-4 w-4" />
                        <span className="sr-only">Instagram</span>
                      </Button>
                    </Link>
                  )}
                  {player?.socialLinks.facebook && (
                    <Link href={player?.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="icon">
                        <ExternalLink className="h-4 w-4" />
                        <span className="sr-only">Facebook</span>
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
              {player?.donationEnabled && (
                <>
                  <Separator className="my-6" />
                  <Button className="w-full">
                    <DollarSign className="mr-2 h-4 w-4" />
                    Support This Player
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2 space-y-6">
         <PlayerTabs player={player} />
        </div>
      </div>
    </div>
  )
}
