"use client"

import { useState } from "react"
import { Plus, Trash2, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useProfileStore } from "@/store/profileStore"

type Profile = {
  careerHistory?: string[]
  // add other profile properties as needed
}

export function CareerHistorySection() {
  const profile = (useProfileStore((state) => state.profile) as Profile) || {}
  const careerHistory = profile.careerHistory || []
  const setProfile = useProfileStore((state) => state.setProfile)

  const [newTeam, setNewTeam] = useState("")

  const updateField = (field: string, value: any) =>
    setProfile((prev) => ({ ...prev, [field]: value }))

  const addCareerTeam = () => {
    const team = newTeam.trim()
    if (!team) return
    updateField("careerHistory", [...careerHistory, team])
    setNewTeam("")
  }

  const removeCareerTeam = (index: number) => {
    updateField(
      "careerHistory",
      careerHistory.filter((_, i) => i !== index)
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Career History</h2>
        <p className="text-sm text-muted-foreground">
          Add the teams where the player has played throughout their career.
        </p>
      </div>

      <div className="space-y-4">
        {/* Input + Add button */}
        <div className="flex gap-3">
          <Input
            placeholder="Add previous team"
            value={newTeam}
            onChange={(e) => setNewTeam(e.target.value)}
            className="h-11"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                addCareerTeam()
              }
            }}
          />
          <Button type="button" onClick={addCareerTeam} className="h-11 px-4">
            <Plus className="h-4 w-4 mr-2" />
            Add Team
          </Button>
        </div>

        {/* No data placeholder */}
        {careerHistory.length === 0 ? (
          <div className="text-center py-8 border border-dashed rounded-lg">
            <Calendar className="h-10 w-10 mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-muted-foreground">No teams added yet</p>
            <p className="text-xs text-muted-foreground">
              Add teams where the player has played
            </p>
          </div>
        ) : (
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-medium mb-3">Team History</h3>
              <div className="space-y-2">
                {careerHistory.map((team, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        {team.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium">{team}</div>
                        <div className="text-xs text-muted-foreground">
                          Previous Team
                        </div>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeCareerTeam(idx)}
                      className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove team</span>
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
