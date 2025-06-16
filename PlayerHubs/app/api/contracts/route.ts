import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { Contract } from '@/lib/models'
import { ObjectId } from 'mongodb'

export async function GET(request: NextRequest) {
  try {
    const db = await getDatabase()
    const contractsCollection = db.collection<Contract>('contracts')

    const contracts = await contractsCollection.find().toArray()

    return NextResponse.json({ contracts })
  } catch (error) {
    console.error('Get contracts API error:', error)
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
    const contractsCollection = db.collection<Contract>('contracts')

    const { player_id, team_id, owner_id, salary, duration_months, start_date } = body
    if (!player_id || !team_id || !owner_id || !salary || !duration_months || !start_date) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const startDate = new Date(start_date)
    const endDate = new Date(startDate)
    endDate.setMonth(endDate.getMonth() + parseInt(duration_months))

    const newContract: Contract = {
      playerId: new ObjectId(player_id),
      teamId: new ObjectId(team_id),
      ownerId: new ObjectId(owner_id),
      salary: parseFloat(salary),
      durationMonths: parseInt(duration_months),
      startDate: startDate,
      endDate: endDate,
      status: 'pending',
      contractFileUrl: body.contract_file_url || '',
      createdAt: new Date(),
      updatedAt: new Date(),
      ...body
    }

    const result = await contractsCollection.insertOne(newContract)

    return NextResponse.json({
      ...newContract,
      _id: result.insertedId
    }, { status: 201 })
  } catch (error) {
    console.error('Create contract API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

