"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Edit, Save } from "lucide-react"
import { useProfileStore } from "@/store/profileStore"
import { toast } from "sonner"

export function EditProfileTab() {
  const { profile, setProfile } = useProfileStore()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    age: 0,
    height: 0,
    weight: 0,
    position: "",
    team: "",
    jerseyNumber: 0,
    status: "",
    bio: "",
    profilePicture: "",
  })

  // Use useEffect to sync formData with the profile from the store
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        age: profile.age || 0,
        height: Number(profile.height) || 0,
        weight: Number(profile.weight) || 0,
        position: profile.position || "",
        team: profile.teamId || "",
        jerseyNumber: profile.jerseyNumber || 0,
        status: profile.status || "",
        bio: profile.bio || "",
        profilePicture: profile.profilePicture || "",
      })
    }
  }, [profile]) // This effect runs only when the profile object changes

  const handleSaveProfile = () => {
    if (!profile) {
      toast.error("No profile found to update")
      return
    }

    // Validate required fields
    if (!formData.name || !formData.position) {
      toast.error("Name and position are required fields")
      return
    }

    setProfile({
      ...profile,
      name: formData.name,
      age: formData.age,
      height: String(formData.height),
      weight: String(formData.weight),
      position: formData.position,
      teamId: formData.team,
      jerseyNumber: formData.jerseyNumber,      
      status: formData.status,
      bio: formData.bio,
      profilePicture: formData.profilePicture,
    })

    setIsEditing(false)
    toast.success("Profile updated successfully!")
  }

  const handleCancel = () => {
    // Reset form data to original profile values
    if (profile) {
      setFormData({
        name: profile.name || "",
        age: profile.age || 0,
        height: Number(profile.height) || 0,
        weight: Number(profile.weight) || 0,
        position: profile.position || "",
        team: profile.teamId || "",
        jerseyNumber: profile.jerseyNumber || 0,
        status: profile.status || "",
        bio: profile.bio || "",
        profilePicture: profile.profilePicture || "",
      })
    }
    setIsEditing(false)
  }

  if (!profile) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <p className="text-muted-foreground">No profile data available to edit</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Edit className="h-5 w-5" />
          Edit Profile
        </CardTitle>
        <CardDescription>Update your profile information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Нэр *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={!isEditing}
              placeholder="Enter your full name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="position">Байрлал *</Label>
            <Input
              id="position"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              disabled={!isEditing}
              placeholder="e.g., Rifler, Support, AWPer"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="age">Нас</Label>
            <Input
              id="age"
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: Number.parseInt(e.target.value) || 0 })}
              disabled={!isEditing}
              placeholder="Age"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="height">Өндөр (cm)</Label>
            <Input
              id="height"
              type="number"
              value={formData.height}
              onChange={(e) => setFormData({ ...formData, height: Number.parseInt(e.target.value) || 0 })}
              disabled={!isEditing}
              placeholder="Height in cm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight">Жин (kg)</Label>
            <Input
              id="weight"
              type="number"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: Number.parseInt(e.target.value) || 0 })}
              disabled={!isEditing}
              placeholder="Weight in kg"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="team">Баг</Label>
            <Input
              id="team"
              value={formData.team}
              onChange={(e) => setFormData({ ...formData, team: e.target.value })}
              disabled={!isEditing}
              placeholder="Current team"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="jerseyNumber">Өмсөглийн дугаар</Label>
            <Input
              id="jerseyNumber"
              type="number"
              value={formData.jerseyNumber}
              onChange={(e) => setFormData({ ...formData, jerseyNumber: Number.parseInt(e.target.value) || 0 })}
              disabled={!isEditing}
              placeholder="Jersey number"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Input
              id="status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              disabled={!isEditing}
              placeholder="e.g., Active, Inactive, Retired"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="profilePicture">Profile Picture URL</Label>
            <Input
              id="profilePicture"
              value={formData.profilePicture}
              onChange={(e) => setFormData({ ...formData, profilePicture: e.target.value })}
              disabled={!isEditing}
              placeholder="Profile picture URL"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            disabled={!isEditing}
            rows={3}
            placeholder="Tell us about yourself..."
          />
        </div>

        <div className="flex gap-2 pt-4">
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <>
              <Button onClick={handleSaveProfile}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
 