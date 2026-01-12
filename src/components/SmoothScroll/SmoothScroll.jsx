import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SmoothScroll = ({ children }) => {
    const lenisRef = useRef(null)

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        })

        lenisRef.current = lenis

        // Sync Lenis scroll with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update)

        // Use GSAP ticker for Lenis raf
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000)
        })

        gsap.ticker.lagSmoothing(0)

        // Make lenis available globally
        window.lenis = lenis

        // Add smooth anchor scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault()
                const target = document.querySelector(anchor.getAttribute('href'))
                if (target) {
                    lenis.scrollTo(target, {
                        offset: -80,
                        duration: 1.5,
                    })
                }
            })
        })

        return () => {
            lenis.destroy()
            gsap.ticker.remove(lenis.raf)
            window.lenis = null
        }
    }, [])

    return children
}

export default SmoothScroll

