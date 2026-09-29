import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
  apiVersion: '2026-08-26.dahlia',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature') as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret!)
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    
    // Process order in a Prisma transaction
    try {
      // In a real implementation, we'd retrieve line items from Stripe to get metadata mapping
      // For brevity, we assume the user metadata was passed.
      const userId = session.metadata?.userId || 'anonymous'

      // Mock creation (would iterate over line_items)
      await prisma.$transaction(async (tx: any) => {
        // Create Order
        const order = await tx.order.create({
          data: {
            userId: userId,
            total: (session.amount_total || 0) / 100,
            status: 'PAID'
          }
        })
        
        // E.g., decrease stock for purchased items
        // await tx.furniture.update({ where: { id: ... }, data: { stockQuantity: { decrement: 1 } } })
      })
    } catch (e) {
      console.error(e)
      return NextResponse.json({ error: 'Database transaction failed' }, { status: 500 })
    }
  }

  return NextResponse.json({ received: true })
}
