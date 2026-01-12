import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTheme } from '../../context/ThemeContext'
import ThemeToggle from '../ThemeToggle/ThemeToggle'

gsap.registerPlugin(ScrollTrigger)

// Magnetic Button for Nav CTA
const NavButton = ({ children, className, onClick }) => {
    const buttonRef = useRef(null)

    const handleMouseMove = useCallback((e) => {
        const button = buttonRef.current
        if (!button) return

        const rect = button.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const deltaX = (e.clientX - centerX) * 0.2
        const deltaY = (e.clientY - centerY) * 0.2

        button.style.transform = `translate(${deltaX}px, ${deltaY}px)`
    }, [])

    const handleMouseLeave = useCallback(() => {
        const button = buttonRef.current
        if (!button) return
        button.style.transform = 'translate(0, 0)'
    }, [])

    return (
        <button
            ref={buttonRef}
            className={`${className} magnetic-btn btn-shine`}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </button>
    )
}

const Navbar = () => {
    const navRef = useRef(null)
    const navInnerRef = useRef(null)
    const { cycleColorTheme, colorTheme } = useTheme()

    useEffect(() => {
        const nav = navRef.current
        const navInner = navInnerRef.current
        if (!nav || !navInner) return

        // Set initial state for nav-inner
        gsap.set(navInner, {
            transformOrigin: 'top center',
        })

        const ctx = gsap.context(() => {
            // Navbar drop-down animation timeline
            const navTl = gsap.timeline({
                scrollTrigger: {
                    trigger: 'body',
                    start: 'top top',
                    end: '200 top',
                    scrub: 0.8,
                    onUpdate: (self) => {
                        // Add/remove class based on progress
                        if (self.progress > 0.1) {
                            navInner.classList.add('nav-glass-active')
                        } else {
                            navInner.classList.remove('nav-glass-active')
                        }
                    }
                }
            })

            // Navbar drops down and transforms
            navTl.to(navInner, {
                y: 10,
                scale: 0.92,
                borderRadius: '999px',
                ease: 'none',
            }, 0)

        }, nav)

        return () => ctx.revert()
    }, [])

    const scrollToSection = (id) => {
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const handleLogoClick = () => {
        cycleColorTheme()
    }

    return (
        <nav ref={navRef} className="navbar">
            <div ref={navInnerRef} className="nav-inner">
                <div className="nav-container">
                    <div
                        className={`nav-logo icon-bounce theme-trigger color-theme-${colorTheme}`}
                        onClick={handleLogoClick}
                    >
                        <span className="logo-icon">◆</span>
                        SELECT<span className="accent">TECH</span>
                    </div>

                    <div className="nav-links">
                        <span className="nav-link text-reveal" onClick={() => scrollToSection('services')}>
                            Services
                        </span>
                        <span className="nav-link text-reveal" onClick={() => scrollToSection('features')}>
                            Features
                        </span>
                        <span className="nav-link text-reveal" onClick={() => scrollToSection('clients')}>
                            Clients
                        </span>
                        <span className="nav-link text-reveal" onClick={() => scrollToSection('contact')}>
                            Contact
                        </span>
                    </div>

                    <div className="nav-actions">
                        <ThemeToggle />
                        <NavButton className="nav-cta" onClick={() => scrollToSection('contact')}>
                            <span>Get Started</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </NavButton>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar



