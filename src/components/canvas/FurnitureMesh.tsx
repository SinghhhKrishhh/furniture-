'use client'

import { useState } from 'react'
import { useStore } from '@/store/useStore'

interface FurnitureMeshProps {
  id: string
  position?: [number, number, number]
}

export default function FurnitureMesh({ id, position = [0, 0, 0] }: FurnitureMeshProps) {
  const [hovered, setHovered] = useState(false)
  
  const setOrbitPaused = useStore((state) => state.setOrbitPaused)
  const setSelectedFurnitureId = useStore((state) => state.setSelectedFurnitureId)

  const handlePointerOver = (e: any) => {
    e.stopPropagation()
    setHovered(true)
    document.body.style.cursor = 'pointer'
  }

  const handlePointerOut = (e: any) => {
    e.stopPropagation()
    setHovered(false)
    document.body.style.cursor = 'auto'
  }

  const handleClick = (e: any) => {
    e.stopPropagation()
    setOrbitPaused(true)
    setSelectedFurnitureId(id)
  }

  return (
    <mesh
      position={position}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color="#a27a5d" 
        emissive="white" 
        emissiveIntensity={hovered ? 0.5 : 0} 
      />
    </mesh>
  )
}
