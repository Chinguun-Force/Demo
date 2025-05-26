import { type NextRequest, NextResponse } from "next/server"
import type { Contract } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      player_id,
      team_id,
      owner_id,
      contract_title,
      salary,
      duration_months,
      start_date,
      template_id,
      performance_bonuses,
      termination_clause,
      confidentiality_clause,
      non_compete_clause,
      contract_preview,
    } = body

    if (!player_id || !team_id || !owner_id || !contract_title) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Calculate end date
    const startDate = new Date(start_date)
    const endDate = new Date(startDate)
    endDate.setMonth(endDate.getMonth() + Number.parseInt(duration_months || "12"))

    const newContract: Contract = {
      id: Date.now().toString(),
      player_id,
      team_id,
      owner_id,
      contract_file_url: "", // Will be added when files are uploaded
      salary: Number.parseFloat(salary || "0"),
      duration_months: Number.parseInt(duration_months || "12"),
      status: "pending",
      start_date: startDate.toISOString().split("T")[0],
      end_date: endDate.toISOString().split("T")[0],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    // Store additional contract metadata (in real app, save to database)
    const contractMetadata = {
      ...newContract,
      contract_title,
      template_id,
      performance_bonuses,
      termination_clause,
      confidentiality_clause,
      non_compete_clause,
      contract_preview,
    }

    console.log("Creating team owner contract:", contractMetadata)

    return NextResponse.json(newContract, { status: 201 })
  } catch (error) {
    console.error("Contract creation error:", error)
    return NextResponse.json({ error: "Failed to create contract" }, { status: 500 })
  }
}
