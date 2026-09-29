import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { dimensions } = await request.json()
    
    // In a real scenario, we'd take FormData with images, upload to S3/Cloudinary,
    // and then call the Meshy.ai Image-to-3D API.
    
    // const meshyResponse = await fetch('https://api.meshy.ai/v1/image-to-3d', { ... })
    // const taskId = meshyResponse.json().result
    
    const mockTaskId = "meshy-task-" + Date.now()

    // Store a pending Furniture record
    const furniture = await prisma.furniture.create({
      data: {
        title: "Generated Furniture",
        description: "AI-generated from uploaded images.",
        length: parseFloat(dimensions.length) / 100, // convert cm to meters
        width: parseFloat(dimensions.width) / 100,
        height: parseFloat(dimensions.height) / 100,
        price: 0,
        stockQuantity: 1,
        // status: "PENDING" (if we added status to schema)
      }
    })

    return NextResponse.json({ success: true, taskId: mockTaskId, furnitureId: furniture.id })
  } catch (error) {
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 })
  }
}
