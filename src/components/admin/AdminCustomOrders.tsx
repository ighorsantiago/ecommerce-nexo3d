import { useState } from 'react'
import { Plus, MessageSquare, Trash2, ChevronDown, X } from 'lucide-react'
import { theme } from '../../themes'
import { config } from '../../config'
import type { CustomOrder, CustomOrderStatus } from '../../types'

const STORAGE_KEY = 'nexo3d_custom_orders_v1'

const STATUS_CONFIG: Record<CustomOrderStatus, { label: string; color: string; bg: string }> = {
    em_contacto:      { label: 'Em contacto',       color: '#92400E', bg: '#FEF3C7' },
    orcamento_enviado:{ label: 'Orçamento enviado',  color: '#1E40AF', bg: '#DBEAFE' },
    confirmado:       { label: 'Confirmado',          color: '#065F46', bg: '#D1FAE5' },
    em_producao:      { label: 'Em produção',         color: '#9A3412', bg: '#FFEDD5' },
    enviado:          { label: 'Enviado',             color: '#5B21B6', bg: '#EDE9FE' },
    entregue:         { label: 'Entregue ✅',         color: '#14532D', bg: '#DCFCE7' },
    cancelado:        { label: 'Cancelado',           color: '#991B1B', bg: '#FEE2E2' },
}

const STATUS_ORDER: CustomOrderStatus[] = [
    'em_contacto', 'orcamento_enviado', 'confirmado', 'em_producao', 'enviado', 'entregue', 'cancelado',
]

function loadOrders(): CustomOrder[] {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') }
    catch { return [] }
}

