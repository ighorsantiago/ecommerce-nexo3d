import { createContext, useContext, useState, useMemo, type ReactNode } from 'react'
import { products as configProducts } from '../config'
import type { Product, ProductOverride } from '../types'

const OVERRIDES_KEY = 'nexo3d_products_overrides'

interface ProductsContextValue {
    products: Product[]
    overrides: Record<string, ProductOverride>
    updateProduct: (id: string, patch: ProductOverride) => void
    resetProduct: (id: string) => void
}

const ProductsCtx = createContext<ProductsContextValue | null>(null)

function loadOverrides(): Record<string, ProductOverride> {
    try { return JSON.parse(localStorage.getItem(OVERRIDES_KEY) ?? '{}') }
    catch { return {} }
}

export function ProductsProvider({ children }: { children: ReactNode }) {
    const [overrides, setOverrides] = useState<Record<string, ProductOverride>>(loadOverrides)

    const products = useMemo(
        () => configProducts.map(p => ({ ...p, ...(overrides[p.id] ?? {}) })),
        [overrides]
    )

    function updateProduct(id: string, patch: ProductOverride) {
        setOverrides(prev => {
            const next = { ...prev, [id]: { ...(prev[id] ?? {}), ...patch } }
            localStorage.setItem(OVERRIDES_KEY, JSON.stringify(next))
            return next
        })
    }

    function resetProduct(id: string) {
        setOverrides(prev => {
            const next = { ...prev }
            delete next[id]
            localStorage.setItem(OVERRIDES_KEY, JSON.stringify(next))
            return next
        })
    }

    return (
        <ProductsCtx.Provider value={{ products, overrides, updateProduct, resetProduct }}>
            {children}
        </ProductsCtx.Provider>
    )
}

export function useProducts(): Product[] {
    const ctx = useContext(ProductsCtx)
    if (!ctx) throw new Error('useProducts must be inside ProductsProvider')
    return ctx.products
}

export function useProductsContext(): ProductsContextValue {
    const ctx = useContext(ProductsCtx)
    if (!ctx) throw new Error('useProductsContext must be inside ProductsProvider')
    return ctx
}
