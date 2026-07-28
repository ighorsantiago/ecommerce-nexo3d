import { useEffect } from 'react'

export function useSEO(title: string, description?: string) {
    useEffect(() => {
        const prev = document.title
        document.title = `${title} · Nexo3D`

        const metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]')
        const prevDesc = metaDesc?.getAttribute('content') ?? ''
        if (metaDesc && description) metaDesc.setAttribute('content', description)

        const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]')
        const ogDesc = document.querySelector<HTMLMetaElement>('meta[property="og:description"]')
        if (ogTitle) ogTitle.setAttribute('content', `${title} · Nexo3D`)
        if (ogDesc && description) ogDesc.setAttribute('content', description)

        return () => {
            document.title = prev
            if (metaDesc) metaDesc.setAttribute('content', prevDesc)
        }
    }, [title, description])
}
