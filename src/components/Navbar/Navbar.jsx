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
    { label: 'Managed IT Services', path: '/managed-it-services' },
    { label: 'IT Consulting', path: '/it-consulting' },
    { label: 'Fiber & Data Center', path: '/fiber-data-center' },
    { label: 'Computer Repair', path: '/computer-repair' },
    { label: 'Phone/Tablet Repair', path: '/phone-tablet-repair' },
    { label: 'Security', path: 'https://selecttechsecurity.com' },
    { label: 'Medical/Dental IT', path: 'https://www.selecttechmd.com' },
    { label: 'End-to-End Dealership Services', path: '/dealership-services' },
    { label: 'Cloud Based SOC Monitoring', path: '/cloud-soc-monitoring' },
    { label: 'Vulnerability & Pen Testing', path: '/vulnerability-testing' },
    { label: 'Cyber Training', path: '/cyber-training' },
]

// Dropdown menu items for Cybersecurity
const cybersecurityDropdown = [
    { label: 'Cybersecurity', path: '/cybersecurity' },
    { label: 'Medical/Dental Offices', path: '/medical-dental-offices' },
    { label: 'Accounting/Legal Offices', path: '/accounting-legal' },
    { label: 'Schools/Education', path: '/education' },
    { label: 'Small/Medium/Large Business', path: '/business' },
    { label: 'Car Dealership Complaince', path: '/car-dealerships' },
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
    const timeoutRef = useRef(null)

    const handleMouseEnter = () => {
        // Clear any pending close timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
        }
        setOpen(true)
    }

    const handleMouseLeave = () => {
        // Delay closing to give user time to move mouse to dropdown
        timeoutRef.current = setTimeout(() => {
            setOpen(false)
        }, 300) // 300ms delay
    }

    return (
        <div
            className="nav-dropdown"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
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

// Mobile Dropdown Component
const MobileNavDropdown = ({ label, items, onLinkClick }) => {
    const [open, setOpen] = useState(false)

    return (
        <div className="mobile-nav-dropdown">
            <button
                className="mobile-dropdown-trigger"
                onClick={() => setOpen(!open)}
            >
                {label}
                <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
                >
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </button>
            {open && (
                <div className="mobile-dropdown-menu">
                    {items.map((item, idx) => (
                        <Link
                            key={idx}
                            to={item.path}
                            className="mobile-dropdown-item"
                            onClick={onLinkClick}
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
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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

    // Close mobile menu on resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setMobileMenuOpen(false)
            }
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [mobileMenuOpen])

    const handleLogoClick = () => {
        cycleColorTheme()
    }

    const closeMobileMenu = () => {
        setMobileMenuOpen(false)
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
                        <NavDropdown label="Company" items={[
                            { label: 'About Us', path: '/about' },
                            { label: 'Our Team', path: '/our-team' },
                            { label: 'Careers', path: '/careers' }
                        ]} />
                        <Link to="/software-development" className="nav-link text-reveal">
                            Software Development
                        </Link>
                        <Link to="/contact" className="nav-link text-reveal">Contact</Link>
                    </div>

                    <div className="nav-actions">
                        <ThemeToggle />
                        <a href="http://portal.selecttechinc.com/" target="_blank" rel="noopener noreferrer" className="nav-cta nav-cta-desktop magnetic-btn btn-shine">
                            <span>Customer Portal</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </a>

                        {/* Mobile Hamburger Button */}
                        <button
                            className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle mobile menu"
                        >
                            <span className="hamburger-line"></span>
                            <span className="hamburger-line"></span>
                            <span className="hamburger-line"></span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'active' : ''}`} onClick={closeMobileMenu}></div>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
                <div className="mobile-menu-content">
                    <Link to="/" className="mobile-nav-link" onClick={closeMobileMenu}>Home</Link>
                    <MobileNavDropdown label="Services" items={servicesDropdown} onLinkClick={closeMobileMenu} />
                    <MobileNavDropdown label="Cybersecurity" items={cybersecurityDropdown} onLinkClick={closeMobileMenu} />
                    <MobileNavDropdown label="Company" items={[
                        { label: 'About Us', path: '/about' },
                        { label: 'Our Team', path: '/our-team' },
                        { label: 'Careers', path: '/careers' }
                    ]} onLinkClick={closeMobileMenu} />
                    <Link to="/software-development" className="mobile-nav-link" onClick={closeMobileMenu}>
                        Software Development
                    </Link>
                    <Link to="/contact" className="mobile-nav-link" onClick={closeMobileMenu}>Contact</Link>

                    <a href="http://portal.selecttechinc.com/" target="_blank" rel="noopener noreferrer" className="nav-cta mobile-cta magnetic-btn btn-shine" onClick={closeMobileMenu}>
                        <span>Customer Portal</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar



