import { Link } from 'react-router-dom'
import { Zap, Package, Heart, Wifi } from 'lucide-react'
import { theme } from '../themes'
import { config, bannerSlides } from '../config'
import { useProducts } from '../contexts/ProductsContext'
import { ProductCard } from '../components/catalog/ProductCard'
import { HeroBanner } from '../components/base/HeroBanner'

const features = [
    { icon: Package, title: 'Produção sob encomenda', desc: 'Cada peça é fabricada especialmente para si, com prazo de 3 a 7 dias úteis.' },
    { icon: Zap, title: 'Personalização total', desc: 'Escolha cores, texto e dimensões. Nenhuma peça é igual à outra.' },
    { icon: Wifi, title: 'Tecnologia NFC', desc: 'Produtos inteligentes com chip NFC integrado para partilhar contactos e links.' },
    { icon: Heart, title: 'Negócio familiar', desc: 'Feito com cuidado em Portugal, com atenção pessoal a cada encomenda.' },
]

export function Home() {
    const products = useProducts()
    const featured = products.filter(p => p.featured)

    return (
        <div>
            {/* Banner carrossel */}
            <HeroBanner slides={bannerSlides} />

            {/* Produtos em destaque */}
            <section className="max-w-6xl mx-auto px-4 py-16">
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-extrabold" style={{ color: theme.textPrimary }}>
                            Mais vendidos
                        </h2>
                        <p className="mt-1 text-sm" style={{ color: theme.textSecondary }}>
                            Os produtos favoritos dos nossos clientes
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
                    {featured.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
                <div className="mt-6 md:hidden text-center">
                    <Link to="/catalogo" className="text-sm font-semibold" style={{ color: theme.primary }}>
                        Ver todos os produtos →
                    </Link>
                </div>
            </section>

            {/* Features */}
            <section className="py-16" style={{ backgroundColor: theme.bgSection }}>
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-12" style={{ color: theme.textPrimary }}>
                        Porque escolher a Nexo3D?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map(({ icon: Icon, title, desc }) => (
                            <div key={title} className="flex flex-col gap-3 p-6 rounded-2xl" style={{ backgroundColor: theme.bgCard, border: `1px solid ${theme.border}` }}>
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

            {/* CTA NFC */}
            <section
                className="py-16 px-4"
                style={{ background: `linear-gradient(135deg, ${theme.primary} 0%, #1a56db 100%)` }}
            >
                <div className="max-w-2xl mx-auto text-center flex flex-col gap-5">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-200">Novidade</span>
                    <h2 className="text-2xl md:text-4xl font-extrabold text-white">
                        Produtos com chip NFC integrado
                    </h2>
                    <p className="text-blue-100 leading-relaxed">
                        Chaveiros e totens inteligentes que partilham o seu contacto, perfil ou link de avaliação Google com um simples toque de telemóvel.
                    </p>
                    <Link
                        to="/catalogo?categoria=nfc"
                        className="self-center px-8 py-4 rounded-xl font-bold text-sm bg-white transition-all"
                        style={{ color: theme.primary }}
                    >
                        Explorar produtos NFC
                    </Link>
                </div>
            </section>
        </div>
    )
}
