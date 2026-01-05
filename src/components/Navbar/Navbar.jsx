import { useState, useEffect, useRef, useCallback } from 'react'
import { useTheme } from '../../context/ThemeContext'
import ThemeToggle from '../ThemeToggle/ThemeToggle'

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
    const [scrolled, setScrolled] = useState(false)
    const { cycleColorTheme, getCurrentColorTheme, colorThemes, colorTheme } = useTheme()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToSection = (id) => {
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    // Handle logo click - cycle color theme
    const handleLogoClick = () => {
        cycleColorTheme()
    }

    // Get next theme info for tooltip
    const getNextTheme = () => {
        const currentIndex = colorThemes.findIndex(t => t.name === colorTheme)
        const nextIndex = (currentIndex + 1) % colorThemes.length
        return colorThemes[nextIndex]
    }

    const currentTheme = getCurrentColorTheme()
    const nextTheme = getNextTheme()

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
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
        </nav>
    )
}

export default Navbar
