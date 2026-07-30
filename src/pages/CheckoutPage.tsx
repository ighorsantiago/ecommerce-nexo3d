import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ShoppingBag, Loader2 } from 'lucide-react'
import { theme } from '../themes'
import { useCartContext } from '../hooks/useCartContext'
import { config } from '../config'
import { createOrder, cartItemsToOrderItems } from '../lib/orders'
import type { OrderForm } from '../types'

const SHIPPING = config.shipping.rates

function buildWhatsAppMessage(form: OrderForm, items: ReturnType<typeof useCartContext>['items'], subtotal: number, shipping: number): string {
    const lines = [
        `🛒 *Nova encomenda Nexo3D*`,
        ``,
        `*Cliente:* ${form.name}`,
        `*Telefone:* ${form.phone}`,
        `*Email:* ${form.email}`,
        `*Morada:* ${form.address}, ${form.postalCode} ${form.city}`,
        `*País:* ${form.country}`,
        form.nif ? `*NIF:* ${form.nif}` : '',
        ``,
        `*Produtos:*`,
        ...items.map(item => {
            const custom = Object.entries(item.customValues).map(([k, v]) => `  ${k}: ${v}`).join('\n')
            return `• ${item.product.name} x${item.quantity} — ${(item.product.price * item.quantity).toFixed(2)}€\n  Cor: ${item.selectedColor}${custom ? '\n' + custom : ''}`
        }),
        ``,
        `*Subtotal:* ${subtotal.toFixed(2)}€`,
        `*Portes:* ${shipping === 0 ? 'Grátis' : shipping.toFixed(2) + '€'}`,
        `*Total:* ${(subtotal + shipping).toFixed(2)}€`,
        form.notes ? `\n*Notas:* ${form.notes}` : '',
    ]
    return encodeURIComponent(lines.filter(Boolean).join('\n'))
}

