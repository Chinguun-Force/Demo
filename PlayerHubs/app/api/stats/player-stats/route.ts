import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { PlayerStats } from '@/lib/models'
import { ObjectId } from 'mongodb'

export async function GET(request: NextRequest) {
  try {
    const db = await getDatabase()
    const playerStatsCollection = db.collection<PlayerStats>('playerstats')

    const stats = await playerStatsCollection.find().toArray()

    return NextResponse.json({
      stats,
      total: stats.length
    })

  } catch (error) {
    console.error('Get player stats API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const db = await getDatabase()
    const playerStatsCollection = db.collection<PlayerStats>('playerstats')

    const { playerId } = body
    if (!playerId) {
      return NextResponse.json(
        { error: 'Player ID is required' },
        { status: 400 }
      )
    }

    const newStats: PlayerStats = {
      ...body,
      playerId: new ObjectId(playerId),
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const result = await playerStatsCollection.insertOne(newStats)

    return NextResponse.json({
      message: 'Player stats created successfully',
      stats: { ...newStats, _id: result.insertedId }
    }, { status: 201 })

  } catch (error) {
    console.error('Create player stats API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}