import { type NextRequest, NextResponse } from "next/server"
import { Database, type Player } from "@/lib/database"

export async function GET() {
  try {
    const players = await Database.getPlayers()
    return NextResponse.json(players)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch players" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const { name, email, position, age } = body
    if (!name || !email || !position || !age) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create new player (mock implementation)
    const newPlayer: Player = {
      id: Date.now().toString(),
      name,
      email,
      position,
      age: Number.parseInt(age),
      team_id: body.team_id,
      profile_image: body.profile_image,
      stats: {
        games_played: 0,
        goals: 0,
        assists: 0,
        points: 0,
        rating: 0,
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    // In a real app, save to database here
    console.log("Creating player:", newPlayer)

    return NextResponse.json(newPlayer, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create player" }, { status: 500 })
  }
}
