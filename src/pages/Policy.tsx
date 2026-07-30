import { theme } from '../themes'

export function Policy() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-12 flex flex-col gap-8">
            <h1 className="text-3xl font-extrabold" style={{ color: theme.textPrimary }}>
                Política de Trocas e Devoluções
            </h1>
            <p className="text-sm" style={{ color: theme.textMuted }}>Última atualização: Janeiro 2025</p>

            {[
                {
                    title: '1. Direito de arrependimento',
                    content: 'Nos termos do Decreto-Lei n.º 84/2021 e da Diretiva Europeia sobre direitos dos consumidores, o cliente tem direito a desistir da compra no prazo de 14 dias a contar da data de receção do produto, sem necessidade de indicar o motivo.\n\nContudo, dado que todos os nossos produtos são produzidos sob encomenda e personalizados (com nomes, textos ou configurações específicas do cliente), este direito pode não se aplicar nos termos do artigo 17.º, alínea c) do referido diploma.',
                },
                {
                    title: '2. Produtos com defeito',
                    content: 'Caso o produto apresente defeito de fabrico, erro na personalização (diferente do que foi solicitado) ou dano causado pelo envio, procederemos à substituição gratuita ou reembolso total, sem custos adicionais para o cliente. O prazo para reclamação é de 30 dias a contar da receção.',
                },
                {
                    title: '3. Como solicitar uma troca ou devolução',
                    content: 'Entre em contacto conosco via WhatsApp ou e-mail, indicando:\n• Número e data da encomenda\n• Descrição do problema\n• Fotografias do produto recebido\n\nResponderemos em até 48 horas úteis.',
                },
                {
                    title: '4. Custos de devolução',
                    content: 'Em caso de defeito ou erro nosso, os custos de reenvio são suportados integralmente pela Nexo3D. Em caso de desistência por parte do cliente (quando aplicável), os custos de devolução são da responsabilidade do cliente.',
                },
                {
                    title: '5. Reembolsos',
                    content: 'Os reembolsos são processados no mesmo método de pagamento utilizado na compra, no prazo máximo de 14 dias após a confirmação da devolução.',
                },
            ].map(({ title, content }) => (
                <div key={title} className="flex flex-col gap-3">
                    <h2 className="text-base font-bold" style={{ color: theme.textPrimary }}>{title}</h2>
                    <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: theme.textSecondary }}>{content}</p>
                </div>
            ))}
        </div>
    )
}
