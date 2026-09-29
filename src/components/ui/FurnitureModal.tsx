'use client'

import { useStore } from '@/store/useStore'
import { useEffect, useState } from 'react'

export default function FurnitureModal() {
  const selectedFurnitureId = useStore((state) => state.selectedFurnitureId)
  const setSelectedFurnitureId = useStore((state) => state.setSelectedFurnitureId)
  const setOrbitPaused = useStore((state) => state.setOrbitPaused)

  const [furnitureData, setFurnitureData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (selectedFurnitureId) {
      setLoading(true)
      // For development, if we get 400 because it's not a real UUID, we mock it.
      fetch(`/api/furniture/${selectedFurnitureId}`)
        .then(res => {
          if (!res.ok) throw new Error('Mock data needed')
          return res.json()
        })
        .then(data => {
          setFurnitureData(data)
          setLoading(false)
        })
        .catch(() => {
          // Fallback to mock data for the UI if DB isn't seeded with this UUID yet
          setFurnitureData({
            title: "Classic Wooden Chair",
            description: "A beautiful mid-century chair.",
            length: 0.5,
            width: 0.5,
            height: 1.0,
            price: 120.0,
          })
          setLoading(false)
        })
    } else {
      setFurnitureData(null)
    }
  }, [selectedFurnitureId])

  if (!selectedFurnitureId) return null

  const handleClose = () => {
    setSelectedFurnitureId(null)
    setOrbitPaused(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 pointer-events-auto">
      <div className="bg-white text-slate-900 rounded-lg p-6 max-w-md w-full shadow-2xl relative">
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-black font-bold text-xl"
        >
          &times;
        </button>
        
        {loading ? (
          <p>Loading details...</p>
        ) : furnitureData ? (
          <div>
            <h2 className="text-2xl font-bold mb-2">{furnitureData.title}</h2>
            <p className="text-slate-600 mb-4">{furnitureData.description}</p>
            
            <div className="mb-4 text-sm text-slate-500">
              <p>Dimensions (m): {furnitureData.length} x {furnitureData.width} x {furnitureData.height}</p>
            </div>
            
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200">
              <span className="text-xl font-bold">${furnitureData.price?.toFixed(2)}</span>
              <button 
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => {
                  useStore.getState().addToCart({
                    id: selectedFurnitureId,
                    title: furnitureData.title,
                    price: furnitureData.price,
                    quantity: 1
                  })
                  alert("Added to Cart!")
                  handleClose()
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ) : (
          <p>Error loading item.</p>
        )}
      </div>
    </div>
  )
}
