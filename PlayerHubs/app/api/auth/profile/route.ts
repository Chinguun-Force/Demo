import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { getUserFromRequest } from '@/lib/auth'
import { User, Player } from '@/lib/models'
import { ObjectId } from 'mongodb'

export async function GET(request: NextRequest) {
  try {

    const userPayload = getUserFromRequest(request)
    if (!userPayload) {
      return NextResponse.json(
        { error: 'Invalid or missing token' },
        { status: 401 }
      )
    }

    if (userPayload.user.role === 'FAN') {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      )
    }

    const db = await getDatabase()
    const usersCollection = db.collection<User>('users')

    const user = await usersCollection.findOne({ _id: new ObjectId(userPayload.user.id) })
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    if (user.role === 'PLAYER') {
      const playersCollection = db.collection<Player>('players')
      const player = await playersCollection.findOne({ userId: user._id })

      if (!player) {
        return NextResponse.json(
          { message: 'Player not found' },
          { status: 404 }
        )
      }

      return NextResponse.json({
        user: {
          id: user._id,
          email: user.email,
          role: user.role
        },
        player
      })
    }

    return NextResponse.json({
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    })

  } catch (error) {
    console.error('Profile API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}