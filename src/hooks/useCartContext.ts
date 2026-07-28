import { createContext, useContext } from 'react'
import type { CartItem, Product } from '../types'

interface CartContextValue {
    items: CartItem[]
    totalItems: number
    subtotal: number
    addItem: (product: Product, color: string, customValues: Record<string, string>) => void
    removeItem: (index: number) => void
    updateQuantity: (index: number, qty: number) => void
    clearCart: () => void
    isOpen: boolean
    openCart: () => void
    closeCart: () => void
}

export const CartContext = createContext<CartContextValue | null>(null)

export function useCartContext() {
    const ctx = useContext(CartContext)
    if (!ctx) throw new Error('useCartContext must be used inside CartProvider')
    return ctx
}
