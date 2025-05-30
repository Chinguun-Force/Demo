"use client"

import { useState } from "react"
import { Plus, Trash2, LinkIcon, Instagram, Twitter, Facebook, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useProfileStore } from "@/store/profileStore"

type Profile = {
  socialLinks?: string[]
  // add other profile fields if needed
}

export function SocialLinksSection() {
  const profile = (useProfileStore((state) => state.profile) as Profile) || {}
  const socialLinks = profile.socialLinks || []
  const setProfile = useProfileStore((state) => state.setProfile)

  const [newSocialLink, setNewSocialLink] = useState("")

  const updateField = (field: string, value: any) =>
    setProfile((prev) => ({ ...prev, [field]: value }))

  const addSocialLink = () => {
    const link = newSocialLink.trim()
    if (!link) return
    updateField("socialLinks", [...socialLinks, link])
    setNewSocialLink("")
  }

  const removeSocialLink = (index: number) => {
    updateField(
      "socialLinks",
      socialLinks.filter((_, i) => i !== index)
    )
  }

  const getSocialIcon = (url: string) => {
    if (url.includes("instagram")) return <Instagram className="h-4 w-4" />
    if (url.includes("twitter") || url.includes("x.com")) return <Twitter className="h-4 w-4" />
    if (url.includes("facebook")) return <Facebook className="h-4 w-4" />
    if (url.includes("youtube")) return <Youtube className="h-4 w-4" />
    return <LinkIcon className="h-4 w-4" />
  }

  const getSocialName = (url: string) => {
    try {
      const domain = new URL(url).hostname.replace("www.", "")
      const base = domain.split(".")[0]
      return base.charAt(0).toUpperCase() + base.slice(1)
    } catch {
      return "Website"
    }
  }

  const getSocialColor = (url: string) => {
    if (url.includes("instagram")) return "bg-pink-100 text-pink-600"
    if (url.includes("twitter") || url.includes("x.com")) return "bg-blue-100 text-blue-600"
    if (url.includes("facebook")) return "bg-indigo-100 text-indigo-600"
    if (url.includes("youtube")) return "bg-red-100 text-red-600"
    return "bg-gray-100 text-gray-600"
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Social Media Links</h2>
        <p className="text-sm text-muted-foreground">
          Add the player's social media profiles and online presence.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex gap-3">
          <Input
            placeholder="https://example.com"
            value={newSocialLink}
            onChange={(e) => setNewSocialLink(e.target.value)}
            className="h-11"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                addSocialLink()
              }
            }}
          />
          <Button type="button" onClick={addSocialLink} className="h-11 px-4">
            <Plus className="h-4 w-4 mr-2" />
            Add Link
          </Button>
        </div>

        {socialLinks.length === 0 ? (
          <div className="text-center py-8 border border-dashed rounded-lg">
            <LinkIcon className="h-10 w-10 mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-muted-foreground">No social links added yet</p>
            <p className="text-xs text-muted-foreground">Add social media profiles and websites</p>
          </div>
        ) : (
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-medium mb-3">Social Media Profiles</h3>
              <div className="space-y-3">
                {socialLinks.map((link, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${getSocialColor(link)}`}
                    >
                      {getSocialIcon(link)}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{getSocialName(link)}</div>
                      <div className="text-xs text-muted-foreground truncate max-w-[200px] md:max-w-[300px]">
                        {link}
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-8 mr-2"
                      onClick={() => window.open(link, "_blank")}
                    >
                      Visit
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSocialLink(index)}
                      className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove link</span>
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
