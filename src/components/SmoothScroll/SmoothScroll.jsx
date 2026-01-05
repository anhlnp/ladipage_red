import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

const SmoothScroll = ({ children }) => {
    const lenisRef = useRef(null)

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.6, // Longer duration for more noticeable effect
            easing: (t) => {
                // Custom easing - more "elastic" feel
                return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
            },
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 0.8, // Slower wheel for smoother feel
            touchMultiplier: 1.5,
            infinite: false,
        })

        lenisRef.current = lenis

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        // Make lenis available globally for scroll-to functionality
        window.lenis = lenis

        // Add smooth anchor scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault()
                const target = document.querySelector(anchor.getAttribute('href'))
                if (target) {
                    lenis.scrollTo(target, {
                        offset: -80, // Account for fixed navbar
                        duration: 2, // Longer scroll animation
                    })
                }
            })
        })

        return () => {
            lenis.destroy()
            window.lenis = null
        }
    }, [])

    return children
}

export default SmoothScroll
