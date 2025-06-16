import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { PlayerStats } from '@/lib/models'
import { ObjectId } from 'mongodb'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid stats ID' },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    const playerStatsCollection = db.collection<PlayerStats>('playerstats')

    const stats = await playerStatsCollection.findOne({ _id: new ObjectId(id) })

    if (!stats) {
      return NextResponse.json(
        { error: 'Player stats not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(stats)

  } catch (error) {
    console.error('Get player stats by ID API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid stats ID' },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    const playerStatsCollection = db.collection<PlayerStats>('playerstats')

    const updateFields = {
      ...body,
      playerId: body.playerId ? new ObjectId(body.playerId) : undefined,
      updatedAt: new Date()
    }

    const result = await playerStatsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Player stats not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: 'Player stats updated successfully'
    })

  } catch (error) {
    console.error('Update player stats API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid stats ID' },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    const playerStatsCollection = db.collection<PlayerStats>('playerstats')

    const result = await playerStatsCollection.deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Player stats not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: 'Player stats deleted successfully'
    })

  } catch (error) {
    console.error('Delete player stats API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}