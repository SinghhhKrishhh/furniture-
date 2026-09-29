'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Html, useProgress } from '@react-three/drei'
import { Suspense } from 'react'
import { useStore } from '@/store/useStore'
import FurnitureMesh from '@/components/canvas/FurnitureMesh'

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="text-white font-bold whitespace-nowrap">
        {progress.toFixed(0)} % loaded
      </div>
    </Html>
  )
}

function BaseRoom({ theme }: { theme?: any }) {
  const primary = theme?.primaryHex || "#f0f0f0"
  const secondary = theme?.secondaryHex || "#e0e0e0"

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color={primary} />
      </mesh>
      {/* Back Wall */}
      <mesh position={[0, 5, -10]}>
        <boxGeometry args={[20, 10, 0.5]} />
        <meshStandardMaterial color={secondary} />
      </mesh>
      {/* Left Wall */}
      <mesh position={[-10, 5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[20, 10, 0.5]} />
        <meshStandardMaterial color={secondary} />
      </mesh>
      
      {/* Interactive Furniture Test */}
      <FurnitureMesh id="550e8400-e29b-41d4-a716-446655440000" position={[0, 0.5, 0]} />
    </group>
  )
}

export default function GlobalCanvas({ theme }: { theme?: any }) {
  const isOrbitPaused = useStore((state) => state.isOrbitPaused)

  return (
    <div className="fixed inset-0 -z-10 bg-slate-900">
      <Canvas camera={{ position: [8, 6, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        <Suspense fallback={<Loader />}>
          <BaseRoom theme={theme} />
        </Suspense>

        <OrbitControls 
          enabled={!isOrbitPaused}
          maxPolarAngle={Math.PI / 2 - 0.05} // don't go below floor
          minAzimuthAngle={0} 
          maxAzimuthAngle={Math.PI * 1.44} // approx 260 degrees
          minDistance={2}
          maxDistance={25}
          target={[0, 0, 0]}
        />
      </Canvas>
    </div>
  )
}
