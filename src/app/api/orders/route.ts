import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const orderItemSchema = z.object({
  furnitureId: z.string().uuid(),
  quantity: z.number().min(1),
  price: z.number().min(0),
})

const orderBodySchema = z.object({
  userId: z.string().uuid(),
  items: z.array(orderItemSchema).min(1),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, items } = orderBodySchema.parse(body)

    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

    const order = await prisma.order.create({
      data: {
        userId,
        total,
        orderItems: {
          create: items.map(item => ({
            furnitureId: item.furnitureId,
            quantity: item.quantity,
            price: item.price
          }))
        }
      },
      include: {
        orderItems: true
      }
    })
    
    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: (error as any).errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
