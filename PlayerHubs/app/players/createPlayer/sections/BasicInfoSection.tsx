"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useProfileStore } from "@/store/profileStore"

interface BasicInfoSectionProps {
  name: string
  setName: (value: string) => void
  age: number
  setAge: (value: number) => void
  height: number
  setHeight: (value: number) => void
  weight: number
  setWeight: (value: number) => void
}

export function BasicInfoSection({
  name,
  setName,
  age,
  setAge,
  height,
  setHeight,
  weight,
  setWeight,
}: BasicInfoSectionProps) {
  // const profile = useProfileStore((state) => state.profile)
  const setProfile = useProfileStore((state) => state.setProfile)
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Basic Information</h2>
        <p className="text-sm text-muted-foreground">Enter the player's personal details and physical attributes.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">
            Full Name
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="Enter player's full name"
            className="h-11"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="age" className="text-sm font-medium">
            Age
          </Label>
          <Input
            id="age"
            type="number"
            value={age}
            onChange={(e) => setProfile((prev) => ({ ...prev, age: Number.parseInt(e.target.value) }))}
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
            onChange={(e) => setProfile((prev) => ({ ...prev, height: Number.parseFloat(e.target.value) }))}
            placeholder="Enter player's height in cm"
            className="h-11"
            required
          />
          <p className="text-xs text-muted-foreground mt-1">Example: 185.5</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="weight" className="text-sm font-medium">
            Weight (kg)
          </Label>
          <Input
            id="weight"
            type="number"
            step="0.1"
            value={weight}
            onChange={(e) => setWeight(Number.parseFloat(e.target.value))}
            placeholder="Enter player's weight in kg"
            className="h-11"
            required
          />
          <p className="text-xs text-muted-foreground mt-1">Example: 78.2</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">
            Profile Picture Url
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setProfile((prev) => ({ ...prev, profilePicture: e.target.value }))}
            placeholder="Enter player's full name"
            className="h-11"
            required
          />
        </div>
      </div>
    </div>
  )
}
