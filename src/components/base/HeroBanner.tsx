import { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { theme } from '../../themes'

export interface BannerSlide {
    image: string
    title: string
    subtitle: string
    cta: string
    ctaLink: string
}

interface Props {
    slides: BannerSlide[]
}

export function HeroBanner({ slides }: Props) {
    const [current, setCurrent] = useState(0)
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const goTo = useCallback((index: number) => {
        setCurrent((index + slides.length) % slides.length)
    }, [slides.length])

    const resetTimer = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current)
        timerRef.current = setInterval(() => {
            setCurrent(c => (c + 1) % slides.length)
        }, 5000)
    }, [slides.length])

    useEffect(() => {
        resetTimer()
        return () => { if (timerRef.current) clearInterval(timerRef.current) }
    }, [resetTimer])

    function handleNav(dir: 1 | -1) {
        goTo(current + dir)
        resetTimer()
    }

    if (!slides.length) return null

    return (
        <div className="relative w-full overflow-hidden" style={{ height: 'clamp(320px, 56vw, 580px)' }}>
            {/* Slides */}
            {slides.map((slide, i) => (
                <div
                    key={i}
                    className="absolute inset-0 transition-opacity duration-700"
                    style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0, backgroundColor: '#0a0f1e' }}
                    aria-hidden={i !== current}
                >
                    <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-contain object-center"
                        draggable={false}
                    />
                    {/* Gradiente esquerda para legibilidade do texto */}
                    <div
                        className="absolute inset-0"
                        style={{ background: 'linear-gradient(90deg, rgba(10,15,30,0.75) 0%, rgba(10,15,30,0.35) 55%, rgba(10,15,30,0.0) 100%)' }}
                    />

                    {/* Texto */}
                    <div className="absolute inset-0 flex items-center" style={{ zIndex: 2 }}>
                        <div className="max-w-6xl mx-auto px-6 md:px-10 w-full">
                            <div
                                className="max-w-sm md:max-w-lg transition-all duration-500"
                                style={{ transform: i === current ? 'translateY(0)' : 'translateY(12px)', opacity: i === current ? 1 : 0 }}
                            >
                                <p
                                    className="text-xs font-bold uppercase tracking-widest mb-3"
                                    style={{ color: theme.accentLight }}
                                >
                                    Destaque
                                </p>
                                <h2
                                    className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight mb-3 text-white"
                                    style={{ fontFamily: 'Sora, sans-serif', textShadow: '0 2px 12px rgba(0,0,0,0.3)' }}
                                >
                                    {slide.title}
                                </h2>
                                <p
                                    className="text-sm md:text-base mb-6 leading-relaxed"
                                    style={{ color: 'rgba(255,255,255,0.80)' }}
                                >
                                    {slide.subtitle}
                                </p>
                                <Link
                                    to={slide.ctaLink}
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90"
                                    style={{ backgroundColor: theme.primary, boxShadow: '0 4px 16px rgba(30,64,175,0.45)' }}
                                >
                                    {slide.cta}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Setas de navegação */}
            <button
                onClick={() => handleNav(-1)}
                className="absolute top-1/2 left-3 md:left-5 -translate-y-1/2 w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all cursor-pointer"
                style={{ backgroundColor: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)', zIndex: 3 }}
                aria-label="Slide anterior"
            >
                <ChevronLeft size={20} color="white" />
            </button>
            <button
                onClick={() => handleNav(1)}
                className="absolute top-1/2 right-3 md:right-5 -translate-y-1/2 w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all cursor-pointer"
                style={{ backgroundColor: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)', zIndex: 3 }}
                aria-label="Próximo slide"
            >
                <ChevronRight size={20} color="white" />
            </button>

            {/* Indicadores (dots) */}
            <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2"
                style={{ zIndex: 3 }}
            >
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => { goTo(i); resetTimer() }}
                        className="h-2 rounded-full transition-all duration-300 cursor-pointer"
                        style={{
                            width: i === current ? '24px' : '8px',
                            backgroundColor: i === current ? 'white' : 'rgba(255,255,255,0.45)',
                        }}
                        aria-label={`Ir para slide ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}
