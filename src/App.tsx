import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartContext } from './hooks/useCartContext'
import { useCart } from './hooks/useCart'
import { ProductsProvider } from './contexts/ProductsContext'
import { UserTypeProvider } from './contexts/UserTypeContext'
import { Header } from './components/base/Header'
import { Footer } from './components/base/Footer'
import { WhatsAppButton } from './components/base/WhatsAppButton'
import { CartDrawer } from './components/cart/CartDrawer'
import { SelectionPage } from './pages/SelectionPage'
import { Home } from './pages/Home'
import { B2BHome } from './pages/B2BHome'
import { Catalog } from './pages/Catalog'
import { ProductPage } from './pages/ProductPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { OrderSuccess } from './pages/OrderSuccess'
import { About } from './pages/About'
import { Policy } from './pages/Policy'
import { Admin } from './pages/Admin'

export default function App() {
    const cart = useCart()
    const [isOpen, setIsOpen] = useState(false)

    return (
        <UserTypeProvider>
        <ProductsProvider>
        <CartContext.Provider value={{ ...cart, isOpen, openCart: () => setIsOpen(true), closeCart: () => setIsOpen(false) }}>
            <BrowserRouter>
                <Header />
                <CartDrawer />
                <main className="flex-1">
                    <Routes>
                        <Route path="/" element={<SelectionPage />} />
                        <Route path="/loja" element={<Home />} />
                        <Route path="/empresa" element={<B2BHome />} />
                        <Route path="/catalogo" element={<Catalog />} />
                        <Route path="/produto/:slug" element={<ProductPage />} />
                        <Route path="/checkout" element={<CheckoutPage />} />
                        <Route path="/pedido-confirmado" element={<OrderSuccess />} />
                        <Route path="/sobre" element={<About />} />
                        <Route path="/politica" element={<Policy />} />
                        <Route path="/admin" element={<Admin />} />
                    </Routes>
                </main>
                <Footer />
                <WhatsAppButton />
            </BrowserRouter>
        </CartContext.Provider>
        </ProductsProvider>
        </UserTypeProvider>
    )
}
