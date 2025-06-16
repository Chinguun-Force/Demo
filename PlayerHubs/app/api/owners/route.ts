import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { getUserFromRequest } from '@/lib/auth'
import { Owner } from '@/lib/models'
import { ObjectId } from 'mongodb'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const userPayload = getUserFromRequest(request)
    if (!userPayload) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const db = await getDatabase()
    const ownersCollection = db.collection<Owner>('owners')

    const { name, email } = body
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    const newOwner: Owner = {
      ...body,
      userId: new ObjectId(userPayload.user.id),
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const result = await ownersCollection.insertOne(newOwner)

    return NextResponse.json({
      message: 'Owner created successfully',
      owner: { ...newOwner, _id: result.insertedId }
    }, { status: 201 })

  } catch (error) {
    console.error('Create owner API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}