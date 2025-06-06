"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useProfileStore } from "@/store/profileStore"
import PlayerPhotoSection from "./PhotoSection"

export function BasicInfoSection() {
  const profile = useProfileStore((state) => state.profile) || {};
  const { name = "", age = 0, height = 0, weight = 0, profilePicture = "" } = profile as {
    name?: string;
    age?: number;
    height?: number;
    weight?: number;
    profilePicture?: string;
  };
  const setProfile = useProfileStore((state) => state.setProfile)

  const updateField = (field: string, value: string | number) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }
  // console.log("BasicInfoSection profile", profile)
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Basic Information</h2>
        <p className="text-sm text-muted-foreground">Enter the player's personal details and physical attributes.</p>
      </div>

      {/* Photo Section */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">
            Нэр
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="Enter player's full name"
            className="h-11"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="age" className="text-sm font-medium">
            Нас
          </Label>
          <Input
            id="age"
            type="number"
            value={age}
            onChange={(e) => updateField("age", Number.parseInt(e.target.value) || 0)}
            placeholder="Enter player's age"
            className="h-11"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="height" className="text-sm font-medium">
            Height (cm)
          </Label>
          <Input
            id="height"
            type="number"
            step="0.1"
            value={height}
            onChange={(e) => updateField("height", Number.parseFloat(e.target.value) || 0)}
            placeholder="Enter player's height in cm"
            className="h-11"
            required
          />
          <p className="text-xs text-muted-foreground mt-1">Example: 185.5</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="weight" className="text-sm font-medium">
            Жин (kg)
          </Label>
          <Input
            id="weight"
            type="number"
            step="0.1"
            value={weight}
            onChange={(e) => updateField("weight", Number.parseFloat(e.target.value) || 0)}
            placeholder="Enter player's weight in kg"
            className="h-11"
            required
          />
          <p className="text-xs text-muted-foreground mt-1">Example: 78.2</p>
        </div>
      </div>
    </div>
  )
}
