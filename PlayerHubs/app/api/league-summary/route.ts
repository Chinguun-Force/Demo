import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { LeagueSummary } from '@/lib/models'

export async function GET(request: NextRequest) {
  try {
    const db = await getDatabase()
    const leagueSummaryCollection = db.collection<LeagueSummary>('leaguesummaries')

    const summaries = await leagueSummaryCollection.find().toArray()

    return NextResponse.json({
      summaries,
      total: summaries.length
    })

  } catch (error) {
    console.error('Get league summaries API error:', error)
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
    const leagueSummaryCollection = db.collection<LeagueSummary>('leaguesummaries')

    const { teamName, leagueName } = body
    if (!teamName || !leagueName) {
      return NextResponse.json(
        { error: 'Team name and league name are required' },
        { status: 400 }
      )
    }

    const newSummary: LeagueSummary = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const result = await leagueSummaryCollection.insertOne(newSummary)

    return NextResponse.json({
      message: 'League summary created successfully',
      summary: { ...newSummary, _id: result.insertedId }
    }, { status: 201 })

  } catch (error) {
    console.error('Create league summary API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}