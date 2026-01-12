import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Magnetic Button Component
const MagneticButton = ({ children, className, onClick, strength = 0.3 }) => {
    const buttonRef = useRef(null)

    const handleMouseMove = useCallback((e) => {
        const button = buttonRef.current
        if (!button) return

        const rect = button.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const deltaX = (e.clientX - centerX) * strength
        const deltaY = (e.clientY - centerY) * strength

        button.style.transform = `translate(${deltaX}px, ${deltaY}px)`
    }, [strength])

    const handleMouseLeave = useCallback(() => {
        const button = buttonRef.current
        if (!button) return
        button.style.transform = 'translate(0, 0)'
    }, [])

    // Ripple effect on click
    const handleClick = useCallback((e) => {
        const button = buttonRef.current
        if (!button) return

        const rect = button.getBoundingClientRect()
        const ripple = document.createElement('span')
        ripple.className = 'ripple-effect'

        const size = Math.max(rect.width, rect.height)
        ripple.style.width = ripple.style.height = `${size}px`
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`

        button.appendChild(ripple)
        setTimeout(() => ripple.remove(), 600)

        if (onClick) onClick(e)
    }, [onClick])

    return (
        <button
            ref={buttonRef}
            className={`${className} magnetic-btn ripple-container btn-lift`}
            onClick={handleClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </button>
    )
}

const Hero = () => {
    const heroRef = useRef(null)
    const statsRef = useRef([])

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate title lines
            gsap.fromTo('.title-line',
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'power3.out',
                    delay: 0.3
                }
            )

            // Animate description
            gsap.fromTo('.hero-description',
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, delay: 1 }
            )

            // Animate stats
            gsap.fromTo('.hero-stats',
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, delay: 1.2 }
            )

            // Animate CTA
            gsap.fromTo('.hero-cta',
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, delay: 1.4 }
            )

            // Counter animation
            const counters = document.querySelectorAll('.stat-number')
            counters.forEach(counter => {
                const target = parseInt(counter.dataset.value)
                gsap.to(counter, {
                    textContent: target,
                    duration: 2,
                    delay: 1.5,
                    snap: { textContent: 1 },
                    ease: 'power2.out'
                })
            })

        }, heroRef)

        // Direct scroll-based animation for hero fly-out - staggered elements
        const badge = document.querySelector('.hero-badge')
        const titleLines = document.querySelectorAll('.title-line')
        const description = document.querySelector('.hero-description')
        const stats = document.querySelector('.hero-stats')
        const cta = document.querySelector('.hero-cta')
        const scrollIndicator = document.querySelector('.scroll-indicator')
        
        const handleScroll = () => {
            const scrollY = window.scrollY || window.lenis?.scroll || 0
            const heroHeight = window.innerHeight
            const progress = Math.min(scrollY / (heroHeight * 0.6), 1)
            
            // Badge - flies up and left quickly
            if (badge) {
                const badgeProgress = Math.min(progress * 2, 1) // Faster
                gsap.set(badge, {
                    x: -badgeProgress * 150,
                    y: -badgeProgress * 50,
                    opacity: 1 - badgeProgress,
                    scale: 1 - badgeProgress * 0.3,
                })
            }
            
            // Title lines - staggered fly right with rotation
            titleLines.forEach((line, i) => {
                const delay = i * 0.1 // Stagger delay
                const lineProgress = Math.max(0, Math.min((progress - delay) * 1.5, 1))
                gsap.set(line, {
                    x: lineProgress * (200 + i * 50),
                    y: lineProgress * (i % 2 === 0 ? -20 : 20), // Alternate up/down
                    opacity: 1 - lineProgress,
                    rotationZ: lineProgress * (i % 2 === 0 ? 3 : -3), // Slight rotation
                })
            })
            
            // Description - flies down-right
            if (description) {
                const descProgress = Math.max(0, Math.min((progress - 0.15) * 1.5, 1))
                gsap.set(description, {
                    x: descProgress * 250,
                    y: descProgress * 30,
                    opacity: 1 - descProgress,
                })
            }
            
            // Stats - flies down and scales down
            if (stats) {
                const statsProgress = Math.max(0, Math.min((progress - 0.2) * 1.5, 1))
                gsap.set(stats, {
                    y: statsProgress * 60,
                    opacity: 1 - statsProgress,
                    scale: 1 - statsProgress * 0.2,
                })
            }
            
            // CTA - flies up
            if (cta) {
                const ctaProgress = Math.max(0, Math.min((progress - 0.25) * 1.5, 1))
                gsap.set(cta, {
                    y: -ctaProgress * 80,
                    opacity: 1 - ctaProgress,
                    scale: 1 - ctaProgress * 0.1,
                })
            }
            
            // Scroll indicator fades out first
            if (scrollIndicator) {
                const indicatorProgress = Math.min(progress * 3, 1)
                gsap.set(scrollIndicator, {
                    opacity: 1 - indicatorProgress,
                    y: indicatorProgress * 30,
                })
            }
        }

        // Listen to both native scroll and Lenis scroll
        window.addEventListener('scroll', handleScroll, { passive: true })
        
        if (window.lenis) {
            window.lenis.on('scroll', handleScroll)
        }

        return () => {
            ctx.revert()
            window.removeEventListener('scroll', handleScroll)
            if (window.lenis) {
                window.lenis.off('scroll', handleScroll)
            }
        }
    }, [])

    const scrollToSection = (id) => {
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <section id="hero" className="hero" ref={heroRef}>
           
                <div className="hero-content">
                    <div className="hero-badge">
                        <span className="pulse"></span>
                        <span>Award Winning IT Solutions 2024</span>
                    </div>

                    <h1 className="hero-title">
                        <span className="title-line">Next-Gen</span>
                        <span className="title-line gradient-text">Cybersecurity</span>
                        <span className="title-line">& IT Solutions</span>
                    </h1>

                    <p className="hero-description">
                        Smart technologies for today's business needs. Whether you're at home,
                        running a business, or on the go – we keep your systems running smoothly.
                    </p>

                    <div className="hero-stats">
                        <div className="stat">
                            <span className="stat-number" data-value="23">24</span>
                            <span className="stat-label">Years Experience</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat">
                            <span className="stat-number" data-value="1000">1000</span>
                            <span className="stat-suffix">+</span>
                            <span className="stat-label">Happy Clients</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat">
                            <span className="stat-number" data-value="99">99</span>
                            <span className="stat-suffix">%</span>
                            <span className="stat-label">Uptime Guarantee</span>
                        </div>
                    </div>

                    <div className="hero-cta">
                        <MagneticButton
                            className="btn-primary btn-shine glow-pulse"
                            onClick={() => scrollToSection('contact')}
                            strength={0.25}
                        >
                            <span>Schedule a Demo</span>
                            <div className="btn-glow"></div>
                        </MagneticButton>
                        <MagneticButton
                            className="btn-secondary"
                            onClick={() => scrollToSection('services')}
                            strength={0.2}
                        >
                            <span>Explore Services</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <polygon points="10 8 16 12 10 16 10 8" />
                            </svg>
                        </MagneticButton>
                    </div>
            </div>

            <div className="scroll-indicator">
                <span>Scroll to explore</span>
                <div className="scroll-line"></div>
            </div>
        </section>
    )
}

export default Hero

