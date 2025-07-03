import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { LeagueSummary } from '@/lib/models'
import { ObjectId } from 'mongodb'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid league summary ID' },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    const leagueSummaryCollection = db.collection<LeagueSummary>('leaguesummaries')

    const summary = await leagueSummaryCollection.findOne({ _id: new ObjectId(id) })

    if (!summary) {
      return NextResponse.json(
        { error: 'League summary not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(summary)

  } catch (error) {
    console.error('Get league summary by ID API error:', error)
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
        { error: 'Invalid league summary ID' },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    const leagueSummaryCollection = db.collection<LeagueSummary>('leaguesummaries')

    const updateFields = {
      ...body,
      updatedAt: new Date()
    }

    const result = await leagueSummaryCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'League summary not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: 'League summary updated successfully'
    })

  } catch (error) {
    console.error('Update league summary API error:', error)
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
        { error: 'Invalid league summary ID' },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    const leagueSummaryCollection = db.collection<LeagueSummary>('leaguesummaries')

    const result = await leagueSummaryCollection.deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'League summary not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: 'League summary deleted successfully'
    })

  } catch (error) {
    console.error('Delete league summary API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}