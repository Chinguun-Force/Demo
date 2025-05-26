import { type NextRequest, NextResponse } from "next/server"
import { Database, type Team } from "@/lib/database"

export async function GET() {
  try {
    const teams = await Database.getTeams()
    return NextResponse.json(teams)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch teams" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { name, owner_id, description, founded_year } = body
    if (!name || !owner_id || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newTeam: Team = {
      id: Date.now().toString(),
      name,
      owner_id,
      description,
      logo: body.logo,
      founded_year: Number.parseInt(founded_year) || new Date().getFullYear(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    console.log("Creating team:", newTeam)

    return NextResponse.json(newTeam, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create team" }, { status: 500 })
  }
}
