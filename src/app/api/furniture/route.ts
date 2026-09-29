import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const themeId = searchParams.get('themeId')
    
    const furniture = await prisma.furniture.findMany({
      where: themeId ? { themeId } : undefined,
    })
    
    return NextResponse.json(furniture)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch furniture' }, { status: 500 })
  }
}
