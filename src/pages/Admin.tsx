import { useState } from 'react'
import { Lock, Cpu, Package, Sparkles, Building2, LogOut } from 'lucide-react'
import { theme } from '../themes'
import { config } from '../config'
import { AdminProducts } from '../components/admin/AdminProducts'
import { AdminCustomOrders } from '../components/admin/AdminCustomOrders'
import { AdminCorporate } from '../components/admin/AdminCorporate'

type AdminTab = 'produtos' | 'personalizados' | 'corporativo'

const TABS: { id: AdminTab; label: string; icon: typeof Package }[] = [
    { id: 'produtos', label: 'Produtos', icon: Package },
    { id: 'personalizados', label: 'Personalizados', icon: Sparkles },
    { id: 'corporativo', label: 'Corporativo', icon: Building2 },
]

export function Admin() {
    const [password, setPassword] = useState('')
    const [authenticated, setAuthenticated] = useState(false)
    const [error, setError] = useState(false)
    const [activeTab, setActiveTab] = useState<AdminTab>('produtos')

    function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        if (password === config.brand.adminPassword) {
            setAuthenticated(true)
            setError(false)
        } else {
            setError(true)
            setPassword('')
        }
    }

    if (!authenticated) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
                <div className="w-full max-w-sm flex flex-col gap-6">
                    <div className="text-center">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: theme.primary }}>
                            <Cpu size={26} color="#fff" />
                        </div>
                        <h1 className="text-2xl font-extrabold" style={{ color: theme.textPrimary }}>Nexo3D Admin</h1>
                        <p className="text-sm mt-1" style={{ color: theme.textMuted }}>Área reservada à gestão da loja</p>
                    </div>

                    <form
                        onSubmit={handleLogin}
                        className="rounded-2xl p-6 flex flex-col gap-4"
                        style={{ backgroundColor: theme.bgCard, border: `1px solid ${theme.border}`, boxShadow: theme.shadow }}
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <Lock size={15} style={{ color: theme.primary }} />
                            <span className="text-sm font-semibold" style={{ color: theme.textPrimary }}>Acesso restrito</span>
                        </div>
                        <input
                            type="password"
                            placeholder="Palavra-passe"
                            value={password}
                            onChange={e => { setPassword(e.target.value); setError(false) }}
                            className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                            style={{
                                backgroundColor: theme.bgInput,
                                border: `1.5px solid ${error ? theme.danger : theme.border}`,
                                color: theme.textPrimary,
                            }}
                            required
                            autoFocus
                        />
                        {error && (
                            <p className="text-xs font-medium" style={{ color: theme.danger }}>
                                Palavra-passe incorreta. Tente novamente.
                            </p>
                        )}
                        <button
                            type="submit"
                            className="w-full py-3 rounded-xl font-bold text-sm text-white cursor-pointer transition-all"
                            style={{ backgroundColor: theme.primary }}
                        >
                            Entrar
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: theme.primary }}>
                        <Cpu size={20} color="#fff" />
                    </div>
                    <div>
                        <h1 className="text-lg font-extrabold leading-tight" style={{ color: theme.textPrimary }}>Painel Nexo3D</h1>
                        <p className="text-xs" style={{ color: theme.textMuted }}>Gestão da loja</p>
                    </div>
                </div>
                <button
                    onClick={() => setAuthenticated(false)}
                    className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-xl cursor-pointer transition-all"
                    style={{ color: theme.textMuted, backgroundColor: theme.bgSection }}
                >
                    <LogOut size={13} /> Sair
                </button>
            </div>

            {/* Tab bar */}
            <div className="flex gap-1 mb-6 p-1 rounded-2xl" style={{ backgroundColor: theme.bgSection }}>
                {TABS.map(({ id, label, icon: Icon }) => (
                    <button
                        key={id}
                        onClick={() => setActiveTab(id)}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer"
                        style={{
                            backgroundColor: activeTab === id ? '#fff' : 'transparent',
                            color: activeTab === id ? theme.primary : theme.textSecondary,
                            boxShadow: activeTab === id ? theme.shadow : 'none',
                        }}
                    >
                        <Icon size={15} />
                        <span className="hidden sm:inline">{label}</span>
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="rounded-2xl p-5 md:p-6" style={{ backgroundColor: theme.bgCard, border: `1px solid ${theme.border}` }}>
                {activeTab === 'produtos' && <AdminProducts />}
                {activeTab === 'personalizados' && <AdminCustomOrders />}
                {activeTab === 'corporativo' && <AdminCorporate />}
            </div>
        </div>
    )
}
