"use client"

import { useState, type ChangeEvent, useEffect, useRef } from "react"

import { uploadToCloudinary } from "@/lib/cloudinary"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useProfileStore } from "@/store/profileStore"

export default function PlayerPhotoSection() {
  const profile = useProfileStore((state) => state.profile)
  const updateProfile = useProfileStore.getState().setProfile
  const clearProfile = useProfileStore.getState().clearProfile

  const [currentPhoto, setCurrentPhoto] = useState<string>(
    profile?.profilePicture || "/placeholder.svg?height=128&width=128"
  )
  
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Clear profile data when the component mounts
    clearProfile()
  }, [clearProfile])

  useEffect(() => {
    // Update current photo when profile changes
    if (profile?.profilePicture) {
      setCurrentPhoto(profile.profilePicture)
    }
  }, [profile?.profilePicture])

  const handlePhotoUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file.",
        variant: "destructive",
      })
      return
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB.",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    try {
      const cloudinaryUrl = await uploadToCloudinary(file)
      setCurrentPhoto(cloudinaryUrl)
      updateProfile((prev) => ({
        ...prev!,
        profilePicture: cloudinaryUrl,
      }))

      toast({
        title: "Photo uploaded successfully",
        description: "Your profile photo has been updated.",
        variant: "default",
      })
    } catch (err) {
      console.error("Upload error:", err)
      toast({
        title: "Upload failed",
        description: "Failed to upload photo. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
      // Reset the input value so the same file can be selected again
      event.target.value = ""
    }
  }

  const handleRemovePhoto = () => {
    setCurrentPhoto("/placeholder.svg?height=128&width=128")
    updateProfile((prev) => ({
      ...prev!,
      profilePicture: "/placeholder.svg?height=128&width=128",
    }))

    toast({
      title: "Photo removed",
      description: "Your profile photo has been removed.",
      variant: "default",
    })
  }

  return (
    <div className="max-w-full mx-auto p-6 bg-white dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Upload Profile Photo</h2>
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <img
            src={currentPhoto || "/placeholder.svg"}
            alt="Profile"
            className="w-32 h-32 rounded-full shadow-lg object-cover border-4 border-gray-200 dark:border-gray-700"
          />
          {profile?.profilePicture && (
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute -top-2 -right-2 rounded-full w-8 h-8 p-0"
              onClick={handleRemovePhoto}
              disabled={isUploading}
            >
              ×
            </Button>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          disabled={isUploading}
          className="hidden"
        />

        <Button type="button" variant="outline" disabled={isUploading} onClick={() => fileInputRef.current?.click()}>
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            "Choose Photo"
          )}
        </Button>

        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          Supported formats: JPG, PNG, GIF (max 5MB)
        </p>
      </div>
    </div>
  )
}
