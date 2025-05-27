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
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, FileText, Download } from "lucide-react"
import Link from "next/link"
import type { Player, Team } from "@/lib/database"

interface ContractTemplate {
  id: string
  name: string
  description: string
  clauses: string[]
}

export default function CreateContract() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [players, setPlayers] = useState<Player[]>([])
  const [teams, setTeams] = useState<Team[]>([])
  const [templates, setTemplates] = useState<ContractTemplate[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<ContractTemplate | null>(null)

  const preselectedPlayer = searchParams.get("player")
  const preselectedTeam = searchParams.get("team")

  const [formData, setFormData] = useState({
    player_id: preselectedPlayer || "",
    team_id: preselectedTeam || "",
    owner_id: "1", // Mock owner ID
    contract_title: "",
    salary: "",
    duration_months: "",
    start_date: "",
    contract_description: "",
    template_id: "",
    custom_clauses: [] as string[],
    performance_bonuses: "",
    termination_clause: "",
    confidentiality_clause: true,
    non_compete_clause: false,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [playersRes, teamsRes] = await Promise.all([fetch("/api/players"), fetch("/api/teams")])
        const [playersData, teamsData] = await Promise.all([playersRes.json(), teamsRes.json()])

        // Filter teams owned by current user
        const myTeams = teamsData.filter((team: Team) => team.owner_id === "1")
        setPlayers(playersData)
        setTeams(myTeams)

        // Mock contract templates
        setTemplates([
          {
            id: "standard",
            name: "Standard Player Contract",
            description: "Basic contract template for regular players",
            clauses: [
              "Player agrees to participate in all scheduled practices and games",
              "Player will maintain professional conduct at all times",
              "Team provides equipment and training facilities",
              "Salary paid monthly in equal installments",
            ],
          },
          {
            id: "premium",
            name: "Premium Player Contract",
            description: "Enhanced contract with additional benefits",
            clauses: [
              "Player agrees to participate in all scheduled practices and games",
              "Player will maintain professional conduct at all times",
              "Team provides equipment, training facilities, and accommodation",
              "Salary paid monthly with performance bonuses",
              "Health insurance and medical coverage included",
              "Marketing and streaming revenue sharing agreement",
            ],
          },
          {
            id: "trial",
            name: "Trial Period Contract",
            description: "Short-term contract for evaluation period",
            clauses: [
              "30-day trial period with option to extend",
              "Player agrees to participate in practices and scrimmages",
              "Basic equipment provided by team",
              "Performance evaluation at end of trial period",
            ],
          },
        ])
      } catch (error) {
        console.error("Failed to fetch data:", error)
      }
    }
    fetchData()
  }, [])

  const handleInputChange = (field: string, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId)
    setSelectedTemplate(template || null)
    handleInputChange("template_id", templateId)

    if (template) {
      handleInputChange("contract_title", template.name)
      handleInputChange("contract_description", template.description)
    }
  }

  const generateContractPreview = () => {
    const player = players.find((p) => p.id === formData.player_id)
    const team = teams.find((t) => t.id === formData.team_id)

    if (!player || !team) return ""

    return `
PLAYER CONTRACT AGREEMENT

This agreement is made between ${team.name} ("Team") and ${player.name} ("Player").

CONTRACT DETAILS:
- Position: ${player.position}
- Salary: $${Number.parseInt(formData.salary || "0").toLocaleString()} annually
- Duration: ${formData.duration_months} months
- Start Date: ${formData.start_date}

${selectedTemplate ? "STANDARD CLAUSES:\n" + selectedTemplate.clauses.map((clause, i) => `${i + 1}. ${clause}`).join("\n") : ""}

${formData.performance_bonuses ? `\nPERFORMANCE BONUSES:\n${formData.performance_bonuses}` : ""}

${formData.termination_clause ? `\nTERMINATION CLAUSE:\n${formData.termination_clause}` : ""}

${formData.confidentiality_clause ? "\nCONFIDENTIALITY: Player agrees to maintain confidentiality of team strategies and internal information." : ""}

${formData.non_compete_clause ? "\nNON-COMPETE: Player agrees not to join competing teams during contract period." : ""}

This contract is governed by the laws of the jurisdiction where the team is based.

Signatures:
Team Owner: ___________________ Date: ___________
Player: _______________________ Date: ___________
    `.trim()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const contractData = {
        ...formData,
        contract_preview: generateContractPreview(),
      }

      const response = await fetch("/api/team-owner/contracts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contractData),
      })

      if (response.ok) {
        const result = await response.json()
        alert("Contract created successfully! You can now upload the signed document.")
        router.push(`/dashboard/team-owner/contracts/upload?contract=${result.id}`)
      } else {
        const error = await response.json()
        alert(error.error || "Failed to create contract")
      }
    } catch (error) {
      console.error("Submit error:", error)
      alert("Failed to create contract")
    } finally {
      setLoading(false)
    }
  }

  const downloadContractPreview = () => {
    const preview = generateContractPreview()
    const blob = new Blob([preview], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "contract-preview.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
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
        <h1 className="text-3xl font-bold">Create Player Contract</h1>
        <p className="text-muted-foreground">Generate a new contract for your team</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contract Form */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contract Details</CardTitle>
              <CardDescription>Fill in the contract information</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="template_id">Contract Template</Label>
                  <Select onValueChange={handleTemplateSelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a template" />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedTemplate && <p className="text-sm text-muted-foreground">{selectedTemplate.description}</p>}
                </div>

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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="salary">Annual Salary ($)</Label>
                    <Input
                      id="salary"
                      type="number"
                      min="0"
                      value={formData.salary}
                      onChange={(e) => handleInputChange("salary", e.target.value)}
                      placeholder="50000"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration_months">Duration (months)</Label>
                    <Select onValueChange={(value) => handleInputChange("duration_months", value)} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 month (Trial)</SelectItem>
                        <SelectItem value="3">3 months</SelectItem>
                        <SelectItem value="6">6 months</SelectItem>
                        <SelectItem value="12">1 year</SelectItem>
                        <SelectItem value="24">2 years</SelectItem>
                        <SelectItem value="36">3 years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="start_date">Start Date</Label>
                  <Input
                    id="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => handleInputChange("start_date", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="performance_bonuses">Performance Bonuses (Optional)</Label>
                  <Textarea
                    id="performance_bonuses"
                    value={formData.performance_bonuses}
                    onChange={(e) => handleInputChange("performance_bonuses", e.target.value)}
                    placeholder="e.g., $5,000 bonus for tournament wins, $1,000 for MVP awards..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="termination_clause">Termination Clause (Optional)</Label>
                  <Textarea
                    id="termination_clause"
                    value={formData.termination_clause}
                    onChange={(e) => handleInputChange("termination_clause", e.target.value)}
                    placeholder="Specify conditions under which the contract can be terminated..."
                    rows={3}
                  />
                </div>

                <div className="space-y-4">
                  <Label>Additional Clauses</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="confidentiality"
                        checked={formData.confidentiality_clause}
                        onCheckedChange={(checked) => handleInputChange("confidentiality_clause", checked as boolean)}
                      />
                      <Label htmlFor="confidentiality" className="text-sm">
                        Include confidentiality clause
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="non_compete"
                        checked={formData.non_compete_clause}
                        onCheckedChange={(checked) => handleInputChange("non_compete_clause", checked as boolean)}
                      />
                      <Label htmlFor="non_compete" className="text-sm">
                        Include non-compete clause
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="submit" disabled={loading} className="flex-1">
                    {loading ? "Creating..." : "Create Contract"}
                  </Button>
                  <Button type="button" variant="outline" asChild>
                    <Link href="/dashboard/team-owner">Cancel</Link>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Contract Preview */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Contract Preview</CardTitle>
                  <CardDescription>Live preview of your contract</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={downloadContractPreview}>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/50 p-4 rounded-lg">
                <pre className="text-xs whitespace-pre-wrap font-mono">{generateContractPreview()}</pre>
              </div>
            </CardContent>
          </Card>

          {selectedTemplate && (
            <Card>
              <CardHeader>
                <CardTitle>Template Clauses</CardTitle>
                <CardDescription>Standard clauses included in this template</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {selectedTemplate.clauses.map((clause, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <FileText className="w-4 h-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                      <span className="text-sm">{clause}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
