import type { Product } from './types'

// ── Única fonte de verdade — trocar cliente = trocar este ficheiro ──────────

export const config = {
    brand: {
        name: 'Nexo3D',
        tagline: 'Impressão 3D Personalizada',
        description: 'Transformamos a sua ideia em produto real.',
        whatsapp: '+351931735975',      // substituir pelo número real
        email: 'info@nexo3d.pt',
        instagram: 'nexo3d.pt',
        address: 'Portugal',
        adminPassword: 'nexo3d2025',  // substituir antes de ir a produção
    },
    colors: {
        available: ['Preto', 'Branco', 'Azul', 'Vermelho', 'Verde', 'Amarelo', 'Cinzento'],
    },
    shipping: {
        freeAbove: 60,           // frete grátis acima de €60
        rates: [
            { label: 'Portugal Continental', price: 3.50 },
            { label: 'Açores / Madeira', price: 6.00 },
            { label: 'União Europeia', price: 9.50 },
        ],
    },
    storageKey: 'nexo3d_cart_v1',
}

export const products: Product[] = [
    {
        id: '1',
        name: 'Chaveiro Personalizado',
        slug: 'chaveiro-personalizado',
        category: 'chaveiros',
        price: 8.90,
        shortDesc: 'Com o nome ou texto à sua escolha, nas cores que preferir.',
        description: 'Chaveiro impresso em 3D com personalização completa. Escolha a cor do filamento, o texto ou nome gravado e o modelo. Perfeito para presentes, festas e lembranças. Cada peça é produzida sob encomenda com muito cuidado.',
        images: [
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
            'https://images.unsplash.com/photo-1621609764547-c3c3c0e7ac97?w=800&q=80',
        ],
        customization: [
            { type: 'text', id: 'texto', label: 'Texto / Nome', placeholder: 'Ex: João, Família Silva, 2025...', maxChars: 20, required: true },
            { type: 'select', id: 'modelo', label: 'Modelo', options: ['Retangular', 'Oval', 'Coração', 'Estrela'], required: true },
        ],
        colors: ['Preto', 'Branco', 'Azul', 'Vermelho', 'Verde', 'Amarelo'],
        productionDays: '3-5',
        badge: 'Mais Vendido',
        badgeColor: '#10B981',
        featured: true,
        inStock: true,
    },
    {
        id: '2',
        name: 'Chaveiro com NFC',
        slug: 'chaveiro-nfc',
        category: 'nfc',
        price: 14.90,
        shortDesc: 'Chaveiro inteligente com chip NFC — partilhe o seu contacto ou link com um toque.',
        description: 'Chaveiro 3D com chip NFC integrado. Basta aproximar qualquer smartphone para abrir o seu contacto, perfil das redes sociais, link de agendamento ou qualquer URL. Ideal para freelancers, comerciantes e quem quer impressionar. Programação do chip incluída no preço.',
        images: [
            'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=800&q=80',
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
        ],
        customization: [
            { type: 'text', id: 'texto', label: 'Texto / Nome no chaveiro', placeholder: 'Ex: Bruno | Designer', maxChars: 25, required: true },
            { type: 'text', id: 'link', label: 'Link para o NFC', placeholder: 'Ex: https://instagram.com/seuperfil', required: true },
        ],
        colors: ['Preto', 'Branco', 'Azul', 'Cinzento'],
        productionDays: '3-5',
        badge: 'NFC',
        badgeColor: '#3BB2F6',
        featured: true,
        inStock: true,
    },
    {
        id: '3',
        name: 'Troféu de Premiação',
        slug: 'trofeu-premiacao',
        category: 'trofeus',
        price: 29.90,
        shortDesc: 'Troféus personalizados para reconhecer os seus melhores colaboradores, atletas ou alunos.',
        description: 'Troféu impresso em 3D com personalização completa: texto, nome do premiado, data e o logótipo da sua empresa (enviar ficheiro). Entregue com base estável e acabamento premium. Ideal para eventos corporativos, escolas, clubes desportivos e comemorações.',
        images: [
            'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&q=80',
            'https://images.unsplash.com/photo-1574587673833-8b8825ec9b3b?w=800&q=80',
        ],
        customization: [
            { type: 'text', id: 'titulo', label: 'Título do troféu', placeholder: 'Ex: Melhor Vendedor 2025', maxChars: 40, required: true },
            { type: 'text', id: 'nome', label: 'Nome do premiado', placeholder: 'Ex: Maria Santos', maxChars: 30, required: true },
            { type: 'text', id: 'data', label: 'Data / Evento', placeholder: 'Ex: Dezembro 2025', maxChars: 30 },
            { type: 'select', id: 'tamanho', label: 'Tamanho', options: ['Pequeno (15cm)', 'Médio (20cm)', 'Grande (25cm)'], required: true },
        ],
        colors: ['Dourado', 'Prateado', 'Preto', 'Branco', 'Azul'],
        productionDays: '5-7',
        badge: 'Encomenda',
        badgeColor: '#F59E0B',
        featured: true,
        inStock: true,
    },
    {
        id: '4',
        name: 'Totem Avaliação Google (NFC)',
        slug: 'totem-google-nfc',
        category: 'nfc',
        price: 39.90,
        shortDesc: 'Coloque no balcão e os clientes avaliam o seu negócio no Google com um simples toque.',
        description: 'Totem de mesa impresso em 3D com chip NFC e QR Code integrados, direcionando para a página de avaliações Google do seu negócio. Aumenta as avaliações organicamente, melhora o posicionamento local no Google Maps e impressiona os clientes. Inclui configuração completa do NFC + QR Code com o link do seu negócio.',
        images: [
            'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80',
            'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80',
        ],
        customization: [
            { type: 'text', id: 'nome_negocio', label: 'Nome do negócio', placeholder: 'Ex: Restaurante O Bacalhau', maxChars: 40, required: true },
            { type: 'text', id: 'link_google', label: 'Link Google Reviews', placeholder: 'Cole aqui o link das suas avaliações Google', required: true },
        ],
        colors: ['Preto', 'Branco', 'Azul'],
        productionDays: '5-7',
        badge: 'B2B',
        badgeColor: '#1E40AF',
        b2b: true,
        featured: true,
        inStock: true,
    },
    {
        id: '5',
        name: 'Suporte de Telemóvel / Tablet',
        slug: 'suporte-telemovel',
        category: 'organizadores',
        price: 12.90,
        shortDesc: 'Suporte ajustável para mesa ou secretária, compatível com qualquer telemóvel.',
        description: 'Suporte ergonómico impresso em 3D para telemóvel ou tablet. Design estável, ângulo de visão confortável. Ideal para home office, videochamadas, ver séries ou seguir receitas na cozinha. Disponível em várias cores para combinar com a sua decoração.',
        images: [
            'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&q=80',
            'https://images.unsplash.com/photo-1544866092-1935c5ef2a8f?w=800&q=80',
        ],
        customization: [
            { type: 'select', id: 'angulo', label: 'Ângulo preferido', options: ['45°', '60°', '75°'], required: true },
        ],
        colors: ['Preto', 'Branco', 'Cinzento', 'Azul', 'Vermelho'],
        productionDays: '3-5',
        inStock: true,
    },
    {
        id: '6',
        name: 'Organizador de Cabos e Mesa',
        slug: 'organizador-cabos',
        category: 'organizadores',
        price: 9.90,
        shortDesc: 'Acabe com a confusão de cabos. Organizado, limpo, funcional.',
        description: 'Organizador de cabos impresso em 3D, perfeito para manter a secretária arrumada. Segura cabos USB, carregadores e auscultadores de forma elegante. Disponível em vários modelos: clip de mesa, passador de parede ou base de secretária.',
        images: [
            'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80',
            'https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?w=800&q=80',
        ],
        customization: [
            { type: 'select', id: 'modelo', label: 'Modelo', options: ['Clip de mesa', 'Passador de parede', 'Base de secretária'], required: true },
        ],
        colors: ['Preto', 'Branco', 'Cinzento'],
        productionDays: '3-5',
        inStock: true,
    },
]
