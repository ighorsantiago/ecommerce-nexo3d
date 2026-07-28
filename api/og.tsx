import { ImageResponse } from '@vercel/og'

export const config = { runtime: 'edge' }

export default function handler() {
    return new ImageResponse(
        <div
            style={{
                display: 'flex',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, #0F172A 0%, #1E40AF 100%)',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '32px',
                padding: '60px',
                fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
        >
            {/* Logo + nome */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <div
                    style={{
                        width: '96px',
                        height: '96px',
                        borderRadius: '24px',
                        backgroundColor: 'rgba(255,255,255,0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid rgba(255,255,255,0.25)',
                    }}
                >
                    <span style={{ fontSize: '42px', fontWeight: 900, color: 'white', letterSpacing: '-2px' }}>
                        N3D
                    </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontSize: '72px', fontWeight: 900, color: 'white', lineHeight: '1', letterSpacing: '-2px' }}>
                        Nexo<span style={{ color: '#93C5FD' }}>3D</span>
                    </span>
                    <span style={{ fontSize: '26px', color: '#64748B', fontWeight: 500 }}>
                        nexo3d-zeta.vercel.app
                    </span>
                </div>
            </div>

            {/* Tagline */}
            <div
                style={{
                    fontSize: '34px',
                    color: '#CBD5E1',
                    textAlign: 'center',
                    maxWidth: '900px',
                    lineHeight: '1.3',
                    fontWeight: 500,
                }}
            >
                Impressão 3D Personalizada em Portugal
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
                {['Chaveiros', 'Trofeus', 'Totens NFC', 'Brindes corporativos', 'Sob encomenda'].map(tag => (
                    <div
                        key={tag}
                        style={{
                            padding: '10px 24px',
                            borderRadius: '100px',
                            backgroundColor: 'rgba(255,255,255,0.10)',
                            border: '1px solid rgba(255,255,255,0.18)',
                            color: '#E2E8F0',
                            fontSize: '22px',
                            fontWeight: 500,
                        }}
                    >
                        {tag}
                    </div>
                ))}
            </div>

            {/* Portugal badge */}
            <div
                style={{
                    position: 'absolute',
                    bottom: '48px',
                    right: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 20px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255,255,255,0.08)',
                }}
            >
                <span style={{ fontSize: '26px', color: '#94A3B8' }}>Producao em Portugal</span>
            </div>
        </div>,
        { width: 1200, height: 630 },
    )
}
