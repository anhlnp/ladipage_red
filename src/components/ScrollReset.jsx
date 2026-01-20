import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollReset = () => {
    const { pathname } = useLocation()

    useEffect(() => {
        // Native scroll reset
        window.scrollTo(0, 0)

        // Lenis scroll reset if active
        if (window.lenis) {
            window.lenis.scrollTo(0, { immediate: true })
        }
    }, [pathname])

    return null
}

export default ScrollReset
