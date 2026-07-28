import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Building2, Cpu, ArrowRight } from 'lucide-react'
import { theme } from '../themes'
import { useUserType, type UserType } from '../contexts/UserTypeContext'

const OPTIONS: {
    type: UserType
    icon: typeof User
    title: string
    subtitle: string
    items: string[]
    cta: string
    dest: string
}[] = [
    {
        type: 'particular',
        icon: User,
        title: 'Sou Particular',
        subtitle: 'Quero algo único para mim ou para oferecer',
        items: ['Chaveiros e lembranças personalizadas', 'Troféus e prémios', 'Decoração e organização', 'Suportes e acessórios'],
        cta: 'Entrar como Particular',
        dest: '/loja',
    },
    {
        type: 'empresa',
        icon: Building2,
        title: 'Sou Empresa',
        subtitle: 'Preciso de soluções para o meu negócio',
        items: ['Brindes corporativos em volume', 'Totens NFC para avaliações Google', 'Troféus e reconhecimento de equipa', 'Fatura disponível + proposta personalizada'],
        cta: 'Entrar como Empresa',
        dest: '/empresa',
    },
]

export function SelectionPage() {
    const navigate = useNavigate()
    const { userType, setUserType } = useUserType()

    useEffect(() => {
        if (userType === 'particular') navigate('/loja', { replace: true })
        else if (userType === 'empresa') navigate('/empresa', { replace: true })
    }, []) // run only on mount

    function handleSelect(type: UserType, dest: string) {
        setUserType(type)
        navigate(dest)
    }

    return (
        <div
            className="min-h-[calc(100svh-64px)] flex flex-col items-center justify-center px-4 py-12"
            style={{ background: `linear-gradient(160deg, ${theme.bgSection} 0%, #fff 55%, ${theme.bgSection} 100%)` }}
        >
            {/* Branding */}
            <div className="flex flex-col items-center gap-3 mb-10">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: theme.primary }}>
                    <Cpu size={28} color="#fff" />
                </div>
                <div className="text-center">
                    <h1 className="text-3xl md:text-4xl font-extrabold" style={{ color: theme.textPrimary, fontFamily: 'Sora, sans-serif' }}>
                        Bem-vindo à <span style={{ color: theme.primary }}>Nexo3D</span>
                    </h1>
                    <p className="mt-2 text-base" style={{ color: theme.textSecondary }}>
                        Selecione o seu perfil para uma experiência personalizada
                    </p>
                </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-2xl">
                {OPTIONS.map(({ type, icon: Icon, title, subtitle, items, cta, dest }) => (
                    <button
                        key={type}
                        onClick={() => handleSelect(type, dest)}
                        className="group flex flex-col gap-5 p-7 rounded-3xl text-left cursor-pointer transition-all duration-200"
                        style={{
                            backgroundColor: '#fff',
                            border: `2px solid ${theme.border}`,
                            boxShadow: theme.shadow,
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.borderColor = theme.primary
                            e.currentTarget.style.boxShadow = theme.shadowHover
                            e.currentTarget.style.transform = 'translateY(-3px)'
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.borderColor = theme.border
                            e.currentTarget.style.boxShadow = theme.shadow
                            e.currentTarget.style.transform = 'translateY(0)'
                        }}
                    >
                        {/* Icon */}
                        <div
                            className="w-12 h-12 rounded-2xl flex items-center justify-center"
                            style={{ backgroundColor: theme.bgSection }}
                        >
                            <Icon size={24} style={{ color: theme.primary }} />
                        </div>

                        {/* Text */}
                        <div>
                            <p className="text-xl font-extrabold" style={{ color: theme.textPrimary }}>{title}</p>
                            <p className="mt-1 text-sm leading-relaxed" style={{ color: theme.textSecondary }}>{subtitle}</p>
                        </div>

                        {/* Items */}
                        <ul className="flex flex-col gap-2">
                            {items.map(item => (
                                <li key={item} className="flex items-start gap-2 text-sm" style={{ color: theme.textSecondary }}>
                                    <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: theme.primary }}>
                                        ✓
                                    </span>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        {/* CTA */}
                        <div
                            className="flex items-center justify-between px-4 py-3 rounded-xl font-semibold text-sm text-white mt-auto"
                            style={{ backgroundColor: theme.primary }}
                        >
                            {cta}
                            <ArrowRight size={16} />
                        </div>
                    </button>
                ))}
            </div>

            <p className="mt-8 text-xs" style={{ color: theme.textMuted }}>
                Pode mudar de perfil a qualquer momento no topo da página
            </p>
        </div>
    )
}
