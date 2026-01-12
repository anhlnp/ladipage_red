import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTheme } from '../../context/ThemeContext'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import './Navbar.css'

gsap.registerPlugin(ScrollTrigger)

// Dropdown menu items for Services
const servicesDropdown = [
    { label: 'IT Support', path: '/it-support' },
    { label: 'Computer Repair', path: '/computer-repair' },
    { label: 'Phone/Tablet Repair', path: '/phone-tablet-repair' },
    { label: 'Security', path: '/cybersecurity' },
    { label: 'Medical/Dental IT', path: '/medical-dental-offices' },
]

// Dropdown menu items for Cybersecurity
const cybersecurityDropdown = [
    { label: 'Cybersecurity', path: '/cybersecurity' },
    { label: 'Medical/Dental Offices', path: '/medical-dental-offices' },
    { label: 'Accounting/Legal Offices', path: '/accounting-legal' },
    { label: 'Schools/Education', path: '/education' },
    { label: 'Small/Medium/Large Business', path: '/business' },
    { label: 'Car Dealerships', path: '/car-dealerships' },
]

// Magnetic Button for Nav CTA
const NavButton = ({ children, className, onClick, to }) => {
    const buttonRef = useRef(null)
    const navigate = useNavigate()

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

    const handleClick = () => {
        if (to) {
            navigate(to)
        } else if (onClick) {
            onClick()
        }
    }

    return (
        <button
            ref={buttonRef}
            className={`${className} magnetic-btn btn-shine`}
            onClick={handleClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </button>
    )
}

// Dropdown Component
const NavDropdown = ({ label, items }) => {
    const [open, setOpen] = useState(false)
    
    return (
        <div 
            className="nav-dropdown"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <span className="nav-link text-reveal dropdown-trigger">
                {label}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </span>
            {open && (
                <div className="dropdown-menu">
                    {items.map((item, idx) => (
                        <Link 
                            key={idx} 
                            to={item.path} 
                            className="dropdown-item"
                            onClick={() => setOpen(false)}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            )}
        </div>
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

        gsap.set(navInner, {
            transformOrigin: 'top center',
        })

        const ctx = gsap.context(() => {
            const navTl = gsap.timeline({
                scrollTrigger: {
                    trigger: 'body',
                    start: 'top top',
                    end: '200 top',
                    scrub: 0.8,
                    onUpdate: (self) => {
                        if (self.progress > 0.1) {
                            navInner.classList.add('nav-glass-active')
                        } else {
                            navInner.classList.remove('nav-glass-active')
                        }
                    }
                }
            })

            navTl.to(navInner, {
                y: 10,
                scale: 0.92,
                borderRadius: '999px',
                ease: 'none',
            }, 0)

        }, nav)

        return () => ctx.revert()
    }, [])

    const handleLogoClick = () => {
        cycleColorTheme()
    }

    return (
        <nav ref={navRef} className="navbar">
            <div ref={navInnerRef} className="nav-inner">
                <div className="nav-container">
                    <Link to="/" className={`nav-logo icon-bounce theme-trigger color-theme-${colorTheme}`} onClick={handleLogoClick}>
                        <span className="logo-icon">◆</span>
                        SELECT<span className="accent">TECH</span>
                    </Link>

                    <div className="nav-links">
                        <Link to="/" className="nav-link text-reveal">Home</Link>
                        <NavDropdown label="Services" items={servicesDropdown} />
                        <NavDropdown label="Cybersecurity" items={cybersecurityDropdown} />
                        <Link to="/about" className="nav-link text-reveal">About</Link>
                        <a href="http://portal.selecttechinc.com/" target="_blank" rel="noopener noreferrer" className="nav-link text-reveal">
                            Customer Portal
                        </a>
                        <Link to="/contact" className="nav-link text-reveal">Contact</Link>
                    </div>

                    <div className="nav-actions">
                        <ThemeToggle />
                        <NavButton className="nav-cta" to="/contact">
                            <span>Let's Talk</span>
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



