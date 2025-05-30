"use client"

import React, { useState } from "react"
import { Plus, Trash2, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useProfileStore } from "@/store/profileStore"

type Profile = {
  achievements?: string[]
  // add other profile properties if needed
}

export function AchievementsSection() {
  const profile = (useProfileStore((state) => state.profile) as Profile) || {}
  const achievements = profile.achievements || []
  const setProfile = useProfileStore((state) => state.setProfile)

  const [newAchievement, setNewAchievement] = useState("")

  const updateField = (field: string, value: any) =>
    setProfile((prev) => ({ ...prev, [field]: value }))

  const addAchievement = () => {
    const entry = newAchievement.trim()
    if (!entry) return
    updateField("achievements", [...achievements, entry])
    setNewAchievement("")
  }

  const removeAchievement = (index: number) => {
    updateField(
      "achievements",
      achievements.filter((_, i) => i !== index)
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          Achievements & Awards
        </h2>
        <p className="text-sm text-muted-foreground">
          Add the player's notable achievements, awards, and recognitions.
        </p>
      </div>

      <div className="space-y-4">
        {/* Input + Add button */}
        <div className="flex gap-3">
          <Input
            placeholder="Add achievement or award"
            value={newAchievement}
            onChange={(e) => setNewAchievement(e.target.value)}
            className="h-11"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                addAchievement()
              }
            }}
          />
          <Button type="button" onClick={addAchievement} className="h-11 px-4">
            <Plus className="h-4 w-4 mr-2" />
            Add Award
          </Button>
        </div>

        {/* No achievements placeholder or list */}
        {achievements.length === 0 ? (
          <div className="text-center py-8 border border-dashed rounded-lg">
            <Award className="h-10 w-10 mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-muted-foreground">
              No achievements added yet
            </p>
            <p className="text-xs text-muted-foreground">
              Add awards and achievements the player has earned
            </p>
          </div>
        ) : (
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-medium mb-3">
                Awards & Achievements
              </h3>
              <div className="space-y-3">
                {achievements.map((ach, idx) => (
                  <div
                    key={idx}
                    className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="h-8 w-8 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center mr-3">
                      <Trophy className="h-4 w-4" />
                    </div>
                    <div className="flex-1">{ach}</div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeAchievement(idx)}
                      className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 ml-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove achievement</span>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

/** SVG Trophy icon */
function Trophy(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  )
}
