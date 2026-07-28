import { useState, useCallback } from 'react'
import type { CartItem, Product } from '../types'
import { config } from '../config'

function loadCart(): CartItem[] {
    try {
        const raw = localStorage.getItem(config.storageKey)
        return raw ? JSON.parse(raw) : []
    } catch { return [] }
}

function saveCart(items: CartItem[]) {
    try { localStorage.setItem(config.storageKey, JSON.stringify(items)) } catch {}
}

export function useCart() {
    const [items, setItems] = useState<CartItem[]>(loadCart)

    const update = useCallback((next: CartItem[]) => {
        setItems(next)
        saveCart(next)
    }, [])

    function addItem(product: Product, color: string, customValues: Record<string, string>) {
        setItems(prev => {
            const existing = prev.find(
                i => i.product.id === product.id &&
                i.selectedColor === color &&
                JSON.stringify(i.customValues) === JSON.stringify(customValues)
            )
            const next = existing
                ? prev.map(i => i === existing ? { ...i, quantity: i.quantity + 1 } : i)
                : [...prev, { product, quantity: 1, selectedColor: color, customValues }]
            saveCart(next)
            return next
        })
    }

    function removeItem(index: number) {
        update(items.filter((_, i) => i !== index))
    }

    function updateQuantity(index: number, qty: number) {
        if (qty < 1) return removeItem(index)
        update(items.map((item, i) => i === index ? { ...item, quantity: qty } : item))
    }

    function clearCart() {
        update([])
    }

    const subtotal = items.reduce((acc, i) => acc + i.product.price * i.quantity, 0)
    const totalItems = items.reduce((acc, i) => acc + i.quantity, 0)

    return { items, totalItems, subtotal, addItem, removeItem, updateQuantity, clearCart }
}
