import { useState } from 'react'
import { Lock, Package, Cpu } from 'lucide-react'
import { theme } from '../themes'
import { config } from '../config'

// Painel simples — encomendas chegam via WhatsApp, este painel é para controlo interno
export function Admin() {
    const [password, setPassword] = useState('')
    const [authenticated, setAuthenticated] = useState(false)
    const [error, setError] = useState(false)

    function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        if (password === config.brand.adminPassword) {
            setAuthenticated(true)
        } else {
            setError(true)
            setPassword('')
        }
    }

    if (!authenticated) {
        return (
            <div className="min-h-96 flex items-center justify-center px-4 py-16">
                <div className="w-full max-w-sm flex flex-col gap-6">
                    <div className="text-center">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: theme.primary }}>
                            <Cpu size={22} color="#fff" />
                        </div>
                        <h1 className="text-xl font-extrabold" style={{ color: theme.textPrimary }}>
                            Nexo3D · Admin
                        </h1>
                    </div>
                    <form onSubmit={handleLogin} className="rounded-2xl p-6 flex flex-col gap-4" style={{ backgroundColor: theme.bgCard, border: `1px solid ${theme.border}` }}>
                        <div className="flex items-center gap-2">
                            <Lock size={16} style={{ color: theme.primary }} />
                            <span className="text-sm font-semibold" style={{ color: theme.textPrimary }}>Área reservada</span>
                        </div>
                        <input
                            type="password"
                            placeholder="Palavra-passe"
                            value={password}
                            onChange={e => { setPassword(e.target.value); setError(false) }}
                            className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                            style={{
                                backgroundColor: theme.bgInput,
                                border: `1px solid ${error ? theme.danger : theme.border}`,
                                color: theme.textPrimary,
                            }}
                            required
                            autoFocus
                        />
                        {error && <p className="text-xs" style={{ color: theme.danger }}>Palavra-passe incorreta.</p>}
                        <button
                            type="submit"
                            className="w-full py-3 rounded-xl font-bold text-sm text-white cursor-pointer"
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
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex items-center gap-3 mb-8">
                <Package size={22} style={{ color: theme.primary }} />
                <h1 className="text-xl font-extrabold" style={{ color: theme.textPrimary }}>Painel Nexo3D</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {[
                    { label: 'Produtos ativos', value: config.brand.name === 'Nexo3D' ? '6' : '—' },
                    { label: 'Encomendas', value: 'Via WhatsApp' },
                    { label: 'Estado da loja', value: 'Online ✅' },
                ].map(({ label, value }) => (
                    <div key={label} className="rounded-2xl p-5" style={{ backgroundColor: theme.bgCard, border: `1px solid ${theme.border}` }}>
                        <p className="text-2xl font-extrabold" style={{ color: theme.primary }}>{value}</p>
                        <p className="text-xs mt-1" style={{ color: theme.textMuted }}>{label}</p>
                    </div>
                ))}
            </div>

            <div className="rounded-2xl p-6 flex flex-col gap-3" style={{ backgroundColor: theme.bgCard, border: `1px solid ${theme.border}` }}>
                <h2 className="font-bold text-sm" style={{ color: theme.textPrimary }}>Instruções de operação</h2>
                <ul className="text-sm flex flex-col gap-2" style={{ color: theme.textSecondary }}>
                    <li>📱 <strong>Encomendas:</strong> chegam via WhatsApp com todos os detalhes do pedido, personalização e morada.</li>
                    <li>✅ <strong>Confirmar pedido:</strong> responder ao cliente no WhatsApp confirmando o valor total e dados de pagamento.</li>
                    <li>💳 <strong>Pagamento:</strong> receber via MB WAY, Multibanco ou transferência bancária antes de iniciar produção.</li>
                    <li>📦 <strong>Envio:</strong> após produção, enviar via CTT e partilhar o número de tracking com o cliente.</li>
                    <li>🔧 <strong>Adicionar produto:</strong> editar o ficheiro <code>src/config.ts</code> e adicionar um novo objeto no array <code>products</code>.</li>
                </ul>
            </div>
        </div>
    )
}
