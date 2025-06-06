"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Loader2,
  Save,
  ArrowLeft,
  ArrowRight,
  UserCircle,
  Trophy,
  LinkIcon,
  BarChart3,
} from "lucide-react"
import Link from "next/link"

import { FormProgress } from "./components/FormProgress"
import { BasicInfoSection } from "./sections/BasicInfoSection"
import { TeamInfoSection } from "./sections/TeamInfoSection"
import { BioSection } from "./sections/BioSection"
import { CareerHistorySection } from "./sections/CareerHistorySection"
// import { AchievementsSection } from "./sections/AchievementsSection"
// import { SocialLinksSection } from "./sections/SocialLinksSection"

import { useProfileStore, PlayerProfile } from "@/store/profileStore"
import { AchievementsSection } from "./sections/AchievementSection"
import { SocialLinksSection } from "./sections/SocialLinkSection"
import PlayerPhotoSection from "./sections/PhotoSection"

export default function PlayerForm() {
  const [activeTab, setActiveTab] = useState("profile-picture")
  const [isLoading, setIsLoading] = useState(false)
  const [formProgress, setFormProgress] = useState(0)

  const { toast } = useToast()
  const router = useRouter()
  const baseUrl = process.env.NEXT_PUBLIC_API_URL
  // Pull entire profile object from the store
  const profileState = useProfileStore((state) => state.profile)
  const setProfile = useProfileStore((state) => state.setProfile)
  // console.log("profileState", profileState)
  // console.log("formData", )
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Ensure profileState is not null before proceeding
    if (!profileState) {
      toast({
        title: "Error",
        description: "Profile data is not available. Please fill the form.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const playerCreateResponse = await fetch(`${baseUrl}/api/v1/players`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(profileState), // Use profileState directly
        })

      const playerData = await playerCreateResponse.json()
      if (!playerCreateResponse.ok) {
        throw new Error(playerData.message || "Failed to create player profile")
      }
      console.log("playerData", playerData)
      const newPlayerId = playerData.player._id;

      // Check if a team was selected (profileState.teamId exists)
      // and player creation was successful (newPlayerId exists)
      
      if (profileState.teamId && newPlayerId) {
        try {
          // First, fetch the current team data to get existing members
          const getTeamResponse = await fetch(`${baseUrl}/api/v1/teams/${profileState.teamId}`);
          if (!getTeamResponse.ok) {
            throw new Error("Failed to fetch team details before updating.");
          }
          const teamData = await getTeamResponse.json();
          const existingTeamMembers = teamData.team.teamMembers || [];

          // Add the new player to the existing list
          const updatedTeamMembers = [...existingTeamMembers, newPlayerId];

          const teamUpdateResponse = await fetch(`${baseUrl}/api/v1/teams/${profileState.teamId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ teamMembers: updatedTeamMembers }),
          });

          if (!teamUpdateResponse.ok) {
            const teamUpdateErrorData = await teamUpdateResponse.json();
            console.error("Failed to update team:", teamUpdateErrorData.message || "Unknown error updating team");
            toast({
              title: "Profile Created, Team Update Issue",
              description: `Player profile created, but failed to add player to team: ${teamUpdateErrorData.message || "Unknown error"}`,
              // Using "default" or "destructive" if "warning" is not available
              // For now, let's use default and rely on the title/description for context
              variant: "default",
            });
          } else {
            console.log(`Team ${profileState.teamId} updated successfully with player ${newPlayerId}`);
          }
        } catch (teamUpdateErr) {
          console.error("Error during team update API call:", teamUpdateErr);
          toast({
            title: "Profile Created, Team Update Exception",
            description: `Player profile created, but an error occurred while updating the team. ${teamUpdateErr instanceof Error ? teamUpdateErr.message : "Network error"}`,
            variant: "default", // Changed from warning
          });
        }
      }

      toast({
        title: "Profile Created Successfully",
        description: "Your player profile has been created.",
        variant: "default",
      })
      router.push("/dashboard")
    } catch (err) {
      console.error(err)
      toast({
        title: "Error",
        description:
          err instanceof Error
            ? err.message
            : "Failed to create player profile",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const updateField = async (field: string, value: string | number) => {
    setProfile((prev) => ({ ...prev, [field]: value }))

    if (field === "teamId") {
      try {
        const teamResponse = await fetch(`${baseUrl}/api/v1/teams/${value}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          // Only attempt to update team if playerId exists in profile and playerId is defined
          body: profileState && (profileState as any).playerId
            ? JSON.stringify({ $push: { teamMembers: (profileState as any).playerId } })
            : undefined,
        })

        if (!teamResponse.ok) {
          const teamData = await teamResponse.json()
          throw new Error(teamData.message || "Failed to update team")
        }
      } catch (err) {
        console.error("Failed to update team:", err)
      }
    }
  }

  const tabOrder = [
    "profile-picture",
    "basic-info",
    "team-info",
    "bio",
    "career",
    "achievements",
    "social",
  ]

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    const idx = tabOrder.indexOf(value)
    setFormProgress(Math.round((idx / (tabOrder.length - 1)) * 100))
  }

  const goToNextTab = () => {
    const idx = tabOrder.indexOf(activeTab)
    if (idx < tabOrder.length - 1) handleTabChange(tabOrder[idx + 1])
  }

  const goToPrevTab = () => {
    const idx = tabOrder.indexOf(activeTab)
    if (idx > 0) handleTabChange(tabOrder[idx - 1])
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Player Profile</h1>
          <p className="text-muted-foreground">
            Create or update your player information
          </p>
        </header>

        <FormProgress progress={formProgress} />

        <form onSubmit={handleSubmit}>
          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            className="mt-6"
          >
            <TabsList className="grid grid-cols-7 mb-8">
            <TabsTrigger
                value="profile-picture"
                className="flex flex-col items-center gap-1 py-3"
              >
                <UserCircle className="h-5 w-5" />
                <span className="hidden md:inline text-xs">
                  Profile Picture
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="basic-info"
                className="flex flex-col items-center gap-1 py-3"
              >
                <UserCircle className="h-5 w-5" />
                <span className="hidden md:inline text-xs">
                  Basic Info
                </span>
              </TabsTrigger>

              <TabsTrigger
                value="team-info"
                className="flex flex-col items-center gap-1 py-3"
              >
                <BarChart3 className="h-5 w-5" />
                <span className="hidden md:inline text-xs">Team</span>
              </TabsTrigger>

              <TabsTrigger
                value="bio"
                className="flex flex-col items-center gap-1 py-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                  <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
                  <path d="M9 9h1" />
                  <path d="M9 13h6" />
                  <path d="M9 17h6" />
                </svg>
                <span className="hidden md:inline text-xs">Bio</span>
              </TabsTrigger>

              <TabsTrigger
                value="career"
                className="flex flex-col items-center gap-1 py-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                  <path d="m9 16 2 2 4-4" />
                </svg>
                <span className="hidden md:inline text-xs">Career</span>
              </TabsTrigger>

              <TabsTrigger
                value="achievements"
                className="flex flex-col items-center gap-1 py-3"
              >
                <Trophy className="h-5 w-5" />
                <span className="hidden md:inline text-xs">Awards</span>
              </TabsTrigger>

              <TabsTrigger
                value="social"
                className="flex flex-col items-center gap-1 py-3"
              >
                <LinkIcon className="h-5 w-5" />
                <span className="hidden md:inline text-xs">Social</span>
              </TabsTrigger>
            </TabsList>

            <Card className="border rounded-lg shadow-sm">
              <TabsContent value="profile-picture" className="p-6">
                <PlayerPhotoSection />
              </TabsContent>
              <TabsContent value="basic-info" className="p-6">
                <BasicInfoSection />
              </TabsContent>

              <TabsContent value="team-info" className="p-6">
                <TeamInfoSection />
              </TabsContent>

              <TabsContent value="bio" className="p-6">
                <BioSection />
              </TabsContent>

              <TabsContent value="career" className="p-6">
                <CareerHistorySection />
              </TabsContent>

              <TabsContent value="achievements" className="p-6">
                <AchievementsSection />
              </TabsContent>

              <TabsContent value="social" className="p-6">
                <SocialLinksSection />
              </TabsContent>

              <div className="p-6 border-t flex justify-between">
                <div>
                  {activeTab !== "basic-info" && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={goToPrevTab}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Previous
                    </Button>
                  )}
                </div>
                <div className="flex gap-3">
                  <Link
                    href="/players"
                    className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    Cancel
                  </Link>

                  {activeTab !== "social" ? (
                    <Button
                      type="button"
                      onClick={goToNextTab}
                    >
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-green-600 hover:bg-green-700"
                    >
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
