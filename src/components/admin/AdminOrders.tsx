import { useState, useEffect } from 'react'
import { RefreshCw, Trash2, ChevronDown, ChevronUp } from 'lucide-react'
import { theme } from '../../themes'
import { getOrders, updateOrderStatus, deleteOrder } from '../../lib/orders'
import type { Order, OrderStatus } from '../../types'

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; bg: string }> = {
    novo:         { label: 'Novo',          color: '#1E40AF', bg: '#EFF6FF' },
    confirmado:   { label: 'Confirmado',    color: '#059669', bg: '#ECFDF5' },
    em_producao:  { label: 'Em produção',   color: '#7C3AED', bg: '#F5F3FF' },
    enviado:      { label: 'Enviado',       color: '#D97706', bg: '#FFFBEB' },
    concluido:    { label: 'Concluído',     color: '#065F46', bg: '#D1FAE5' },
    cancelado:    { label: 'Cancelado',     color: '#9F1239', bg: '#FFF1F2' },
}

const STATUS_ORDER: OrderStatus[] = ['novo', 'confirmado', 'em_producao', 'enviado', 'concluido', 'cancelado']

function StatusBadge({ status }: { status: OrderStatus }) {
    const cfg = STATUS_CONFIG[status]
    return (
        <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ color: cfg.color, backgroundColor: cfg.bg }}>
            {cfg.label}
        </span>
    )
}

