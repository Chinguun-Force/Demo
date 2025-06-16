import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { getUserFromRequest, hashPassword, validatePassword } from '@/lib/auth'
import { User } from '@/lib/models'
import { ObjectId } from 'mongodb'

export async function POST(request: NextRequest) {
  try {
    const { newPassword, token } = await request.json()

    if (!newPassword) {
      return NextResponse.json(
        { error: 'New password is required' },
        { status: 400 }
      )
    }

    const passwordValidation = validatePassword(newPassword)
    if (!passwordValidation.isValid) {
      return NextResponse.json(
        { error: passwordValidation.message },
        { status: 400 }
      )
    }

    let userPayload = getUserFromRequest(request)

    if (!userPayload && token) {
      try {
        const { verifyToken } = await import('@/lib/auth')
        userPayload = verifyToken(token)
      } catch (error) {
        return NextResponse.json(
          { error: 'Invalid or expired token' },
          { status: 401 }
        )
      }
    }

    if (!userPayload) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const db = await getDatabase()
    const usersCollection = db.collection<User>('users')

    const hashedPassword = await hashPassword(newPassword)

    const result = await usersCollection.updateOne(
      { _id: new ObjectId(userPayload.user.id) },
      {
        $set: {
          password: hashedPassword,
          updatedAt: new Date()
        }
      }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: 'Password updated successfully'
    })

  } catch (error) {
    console.error('Update password API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}