function saveOrders(orders: CustomOrder[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
}

function formatPhone(phone: string) {
    return phone.replace(/\D/g, '')
}

export function AdminCustomOrders() {
    const [orders, setOrders] = useState<CustomOrder[]>(loadOrders)
    const [showForm, setShowForm] = useState(false)
    const [filterStatus, setFilterStatus] = useState<CustomOrderStatus | 'todos'>('todos')
    const [form, setForm] = useState({
        client: '', phone: '', description: '', price: '', notes: '',
    })

    function mutate(next: CustomOrder[]) {
        setOrders(next)
        saveOrders(next)
    }

    function handleAdd(e: React.FormEvent) {
        e.preventDefault()
        const order: CustomOrder = {
            id: Date.now().toString(),
            client: form.client.trim(),
            phone: form.phone.trim(),
            description: form.description.trim(),
            price: form.price ? parseFloat(form.price) : null,
            status: 'em_contacto',
            notes: form.notes.trim(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
        mutate([order, ...orders])
        setForm({ client: '', phone: '', description: '', price: '', notes: '' })
        setShowForm(false)
    }

    function changeStatus(id: string, status: CustomOrderStatus) {
        mutate(orders.map(o => o.id === id ? { ...o, status, updatedAt: new Date().toISOString() } : o))
    }

    function deleteOrder(id: string) {
        if (!confirm('Eliminar este pedido?')) return
        mutate(orders.filter(o => o.id !== id))
    }

    function openWhatsApp(order: CustomOrder) {
        const st = STATUS_CONFIG[order.status]
        const msg = [
            `Olá ${order.client}! 👋`,
            ``,
            `A propósito do seu pedido personalizado:`,
            `"${order.description}"`,
            ``,
            order.price ? `💰 Valor acordado: ${order.price.toFixed(2).replace('.', ',')}€` : '',
            `📌 Estado: ${st.label}`,
            order.notes ? `📝 Nota: ${order.notes}` : '',
            ``,
            `Qualquer questão, estou à disposição! 🙂`,
            `— Nexo3D`,
        ].filter(l => l !== undefined).join('\n')
        const phone = formatPhone(order.phone) || formatPhone(config.brand.whatsapp)
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank')
    }

    const filtered = filterStatus === 'todos' ? orders : orders.filter(o => o.status === filterStatus)

    return (
        <div className="flex flex-col gap-5">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                    <h2 className="font-extrabold text-base" style={{ color: theme.textPrimary }}>Pedidos Personalizados</h2>
                    <p className="text-xs mt-0.5" style={{ color: theme.textMuted }}>
                        Encomendas únicas não presentes no catálogo
                    </p>
                </div>
                <button
                    onClick={() => setShowForm(v => !v)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white cursor-pointer"
                    style={{ backgroundColor: theme.primary }}
                >
                    {showForm ? <X size={15} /> : <Plus size={15} />}
                    {showForm ? 'Cancelar' : 'Novo pedido'}
                </button>
            </div>

            {/* New order form */}
            {showForm && (
                <form onSubmit={handleAdd} className="rounded-2xl p-5 flex flex-col gap-4" style={{ backgroundColor: theme.bgCard, border: `1px solid ${theme.primary}40` }}>
                    <p className="font-bold text-sm" style={{ color: theme.textPrimary }}>Novo pedido personalizado</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                            { key: 'client', label: 'Nome do cliente', placeholder: 'Ex: João Silva', required: true },
                            { key: 'phone', label: 'Telemóvel (WhatsApp)', placeholder: 'Ex: +351 912 345 678', required: false },
                        ].map(({ key, label, placeholder, required }) => (
                            <div key={key}>
                                <label className="block text-xs font-semibold mb-1" style={{ color: theme.textSecondary }}>{label}</label>
                                <input
                                    type="text"
                                    required={required}
                                    value={form[key as keyof typeof form]}
                                    onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
                                    placeholder={placeholder}
                                    className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                                    style={{ backgroundColor: theme.bgInput, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                                />
                            </div>
                        ))}
                    </div>
                    <div>
                        <label className="block text-xs font-semibold mb-1" style={{ color: theme.textSecondary }}>Descrição do pedido *</label>
                        <textarea
                            required
                            value={form.description}
                            onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
                            rows={2}
                            placeholder="Ex: Porta-chaves com forma de guitarra, cor vermelha, texto 'Rock 2025'"
                            className="w-full px-3 py-2 rounded-xl text-sm outline-none resize-none"
                            style={{ backgroundColor: theme.bgInput, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-semibold mb-1" style={{ color: theme.textSecondary }}>Preço acordado (€)</label>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={form.price}
                                onChange={e => setForm(prev => ({ ...prev, price: e.target.value }))}
                                placeholder="Ex: 25.00"
                                className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                                style={{ backgroundColor: theme.bgInput, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold mb-1" style={{ color: theme.textSecondary }}>Notas internas</label>
                            <input
                                type="text"
                                value={form.notes}
                                onChange={e => setForm(prev => ({ ...prev, notes: e.target.value }))}
                                placeholder="Ex: Precisa até dia 15"
                                className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                                style={{ backgroundColor: theme.bgInput, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                            />
                        </div>
                    </div>
                    <button type="submit" className="self-start px-5 py-2.5 rounded-xl text-sm font-bold text-white cursor-pointer" style={{ backgroundColor: theme.primary }}>
                        Adicionar pedido
                    </button>
                </form>
            )}

            {/* Filter */}
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => setFilterStatus('todos')}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer"
                    style={{
                        backgroundColor: filterStatus === 'todos' ? theme.primary : theme.bgSection,
                        color: filterStatus === 'todos' ? '#fff' : theme.textSecondary,
                    }}
                >
                    Todos ({orders.length})
                </button>
                {STATUS_ORDER.filter(s => orders.some(o => o.status === s)).map(s => (
                    <button
                        key={s}
                        onClick={() => setFilterStatus(s)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer"
                        style={{
                            backgroundColor: filterStatus === s ? theme.primary : theme.bgSection,
                            color: filterStatus === s ? '#fff' : theme.textSecondary,
                        }}
                    >
                        {STATUS_CONFIG[s].label}
                    </button>
                ))}
            </div>

            {/* Orders list */}
            {filtered.length === 0 ? (
                <div className="py-16 text-center rounded-2xl" style={{ backgroundColor: theme.bgSection }}>
                    <p className="text-sm" style={{ color: theme.textMuted }}>
                        {orders.length === 0 ? 'Nenhum pedido personalizado ainda.' : 'Nenhum pedido com este estado.'}
                    </p>
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {filtered.map(order => {
                        const st = STATUS_CONFIG[order.status]
                        return (
                            <div key={order.id} className="rounded-2xl p-4 flex flex-col gap-3" style={{ backgroundColor: theme.bgCard, border: `1px solid ${theme.border}` }}>
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="font-bold text-sm" style={{ color: theme.textPrimary }}>{order.client}</span>
                                            {order.phone && (
                                                <span className="text-xs" style={{ color: theme.textMuted }}>{order.phone}</span>
                                            )}
                                            <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ color: st.color, backgroundColor: st.bg }}>
                                                {st.label}
                                            </span>
                                        </div>
                                        <p className="text-xs mt-1 leading-relaxed" style={{ color: theme.textSecondary }}>{order.description}</p>
                                        {order.notes && (
                                            <p className="text-xs mt-1" style={{ color: theme.textMuted }}>📝 {order.notes}</p>
                                        )}
                                        <p className="text-xs mt-1" style={{ color: theme.textMuted }}>
                                            {new Date(order.createdAt).toLocaleDateString('pt-PT')}
                                            {order.price && <> · <strong style={{ color: theme.success }}>{order.price.toFixed(2).replace('.', ',')}€</strong></>}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 flex-wrap pt-1 border-t" style={{ borderColor: theme.border }}>
                                    {/* Status selector */}
                                    <div className="relative">
                                        <select
                                            value={order.status}
                                            onChange={e => changeStatus(order.id, e.target.value as CustomOrderStatus)}
                                            className="pl-3 pr-7 py-1.5 rounded-lg text-xs font-semibold outline-none cursor-pointer appearance-none"
                                            style={{
                                                backgroundColor: st.bg,
                                                color: st.color,
                                                border: 'none',
                                            }}
                                        >
                                            {STATUS_ORDER.map(s => (
                                                <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>
                                            ))}
                                        </select>
                                        <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: st.color }} />
                                    </div>

                                    <button
                                        onClick={() => openWhatsApp(order)}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer"
                                        style={{ backgroundColor: '#25D36618', color: '#25D366' }}
                                    >
                                        <MessageSquare size={12} /> WhatsApp
                                    </button>

                                    <button
                                        onClick={() => deleteOrder(order.id)}
                                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs cursor-pointer ml-auto"
                                        style={{ color: theme.danger }}
                                    >
                                        <Trash2 size={12} />
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
