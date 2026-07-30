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

export type CustomOrderStatus =
    | 'em_contacto'
    | 'orcamento_enviado'
    | 'confirmado'
    | 'em_producao'
    | 'enviado'
    | 'entregue'
    | 'cancelado'

export interface CustomOrder {
    id: string
    client: string
    phone: string
    description: string
    price: number | null
    status: CustomOrderStatus
    notes: string
    createdAt: string
    updatedAt: string
}

export type ProductOverride = Partial<Pick<Product,
    | 'name' | 'price' | 'shortDesc' | 'description'
    | 'images' | 'badge' | 'badgeColor' | 'inStock' | 'featured'
>>

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

export type OrderStatus =
    | 'novo'
    | 'confirmado'
    | 'em_producao'
    | 'enviado'
    | 'concluido'
    | 'cancelado'

export interface OrderItem {
    product_id: string
    product_name: string
    price: number
    quantity: number
    selected_color: string
    custom_values: Record<string, string>
}

export interface Order {
    id: string
    customer_name: string
    customer_email: string
    customer_phone: string
    address: string
    city: string
    postal_code: string
    country: string
    nif: string | null
    notes: string | null
    items: OrderItem[]
    subtotal: number
    shipping_cost: number
    shipping_method: string
    total: number
    status: OrderStatus
    payment_method: string | null
    payment_ref: string | null
    created_at: string
    updated_at: string
}
