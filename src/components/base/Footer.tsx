import { Link } from 'react-router-dom'
import { Cpu, ExternalLink, Mail } from 'lucide-react'
import { theme } from '../../themes'
import { config } from '../../config'

export function Footer() {
    return (
        <footer style={{ backgroundColor: theme.bgDark, color: theme.textMuted }}>
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: theme.primary }}>
                                <Cpu size={16} color="#fff" />
                            </div>
                            <span className="font-bold text-xl text-white" style={{ fontFamily: 'Sora, sans-serif' }}>
                                Nexo<span style={{ color: theme.accentLight }}>3D</span>
                            </span>
                        </div>
                        <p className="text-sm leading-relaxed">{config.brand.description}</p>
                        <div className="flex gap-3">
                            <a
                                href={`https://instagram.com/${config.brand.instagram}`}
                                target="_blank"
                                rel="noreferrer"
                                className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
                                style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                                aria-label="Instagram"
                            >
                                <ExternalLink size={16} color="#fff" />
                            </a>
                            <a
                                href={`mailto:${config.brand.email}`}
                                className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
                                style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                                aria-label="Email"
                            >
                                <Mail size={16} color="#fff" />
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <p className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Loja</p>
                        <ul className="flex flex-col gap-2 text-sm">
                            <li><Link to="/catalogo" className="hover:text-white transition-colors">Todos os produtos</Link></li>
                            <li><Link to="/sobre" className="hover:text-white transition-colors">Sobre nós</Link></li>
                            <li><Link to="/politica" className="hover:text-white transition-colors">Trocas e devoluções</Link></li>
                        </ul>
                    </div>

                    {/* Contacto */}
                    <div>
                        <p className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Contacto</p>
                        <ul className="flex flex-col gap-2 text-sm">
                            <li>
                                <a href={`https://wa.me/${config.brand.whatsapp}`} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                                    WhatsApp / Encomendas
                                </a>
                            </li>
                            <li>
                                <a href={`mailto:${config.brand.email}`} className="hover:text-white transition-colors">
                                    {config.brand.email}
                                </a>
                            </li>
                            <li className="text-xs mt-2">Produção em Portugal 🇵🇹</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-10 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-2 text-xs" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                    <p>© {new Date().getFullYear()} Nexo3D. Todos os direitos reservados.</p>
                    <p>Feito com ❤️ em Portugal</p>
                </div>
            </div>
        </footer>
    )
}
