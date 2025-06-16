"use client"

import { useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useProfileStore } from "@/store/profileStore"
import { useTeamStore } from "@/store/teamStore"

interface TeamInfoSectionProps {
  position: string
  setPosition: (value: string) => void
  team: string
  setTeam: (value: string) => void
  jerseyNumber: number
  setJerseyNumber: (value: number) => void
  status: string
  setStatus: (value: string) => void
}

export function TeamInfoSection() {
  const teams = useTeamStore((state) => state.teams)
  const fetchTeams = useTeamStore((state) => state.fetchTeams)
  const isLoading = useTeamStore((state) => state.isLoading)
  const profile = useProfileStore((state) => state.profile) || {};
  const { position = "", teamId = "", jerseyNumber = "", status = "" } = profile as {
    position?: string;
    teamId?: string;
    jerseyNumber?: number | string;
    status?: string;
  };
  const setProfile = useProfileStore((state) => state.setProfile)
  const hasFetchedRef = useRef(false)

  useEffect(() => {
    if (!hasFetchedRef.current && teams.length === 0 && !isLoading) {
      hasFetchedRef.current = true
      console.log('Fetching teams from TeamInfoSection...')
      fetchTeams()
    }
  }, [teams.length, isLoading, fetchTeams])

  const handleRefreshTeams = () => {
    hasFetchedRef.current = false
    fetchTeams()
  }

  const updateField = (field: string, value: string | number) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }
  console.log("TeamInfoSection data", {
    position, teamId, jerseyNumber, status, teams: teams.length
  })
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Team Information</h2>
        <p className="text-sm text-muted-foreground">Enter details about the player's current team and position.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="position" className="text-sm font-medium">
            Position
          </Label>
          <Select value={position} onValueChange={(value) => updateField("position", value)}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Select position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Point Guard">Point Guard</SelectItem>
              <SelectItem value="Shooting Guard">Shooting Guard</SelectItem>
              <SelectItem value="Small Forward">Small Forward</SelectItem>
              <SelectItem value="Power Forward">Power Forward</SelectItem>
              <SelectItem value="Center">Center</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="team" className="text-sm font-medium">
              Team
            </Label>
            <button
              type="button"
              onClick={handleRefreshTeams}
              className="text-xs text-blue-500 hover:text-blue-700"
            >
              Refresh Teams ({teams.length})
            </button>
          </div>
          <Select value={teamId} onValueChange={(value) => updateField("teamId", value)}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder={isLoading ? "Loading teams..." : teams.length === 0 ? "No teams available" : "Select team"} />
            </SelectTrigger>
            <SelectContent>
              {teams.map((team) => (
                <SelectItem key={team._id} value={team._id}>
                  <div className="flex items-center space-x-2">
                    <img
                      src={team.teamLogo || "/placeholder.svg"}
                      alt={team.teamName}
                      className="h-6 w-6 rounded object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iI0Y0RjRGNSIvPgo8L3N2Zz4K'
                      }}
                    />
                    <span>{team.teamName}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="jerseyNumber" className="text-sm font-medium">
            Jersey Number
          </Label>
          <Input
            id="jerseyNumber"
            type="number"
            value={jerseyNumber}
            onChange={(e) => updateField("jerseyNumber", e.target.value ? Number.parseInt(e.target.value) || "" : "")}
            placeholder="Enter jersey number"
            className="h-11"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status" className="text-sm font-medium">
            Player Status
          </Label>
          <Select value={status} onValueChange={(value) => updateField("status", value)}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ACTIVE">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  ACTIVE
                </div>
              </SelectItem>
              <SelectItem value="INJURED">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                  INJURED
                </div>
              </SelectItem>
              <SelectItem value="SUSPENDED">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></div>
                  SUSPENDED
                </div>
              </SelectItem>
              <SelectItem value="RETIRED">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-gray-500 mr-2"></div>
                  RETIRED
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
