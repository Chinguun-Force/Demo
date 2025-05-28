"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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

export function TeamInfoSection({
  position,
  setPosition,
  team,
  setTeam,
  jerseyNumber,
  setJerseyNumber,
  status,
  setStatus,
}: TeamInfoSectionProps) {
  const teams = useTeamStore((state) => state.teams)
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
          <Select value={position} onValueChange={setPosition}>
            <SelectTrigger className="h-11">
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
          <Label htmlFor="team" className="text-sm font-medium">
            Current Team
          </Label>
          <Select value={team} onValueChange={setTeam}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Багаа сонгоно уу"/>
            </SelectTrigger>
            <SelectContent>
              {
                teams.map((team) => (
                  <SelectItem key={team._id} value={team._id}>
                    <div className="flex items-center">
                      <img src={team.teamLogo || "/placeholder.svg"} alt={team.teamName} className="h-6 w-6 mr-2" />
                      {team.teamName}
                    </div>
                  </SelectItem>
                ))
              }
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
            onChange={(e) => setJerseyNumber(Number.parseInt(e.target.value))}
            placeholder="Enter jersey number"
            className="h-11"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status" className="text-sm font-medium">
            Player Status
          </Label>
          <Select value={status} onValueChange={setStatus}>
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
