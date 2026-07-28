import { Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
import { theme } from '../themes'

export function OrderSuccess() {
    return (
        <div className="max-w-md mx-auto px-4 py-24 flex flex-col items-center gap-5 text-center">
            <CheckCircle size={56} style={{ color: theme.success }} />
            <div>
                <h1 className="text-2xl font-extrabold" style={{ color: theme.textPrimary }}>
                    Encomenda enviada! 🎉
                </h1>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
                    O resumo foi enviado para o nosso WhatsApp. Iremos confirmar o pedido e combinar o pagamento em breve.
                </p>
            </div>
            <div className="w-full rounded-2xl p-5 flex flex-col gap-2 text-sm" style={{ backgroundColor: theme.bgSection, border: `1px solid ${theme.border}` }}>
                <p style={{ color: theme.textSecondary }}>📦 Prazo de produção: 3–7 dias úteis após confirmação</p>
                <p style={{ color: theme.textSecondary }}>💬 Responderemos no WhatsApp em até 24h</p>
                <p style={{ color: theme.textSecondary }}>💳 Pagamento: MB WAY, Multibanco ou transferência</p>
            </div>
            <Link
                to="/"
                className="px-8 py-3.5 rounded-xl font-bold text-sm text-white"
                style={{ backgroundColor: theme.primary }}
            >
                Voltar à loja
            </Link>
        </div>
    )
}
