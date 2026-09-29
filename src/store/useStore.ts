import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  title: string
  price: number
  quantity: number
}

interface AppState {
  isOrbitPaused: boolean
  setOrbitPaused: (paused: boolean) => void
  selectedFurnitureId: string | null
  setSelectedFurnitureId: (id: string | null) => void
  
  // Cart
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      isOrbitPaused: false,
      setOrbitPaused: (paused) => set({ isOrbitPaused: paused }),
      selectedFurnitureId: null,
      setSelectedFurnitureId: (id) => set({ selectedFurnitureId: id }),

      cart: [],
      addToCart: (item) => set((state) => {
        const existing = state.cart.find(i => i.id === item.id)
        if (existing) {
          return { cart: state.cart.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i) }
        }
        return { cart: [...state.cart, item] }
      }),
      removeFromCart: (id) => set((state) => ({ cart: state.cart.filter(i => i.id !== id) })),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'roomcraft-storage',
      partialize: (state) => ({ cart: state.cart }),
    }
  )
)
