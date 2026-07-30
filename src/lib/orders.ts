import { supabase } from './supabase'
import type { Order, OrderItem, OrderForm, OrderStatus } from '../types'
import type { CartItem } from '../types'

export function cartItemsToOrderItems(cartItems: CartItem[]): OrderItem[] {
    return cartItems.map(item => ({
        product_id:     item.product.id,
        product_name:   item.product.name,
        price:          item.product.price,
        quantity:       item.quantity,
        selected_color: item.selectedColor,
        custom_values:  item.customValues,
    }))
}

export interface CreateOrderInput {
    form: OrderForm
    items: OrderItem[]
    subtotal: number
    shippingCost: number
    shippingMethod: string
    total: number
}

export async function createOrder(input: CreateOrderInput): Promise<Order> {
    const { form, items, subtotal, shippingCost, shippingMethod, total } = input

    const { data, error } = await supabase
        .from('orders')
        .insert({
            customer_name:   form.name,
            customer_email:  form.email,
            customer_phone:  form.phone,
            address:         form.address,
            city:            form.city,
            postal_code:     form.postalCode,
            country:         form.country,
            nif:             form.nif  || null,
            notes:           form.notes || null,
            items,
            subtotal,
            shipping_cost:   shippingCost,
            shipping_method: shippingMethod,
            total,
            status:          'novo',
            payment_method:  null,
            payment_ref:     null,
        })
        .select()
        .single()

    if (error) throw error
    return data as Order
}

export async function getOrders(): Promise<Order[]> {
    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) throw error
    return (data ?? []) as Order[]
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<void> {
    const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id)

    if (error) throw error
}

export async function deleteOrder(id: string): Promise<void> {
    const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', id)

    if (error) throw error
}
