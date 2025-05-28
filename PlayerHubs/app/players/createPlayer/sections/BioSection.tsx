"use client"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useProfileStore } from "@/store/profileStore"

interface BioSectionProps {
  bio: string
  setBio: (value: string) => void
}

export function BioSection({ bio, setBio }: BioSectionProps) {
    const setProfile = useProfileStore((state) => state.setProfile)
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Player Biography</h2>
        <p className="text-sm text-muted-foreground">
          Write a detailed biography about the player's background and career.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio" className="text-sm font-medium">
          Biography
        </Label>
        <Textarea
          id="bio"
          value={bio}
          onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
          placeholder="Enter player's biography, background, and notable career moments..."
          className="min-h-[200px] resize-y"
          rows={8}
        />
        <p className="text-xs text-muted-foreground mt-1">
          Include relevant information about the player's background, playing style, and career highlights.
        </p>
      </div>
    </div>
  )
}
