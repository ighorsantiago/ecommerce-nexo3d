import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { theme } from '../../themes'
import { useCartContext } from '../../hooks/useCartContext'

export function CartDrawer() {
    const { items, subtotal, isOpen, closeCart, removeItem, updateQuantity } = useCartContext()

    if (!isOpen) return null

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 z-50 bg-black/40"
                onClick={closeCart}
            />

            {/* Drawer */}
            <div
                className="fixed top-0 right-0 z-50 h-full w-full max-w-sm flex flex-col shadow-2xl"
                style={{ backgroundColor: theme.bgPrimary }}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: theme.border }}>
                    <h2 className="font-bold text-lg" style={{ color: theme.textPrimary }}>
                        Carrinho ({items.length})
                    </h2>
                    <button onClick={closeCart} className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer" style={{ backgroundColor: theme.bgSection }}>
                        <X size={16} style={{ color: theme.textSecondary }} />
                    </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
                    {items.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center gap-3 py-16">
                            <ShoppingBag size={40} style={{ color: theme.border }} />
                            <p className="text-sm text-center" style={{ color: theme.textMuted }}>O carrinho está vazio.</p>
                            <button
                                onClick={closeCart}
                                className="mt-2 text-sm font-semibold"
                                style={{ color: theme.primary }}
                            >
                                Ver produtos →
                            </button>
                        </div>
                    ) : items.map((item, idx) => (
                        <div key={idx} className="flex gap-3 py-3 border-b" style={{ borderColor: theme.border }}>
                            <img
                                src={item.product.images[0]}
                                alt={item.product.name}
                                className="w-16 h-16 rounded-xl object-cover shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold truncate" style={{ color: theme.textPrimary }}>
                                    {item.product.name}
                                </p>
                                <p className="text-xs mt-0.5" style={{ color: theme.textMuted }}>
                                    Cor: {item.selectedColor}
                                </p>
                                {Object.entries(item.customValues).map(([k, v]) => v && (
                                    <p key={k} className="text-xs" style={{ color: theme.textMuted }}>
                                        {k}: {v}
                                    </p>
                                ))}
                                <div className="flex items-center justify-between mt-2">
                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => updateQuantity(idx, item.quantity - 1)}
                                            className="w-6 h-6 rounded-md flex items-center justify-center cursor-pointer"
                                            style={{ backgroundColor: theme.bgSection }}
                                        >
                                            <Minus size={12} style={{ color: theme.textSecondary }} />
                                        </button>
                                        <span className="w-6 text-center text-sm font-medium" style={{ color: theme.textPrimary }}>
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => updateQuantity(idx, item.quantity + 1)}
                                            className="w-6 h-6 rounded-md flex items-center justify-center cursor-pointer"
                                            style={{ backgroundColor: theme.bgSection }}
                                        >
                                            <Plus size={12} style={{ color: theme.textSecondary }} />
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-bold" style={{ color: theme.primary }}>
                                            {(item.product.price * item.quantity).toFixed(2).replace('.', ',')} €
                                        </p>
                                        <button
                                            onClick={() => removeItem(idx)}
                                            className="w-6 h-6 flex items-center justify-center cursor-pointer"
                                        >
                                            <Trash2 size={13} style={{ color: theme.danger }} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="px-5 py-5 border-t flex flex-col gap-3" style={{ borderColor: theme.border }}>
                        <div className="flex justify-between text-sm">
                            <span style={{ color: theme.textSecondary }}>Subtotal</span>
                            <span className="font-bold" style={{ color: theme.textPrimary }}>
                                {subtotal.toFixed(2).replace('.', ',')} €
                            </span>
                        </div>
                        <p className="text-xs" style={{ color: theme.textMuted }}>
                            Portes calculados no checkout
                        </p>
                        <Link
                            to="/checkout"
                            onClick={closeCart}
                            className="w-full py-3.5 rounded-xl font-bold text-sm text-center text-white transition-colors"
                            style={{ backgroundColor: theme.primary }}
                        >
                            Finalizar encomenda →
                        </Link>
                    </div>
                )}
            </div>
        </>
    )
}
