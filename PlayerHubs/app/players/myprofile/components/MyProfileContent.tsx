"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, Edit, FileText, Trophy } from "lucide-react"
import { ContractTab } from "./ContractTab"
import { DonationsTab } from "./DonationTab"
import { EditProfileTab } from "./EditProfileTab"
import { PlayerHeader } from "./PlayerHeader"
import { StatsTab } from "./StatsTab"
import { useState } from "react"

export default function MyProfileContent() {
  const contractData = {
    team: "Empasoft Esports",
    salary: "$8,500/month",
    startDate: "Jan 15, 2024",
    endDate: "Jan 15, 2026",
    status: "Active",
    bonuses: [
      { type: "Tournament Win", amount: "$2,000" },
      { type: "MVP Award", amount: "$1,500" },
      { type: "Streaming Hours", amount: "$500/month" },
    ],
  }

  const donations = [
    { donor: "GamerFan123", amount: "$50", message: "Great play in the finals!", date: "2024-01-20" },
    { donor: "EsportsLover", amount: "$25", message: "Keep up the amazing work!", date: "2024-01-18" },
    { donor: "Anonymous", amount: "$100", message: "You're my favorite player!", date: "2024-01-15" },
    { donor: "TeamSupporter", amount: "$75", message: "Rooting for you!", date: "2024-01-12" },
  ]

  const stats = {
    gamesPlayed: 156,
    winRate: "68%",
    avgKDA: "1.45",
    headshots: "42%",
    mvpAwards: 23,
    tournamentWins: 8,
    earnings: "$45,200",
    rank: "Global Elite",
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <PlayerHeader stats={stats} />

      <Tabs defaultValue="contract" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="contract" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Contract
          </TabsTrigger>
          <TabsTrigger value="donations" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Donations
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Edit Profile
          </TabsTrigger>
          <TabsTrigger value="stats" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Stats
          </TabsTrigger>
        </TabsList>

        <TabsContent value="contract">
          <ContractTab contractData={contractData} />
        </TabsContent>

        <TabsContent value="donations">
          <DonationsTab donations={donations} />
        </TabsContent>

        <TabsContent value="profile">
          <EditProfileTab />
        </TabsContent>

        <TabsContent value="stats">
          <StatsTab stats={stats} />
        </TabsContent>
      </Tabs>
    </div>
  )
} 