import { Heart, Globe, Printer } from 'lucide-react'
import { theme } from '../themes'

export function About() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-12 flex flex-col gap-12">
            <div className="text-center">
                <h1 className="text-3xl md:text-4xl font-extrabold mb-3" style={{ color: theme.textPrimary }}>
                    Sobre a Nexo3D
                </h1>
                <p className="text-lg leading-relaxed" style={{ color: theme.textSecondary }}>
                    Um negócio familiar de irmãos apaixonados por tecnologia e design, com base em Portugal.
                </p>
            </div>

            <div className="rounded-2xl overflow-hidden aspect-video bg-slate-100">
                <img
                    src="https://images.unsplash.com/photo-1631814588742-c7fe32b0abc9?w=1200&q=80"
                    alt="Impressora 3D a trabalhar"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="flex flex-col gap-6 text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
                <p>
                    A Nexo3D nasceu da vontade de dois irmãos de transformar ideias em objetos reais. Começámos por vender em marketplaces — e o feedback foi tão positivo que decidimos criar a nossa própria loja, com a possibilidade de personalizar cada peça ao detalhe.
                </p>
                <p>
                    Utilizamos impressão FDM (Fused Deposition Modeling), a tecnologia mais versátil e acessível da impressão 3D, que nos permite produzir desde simples chaveiros a peças técnicas e decorativas com alta qualidade. Cada produto é produzido sob encomenda, o que significa que nenhuma peça é desperdiçada e cada cliente recebe algo feito especialmente para si.
                </p>
                <p>
                    Temos operação principal em Portugal, e no futuro próximo também em produção no Brasil — o que nos permitirá expandir os envios e reduzir prazos para clientes nos dois lados do Atlântico.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                    { icon: Heart, title: 'Feito com cuidado', desc: 'Cada encomenda recebe atenção pessoal. Somos dois irmãos, não uma fábrica.' },
                    { icon: Printer, title: 'Impressão FDM', desc: 'Tecnologia versátil que permite peças detalhadas, resistentes e totalmente personalizadas.' },
                    { icon: Globe, title: 'Portugal + Brasil', desc: 'Operação em Portugal com expansão para o Brasil em breve.' },
                ].map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="p-5 rounded-2xl flex flex-col gap-3" style={{ backgroundColor: theme.bgSection, border: `1px solid ${theme.border}` }}>
                        <Icon size={20} style={{ color: theme.primary }} />
                        <p className="font-bold text-sm" style={{ color: theme.textPrimary }}>{title}</p>
                        <p className="text-xs leading-relaxed" style={{ color: theme.textSecondary }}>{desc}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
