import { type NextRequest, NextResponse } from "next/server"
import { Database, type Donation } from "@/lib/database"

export async function GET() {
  try {
    const donations = await Database.getDonations()
    return NextResponse.json(donations)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch donations" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { donor_name, donor_email, amount } = body
    if (!donor_name || !donor_email || !amount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate amount
    const donationAmount = Number.parseFloat(amount)
    if (donationAmount <= 0 || donationAmount > 10000) {
      return NextResponse.json({ error: "Invalid donation amount" }, { status: 400 })
    }

    const newDonation: Donation = {
      id: Date.now().toString(),
      donor_name,
      donor_email,
      player_id: body.player_id,
      team_id: body.team_id,
      amount: donationAmount,
      message: body.message,
      payment_status: "pending",
      created_at: new Date().toISOString(),
    }

    // In a real app, integrate with payment processor (Stripe, PayPal, etc.)
    // For now, we'll simulate payment processing
    setTimeout(() => {
      newDonation.payment_status = "completed"
      newDonation.payment_id = `pay_${Date.now()}`
      console.log("Payment processed:", newDonation)
    }, 2000)

    console.log("Creating donation:", newDonation)

    return NextResponse.json(newDonation, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to process donation" }, { status: 500 })
  }
}
