import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { theme } from '../../themes'
import type { Product } from '../../types'

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <Link
            to={`/produto/${product.slug}`}
            className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-200"
            style={{
                backgroundColor: theme.bgCard,
                border: `1px solid ${theme.border}`,
                boxShadow: theme.shadow,
            }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = theme.shadowHover)}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = theme.shadow)}
        >
            {/* Imagem */}
            <div className="relative overflow-hidden aspect-square bg-slate-100">
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {product.badge && (
                    <span
                        className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold text-white"
                        style={{ backgroundColor: product.badgeColor ?? theme.primary }}
                    >
                        {product.badge}
                    </span>
                )}
            </div>

            {/* Info */}
            <div className="flex flex-col gap-2 p-4 flex-1">
                <p className="text-xs font-medium uppercase tracking-wider" style={{ color: theme.textMuted }}>
                    {product.category}
                </p>
                <h3 className="font-semibold text-sm leading-snug" style={{ color: theme.textPrimary }}>
                    {product.name}
                </h3>
                <p className="text-xs leading-relaxed line-clamp-2" style={{ color: theme.textSecondary }}>
                    {product.shortDesc}
                </p>
                <div className="flex items-center justify-between mt-auto pt-2">
                    <p className="font-bold text-lg" style={{ color: theme.primary }}>
                        {product.price.toFixed(2).replace('.', ',')} €
                    </p>
                    <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: theme.bgSection }}
                    >
                        <ShoppingCart size={15} style={{ color: theme.primary }} />
                    </div>
                </div>
            </div>
        </Link>
    )
}
