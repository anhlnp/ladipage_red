import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
    {
        id: 'cyber',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
            </svg>
        ),
        title: 'Cybersecurity & Compliance',
        description: 'FTC Safeguards, PCI, HIPAA compliance with pen testing, cyber training, and ethical hacking services.',
        features: ['Pen Testing', 'Training', 'Monitoring']
    },
    {
        id: 'managed',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
                <path d="M7 8h.01M10 8h.01M7 11h6" />
            </svg>
        ),
        title: 'Managed IT Services',
        description: 'Proactive MSP solutions with regular updates, patches, and strategic partnership for your business.',
        features: ['24/7 Support', 'Updates', 'Monitoring']
    },
    {
        id: 'repair',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="5" y="2" width="14" height="20" rx="2" />
                <path d="M12 18h.01" />
            </svg>
        ),
        title: 'Device Repair',
        description: 'Same-day repairs for phones, tablets, computers, and laptops. Screen replacements, battery swaps & more.',
        features: ['Same Day', 'All Devices', 'Warranty']
    },
    {
        id: 'infrastructure',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <path d="M22 6l-10 7L2 6" />
            </svg>
        ),
        title: 'Infrastructure',
        description: 'Enterprise-grade Cat5/6/7 & Fiber installation with complete network infrastructure solutions.',
        features: ['Fiber', 'Cabling', 'Networks']
    }
]

// Service Card Component with 3D Tilt and Spotlight effect
const ServiceCard = ({ service }) => {
    const cardRef = useRef(null)

    const handleMouseMove = useCallback((e) => {
        const card = cardRef.current
        if (!card) return

        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        // Spotlight effect
        card.style.setProperty('--spotlight-x', `${x}px`)
        card.style.setProperty('--spotlight-y', `${y}px`)

        // 3D Tilt effect
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        const rotateX = ((y - centerY) / centerY) * -8
        const rotateY = ((x - centerX) / centerX) * 8

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px)`
    }, [])

    const handleMouseLeave = useCallback(() => {
        const card = cardRef.current
        if (!card) return
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)'
    }, [])

    return (
        <div
            ref={cardRef}
            className="service-card spotlight-card"
            data-service={service.id}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className="service-icon icon-bounce">
                {service.icon}
            </div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <div className="service-features stagger-hover">
                {service.features.map((feature, i) => (
                    <span key={i}>{feature}</span>
                ))}
            </div>
            <span className="service-link text-reveal">
                <span>Learn More</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
            </span>
        </div>
    )
}

const Services = () => {
    const sectionRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.service-card',
                { opacity: 0, y: 60, rotateX: 10 },
                {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.services-grid',
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            )
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section id="services" className="services" ref={sectionRef}>
            <div className="section-container">
                <div className="section-header">
                    <span className="section-tag">Our Services</span>
                    <h2 className="section-title">Comprehensive IT & Security Solutions</h2>
                    <p className="section-subtitle">
                        From cybersecurity to technical repairs, we've got you covered with cutting-edge technology
                    </p>
                </div>

                <div className="services-grid">
                    {services.map((service) => (
                        <ServiceCard key={service.id} service={service} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Services

