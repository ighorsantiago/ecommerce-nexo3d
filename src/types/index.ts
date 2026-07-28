export type ProductCategory =
    | 'chaveiros'
    | 'trofeus'
    | 'nfc'
    | 'organizadores'
    | 'decoracao'
    | 'personalizados'

export type CustomizationField = {
    type: 'text' | 'select' | 'color'
    id: string
    label: string
    placeholder?: string
    maxChars?: number
    options?: string[]
    required?: boolean
}

export interface Product {
    id: string
    name: string
    slug: string
    category: ProductCategory
    price: number
    description: string
    shortDesc: string
    images: string[]
    customization: CustomizationField[]
    colors: string[]
    productionDays: string
    badge?: string         // ex: 'NFC', 'Mais Vendido', 'Novo'
    badgeColor?: string
    b2b?: boolean          // produto para empresas
    featured?: boolean
    inStock: boolean
}

export interface CartItem {
    product: Product
    quantity: number
    selectedColor: string
    customValues: Record<string, string>
}

export interface Cart {
    items: CartItem[]
}

export interface OrderForm {
    name: string
    phone: string
    email: string
    address: string
    city: string
    postalCode: string
    country: string
    nif?: string
    notes?: string
}
