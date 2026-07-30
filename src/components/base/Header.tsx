import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ShoppingCart, Menu, X, Search, User, Building2, ChevronRight } from 'lucide-react'
import { theme } from '../../themes'
import { useCartContext } from '../../hooks/useCartContext'
import { useUserType } from '../../contexts/UserTypeContext'
import { config } from '../../config'

const NAV_LINKS = [
    { to: '/catalogo', label: 'Produtos' },
    { to: '/sobre', label: 'Sobre nós' },
]

const USER_TYPE_CONFIG = {
    particular: { icon: User,      label: 'Particular', dest: '/loja' },
    empresa:    { icon: Building2, label: 'Empresa',    dest: '/empresa' },
}

function Logo({ linkTo }: { linkTo: string }) {
    return (
        <Link to={linkTo} className="flex items-center gap-2.5">
            <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: theme.primary }}
            >
                <span className="font-black text-white text-xs tracking-tight">N3</span>
            </div>
            <span
                className="font-bold text-xl"
                style={{ fontFamily: 'Sora, sans-serif', color: theme.textPrimary }}
            >
                Nexo<span style={{ color: theme.primary }}>3D</span>
            </span>
        </Link>
    )
}

export function Header() {
    const { totalItems, openCart } = useCartContext()
    const { userType, clearUserType } = useUserType()
    const navigate = useNavigate()
    const location = useLocation()
    const [menuOpen, setMenuOpen] = useState(false)
    const [search, setSearch] = useState('')

    const isSelectionPage = location.pathname === '/'
    const profile = userType ? USER_TYPE_CONFIG[userType] : null
    const logoLink = profile ? profile.dest : '/'

    function handleSearch(e: React.FormEvent) {
        e.preventDefault()
        const q = search.trim()
        if (!q) return
        navigate(`/catalogo?q=${encodeURIComponent(q)}`)
        setSearch('')
        setMenuOpen(false)
    }

    function handleChangeProfile() {
        clearUserType()
        navigate('/')
        setMenuOpen(false)
    }

    // ── Modo seleção: apenas o nome centrado ──────────────────────
    if (isSelectionPage) {
        return (
            <header style={{ backgroundColor: theme.bgPrimary }}>
                <div className="h-16 flex items-center justify-center">
                    <Logo linkTo="/" />
                </div>
            </header>
        )
    }

    // ── Header completo ───────────────────────────────────────────
    return (
        <>
            <header
                className="sticky top-0 z-40"
                style={{ backgroundColor: theme.bgPrimary, boxShadow: '0 1px 10px rgba(30,64,175,0.08)' }}
            >
                {/* Linha principal */}
                <div
                    className="max-w-6xl mx-auto px-4 h-[72px] grid items-center"
                    style={{ gridTemplateColumns: '1fr auto 1fr' }}
                >
                    {/* Esquerda — hambúrguer */}
                    <div>
                        <button
                            onClick={() => setMenuOpen(o => !o)}
                            className="w-11 h-11 rounded-xl flex items-center justify-center transition-colors cursor-pointer"
                            style={{ backgroundColor: theme.bgSection }}
                            aria-label="Abrir menu"
                        >
                            {menuOpen
                                ? <X    size={20} style={{ color: theme.textPrimary }} />
                                : <Menu size={20} style={{ color: theme.textPrimary }} />
                            }
                        </button>
                    </div>

                    {/* Centro — logo */}
                    <Logo linkTo={logoLink} />

                    {/* Direita — perfil + carrinho */}
                    <div className="flex items-center justify-end gap-2">
                        <button
                            onClick={handleChangeProfile}
                            className="w-11 h-11 rounded-xl flex items-center justify-center transition-colors cursor-pointer"
                            style={{ backgroundColor: theme.bgSection }}
                            aria-label={profile ? `Perfil: ${profile.label} — clique para mudar` : 'Escolher perfil'}
                            title={profile ? `Perfil: ${profile.label} — clique para mudar` : 'Escolher perfil'}
                        >
                            {profile
                                ? <profile.icon size={18} style={{ color: theme.primary }} />
                                : <User         size={18} style={{ color: theme.textSecondary }} />
                            }
                        </button>

                        <button
                            onClick={openCart}
                            className="relative w-11 h-11 rounded-xl flex items-center justify-center transition-colors cursor-pointer"
                            style={{ backgroundColor: theme.bgSection }}
                            aria-label="Carrinho"
                        >
                            <ShoppingCart size={18} style={{ color: theme.primary }} />
                            {totalItems > 0 && (
                                <span
                                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center text-white"
                                    style={{ backgroundColor: theme.primary }}
                                >
                                    {totalItems}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Linha de busca */}
                <div className="border-t" style={{ borderColor: theme.border, backgroundColor: theme.bgSection }}>
                    <form
                        onSubmit={handleSearch}
                        className="max-w-6xl mx-auto px-6 h-14 flex items-center gap-4"
                    >
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="O que está à procura?"
                            className="flex-1 bg-transparent outline-none text-sm"
                            style={{ color: theme.textPrimary }}
                        />
                        <button
                            type="submit"
                            className="cursor-pointer shrink-0 transition-opacity hover:opacity-60"
                            aria-label="Pesquisar"
                        >
                            <Search size={20} style={{ color: theme.textSecondary }} />
                        </button>
                    </form>
                </div>
            </header>

            {/* Drawer de navegação */}
            {menuOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/30 z-40"
                        onClick={() => setMenuOpen(false)}
                    />
                    <aside
                        className="fixed top-0 left-0 h-full w-72 z-50 flex flex-col"
                        style={{ backgroundColor: theme.bgPrimary, boxShadow: '4px 0 32px rgba(0,0,0,0.14)' }}
                    >
                        {/* Cabeçalho do drawer */}
                        <div
                            className="h-[72px] flex items-center justify-between px-5 border-b shrink-0"
                            style={{ borderColor: theme.border }}
                        >
                            <span
                                className="font-extrabold text-lg"
                                style={{ color: theme.textPrimary, fontFamily: 'Sora, sans-serif' }}
                            >
                                Menu
                            </span>
                            <button
                                onClick={() => setMenuOpen(false)}
                                className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer"
                                style={{ backgroundColor: theme.bgSection }}
                            >
                                <X size={17} style={{ color: theme.textPrimary }} />
                            </button>
                        </div>

                        {/* Links */}
                        <nav className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-1">
                            {NAV_LINKS.map(({ to, label }) => (
                                <Link
                                    key={to}
                                    to={to}
                                    onClick={() => setMenuOpen(false)}
                                    className="flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-semibold transition-colors"
                                    style={{ color: theme.textPrimary }}
                                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = theme.bgSection)}
                                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                                >
                                    {label}
                                    <ChevronRight size={15} style={{ color: theme.textMuted }} />
                                </Link>
                            ))}

                            {/* Busca no drawer (mobile) */}
                            <div className="my-3 border-t" style={{ borderColor: theme.border }} />
                            <form onSubmit={handleSearch} className="flex items-center gap-2 px-4 py-3 rounded-xl" style={{ backgroundColor: theme.bgSection }}>
                                <input
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    placeholder="Pesquisar produtos..."
                                    className="flex-1 bg-transparent outline-none text-sm"
                                    style={{ color: theme.textPrimary }}
                                />
                                <button type="submit" className="cursor-pointer">
                                    <Search size={16} style={{ color: theme.textSecondary }} />
                                </button>
                            </form>

                            <div className="my-2 border-t" style={{ borderColor: theme.border }} />

                            {/* Mudar perfil */}
                            {profile && (
                                <button
                                    onClick={handleChangeProfile}
                                    className="flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer w-full text-left"
                                    style={{ color: theme.textSecondary }}
                                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = theme.bgSection)}
                                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                                >
                                    <span className="flex items-center gap-2">
                                        <profile.icon size={15} style={{ color: theme.primary }} />
                                        Mudar perfil ({profile.label})
                                    </span>
                                    <ChevronRight size={15} style={{ color: theme.textMuted }} />
                                </button>
                            )}
                        </nav>

                        {/* WhatsApp no fundo do drawer */}
                        <div className="px-4 pb-6 shrink-0">
                            <a
                                href={`https://wa.me/${config.brand.whatsapp.replace(/\D/g, '')}`}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl text-sm font-bold text-white"
                                style={{ backgroundColor: '#25D366' }}
                                onClick={() => setMenuOpen(false)}
                            >
                                Falar conosco no WhatsApp
                            </a>
                        </div>
                    </aside>
                </>
            )}
        </>
    )
}
