import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { generateToken } from '@/lib/auth'
import { User } from '@/lib/models'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    const usersCollection = db.collection<User>('users')

    const user = await usersCollection.findOne({ email })
    if (!user) {

      return NextResponse.json({
        message: 'If an account with that email exists, a password reset link has been sent.'
      })
    }

    const resetToken = generateToken({
      id: user._id!,
      email: user.email,
      role: user.role
    })

    console.log(`Password reset token for ${email}: ${resetToken}`)

    return NextResponse.json({
      message: 'If an account with that email exists, a password reset link has been sent.',

      resetToken: resetToken
    })

  } catch (error) {
    console.error('Forgot password API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}