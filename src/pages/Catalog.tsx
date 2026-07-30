import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'
import { theme } from '../themes'
import { useProducts } from '../contexts/ProductsContext'
import { ProductCard } from '../components/catalog/ProductCard'
import type { ProductCategory } from '../types'

const categories: { value: ProductCategory | 'todos'; label: string }[] = [
    { value: 'todos',         label: 'Todos' },
    { value: 'chaveiros',     label: 'Chaveiros' },
    { value: 'nfc',           label: 'NFC' },
    { value: 'trofeus',       label: 'Troféus' },
    { value: 'organizadores', label: 'Organizadores' },
    { value: 'decoracao',     label: 'Decoração' },
    { value: 'personalizados',label: 'Personalizados' },
]

export function Catalog() {
    const products = useProducts()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    const initialCat = (searchParams.get('categoria') as ProductCategory) ?? 'todos'
    const q = searchParams.get('q') ?? ''

    const [selected, setSelected] = useState<ProductCategory | 'todos'>(initialCat)

    const filtered = products.filter(p => {
        const matchesCat = selected === 'todos' || p.category === selected
        const matchesQ = !q || [p.name, p.shortDesc, p.description]
            .some(field => field?.toLowerCase().includes(q.toLowerCase()))
        return matchesCat && matchesQ
    })

    function clearSearch() {
        navigate('/catalogo')
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-extrabold" style={{ color: theme.textPrimary }}>
                    {q ? `Resultados para "${q}"` : 'Todos os produtos'}
                </h1>
                <p className="mt-1 text-sm" style={{ color: theme.textSecondary }}>
                    {filtered.length} produto{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
                    {!q && ', produzidos sob encomenda em Portugal.'}
                </p>
            </div>

            {/* Banner de pesquisa activa */}
            {q && (
                <div
                    className="flex items-center gap-3 mb-6 px-4 py-3 rounded-xl"
                    style={{ backgroundColor: theme.bgSection, border: `1px solid ${theme.border}` }}
                >
                    <span className="text-sm flex-1" style={{ color: theme.textSecondary }}>
                        A filtrar por: <strong style={{ color: theme.textPrimary }}>{q}</strong>
                    </span>
                    <button
                        onClick={clearSearch}
                        className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer transition-opacity hover:opacity-70"
                        style={{ color: theme.primary }}
                    >
                        <X size={13} />
                        Limpar
                    </button>
                </div>
            )}

            {/* Filtros de categoria */}
            <div className="flex flex-wrap gap-2 mb-8">
                {categories.map(({ value, label }) => (
                    <button
                        key={value}
                        onClick={() => setSelected(value)}
                        className="px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer"
                        style={{
                            backgroundColor: selected === value ? theme.primary    : theme.bgSection,
                            color:           selected === value ? '#fff'           : theme.textSecondary,
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
                    <p className="text-sm" style={{ color: theme.textMuted }}>
                        {q
                            ? `Nenhum produto encontrado para "${q}".`
                            : 'Nenhum produto nesta categoria.'
                        }
                    </p>
                    {q && (
                        <button
                            onClick={clearSearch}
                            className="mt-3 text-sm font-semibold cursor-pointer"
                            style={{ color: theme.primary }}
                        >
                            Ver todos os produtos
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}