export function CheckoutPage() {
    const navigate = useNavigate()
    const { items, subtotal, clearCart } = useCartContext()
    const [selectedShipping, setSelectedShipping] = useState(0)
    const [submitting, setSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState(false)
    const [form, setForm] = useState<OrderForm>({
        name: '', phone: '', email: '',
        address: '', city: '', postalCode: '', country: 'Portugal', nif: '', notes: '',
    })

    const shippingCost = subtotal >= config.shipping.freeAbove ? 0 : SHIPPING[selectedShipping].price
    const total = subtotal + shippingCost

    if (items.length === 0) {
        return (
            <div className="max-w-md mx-auto px-4 py-24 flex flex-col items-center gap-4 text-center">
                <ShoppingBag size={40} style={{ color: theme.border }} />
                <p style={{ color: theme.textMuted }}>O carrinho está vazio.</p>
                <Link to="/catalogo" className="text-sm font-semibold" style={{ color: theme.primary }}>
                    ← Ver produtos
                </Link>
            </div>
        )
    }

    function set(field: keyof OrderForm, value: string) {
        setForm(prev => ({ ...prev, [field]: value }))
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setSubmitting(true)
        setSubmitError(false)
        try {
            const order = await createOrder({
                form,
                items: cartItemsToOrderItems(items),
                subtotal,
                shippingCost,
                shippingMethod: SHIPPING[selectedShipping].label,
                total,
            })
            const msg = buildWhatsAppMessage(form, items, subtotal, shippingCost)
            clearCart()
            navigate(`/pedido-confirmado?id=${order.id.slice(0, 8).toUpperCase()}`)
            window.open(`https://wa.me/${config.brand.whatsapp}?text=${msg}`, '_blank')
        } catch {
            setSubmitError(true)
        } finally {
            setSubmitting(false)
        }
    }

    const inputStyle = {
        backgroundColor: theme.bgInput,
        border: `1px solid ${theme.border}`,
        color: theme.textPrimary,
    }

    const inputClass = 'w-full px-3 py-2.5 rounded-xl text-sm outline-none'

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-extrabold mb-8" style={{ color: theme.textPrimary }}>
                Finalizar encomenda
            </h1>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                    {/* Formulário */}
                    <div className="md:col-span-3 flex flex-col gap-6">
                        {/* Dados pessoais */}
                        <section className="rounded-2xl p-5 flex flex-col gap-4" style={{ backgroundColor: theme.bgCard, border: `1px solid ${theme.border}` }}>
                            <h2 className="font-bold text-sm" style={{ color: theme.textPrimary }}>Dados pessoais</h2>
                            <div className="grid grid-cols-1 gap-3">
                                <input className={inputClass} style={inputStyle} placeholder="Nome completo *" required value={form.name} onChange={e => set('name', e.target.value)} />
                                <input className={inputClass} style={inputStyle} placeholder="Telemóvel (com indicativo) *" required value={form.phone} onChange={e => set('phone', e.target.value)} />
                                <input className={inputClass} style={inputStyle} type="email" placeholder="E-mail *" required value={form.email} onChange={e => set('email', e.target.value)} />
                                <input className={inputClass} style={inputStyle} placeholder="NIF (opcional)" value={form.nif} onChange={e => set('nif', e.target.value)} />
                            </div>
                        </section>

                        {/* Morada */}
                        <section className="rounded-2xl p-5 flex flex-col gap-4" style={{ backgroundColor: theme.bgCard, border: `1px solid ${theme.border}` }}>
                            <h2 className="font-bold text-sm" style={{ color: theme.textPrimary }}>Morada de entrega</h2>
                            <div className="flex flex-col gap-3">
                                <input className={inputClass} style={inputStyle} placeholder="Morada *" required value={form.address} onChange={e => set('address', e.target.value)} />
                                <div className="grid grid-cols-2 gap-3">
                                    <input className={inputClass} style={inputStyle} placeholder="Código Postal *" required value={form.postalCode} onChange={e => set('postalCode', e.target.value)} />
                                    <input className={inputClass} style={inputStyle} placeholder="Cidade *" required value={form.city} onChange={e => set('city', e.target.value)} />
                                </div>
                                <select className={inputClass} style={inputStyle} value={form.country} onChange={e => set('country', e.target.value)}>
                                    <option>Portugal</option>
                                    <option>Açores</option>
                                    <option>Madeira</option>
                                    <option>Espanha</option>
                                    <option>França</option>
                                    <option>Alemanha</option>
                                    <option>Outro país da UE</option>
                                </select>
                            </div>
                        </section>

                        {/* Portes */}
                        <section className="rounded-2xl p-5 flex flex-col gap-3" style={{ backgroundColor: theme.bgCard, border: `1px solid ${theme.border}` }}>
                            <h2 className="font-bold text-sm" style={{ color: theme.textPrimary }}>Método de envio</h2>
                            {SHIPPING.map((rate, i) => (
                                <label key={i} className="flex items-center justify-between p-3 rounded-xl cursor-pointer border transition-all" style={{ borderColor: selectedShipping === i ? theme.primary : theme.border, backgroundColor: selectedShipping === i ? theme.bgSection : 'transparent' }}>
                                    <div className="flex items-center gap-3">
                                        <input type="radio" name="shipping" checked={selectedShipping === i} onChange={() => setSelectedShipping(i)} className="accent-blue-700" />
                                        <span className="text-sm" style={{ color: theme.textPrimary }}>{rate.label}</span>
                                    </div>
                                    <span className="text-sm font-semibold" style={{ color: subtotal >= config.shipping.freeAbove ? theme.success : theme.textPrimary }}>
                                        {subtotal >= config.shipping.freeAbove ? 'Grátis' : `${rate.price.toFixed(2)}€`}
                                    </span>
                                </label>
                            ))}
                        </section>

                        {/* Notas */}
                        <textarea
                            className={inputClass}
                            style={{ ...inputStyle, resize: 'none' }}
                            placeholder="Notas / observações (opcional)"
                            rows={3}
                            value={form.notes}
                            onChange={e => set('notes', e.target.value)}
                        />
                    </div>

                    {/* Resumo */}
                    <div className="md:col-span-2">
                        <div className="sticky top-20 rounded-2xl p-5 flex flex-col gap-4" style={{ backgroundColor: theme.bgCard, border: `1px solid ${theme.border}` }}>
                            <h2 className="font-bold text-sm" style={{ color: theme.textPrimary }}>Resumo</h2>
                            <div className="flex flex-col gap-3">
                                {items.map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <img src={item.product.images[0]} alt="" className="w-12 h-12 rounded-lg object-cover shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-medium truncate" style={{ color: theme.textPrimary }}>{item.product.name}</p>
                                            <p className="text-xs" style={{ color: theme.textMuted }}>x{item.quantity} · {item.selectedColor}</p>
                                        </div>
                                        <p className="text-sm font-bold shrink-0" style={{ color: theme.textPrimary }}>
                                            {(item.product.price * item.quantity).toFixed(2)}€
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t pt-3 flex flex-col gap-2" style={{ borderColor: theme.border }}>
                                <div className="flex justify-between text-sm">
                                    <span style={{ color: theme.textSecondary }}>Subtotal</span>
                                    <span style={{ color: theme.textPrimary }}>{subtotal.toFixed(2)}€</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span style={{ color: theme.textSecondary }}>Portes</span>
                                    <span style={{ color: shippingCost === 0 ? theme.success : theme.textPrimary }}>
                                        {shippingCost === 0 ? 'Grátis 🎉' : `${shippingCost.toFixed(2)}€`}
                                    </span>
                                </div>
                                <div className="flex justify-between font-bold text-base mt-1">
                                    <span style={{ color: theme.textPrimary }}>Total</span>
                                    <span style={{ color: theme.primary }}>{total.toFixed(2)}€</span>
                                </div>
                            </div>
                            {submitError && (
                                <p className="text-xs text-center font-medium" style={{ color: theme.danger }}>
                                    Erro ao registar pedido. Verifique a ligação e tente novamente.
                                </p>
                            )}
                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full py-4 rounded-xl font-bold text-sm text-white cursor-pointer transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                                style={{ backgroundColor: theme.primary }}
                                onMouseEnter={e => !submitting && (e.currentTarget.style.backgroundColor = theme.primaryHover)}
                                onMouseLeave={e => (e.currentTarget.style.backgroundColor = theme.primary)}
                            >
                                {submitting
                                    ? <><Loader2 size={16} className="animate-spin" /> A registar pedido…</>
                                    : 'Confirmar via WhatsApp →'
                                }
                            </button>
                            <p className="text-xs text-center" style={{ color: theme.textMuted }}>
                                O pedido é guardado e enviado para o WhatsApp. Confirmamos e combinamos o pagamento em breve.
                            </p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
