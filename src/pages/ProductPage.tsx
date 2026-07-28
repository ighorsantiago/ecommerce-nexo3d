import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ShoppingCart, Clock, ChevronLeft, Check, Wifi } from 'lucide-react'
import { theme } from '../themes'
import { products, config } from '../config'
import { useCartContext } from '../hooks/useCartContext'

export function ProductPage() {
    const { slug } = useParams<{ slug: string }>()
    const navigate = useNavigate()
    const { addItem, openCart } = useCartContext()

    const product = products.find(p => p.slug === slug)

    const [selectedImage, setSelectedImage] = useState(0)
    const [selectedColor, setSelectedColor] = useState(product?.colors[0] ?? '')
    const [customValues, setCustomValues] = useState<Record<string, string>>({})
    const [added, setAdded] = useState(false)

    if (!product) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-20 text-center">
                <p style={{ color: theme.textMuted }}>Produto não encontrado.</p>
                <Link to="/catalogo" className="mt-4 inline-block text-sm font-semibold" style={{ color: theme.primary }}>
                    ← Voltar ao catálogo
                </Link>
            </div>
        )
    }

    function handleAddToCart() {
        const missing = product!.customization.filter(f => f.required && !customValues[f.id]?.trim())
        if (missing.length > 0) {
            alert(`Por favor preencha: ${missing.map(f => f.label).join(', ')}`)
            return
        }
        addItem(product!, selectedColor, customValues)
        setAdded(true)
        setTimeout(() => { setAdded(false); openCart() }, 800)
    }

    function handleBuyNow() {
        const missing = product!.customization.filter(f => f.required && !customValues[f.id]?.trim())
        if (missing.length > 0) {
            alert(`Por favor preencha: ${missing.map(f => f.label).join(', ')}`)
            return
        }
        addItem(product!, selectedColor, customValues)
        navigate('/checkout')
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-1 text-sm mb-6 cursor-pointer"
                style={{ color: theme.textSecondary }}
            >
                <ChevronLeft size={16} />
                Voltar
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Galeria */}
                <div className="flex flex-col gap-3">
                    <div className="aspect-square rounded-2xl overflow-hidden bg-slate-100">
                        <img
                            src={product.images[selectedImage]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {product.images.length > 1 && (
                        <div className="flex gap-2">
                            {product.images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedImage(i)}
                                    className="w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0"
                                    style={{ borderColor: selectedImage === i ? theme.primary : 'transparent' }}
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Detalhes */}
                <div className="flex flex-col gap-5">
                    <div>
                        {product.badge && (
                            <span
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white mb-3"
                                style={{ backgroundColor: product.badgeColor ?? theme.primary }}
                            >
                                {product.category === 'nfc' && <Wifi size={11} />}
                                {product.badge}
                            </span>
                        )}
                        <h1 className="text-2xl md:text-3xl font-extrabold" style={{ color: theme.textPrimary }}>
                            {product.name}
                        </h1>
                        <p className="text-3xl font-extrabold mt-2" style={{ color: theme.primary }}>
                            {product.price.toFixed(2).replace('.', ',')} €
                        </p>
                    </div>

                    <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
                        {product.description}
                    </p>

                    <div
                        className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
                        style={{ backgroundColor: theme.bgSection, color: theme.textSecondary }}
                    >
                        <Clock size={14} style={{ color: theme.primary }} />
                        Produzido sob encomenda · envio em <strong className="ml-1">{product.productionDays} dias úteis</strong>
                    </div>

                    {/* Cor */}
                    <div>
                        <p className="text-sm font-semibold mb-2" style={{ color: theme.textPrimary }}>
                            Cor do filamento: <span style={{ color: theme.primary }}>{selectedColor}</span>
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {product.colors.map(color => (
                                <button
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer border"
                                    style={{
                                        backgroundColor: selectedColor === color ? theme.primary : theme.bgSection,
                                        color: selectedColor === color ? '#fff' : theme.textSecondary,
                                        borderColor: selectedColor === color ? theme.primary : theme.border,
                                    }}
                                >
                                    {color}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Personalização */}
                    {product.customization.length > 0 && (
                        <div className="flex flex-col gap-4">
                            <p className="text-sm font-semibold" style={{ color: theme.textPrimary }}>
                                Personalização
                            </p>
                            {product.customization.map(field => (
                                <div key={field.id}>
                                    <label className="block text-xs font-medium mb-1.5" style={{ color: theme.textSecondary }}>
                                        {field.label}{field.required && <span style={{ color: theme.danger }}> *</span>}
                                    </label>
                                    {field.type === 'select' ? (
                                        <select
                                            value={customValues[field.id] ?? ''}
                                            onChange={e => setCustomValues(prev => ({ ...prev, [field.id]: e.target.value }))}
                                            className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                                            style={{
                                                backgroundColor: theme.bgInput,
                                                border: `1px solid ${theme.border}`,
                                                color: theme.textPrimary,
                                            }}
                                        >
                                            <option value="">Selecionar...</option>
                                            {field.options?.map(o => <option key={o} value={o}>{o}</option>)}
                                        </select>
                                    ) : (
                                        <input
                                            type="text"
                                            placeholder={field.placeholder}
                                            maxLength={field.maxChars}
                                            value={customValues[field.id] ?? ''}
                                            onChange={e => setCustomValues(prev => ({ ...prev, [field.id]: e.target.value }))}
                                            className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                                            style={{
                                                backgroundColor: theme.bgInput,
                                                border: `1px solid ${theme.border}`,
                                                color: theme.textPrimary,
                                            }}
                                        />
                                    )}
                                    {field.maxChars && field.type === 'text' && (
                                        <p className="text-xs mt-1 text-right" style={{ color: theme.textMuted }}>
                                            {(customValues[field.id] ?? '').length}/{field.maxChars}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Botões */}
                    <div className="flex flex-col gap-3 pt-2">
                        <button
                            onClick={handleAddToCart}
                            className="w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                            style={{ backgroundColor: added ? theme.success : theme.primary, color: '#fff' }}
                        >
                            {added ? <><Check size={16} /> Adicionado!</> : <><ShoppingCart size={16} /> Adicionar ao carrinho</>}
                        </button>
                        <button
                            onClick={handleBuyNow}
                            className="w-full py-4 rounded-xl font-bold text-sm border transition-all cursor-pointer"
                            style={{ color: theme.primary, borderColor: theme.primary, backgroundColor: 'transparent' }}
                        >
                            Encomendar agora
                        </button>
                    </div>

                    {/* Shipping info */}
                    <div className="flex flex-col gap-1.5 text-xs" style={{ color: theme.textMuted }}>
                        <p>✅ Envio para Portugal continental, ilhas e UE</p>
                        <p>🆓 Portes grátis em compras acima de {config.shipping.freeAbove}€</p>
                        <p>🔄 Trocas em 14 dias (direito legal de arrependimento)</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
