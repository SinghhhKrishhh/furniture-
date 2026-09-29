'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function UploadPage() {
  const [dimensions, setDimensions] = useState({ length: '', width: '', height: '' })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus('Uploading images and queuing AI generation...')

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dimensions })
      })
      const data = await res.json()
      
      if (res.ok) {
        setStatus(`Success! Task ID: ${data.taskId}. Generating 3D model...`)
        // In reality, we'd poll for completion here.
        setTimeout(() => router.push('/'), 2000)
      } else {
        setStatus(`Error: ${data.error}`)
      }
    } catch (err) {
      setStatus('Failed to upload.')
    }
    setLoading(false)
  }

  return (
    <div className="max-w-xl mx-auto p-8 bg-white text-slate-900 rounded shadow mt-10">
      <h1 className="text-3xl font-bold mb-6">Upload Furniture</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">4D Views (Images)</label>
          <div className="border-2 border-dashed border-slate-300 rounded p-12 text-center text-slate-500 hover:bg-slate-50 cursor-pointer">
            Drop multi-angle photos here or click to browse.
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Length (cm)</label>
            <input 
              type="number" 
              required
              className="w-full border rounded px-3 py-2"
              value={dimensions.length}
              onChange={(e) => setDimensions({...dimensions, length: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Width (cm)</label>
            <input 
              type="number" 
              required
              className="w-full border rounded px-3 py-2"
              value={dimensions.width}
              onChange={(e) => setDimensions({...dimensions, width: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Height (cm)</label>
            <input 
              type="number" 
              required
              className="w-full border rounded px-3 py-2"
              value={dimensions.height}
              onChange={(e) => setDimensions({...dimensions, height: e.target.value})}
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Generate 3D Model'}
        </button>

        {status && <p className="text-center text-sm font-medium text-slate-600 mt-4">{status}</p>}
      </form>
    </div>
  )
}
