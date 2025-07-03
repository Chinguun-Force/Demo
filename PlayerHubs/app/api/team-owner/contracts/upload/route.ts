import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { contract_id, contract_files, status, notes, send_to_player } = body

    const updatedContract = {
      id: contract_id,
      contract_files,
      status: send_to_player ? 'sent_for_signature' : status,
      notes,
      updated_at: new Date().toISOString()
    }

    return NextResponse.json({
      message: 'Contract updated successfully',
      contract: updatedContract
    })
  } catch (error) {
    console.error('Update contract upload API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}