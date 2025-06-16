import { NextRequest, NextResponse } from 'next/server'

interface TeamOwnerContract {
  id: string
  playerId: string
  teamId: string
  ownerId: string
  contractTitle: string
  salary: number
  duration_months: number
  startDate: string
  endDate: string
  status: 'pending' | 'sent_for_signature' | 'signed' | 'active'
  contract_preview?: string
  contract_files?: string[]
  notes?: string
}

let teamOwnerContracts: TeamOwnerContract[] = [
  {
    id: '1',
    playerId: '1',
    teamId: '1',
    ownerId: '1',
    contractTitle: 'Standard Player Agreement 2024',
    salary: 60000,
    duration_months: 12,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    status: 'active',
    contract_files: ['/contracts/signed-contract-1.pdf'],
    notes: 'Initial contract for new player'
  }
]

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const ownerId = url.searchParams.get('ownerId')

    let filteredContracts = teamOwnerContracts
    if (ownerId) {
      filteredContracts = teamOwnerContracts.filter(c => c.ownerId === ownerId)
    }

    return NextResponse.json({ contracts: filteredContracts })
  } catch (error) {
    console.error('Get team owner contracts API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const newContract: TeamOwnerContract = {
      id: (teamOwnerContracts.length + 1).toString(),
      ...body,
      endDate: calculateEndDate(body.startDate, body.duration_months),
      status: 'pending'
    }

    teamOwnerContracts.push(newContract)

    return NextResponse.json(newContract, { status: 201 })
  } catch (error) {
    console.error('Create team owner contract API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function calculateEndDate(startDate: string, durationMonths: number): string {
  const start = new Date(startDate)
  const end = new Date(start)
  end.setMonth(end.getMonth() + durationMonths)
  return end.toISOString().split('T')[0]
}