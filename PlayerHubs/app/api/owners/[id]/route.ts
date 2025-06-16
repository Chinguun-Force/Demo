import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { Owner } from '@/lib/models'
import { ObjectId } from 'mongodb'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid owner ID' },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    const ownersCollection = db.collection<Owner>('owners')

    const updateFields = {
      ...body,
      updatedAt: new Date()
    }

    const result = await ownersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Owner not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: 'Owner updated successfully'
    })

  } catch (error) {
    console.error('Update owner API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}