import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ShoppingCart, Menu, X, Cpu, User, Building2, ChevronDown } from 'lucide-react'
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

export function Header() {
    const { totalItems, openCart } = useCartContext()
    const { userType, clearUserType } = useUserType()
    const navigate = useNavigate()
    const [mobileOpen, setMobileOpen] = useState(false)
    const [profileOpen, setProfileOpen] = useState(false)

    const profile = userType ? USER_TYPE_CONFIG[userType] : null

    function handleChangeProfile() {
        clearUserType()
        navigate('/')
        setProfileOpen(false)
        setMobileOpen(false)
    }

    return (
        <header
            className="sticky top-0 z-40 border-b"
            style={{ backgroundColor: theme.bgPrimary, borderColor: theme.border, boxShadow: '0 1px 8px rgba(30,64,175,0.06)' }}
        >
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
                {/* Logo */}
                <Link
                    to={profile ? profile.dest : '/'}
                    className="flex items-center gap-2 shrink-0"
                >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: theme.primary }}>
                        <Cpu size={16} color="#fff" />
                    </div>
                    <span className="font-bold text-xl" style={{ fontFamily: 'Sora, sans-serif', color: theme.textPrimary }}>
                        Nexo<span style={{ color: theme.primary }}>3D</span>
                    </span>
                </Link>

                {/* Nav desktop */}
                <nav className="hidden md:flex items-center gap-1">
                    {NAV_LINKS.map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                            style={({ isActive }) => ({
                                color: isActive ? theme.primary : theme.textSecondary,
                                backgroundColor: isActive ? theme.bgSection : 'transparent',
                            })}
                        >
                            {label}
                        </NavLink>
                    ))}
                </nav>

                {/* Ações */}
                <div className="flex items-center gap-2">
                    {/* Perfil selector (desktop) */}
                    {profile && (
                        <div className="relative hidden md:block">
                            <button
                                onClick={() => setProfileOpen(o => !o)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all"
                                style={{
                                    backgroundColor: theme.bgSection,
                                    color: theme.textSecondary,
                                    border: `1px solid ${theme.border}`,
                                }}
                            >
                                <profile.icon size={13} style={{ color: theme.primary }} />
                                {profile.label}
                                <ChevronDown size={11} />
                            </button>
                            {profileOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                                    <div
                                        className="absolute right-0 top-full mt-1.5 w-44 rounded-xl py-1.5 z-20"
                                        style={{ backgroundColor: '#fff', border: `1px solid ${theme.border}`, boxShadow: theme.shadowHover }}
                                    >
                                        <button
                                            onClick={handleChangeProfile}
                                            className="w-full px-4 py-2.5 text-left text-xs font-semibold cursor-pointer hover:bg-slate-50 transition-colors"
                                            style={{ color: theme.textSecondary }}
                                        >
                                            Mudar perfil
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {/* Carrinho */}
                    <button
                        onClick={openCart}
                        className="relative w-10 h-10 rounded-xl flex items-center justify-center transition-colors cursor-pointer"
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

                    {/* Menu mobile */}
                    <button
                        onClick={() => setMobileOpen(o => !o)}
                        className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer"
                        style={{ backgroundColor: theme.bgSection }}
                        aria-label="Menu"
                    >
                        {mobileOpen ? <X size={18} style={{ color: theme.textPrimary }} /> : <Menu size={18} style={{ color: theme.textPrimary }} />}
                    </button>
                </div>
            </div>

            {/* Menu mobile expandido */}
            {mobileOpen && (
                <div className="md:hidden border-t px-4 py-3 flex flex-col gap-1" style={{ borderColor: theme.border, backgroundColor: theme.bgPrimary }}>
                    {NAV_LINKS.map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            onClick={() => setMobileOpen(false)}
                            className="px-3 py-2.5 rounded-lg text-sm font-medium"
                            style={({ isActive }) => ({
                                color: isActive ? theme.primary : theme.textSecondary,
                                backgroundColor: isActive ? theme.bgSection : 'transparent',
                            })}
                        >
                            {label}
                        </NavLink>
                    ))}
                    {profile && (
                        <button
                            onClick={handleChangeProfile}
                            className="mt-1 px-3 py-2.5 rounded-lg text-sm font-medium text-left flex items-center gap-2 cursor-pointer"
                            style={{ color: theme.textSecondary }}
                        >
                            <profile.icon size={14} style={{ color: theme.primary }} />
                            Mudar perfil ({profile.label})
                        </button>
                    )}
                    <a
                        href={`https://wa.me/${config.brand.whatsapp.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 px-3 py-2.5 rounded-lg text-sm font-semibold text-center"
                        style={{ backgroundColor: theme.primary, color: '#fff' }}
                        onClick={() => setMobileOpen(false)}
                    >
                        Falar connosco
                    </a>
                </div>
            )}
        </header>
    )
}