function OrderRow({ order, onRefresh }: { order: Order; onRefresh: () => void }) {
    const [expanded, setExpanded] = useState(false)
    const [updating, setUpdating] = useState(false)

    async function handleStatusChange(status: OrderStatus) {
        setUpdating(true)
        try {
            await updateOrderStatus(order.id, status)
            onRefresh()
        } finally {
            setUpdating(false)
        }
    }

    async function handleDelete() {
        if (!confirm(`Eliminar pedido de ${order.customer_name}?`)) return
        await deleteOrder(order.id)
        onRefresh()
    }

    const date = new Date(order.created_at).toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' })
    const shortId = order.id.slice(0, 8).toUpperCase()

    return (
        <div className="rounded-xl border" style={{ borderColor: theme.border, backgroundColor: theme.bgCard }}>
            {/* Linha principal */}
            <div
                className="flex items-center gap-3 px-4 py-3 cursor-pointer"
                onClick={() => setExpanded(o => !o)}
            >
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono font-bold" style={{ color: theme.muted }}>#{shortId}</span>
                        <span className="text-sm font-semibold truncate" style={{ color: theme.textPrimary }}>{order.customer_name}</span>
                        <StatusBadge status={order.status} />
                    </div>
                    <div className="flex gap-3 mt-0.5 text-xs" style={{ color: theme.textMuted }}>
                        <span>{date}</span>
                        <span>·</span>
                        <span>{order.items.length} {order.items.length === 1 ? 'produto' : 'produtos'}</span>
                        <span>·</span>
                        <span className="font-semibold" style={{ color: theme.textPrimary }}>{order.total.toFixed(2)}€</span>
                    </div>
                </div>
                {expanded ? <ChevronUp size={16} style={{ color: theme.muted }} /> : <ChevronDown size={16} style={{ color: theme.muted }} />}
            </div>

            {/* Detalhe expandido */}
            {expanded && (
                <div className="border-t px-4 py-4 flex flex-col gap-4" style={{ borderColor: theme.border }}>
                    {/* Contacto + morada */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex flex-col gap-1">
                            <p className="text-xs font-bold uppercase tracking-wider" style={{ color: theme.muted }}>Cliente</p>
                            <p style={{ color: theme.textPrimary }}>{order.customer_name}</p>
                            <p style={{ color: theme.textSecondary }}>{order.customer_email}</p>
                            <p style={{ color: theme.textSecondary }}>{order.customer_phone}</p>
                            {order.nif && <p style={{ color: theme.textMuted }}>NIF: {order.nif}</p>}
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-xs font-bold uppercase tracking-wider" style={{ color: theme.muted }}>Entrega</p>
                            <p style={{ color: theme.textPrimary }}>{order.address}</p>
                            <p style={{ color: theme.textSecondary }}>{order.postal_code} {order.city}</p>
                            <p style={{ color: theme.textSecondary }}>{order.country}</p>
                        </div>
                    </div>

                    {/* Produtos */}
                    <div>
                        <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: theme.muted }}>Produtos</p>
                        <div className="flex flex-col gap-2">
                            {order.items.map((item, i) => (
                                <div key={i} className="flex items-center justify-between text-sm p-2 rounded-lg" style={{ backgroundColor: theme.bgSection }}>
                                    <div>
                                        <span className="font-medium" style={{ color: theme.textPrimary }}>{item.product_name}</span>
                                        <span className="ml-2 text-xs" style={{ color: theme.muted }}>x{item.quantity} · {item.selected_color}</span>
                                        {Object.entries(item.custom_values).map(([k, v]) => (
                                            <span key={k} className="ml-2 text-xs" style={{ color: theme.muted }}> · {k}: {v}</span>
                                        ))}
                                    </div>
                                    <span className="font-semibold" style={{ color: theme.textPrimary }}>
                                        {(item.price * item.quantity).toFixed(2)}€
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Total + portes */}
                    <div className="flex justify-end gap-6 text-sm border-t pt-3" style={{ borderColor: theme.border }}>
                        <span style={{ color: theme.textSecondary }}>Portes: {order.shipping_cost === 0 ? 'Grátis' : `${order.shipping_cost.toFixed(2)}€`}</span>
                        <span className="font-bold" style={{ color: theme.textPrimary }}>Total: {order.total.toFixed(2)}€</span>
                    </div>

                    {order.notes && (
                        <p className="text-xs italic" style={{ color: theme.textMuted }}>Notas: {order.notes}</p>
                    )}

                    {/* Ações */}
                    <div className="flex items-center gap-3 flex-wrap border-t pt-3" style={{ borderColor: theme.border }}>
                        <span className="text-xs font-semibold" style={{ color: theme.muted }}>Avançar para:</span>
                        {STATUS_ORDER.filter(s => s !== order.status && s !== 'cancelado').map(s => (
                            <button
                                key={s}
                                onClick={() => handleStatusChange(s)}
                                disabled={updating}
                                className="text-xs font-semibold px-3 py-1.5 rounded-lg border cursor-pointer transition-all disabled:opacity-50"
                                style={{ borderColor: STATUS_CONFIG[s].color, color: STATUS_CONFIG[s].color, backgroundColor: STATUS_CONFIG[s].bg }}
                            >
                                {STATUS_CONFIG[s].label}
                            </button>
                        ))}
                        <button
                            onClick={handleDelete}
                            className="ml-auto flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg cursor-pointer transition-all"
                            style={{ color: theme.danger, backgroundColor: '#FFF1F2' }}
                        >
                            <Trash2 size={13} /> Eliminar
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export function AdminOrders() {
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState<OrderStatus | 'todos'>('todos')

    async function load() {
        setLoading(true)
        try {
            const data = await getOrders()
            setOrders(data)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { load() }, [])

    const filtered = filter === 'todos' ? orders : orders.filter(o => o.status === filter)

    const totalHoje = orders
        .filter(o => {
            const today = new Date().toDateString()
            return new Date(o.created_at).toDateString() === today && o.status !== 'cancelado'
        })
        .reduce((sum, o) => sum + o.total, 0)

    const counts: Partial<Record<OrderStatus, number>> = {}
    for (const o of orders) counts[o.status] = (counts[o.status] ?? 0) + 1

    return (
        <div className="flex flex-col gap-5">
            {/* Métricas rápidas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                    { label: 'Total de pedidos', value: orders.length },
                    { label: 'Novos', value: counts['novo'] ?? 0 },
                    { label: 'Em produção', value: counts['em_producao'] ?? 0 },
                    { label: 'Faturação hoje', value: `${totalHoje.toFixed(2)}€` },
                ].map(({ label, value }) => (
                    <div key={label} className="rounded-xl p-4 flex flex-col gap-1" style={{ backgroundColor: theme.bgSection, border: `1px solid ${theme.border}` }}>
                        <p className="text-xs" style={{ color: theme.muted }}>{label}</p>
                        <p className="text-xl font-extrabold" style={{ color: theme.textPrimary }}>{value}</p>
                    </div>
                ))}
            </div>

            {/* Filtro por estado */}
            <div className="flex gap-2 flex-wrap items-center">
                <button
                    onClick={() => setFilter('todos')}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg cursor-pointer"
                    style={{ backgroundColor: filter === 'todos' ? theme.primary : theme.bgSection, color: filter === 'todos' ? 'white' : theme.textSecondary }}
                >
                    Todos ({orders.length})
                </button>
                {STATUS_ORDER.map(s => (
                    <button
                        key={s}
                        onClick={() => setFilter(s)}
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg cursor-pointer"
                        style={{
                            backgroundColor: filter === s ? STATUS_CONFIG[s].color : STATUS_CONFIG[s].bg,
                            color: filter === s ? 'white' : STATUS_CONFIG[s].color,
                        }}
                    >
                        {STATUS_CONFIG[s].label} {counts[s] ? `(${counts[s]})` : ''}
                    </button>
                ))}
                <button onClick={load} className="ml-auto cursor-pointer" style={{ color: theme.muted }}>
                    <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
                </button>
            </div>

            {/* Lista de pedidos */}
            {loading ? (
                <div className="py-12 text-center text-sm" style={{ color: theme.muted }}>A carregar pedidos…</div>
            ) : filtered.length === 0 ? (
                <div className="py-12 text-center text-sm" style={{ color: theme.muted }}>
                    {filter === 'todos' ? 'Ainda não há pedidos.' : `Nenhum pedido com estado "${STATUS_CONFIG[filter as OrderStatus]?.label}".`}
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {filtered.map(order => (
                        <OrderRow key={order.id} order={order} onRefresh={load} />
                    ))}
                </div>
            )}
        </div>
    )
}
