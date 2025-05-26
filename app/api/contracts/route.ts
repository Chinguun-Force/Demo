import { type NextRequest, NextResponse } from "next/server"
import { Database, type Contract } from "@/lib/database"

export async function GET() {
  try {
    const contracts = await Database.getContracts()
    return NextResponse.json(contracts)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch contracts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { player_id, team_id, owner_id, salary, duration_months, start_date } = body
    if (!player_id || !team_id || !owner_id || !salary || !duration_months || !start_date) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Calculate end date
    const startDate = new Date(start_date)
    const endDate = new Date(startDate)
    endDate.setMonth(endDate.getMonth() + Number.parseInt(duration_months))

    const newContract: Contract = {
      id: Date.now().toString(),
      player_id,
      team_id,
      owner_id,
      contract_file_url: body.contract_file_url || "",
      salary: Number.parseFloat(salary),
      duration_months: Number.parseInt(duration_months),
      status: "pending",
      start_date: startDate.toISOString().split("T")[0],
      end_date: endDate.toISOString().split("T")[0],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    console.log("Creating contract:", newContract)

    return NextResponse.json(newContract, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create contract" }, { status: 500 })
  }
}
