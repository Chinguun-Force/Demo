"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Upload, FileText, CheckCircle, AlertCircle, X, Send } from "lucide-react"
import Link from "next/link"
import type { Player, Team, Contract } from "@/lib/database"

interface UploadedFile {
  name: string
  size: number
  type: string
  url: string
  uploadedAt: string
}

export default function TeamOwnerContractUpload() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [players, setPlayers] = useState<Player[]>([])
  const [teams, setTeams] = useState<Team[]>([])
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [existingContract, setExistingContract] = useState<Contract | null>(null)

  const preselectedContract = searchParams.get("contract")

  const [formData, setFormData] = useState({
    contract_id: preselectedContract || "",
    player_id: "",
    team_id: "",
    owner_id: "1", // Mock owner ID
    contract_title: "",
    contract_status: "pending" as "pending" | "sent_for_signature" | "signed" | "active",
    contract_files: [] as string[],
    notes: "",
    send_to_player: false,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [playersRes, teamsRes, contractsRes] = await Promise.all([
          fetch("/api/players"),
          fetch("/api/teams"),
          fetch("/api/contracts"),
        ])
        const [playersData, teamsData, contractsData] = await Promise.all([
          playersRes.json(),
          teamsRes.json(),
          contractsRes.json(),
        ])

        // Filter teams owned by current user
        const myTeams = teamsData.filter((team: Team) => team.owner_id === "1")
        setPlayers(playersData)
        setTeams(myTeams)

        // If there's a preselected contract, load its details
        if (preselectedContract) {
          const contract = contractsData.find((c: Contract) => c.id === preselectedContract)
          if (contract) {
            setExistingContract(contract)
            setFormData((prev) => ({
              ...prev,
              contract_id: contract.id,
              player_id: contract.player_id,
              team_id: contract.team_id,
              contract_title: `Contract for Player ${contract.player_id}`,
            }))
          }
        }
      } catch (error) {
        console.error("Failed to fetch data:", error)
      }
    }
    fetchData()
  }, [preselectedContract])

  const handleInputChange = (field: string, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const simulateUploadProgress = () => {
    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const handleFileUpload = async (files: FileList) => {
    if (!files || files.length === 0) return

    setUploading(true)
    simulateUploadProgress()

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        // Validate file type
        if (file.type !== "application/pdf" && !file.type.startsWith("image/")) {
          throw new Error(`Invalid file type: ${file.name}. Only PDF and image files are allowed.`)
        }

        // Validate file size (10MB limit for contracts)
        const maxSize = 10 * 1024 * 1024 // 10MB
        if (file.size > maxSize) {
          throw new Error(`File too large: ${file.name}. Maximum size is 10MB.`)
        }

        const formData = new FormData()
        formData.append("file", file)

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          throw new Error(`Failed to upload ${file.name}`)
        }

        const result = await response.json()
        return {
          name: file.name,
          size: file.size,
          type: file.type,
          url: result.url,
          uploadedAt: new Date().toISOString(),
        }
      })

      const uploadedFiles = await Promise.all(uploadPromises)
      setUploadedFiles((prev) => [...prev, ...uploadedFiles])

      // Add file URLs to form data
      const fileUrls = uploadedFiles.map((file) => file.url)
      setFormData((prev) => ({
        ...prev,
        contract_files: [...prev.contract_files, ...fileUrls],
      }))
    } catch (error) {
      console.error("Upload error:", error)
      alert(error instanceof Error ? error.message : "Failed to upload files")
    } finally {
      setUploading(false)
      setUploadProgress(0)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files)
    }
  }

  const removeFile = (index: number) => {
    const fileToRemove = uploadedFiles[index]
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
    setFormData((prev) => ({
      ...prev,
      contract_files: prev.contract_files.filter((url) => url !== fileToRemove.url),
    }))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (uploadedFiles.length === 0) {
      alert("Please upload at least one contract file")
      return
    }

    setLoading(true)

    try {
      const contractData = {
        ...formData,
        contract_file_url: formData.contract_files[0], // Primary contract file
        additional_files: formData.contract_files.slice(1), // Additional files
        status: formData.send_to_player ? "sent_for_signature" : "pending",
      }

      const endpoint = existingContract ? "/api/team-owner/contracts/upload" : "/api/team-owner/contracts"
      const method = existingContract ? "PATCH" : "POST"

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contractData),
      })

      if (response.ok) {
        const message = formData.send_to_player
          ? "Contract uploaded and sent to player for signature!"
          : "Contract uploaded successfully!"
        alert(message)
        router.push("/dashboard/team-owner")
      } else {
        const error = await response.json()
        alert(error.error || "Failed to upload contract")
      }
    } catch (error) {
      console.error("Submit error:", error)
      alert("Failed to upload contract")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/dashboard/team-owner">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Team Owner Dashboard
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Upload Contract Documents</h1>
        <p className="text-muted-foreground">
          {existingContract ? "Upload files for existing contract" : "Upload signed contract documents"}
        </p>
      </div>

      {existingContract && (
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Existing Contract:</strong> You're uploading files for Contract #{existingContract.id} (Player ID:{" "}
            {existingContract.player_id})
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contract Details */}
        <Card>
          <CardHeader>
            <CardTitle>Contract Information</CardTitle>
            <CardDescription>Specify contract details and upload options</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contract_title">Contract Title</Label>
                <Input
                  id="contract_title"
                  value={formData.contract_title}
                  onChange={(e) => handleInputChange("contract_title", e.target.value)}
                  placeholder="e.g., Player Agreement 2024"
                  required
                />
              </div>

              {!existingContract && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="player_id">Player</Label>
                    <Select
                      value={formData.player_id}
                      onValueChange={(value) => handleInputChange("player_id", value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select player" />
                      </SelectTrigger>
                      <SelectContent>
                        {players.map((player) => (
                          <SelectItem key={player.id} value={player.id}>
                            {player.name} - {player.position}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="team_id">Team</Label>
                    <Select
                      value={formData.team_id}
                      onValueChange={(value) => handleInputChange("team_id", value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select team" />
                      </SelectTrigger>
                      <SelectContent>
                        {teams.map((team) => (
                          <SelectItem key={team.id} value={team.id}>
                            {team.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="contract_status">Contract Status</Label>
                <Select
                  value={formData.contract_status}
                  onValueChange={(value) => handleInputChange("contract_status", value as any)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending Review</SelectItem>
                    <SelectItem value="sent_for_signature">Sent for Signature</SelectItem>
                    <SelectItem value="signed">Signed</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Additional notes about this contract upload..."
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="send_to_player"
                  checked={formData.send_to_player}
                  onChange={(e) => handleInputChange("send_to_player", e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor="send_to_player" className="text-sm">
                  Send contract to player for signature after upload
                </Label>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={loading || uploadedFiles.length === 0} className="flex-1">
                  {loading ? "Uploading..." : formData.send_to_player ? "Upload & Send" : "Upload Contract"}
                  {formData.send_to_player && <Send className="w-4 h-4 ml-2" />}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/dashboard/team-owner">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* File Upload */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Contract Files</CardTitle>
              <CardDescription>Upload signed contracts and supporting documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25 hover:border-muted-foreground/50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">
                  {dragActive ? "Drop files here" : "Upload Contract Files"}
                </h3>
                <p className="text-muted-foreground mb-4">Drag and drop files here, or click to browse</p>
                <Input
                  type="file"
                  multiple
                  accept=".pdf,image/*"
                  onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                  className="hidden"
                  id="file-upload"
                />
                <Button asChild variant="outline" disabled={uploading}>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    {uploading ? "Uploading..." : "Browse Files"}
                  </label>
                </Button>
                <p className="text-xs text-muted-foreground mt-2">Supports PDF and image files up to 10MB each</p>
              </div>

              {uploading && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Uploading files...</span>
                    <span className="text-sm">{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="w-full" />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Uploaded Files ({uploadedFiles.length})</CardTitle>
                <CardDescription>Manage your uploaded contract files</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          {file.type === "application/pdf" ? (
                            <FileText className="w-8 h-8 text-red-500" />
                          ) : (
                            <FileText className="w-8 h-8 text-blue-500" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(file.size)} • {new Date(file.uploadedAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                          className="text-destructive hover:text-destructive"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Status Guide */}
          <Card>
            <CardHeader>
              <CardTitle>Contract Status Guide</CardTitle>
              <CardDescription>Understanding contract statuses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Pending Review</span>
                  <Badge variant="secondary">Pending</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Sent for Signature</span>
                  <Badge variant="outline">Sent</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Signed by Player</span>
                  <Badge variant="default">Signed</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Active Contract</span>
                  <Badge variant="default">Active</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
