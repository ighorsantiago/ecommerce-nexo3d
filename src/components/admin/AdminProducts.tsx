import { useState, useEffect } from 'react'
import { Save, RotateCcw, Plus, Trash2, ExternalLink, CheckCircle } from 'lucide-react'
import { theme } from '../../themes'
import { products as configProducts } from '../../config'
import { useProductsContext } from '../../contexts/ProductsContext'
import type { ProductOverride } from '../../types'

const BADGE_PRESETS = [
    { label: 'Mais Vendido', color: '#10B981' },
    { label: 'NFC', color: '#3BB2F6' },
    { label: 'Encomenda', color: '#F59E0B' },
    { label: 'B2B', color: '#1E40AF' },
    { label: 'Novo', color: '#7C3AED' },
    { label: 'Esgotado', color: '#EF4444' },
]

export function AdminProducts() {
    const { products, overrides, updateProduct, resetProduct } = useProductsContext()
    const [selectedId, setSelectedId] = useState<string>(products[0]?.id ?? '')
    const [draft, setDraft] = useState<ProductOverride>({})
    const [newImageUrl, setNewImageUrl] = useState('')
    const [saved, setSaved] = useState(false)

    const selected = products.find(p => p.id === selectedId)
    const original = configProducts.find(p => p.id === selectedId)
    const hasOverride = !!overrides[selectedId]

    // Reset draft when product changes
    useEffect(() => {
        if (!selected) return
        setDraft({
            name: selected.name,
            price: selected.price,
            shortDesc: selected.shortDesc,
            description: selected.description,
            images: [...selected.images],
            badge: selected.badge ?? '',
            badgeColor: selected.badgeColor ?? '#10B981',
            inStock: selected.inStock,
            featured: selected.featured ?? false,
        })
        setNewImageUrl('')
        setSaved(false)
    }, [selectedId]) // eslint-disable-line

    function handleSave() {
        const patch: ProductOverride = {}
        if (!original) return
        if (draft.name !== original.name) patch.name = draft.name
        if (draft.price !== original.price) patch.price = draft.price
        if (draft.shortDesc !== original.shortDesc) patch.shortDesc = draft.shortDesc
        if (draft.description !== original.description) patch.description = draft.description
        if (JSON.stringify(draft.images) !== JSON.stringify(original.images)) patch.images = draft.images
        if ((draft.badge ?? '') !== (original.badge ?? '')) patch.badge = draft.badge
        if ((draft.badgeColor ?? '') !== (original.badgeColor ?? '')) patch.badgeColor = draft.badgeColor
        if (draft.inStock !== original.inStock) patch.inStock = draft.inStock
        if ((draft.featured ?? false) !== (original.featured ?? false)) patch.featured = draft.featured
        updateProduct(selectedId, patch)
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
    }

    function handleReset() {
        if (!confirm('Repor os valores originais deste produto?')) return
        resetProduct(selectedId)
        // Draft will reset via useEffect when products update
    }

    function addImage() {
        const url = newImageUrl.trim()
        if (!url) return
        setDraft(prev => ({ ...prev, images: [...(prev.images ?? []), url] }))
        setNewImageUrl('')
    }

    function removeImage(idx: number) {
        setDraft(prev => ({ ...prev, images: (prev.images ?? []).filter((_, i) => i !== idx) }))
    }

    if (!selected || !draft) return null

    return (
        <div className="flex flex-col md:flex-row gap-4 min-h-[500px]">
            {/* Product list */}
            <div className="md:w-56 shrink-0 flex flex-col gap-1 overflow-y-auto max-h-[600px]">
                {products.map(p => (
                    <button
                        key={p.id}
                        onClick={() => setSelectedId(p.id)}
                        className="flex items-center gap-3 p-2.5 rounded-xl text-left transition-all cursor-pointer w-full"
                        style={{
                            backgroundColor: selectedId === p.id ? theme.primary + '18' : 'transparent',
                            border: `1.5px solid ${selectedId === p.id ? theme.primary : 'transparent'}`,
                        }}
                    >
                        <img
                            src={p.images[0]}
                            alt=""
                            className="w-10 h-10 rounded-lg object-cover shrink-0"
                            style={{ border: `1px solid ${theme.border}` }}
                        />
                        <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold truncate" style={{ color: theme.textPrimary }}>{p.name}</p>
                            <p className="text-xs" style={{ color: theme.textMuted }}>{p.price.toFixed(2)}€</p>
                        </div>
                        {overrides[p.id] && (
                            <span className="text-xs px-1.5 py-0.5 rounded-full font-semibold shrink-0" style={{ backgroundColor: theme.accent + '20', color: theme.primary }}>
                                ●
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* Edit form */}
            <div className="flex-1 rounded-2xl p-5 flex flex-col gap-5" style={{ backgroundColor: theme.bgCard, border: `1px solid ${theme.border}` }}>
                <div className="flex items-center justify-between">
                    <h2 className="font-bold text-sm" style={{ color: theme.textPrimary }}>{selected.name}</h2>
                    {hasOverride && (
                        <span className="text-xs px-2 py-1 rounded-full font-semibold" style={{ backgroundColor: theme.accent + '20', color: theme.primary }}>
                            Modificado
                        </span>
                    )}
                </div>

                {/* Images */}
                <div>
                    <p className="text-xs font-semibold mb-2" style={{ color: theme.textSecondary }}>Imagens</p>
                    <div className="flex flex-col gap-2">
                        {(draft.images ?? []).map((url, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                                <img src={url} alt="" className="w-12 h-12 rounded-lg object-cover shrink-0" onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&q=60' }} />
                                <input
                                    type="url"
                                    value={url}
                                    onChange={e => {
                                        const imgs = [...(draft.images ?? [])]
                                        imgs[idx] = e.target.value
                                        setDraft(prev => ({ ...prev, images: imgs }))
                                    }}
                                    className="flex-1 px-3 py-2 rounded-xl text-xs outline-none min-w-0"
                                    style={{ backgroundColor: theme.bgInput, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                                    placeholder="https://..."
                                />
                                <button onClick={() => removeImage(idx)} className="p-1.5 rounded-lg cursor-pointer" style={{ color: theme.danger }}>
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        ))}
                        <div className="flex gap-2">
                            <input
                                type="url"
                                value={newImageUrl}
                                onChange={e => setNewImageUrl(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && addImage()}
                                className="flex-1 px-3 py-2 rounded-xl text-xs outline-none"
                                style={{ backgroundColor: theme.bgInput, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                                placeholder="Colar URL de imagem (ImgBB, Cloudinary…)"
                            />
                            <button onClick={addImage} className="px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer flex items-center gap-1" style={{ backgroundColor: theme.bgSection, color: theme.primary }}>
                                <Plus size={12} /> Adicionar
                            </button>
                        </div>
                        <a href="https://imgbb.com" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs" style={{ color: theme.textMuted }}>
                            <ExternalLink size={11} /> Upload gratuito de imagens: imgbb.com
                        </a>
                    </div>
                </div>

                {/* Basic info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-semibold mb-1" style={{ color: theme.textSecondary }}>Nome do produto</label>
                        <input
                            type="text"
                            value={draft.name ?? ''}
                            onChange={e => setDraft(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                            style={{ backgroundColor: theme.bgInput, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold mb-1" style={{ color: theme.textSecondary }}>Preço (€)</label>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={draft.price ?? 0}
                            onChange={e => setDraft(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                            className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                            style={{ backgroundColor: theme.bgInput, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-semibold mb-1" style={{ color: theme.textSecondary }}>Descrição curta (texto do card)</label>
                    <input
                        type="text"
                        value={draft.shortDesc ?? ''}
                        onChange={e => setDraft(prev => ({ ...prev, shortDesc: e.target.value }))}
                        className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                        style={{ backgroundColor: theme.bgInput, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                        maxLength={120}
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold mb-1" style={{ color: theme.textSecondary }}>Descrição completa</label>
                    <textarea
                        value={draft.description ?? ''}
                        onChange={e => setDraft(prev => ({ ...prev, description: e.target.value }))}
                        rows={3}
                        className="w-full px-3 py-2 rounded-xl text-sm outline-none resize-none"
                        style={{ backgroundColor: theme.bgInput, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                    />
                </div>

                {/* Badge */}
                <div>
                    <p className="text-xs font-semibold mb-2" style={{ color: theme.textSecondary }}>Badge</p>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {BADGE_PRESETS.map(b => (
                            <button
                                key={b.label}
                                onClick={() => setDraft(prev => ({ ...prev, badge: b.label, badgeColor: b.color }))}
                                className="px-2.5 py-1 rounded-full text-xs font-bold text-white cursor-pointer transition-all"
                                style={{ backgroundColor: b.color, opacity: draft.badge === b.label ? 1 : 0.5 }}
                            >
                                {b.label}
                            </button>
                        ))}
                        <button
                            onClick={() => setDraft(prev => ({ ...prev, badge: '' }))}
                            className="px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer"
                            style={{ backgroundColor: theme.bgSection, color: theme.textMuted, border: `1px solid ${theme.border}` }}
                        >
                            Sem badge
                        </button>
                    </div>
                    {draft.badge && (
                        <input
                            type="text"
                            value={draft.badge}
                            onChange={e => setDraft(prev => ({ ...prev, badge: e.target.value }))}
                            className="px-3 py-2 rounded-xl text-xs outline-none"
                            style={{ backgroundColor: theme.bgInput, border: `1px solid ${theme.border}`, color: theme.textPrimary }}
                            placeholder="Texto do badge"
                        />
                    )}
                </div>

                {/* Toggles */}
                <div className="flex gap-6">
                    {[
                        { key: 'inStock', label: 'Em stock' },
                        { key: 'featured', label: 'Destaque (homepage)' },
                    ].map(({ key, label }) => (
                        <label key={key} className="flex items-center gap-2 cursor-pointer">
                            <div
                                className="w-10 h-5 rounded-full transition-colors relative"
                                style={{ backgroundColor: draft[key as keyof typeof draft] ? theme.success : theme.border }}
                                onClick={() => setDraft(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))}
                            >
                                <div
                                    className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all"
                                    style={{ left: draft[key as keyof typeof draft] ? '22px' : '2px' }}
                                />
                            </div>
                            <span className="text-xs font-medium" style={{ color: theme.textSecondary }}>{label}</span>
                        </label>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2 border-t" style={{ borderColor: theme.border }}>
                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all cursor-pointer"
                        style={{ backgroundColor: saved ? theme.success : theme.primary }}
                    >
                        {saved ? <><CheckCircle size={15} /> Guardado!</> : <><Save size={15} /> Guardar alterações</>}
                    </button>
                    {hasOverride && (
                        <button
                            onClick={handleReset}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer"
                            style={{ color: theme.danger, backgroundColor: theme.danger + '12', border: `1px solid ${theme.danger + '30'}` }}
                        >
                            <RotateCcw size={14} /> Repor original
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
