import { NextResponse } from 'next/server'
import { z } from 'zod'

const cartItemSchema = z.object({
  id: z.string().uuid(),
  quantity: z.number().min(1),
})

const cartBodySchema = z.object({
  items: z.array(cartItemSchema),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { items } = cartBodySchema.parse(body)
    
    // In a real app, this might merge with a DB cart. 
    // Here we just validate the shape.
    return NextResponse.json({ success: true, items })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: (error as any).errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
