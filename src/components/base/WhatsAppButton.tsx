import { MessageCircle } from 'lucide-react'
import { config } from '../../config'

export function WhatsAppButton() {
    return (
        <a
            href={`https://wa.me/${config.brand.whatsapp}?text=Olá!%20Tenho%20interesse%20nos%20produtos%20Nexo3D.`}
            target="_blank"
            rel="noreferrer"
            aria-label="Falar no WhatsApp"
            className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
            style={{ backgroundColor: '#25D366' }}
        >
            <MessageCircle size={26} color="#fff" fill="#fff" />
        </a>
    )
}
