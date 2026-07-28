import { Link } from 'react-router-dom'
import { Building2, FileText, Wifi, Users, TrendingUp, MessageSquare } from 'lucide-react'
import { theme } from '../themes'
import { config } from '../config'
import { useProducts } from '../contexts/ProductsContext'
import { ProductCard } from '../components/catalog/ProductCard'

const features = [
    { icon: TrendingUp, title: 'Desconto em volume', desc: 'Preços especiais para encomendas a partir de 10 unidades. Peça sempre uma proposta.' },
    { icon: FileText, title: 'Fatura disponível', desc: 'Emitimos fatura com NIF para a sua empresa. Suportamos pagamento por transferência.' },
    { icon: Wifi, title: 'Soluções NFC', desc: 'Totens e chaveiros com chip NFC para avaliações Google, partilha de contactos e muito mais.' },
    { icon: Users, title: 'Suporte dedicado', desc: 'Linha de apoio via WhatsApp para encomendas empresariais. Resposta em menos de 2h.' },
]

export function B2BHome() {
    const products = useProducts()
    const b2bFirst = [...products].sort((a, b) => (b.b2b ? 1 : 0) - (a.b2b ? 1 : 0)).slice(0, 4)

    const waMsg = encodeURIComponent('Olá! Sou empresa e gostaria de pedir uma proposta para encomenda em volume. Podem ajudar-me?')

    return (
        <div>
            {/* Hero */}
            <section
                className="px-4 py-20 md:py-28 flex flex-col items-center text-center gap-6"
                style={{ background: `linear-gradient(135deg, #0F172A 0%, ${theme.primary} 100%)` }}
            >
                <span
                    className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider"
                    style={{ backgroundColor: 'rgba(255,255,255,0.12)', color: '#93C5FD' }}
                >
                    <Building2 size={11} className="inline mr-1.5" />
                    Soluções para empresas · Portugal 🇵🇹
                </span>
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight max-w-3xl text-white">
                    Impressão 3D para o{' '}
                    <span style={{ color: theme.accentLight }}>seu negócio</span>
                </h1>
                <p className="text-lg max-w-xl leading-relaxed" style={{ color: '#CBD5E1' }}>
                    Brindes corporativos, totens NFC, troféus e decoração — em volume, com fatura e entregues em Portugal.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                    <a
                        href={`https://wa.me/${config.brand.whatsapp.replace(/\D/g, '')}?text=${waMsg}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm transition-all"
                        style={{ backgroundColor: '#25D366', color: '#fff' }}
                    >
                        <MessageSquare size={16} /> Pedir proposta via WhatsApp
                    </a>
                    <Link
                        to="/catalogo"
                        className="px-8 py-4 rounded-xl font-bold text-sm border transition-all"
                        style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.35)', backgroundColor: 'rgba(255,255,255,0.08)' }}
                    >
                        Ver catálogo completo
                    </Link>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-6 justify-center pt-2">
                    {[
                        { label: 'Produção em Portugal', value: '🇵🇹' },
                        { label: 'Fatura disponível', value: '📄' },
                        { label: 'Resposta em 2h', value: '⚡' },
                        { label: 'NFC integrado', value: '📡' },
                    ].map(s => (
                        <div key={s.label} className="flex items-center gap-2">
                            <span className="text-lg">{s.value}</span>
                            <span className="text-sm font-medium" style={{ color: '#94A3B8' }}>{s.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Produtos em destaque */}
            <section className="max-w-6xl mx-auto px-4 py-16">
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: theme.primary }}>Soluções empresariais</span>
                        <h2 className="text-2xl md:text-3xl font-extrabold mt-1" style={{ color: theme.textPrimary }}>
                            Produtos para o seu negócio
                        </h2>
                        <p className="mt-1 text-sm" style={{ color: theme.textSecondary }}>
                            Personalizados com a identidade da sua empresa
                        </p>
                    </div>
                    <Link
                        to="/catalogo"
                        className="text-sm font-semibold hidden md:block"
                        style={{ color: theme.primary }}
                    >
                        Ver todos →
                    </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {b2bFirst.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
            </section>

            {/* Features */}
            <section className="py-16" style={{ backgroundColor: theme.bgSection }}>
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-12" style={{ color: theme.textPrimary }}>
                        Porque escolher a Nexo3D para a sua empresa?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map(({ icon: Icon, title, desc }) => (
                            <div key={title} className="flex flex-col gap-3 p-6 rounded-2xl" style={{ backgroundColor: '#fff', border: `1px solid ${theme.border}` }}>
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: theme.bgSection }}>
                                    <Icon size={20} style={{ color: theme.primary }} />
                                </div>
                                <h3 className="font-bold text-sm" style={{ color: theme.textPrimary }}>{title}</h3>
                                <p className="text-xs leading-relaxed" style={{ color: theme.textSecondary }}>{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA final */}
            <section className="py-16 px-4 text-center">
                <div className="max-w-xl mx-auto flex flex-col gap-5">
                    <h2 className="text-2xl md:text-3xl font-extrabold" style={{ color: theme.textPrimary }}>
                        Pronto para fazer a sua encomenda?
                    </h2>
                    <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
                        Diga-nos o que precisa — quantidade, personalização e prazo — e preparamos uma proposta à medida da sua empresa.
                    </p>
                    <a
                        href={`https://wa.me/${config.brand.whatsapp.replace(/\D/g, '')}?text=${waMsg}`}
                        target="_blank"
                        rel="noreferrer"
                        className="self-center flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-white"
                        style={{ backgroundColor: '#25D366' }}
                    >
                        <MessageSquare size={16} /> Falar com a equipa
                    </a>
                </div>
            </section>
        </div>
    )
}
