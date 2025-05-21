"use client"

import type React from "react"

import { useState } from "react"
import { Loader2, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"


export default function PlayerForm() {
  const [isLoading, setIsLoading] = useState(false)

  // Player basic info
  const [name, setName] = useState("Patrick ")
  const [age, setAge] = useState(38)
  const [height, setHeight] = useState(198.2)
  const [weight, setWeight] = useState(94.3)
  const [position, setPosition] = useState("Defender")
  const [team, setTeam] = useState("Stewart, Brown and Sanchez")
  const [jerseyNumber, setJerseyNumber] = useState(10)
  const [status, setStatus] = useState("SUSPENDED")
  const [bio, setBio] = useState(
    "Dream music however fire out stay safe. Defense child bed.\nPlan high section large. See name claim close all among. Little include billion throughout.",
  )

  // Player stats
  const [goals, setGoals] = useState(55)
  const [assists, setAssists] = useState(48)
  const [appearances, setAppearances] = useState(101)

  // Arrays
  const [careerHistory, setCareerHistory] = useState(["Thomas Ltd", "Taylor, Prince and Davis"])
  const [achievements, setAchievements] = useState(["Actually piece enjoy interesting."])
  const [socialLinks, setSocialLinks] = useState(["https://english.net/", "http://www.watts-crosby.info/"])

  // Form inputs
  const [newTeam, setNewTeam] = useState("")
  const [newAchievement, setNewAchievement] = useState("")
  const [newSocialLink, setNewSocialLink] = useState("")
  const { toast } = useToast()
  const router = useRouter()
  const baseUrl = process.env.NEXT_PUBLIC_API_URL
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Construct player data object
    const playerData = {
      name,
      age,
      height,
      weight,
      position,
      team,
      jerseyNumber,
      status,
      bio,
      stats: {
        goals,
        assists,
        appearances,
      },
      careerHistory,
      achievements,
      socialLinks,
    }

    // Simulate API call
    try {
      await fetch(`${baseUrl}/api/v1/players`,{
        
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(playerData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok")
          }
          return response.json()
        })
        .then((data) => {
          console.log(data)
          if(data.success){
            toast
            ({
              title: "Та өөрийн профайлыг амжилттай үүсгэлээ",
              description: "Таны профайл амжилттай үүсгэлээ",
            })
      router.push("/dashboard")
          }
        })
    } catch (error) {
      console.error("Error creating player profile:", error)
    }

  }

  const addCareerTeam = () => {
    if (newTeam.trim()) {
      setCareerHistory([...careerHistory, newTeam])
      setNewTeam("")
    }
  }

  const removeCareerTeam = (index: number) => {
    setCareerHistory(careerHistory.filter((_, i) => i !== index))
  }

  const addAchievement = () => {
    if (newAchievement.trim()) {
      setAchievements([...achievements, newAchievement])
      setNewAchievement("")
    }
  }

  const removeAchievement = (index: number) => {
    setAchievements(achievements.filter((_, i) => i !== index))
  }

  const addSocialLink = () => {
    if (newSocialLink.trim()) {
      setSocialLinks([...socialLinks, newSocialLink])
      setNewSocialLink("")
    }
  }

  const removeSocialLink = (index: number) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index))
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Player Profile</CardTitle>
          <CardDescription>Enter player information to create or update a profile</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(Number.parseInt(e.target.value))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    step="0.1"
                    value={height}
                    onChange={(e) => setHeight(Number.parseFloat(e.target.value))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    value={weight}
                    onChange={(e) => setWeight(Number.parseFloat(e.target.value))}
                    required
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Team Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Team Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Select value={position} onValueChange={setPosition}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Goalkeeper">Goalkeeper</SelectItem>
                      <SelectItem value="Defender">Defender</SelectItem>
                      <SelectItem value="Midfielder">Midfielder</SelectItem>
                      <SelectItem value="Forward">Forward</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="team">Current Team</Label>
                  <Input id="team" value={team} onChange={(e) => setTeam(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jerseyNumber">Jersey Number</Label>
                  <Input
                    id="jerseyNumber"
                    type="number"
                    value={jerseyNumber}
                    onChange={(e) => setJerseyNumber(Number.parseInt(e.target.value))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                      <SelectItem value="INJURED">INJURED</SelectItem>
                      <SelectItem value="SUSPENDED">SUSPENDED</SelectItem>
                      <SelectItem value="RETIRED">RETIRED</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio">Player Bio</Label>
              <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={4} />
            </div>

            <Separator />

            {/* Stats */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Player Stats</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="goals">Goals</Label>
                  <Input
                    id="goals"
                    type="number"
                    value={goals}
                    onChange={(e) => setGoals(Number.parseInt(e.target.value))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assists">Assists</Label>
                  <Input
                    id="assists"
                    type="number"
                    value={assists}
                    onChange={(e) => setAssists(Number.parseInt(e.target.value))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="appearances">Appearances</Label>
                  <Input
                    id="appearances"
                    type="number"
                    value={appearances}
                    onChange={(e) => setAppearances(Number.parseInt(e.target.value))}
                    required
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Career History */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Career History</h3>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2 mb-2">
                  {careerHistory.map((team, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {team}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 p-0 ml-1"
                        onClick={() => removeCareerTeam(index)}
                      >
                        <Trash2 className="h-3 w-3" />
                        <span className="sr-only">Remove team</span>
                      </Button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Add previous team" value={newTeam} onChange={(e) => setNewTeam(e.target.value)} />
                  <Button type="button" variant="outline" size="icon" onClick={addCareerTeam}>
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Add team</span>
                  </Button>
                </div>
              </div>
            </div>

            <Separator />

            {/* Achievements */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Achievements</h3>
              <div className="space-y-2">
                <div className="flex flex-col gap-2 mb-2">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="flex-1 bg-muted p-2 rounded-md">{achievement}</div>
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeAchievement(index)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove achievement</span>
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add achievement"
                    value={newAchievement}
                    onChange={(e) => setNewAchievement(e.target.value)}
                  />
                  <Button type="button" variant="outline" size="icon" onClick={addAchievement}>
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Add achievement</span>
                  </Button>
                </div>
              </div>
            </div>

            <Separator />

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Social Links</h3>
              <div className="space-y-2">
                <div className="flex flex-col gap-2 mb-2">
                  {socialLinks.map((link, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input value={link} readOnly className="flex-1" />
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeSocialLink(index)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove link</span>
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="https://example.com"
                    value={newSocialLink}
                    onChange={(e) => setNewSocialLink(e.target.value)}
                  />
                  <Button type="button" variant="outline" size="icon" onClick={addSocialLink}>
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Add link</span>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving player data...
                </>
              ) : (
                "Create Player Profile"
              )}
            </Button>
            <div className="text-center text-sm">
              <Link href="/players" className="text-primary underline-offset-4 hover:underline">
                Back to Players List
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
