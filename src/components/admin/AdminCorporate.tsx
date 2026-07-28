import { useState } from 'react'
import { Building2, Plus, Trash2, MessageSquare, Percent } from 'lucide-react'
import { theme } from '../../themes'
import { config } from '../../config'
import { useProducts } from '../../contexts/ProductsContext'

interface QuoteItem {
    productId: string
    qty: number
    unitPrice: number
}

export function AdminCorporate() {
    const products = useProducts()
    const b2bProducts = products.filter(p => p.b2b)
    const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([])
    const [discount, setDiscount] = useState(10)
    const [selectedId, setSelectedId] = useState(b2bProducts[0]?.id ?? products[0]?.id ?? '')

    function addToQuote() {
        const p = products.find(p => p.id === selectedId)
        if (!p) return
        const existing = quoteItems.find(i => i.productId === selectedId)
        if (existing) {
            setQuoteItems(prev => prev.map(i => i.productId === selectedId ? { ...i, qty: i.qty + 1 } : i))
        } else {
            setQuoteItems(prev => [...prev, { productId: selectedId, qty: 1, unitPrice: p.price }])
        }
    }

    function removeItem(id: string) {
        setQuoteItems(prev => prev.filter(i => i.productId !== id))
    }

    function updateItem(id: string, key: 'qty' | 'unitPrice', val: number) {
        setQuoteItems(prev => prev.map(i => i.productId === id ? { ...i, [key]: val } : i))
    }

    const subtotal = quoteItems.reduce((sum, i) => sum + i.qty * i.unitPrice, 0)
    const discountAmt = subtotal * (discount / 100)
    const total = subtotal - discountAmt

    function sendQuote() {
        if (quoteItems.length === 0) return
        const lines = quoteItems.map(item => {
            const p = products.find(p => p.id === item.productId)!
            return `• ${item.qty}× ${p.name} — ${item.unitPrice.toFixed(2).replace('.', ',')}€/un = ${(item.qty * item.unitPrice).toFixed(2).replace('.', ',')}€`
        }).join('\n')

        const msg = [
            `🏢 *Proposta Corporativa — Nexo3D*`,
            ``,
            `📦 *Itens:*`,
            lines,
            ``,
            `Subtotal: ${subtotal.toFixed(2).replace('.', ',')}€`,
            discount > 0 ? `Desconto empresarial (${discount}%): -${discountAmt.toFixed(2).replace('.', ',')}€` : null,
            `*Total: ${total.toFixed(2).replace('.', ',')}€*`,
            ``,
            `🇵🇹 Produção em Portugal`,
            `📅 Prazo: ~7-10 dias úteis após confirmação`,
            `📦 Envio para Portugal ou UE`,
            ``,
            `Para confirmar, envie-nos os detalhes de personalização e morada de entrega.`,
            ``,
            `Nexo3D — Impressão 3D Personalizada`,
            `📞 ${config.brand.whatsapp}`,
        ].filter(l => l !== null).join('\n')

        const phone = config.brand.whatsapp.replace(/\D/g, '')
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank')
    }

    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: theme.primary + '18' }}>
                    <Building2 size={18} style={{ color: theme.primary }} />
                </div>
                <div>
                    <h2 className="font-extrabold text-base" style={{ color: theme.textPrimary }}>Corporativo / B2B</h2>
                    <p className="text-xs" style={{ color: theme.textMuted }}>Propostas para empresas e encomendas em volume</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* B2B Products */}
                <div className="flex flex-col gap-3">
                    <p className="font-bold text-sm" style={{ color: theme.textPrimary }}>Produtos para empresas</p>
                    {(b2bProducts.length > 0 ? b2bProducts : products.slice(0, 4)).map(p => (
                        <div key={p.id} className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: theme.bgCard, border: `1px solid ${theme.border}` }}>
                            <img src={p.images[0]} alt="" className="w-12 h-12 rounded-lg object-cover shrink-0" />
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm truncate" style={{ color: theme.textPrimary }}>{p.name}</p>
                                <p className="text-xs" style={{ color: theme.textMuted }}>{p.price.toFixed(2)}€/un</p>
                            </div>
                            {p.b2b && (
                                <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ color: '#fff', backgroundColor: theme.primary }}>B2B</span>
                            )}
                        </div>
                    ))}
                    {b2bProducts.length === 0 && (
                        <p className="text-xs" style={{ color: theme.textMuted }}>
                            Marque produtos como B2B em <strong>config.ts</strong> (adicionar <code>b2b: true</code>).
                        </p>
                    )}
                </div>

                {/* Quote builder */}
                <div className="flex flex-col gap-4">
                    <p className="font-bold text-sm" style={{ color: theme.textPrimary }}>Gerador de proposta</p>

                    {/* Add product */}
                    <div className="flex gap-2">
                        <select
                            value={selectedId}
                            onChange={e => setSelectedId(e.target.value)}
                            className="flex-1 px-3 py-2.5 rounded-xl text-sm outline-none"
                            style={{ backgroundColor: theme.bgInput, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                        >
                            {products.map(p => (
                                <option key={p.id} value={p.id}>{p.name} — {p.price.toFixed(2)}€</option>
                            ))}
                        </select>
                        <button
                            onClick={addToQuote}
                            className="px-3.5 py-2.5 rounded-xl cursor-pointer flex items-center gap-1.5 text-sm font-semibold text-white shrink-0"
                            style={{ backgroundColor: theme.primary }}
                        >
                            <Plus size={15} /> Adicionar
                        </button>
                    </div>

                    {/* Quote items */}
                    {quoteItems.length > 0 ? (
                        <div className="flex flex-col gap-2 rounded-xl p-3" style={{ backgroundColor: theme.bgSection }}>
                            {quoteItems.map(item => {
                                const p = products.find(p => p.id === item.productId)!
                                return (
                                    <div key={item.productId} className="flex items-center gap-2">
                                        <span className="text-xs flex-1 font-medium truncate" style={{ color: theme.textPrimary }}>{p.name}</span>
                                        <input
                                            type="number"
                                            min={1}
                                            value={item.qty}
                                            onChange={e => updateItem(item.productId, 'qty', parseInt(e.target.value) || 1)}
                                            className="w-14 px-2 py-1 rounded-lg text-xs text-center outline-none"
                                            style={{ backgroundColor: '#fff', border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                                        />
                                        <span className="text-xs" style={{ color: theme.textMuted }}>×</span>
                                        <input
                                            type="number"
                                            step="0.01"
                                            min={0}
                                            value={item.unitPrice}
                                            onChange={e => updateItem(item.productId, 'unitPrice', parseFloat(e.target.value) || 0)}
                                            className="w-16 px-2 py-1 rounded-lg text-xs text-center outline-none"
                                            style={{ backgroundColor: '#fff', border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                                        />
                                        <span className="text-xs font-semibold w-14 text-right" style={{ color: theme.primary }}>
                                            {(item.qty * item.unitPrice).toFixed(2)}€
                                        </span>
                                        <button onClick={() => removeItem(item.productId)} className="cursor-pointer" style={{ color: theme.danger }}>
                                            <Trash2 size={13} />
                                        </button>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="py-8 text-center rounded-xl" style={{ backgroundColor: theme.bgSection }}>
                            <p className="text-xs" style={{ color: theme.textMuted }}>Adicione produtos à proposta</p>
                        </div>
                    )}

                    {/* Discount */}
                    <div className="flex items-center gap-3">
                        <Percent size={14} style={{ color: theme.textMuted }} />
                        <label className="text-xs font-semibold" style={{ color: theme.textSecondary }}>Desconto empresarial</label>
                        <input
                            type="number"
                            min={0}
                            max={50}
                            value={discount}
                            onChange={e => setDiscount(parseInt(e.target.value) || 0)}
                            className="w-16 px-2 py-1.5 rounded-lg text-sm text-center outline-none font-semibold"
                            style={{ backgroundColor: theme.bgInput, border: `1px solid ${theme.border}`, color: theme.primary }}
                        />
                        <span className="text-sm font-semibold" style={{ color: theme.textSecondary }}>%</span>
                    </div>

                    {/* Totals */}
                    {quoteItems.length > 0 && (
                        <div className="rounded-xl p-4 flex flex-col gap-2" style={{ backgroundColor: theme.bgCard, border: `1px solid ${theme.border}` }}>
                            <div className="flex justify-between text-xs" style={{ color: theme.textSecondary }}>
                                <span>Subtotal</span><span>{subtotal.toFixed(2).replace('.', ',')}€</span>
                            </div>
                            {discount > 0 && (
                                <div className="flex justify-between text-xs" style={{ color: theme.success }}>
                                    <span>Desconto ({discount}%)</span><span>-{discountAmt.toFixed(2).replace('.', ',')}€</span>
                                </div>
                            )}
                            <div className="flex justify-between font-bold text-base pt-1 border-t" style={{ color: theme.textPrimary, borderColor: theme.border }}>
                                <span>Total</span><span style={{ color: theme.primary }}>{total.toFixed(2).replace('.', ',')}€</span>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={sendQuote}
                        disabled={quoteItems.length === 0}
                        className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white cursor-pointer disabled:opacity-40"
                        style={{ backgroundColor: '#25D366' }}
                    >
                        <MessageSquare size={16} /> Enviar proposta via WhatsApp
                    </button>
                </div>
            </div>
        </div>
    )
}
