import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { theme } from '../themes'
import { products } from '../config'
import { ProductCard } from '../components/catalog/ProductCard'
import type { ProductCategory } from '../types'

const categories: { value: ProductCategory | 'todos'; label: string }[] = [
    { value: 'todos', label: 'Todos' },
    { value: 'chaveiros', label: 'Chaveiros' },
    { value: 'nfc', label: 'NFC' },
    { value: 'trofeus', label: 'Troféus' },
    { value: 'organizadores', label: 'Organizadores' },
    { value: 'decoracao', label: 'Decoração' },
    { value: 'personalizados', label: 'Personalizados' },
]

export function Catalog() {
    const [searchParams] = useSearchParams()
    const initialCat = (searchParams.get('categoria') as ProductCategory) ?? 'todos'
    const [selected, setSelected] = useState<ProductCategory | 'todos'>(initialCat)

    const filtered = selected === 'todos' ? products : products.filter(p => p.category === selected)

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-extrabold" style={{ color: theme.textPrimary }}>
                    Todos os produtos
                </h1>
                <p className="mt-1 text-sm" style={{ color: theme.textSecondary }}>
                    {products.length} produtos disponíveis, produzidos sob encomenda em Portugal.
                </p>
            </div>

            {/* Filtros */}
            <div className="flex flex-wrap gap-2 mb-8">
                {categories.map(({ value, label }) => (
                    <button
                        key={value}
                        onClick={() => setSelected(value)}
                        className="px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer"
                        style={{
                            backgroundColor: selected === value ? theme.primary : theme.bgSection,
                            color: selected === value ? '#fff' : theme.textSecondary,
                            border: `1px solid ${selected === value ? theme.primary : theme.border}`,
                        }}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>

            {filtered.length === 0 && (
                <div className="py-20 text-center">
                    <p className="text-sm" style={{ color: theme.textMuted }}>Nenhum produto nesta categoria.</p>
                </div>
            )}
        </div>
    )
}
