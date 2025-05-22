"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Loader2, Save, ArrowLeft, ArrowRight, UserCircle, Trophy, LinkIcon, BarChart3 } from "lucide-react"
import Link from "next/link"
import { FormProgress } from "./components/FormProgress"
import { AchievementsSection } from "./sections/AchievementSection"
import { BasicInfoSection } from "./sections/BasicInfoSection"
import { BioSection } from "./sections/BioSection"
import { CareerHistorySection } from "./sections/CareerHistorySection"
import { SocialLinksSection } from "./sections/SocialLinkSection"
import { TeamInfoSection } from "./sections/TeamInfoSection"

export default function PlayerForm() {
  const [activeTab, setActiveTab] = useState("basic-info")
  const [isLoading, setIsLoading] = useState(false)
  const [formProgress, setFormProgress] = useState(0)

  // Player basic info
  const [name, setName] = useState("Patrick ")
  const [age, setAge] = useState(38)
  const [height, setHeight] = useState(198.2)
  const [weight, setWeight] = useState(94.3)

  // Team information
  const [position, setPosition] = useState("Defender")
  const [team, setTeam] = useState("Stewart, Brown and Sanchez")
  const [jerseyNumber, setJerseyNumber] = useState(10)
  const [status, setStatus] = useState("SUSPENDED")

  // Bio
  const [bio, setBio] = useState(
    "Dream music however fire out stay safe. Defense child bed.\nPlan high section large. See name claim close all among. Little include billion throughout.",
  )


  // Arrays
  const [careerHistory, setCareerHistory] = useState(["Thomas Ltd", "Taylor, Prince and Davis"])
  const [achievements, setAchievements] = useState(["Actually piece enjoy interesting."])
  const [socialLinks, setSocialLinks] = useState(["https://english.net/", "http://www.watts-crosby.info/"])

  const { toast } = useToast()
  const router = useRouter()
  const baseUrl = process.env.NEXT_PUBLIC_API_URL
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

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
      careerHistory,
      achievements,
      socialLinks,
    }
    try {
      const response = await fetch(`${baseUrl}/api/v1/players`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(playerData),
      })

      const data = await response.json()
      console.log(data)

      if (!response.ok) {
        throw new Error(data.message || "Failed to create player profile")
      }

      if (data.success) {
        toast({
          title: "Profile Created Successfully",
          description: "Your player profile has been created",
          variant: "default",
        })
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Error creating player profile:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create player profile",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)

    // Update progress based on tab
    const tabOrder = ["basic-info", "team-info", "bio", "career", "achievements", "social"]
    const currentIndex = tabOrder.indexOf(value)
    setFormProgress(Math.round((currentIndex / (tabOrder.length - 1)) * 100))
  }

  const goToNextTab = () => {
    const tabOrder = ["basic-info", "team-info", "bio",  "career", "achievements", "social"]
    const currentIndex = tabOrder.indexOf(activeTab)
    if (currentIndex < tabOrder.length - 1) {
      handleTabChange(tabOrder[currentIndex + 1])
    }
  }

  const goToPrevTab = () => {
    const tabOrder = ["basic-info", "team-info", "bio", "career", "achievements", "social"]
    const currentIndex = tabOrder.indexOf(activeTab)
    if (currentIndex > 0) {
      handleTabChange(tabOrder[currentIndex - 1])
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Player Profile</h1>
          <p className="text-muted-foreground">Create or update your player information</p>
        </div>

        <FormProgress progress={formProgress} />

        <form onSubmit={handleSubmit}>
          <Tabs value={activeTab} onValueChange={handleTabChange} className="mt-6">
            <TabsList className="grid grid-cols-6 mb-8">
              <TabsTrigger value="basic-info" className="flex flex-col items-center gap-1 py-3">
                <UserCircle className="h-5 w-5" />
                <span className="hidden md:inline text-xs">Basic Info</span>
              </TabsTrigger>
              <TabsTrigger value="team-info" className="flex flex-col items-center gap-1 py-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="m7.5 12.5 3 3 6-6" />
                </svg>
                <span className="hidden md:inline text-xs">Team</span>
              </TabsTrigger>
              <TabsTrigger value="bio" className="flex flex-col items-center gap-1 py-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                  <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
                  <path d="M9 9h1" />
                  <path d="M9 13h6" />
                  <path d="M9 17h6" />
                </svg>
                <span className="hidden md:inline text-xs">Bio</span>
              </TabsTrigger>
              <TabsTrigger value="career" className="flex flex-col items-center gap-1 py-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                  <path d="m9 16 2 2 4-4" />
                </svg>
                <span className="hidden md:inline text-xs">Career</span>
              </TabsTrigger>
              <TabsTrigger value="achievements" className="flex flex-col items-center gap-1 py-3">
                <Trophy className="h-5 w-5" />
                <span className="hidden md:inline text-xs">Awards</span>
              </TabsTrigger>
              <TabsTrigger value="social" className="flex flex-col items-center gap-1 py-3">
                <LinkIcon className="h-5 w-5" />
                <span className="hidden md:inline text-xs">Social</span>
              </TabsTrigger>
            </TabsList>

            <Card className="border rounded-lg shadow-sm">
              <TabsContent value="basic-info" className="p-6">
                <BasicInfoSection
                  name={name}
                  setName={setName}
                  age={age}
                  setAge={setAge}
                  height={height}
                  setHeight={setHeight}
                  weight={weight}
                  setWeight={setWeight}
                />
              </TabsContent>

              <TabsContent value="team-info" className="p-6">
                <TeamInfoSection
                  position={position}
                  setPosition={setPosition}
                  team={team}
                  setTeam={setTeam}
                  jerseyNumber={jerseyNumber}
                  setJerseyNumber={setJerseyNumber}
                  status={status}
                  setStatus={setStatus}
                />
              </TabsContent>

              <TabsContent value="bio" className="p-6">
                <BioSection bio={bio} setBio={setBio} />
              </TabsContent>

              <TabsContent value="career" className="p-6">
                <CareerHistorySection careerHistory={careerHistory} setCareerHistory={setCareerHistory} />
              </TabsContent>

              <TabsContent value="achievements" className="p-6">
                <AchievementsSection achievements={achievements} setAchievements={setAchievements} />
              </TabsContent>

              <TabsContent value="social" className="p-6">
                <SocialLinksSection socialLinks={socialLinks} setSocialLinks={setSocialLinks} />
              </TabsContent>

              <div className="p-6 border-t flex justify-between">
                <div>
                  {activeTab !== "basic-info" && (
                    <Button type="button" variant="outline" onClick={goToPrevTab}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Previous
                    </Button>
                  )}
                </div>
                <div className="flex gap-3">
                  <Link
                    href="/players"
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                  >
                    Cancel
                  </Link>

                  {activeTab !== "social" ? (
                    <Button type="button" onClick={goToNextTab}>
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button type="submit" disabled={isLoading} className="bg-green-600 hover:bg-green-700">
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Profile
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </Tabs>
        </form>
      </div>
    </div>
  )
}
