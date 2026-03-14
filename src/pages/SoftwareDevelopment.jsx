import { useRef, useEffect } from 'react'
import PageLayout from '../components/PageLayout/PageLayout'
import {
    ArrowRight,
    ExternalLink,
    Zap,
    Shield,
    Infinity,
    Code2,
    Cpu,
    Sparkles
} from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ServicePage.css'
import './SoftwareDevelopment.css'

gsap.registerPlugin(ScrollTrigger)

const SoftwareDevelopment = () => {
    const pageRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.animate-fade-up', {
                y: 30,
                duration: 0.8,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: '.animate-fade-up',
                    start: 'top 85%'
                }
            })
        }, pageRef)

        return () => ctx.revert()
    }, [])

    const products = [
        {
            id: 'academix',
            title: "Academix",
            category: "EdTech Platform",
            description: "A comprehensive learning management system with role-based access for instructors and students, featuring automated content generation.",
            tags: ["Next.js", "AI Integration", "Multi-role"],
            image: "/project/Academix.png"
        },
        {
            id: 'ecofit',
            title: "EcoFit",
            category: "E-commerce SaaS",
            description: "Full-scale e-commerce solution with integrated inventory management and seamless payment processing via Stripe.",
            tags: ["React Native", "Stripe", "Real-time"],
            image: "/project/eco-fit.png"
        },
        {
            id: 'nclake',
            title: "NC Lake Homes",
            category: "Real Estate Website",
            description: "A waterfront property listing platform specializing in lakefront homes and lots in the Blue Ridge Mountain Foothills of North Carolina.",
            tags: ["Property Listings", "MLS Integration", "Responsive"],
            image: "/project/Nclake.png"
        },
        {
            id: 'portal-learning',
            title: "Portal Learning System",
            category: "Enterprise Training",
            description: "An employee training and compliance management platform with course assignment, phishing simulations, and real-time progress tracking dashboards.",
            tags: ["Dashboard", "Compliance", "Analytics"],
            image: "/project/portal-learning-system.png"
        },
        {
            id: 'enterprise-core',
            title: "Enterprise Core",
            category: "Internal Tools",
            description: "Legacy-to-Cloud transformation for large scale organizations, moving from WinForms to modern web dashboards.",
            tags: ["Cloud Migration", "Dashboard", "Secure"],
            image: null
        }
    ]

    return (
        <PageLayout>
            <div ref={pageRef} className="software-showroom-page">
                {/* Hero Section */}
                <section className="showroom-hero">
                    <div className="showroom-hero-content animate-fade-up">
                        <div className="partnership-badge">
                            <span className="brand-select">SELECT TECH</span>
                            <span className="separator">×</span>
                            <span className="brand-loopers">LOOPERS LAB</span>
                        </div>
                        <h1 className="hero-title">
                            The Software <br />
                            <span className="gradient-text">Innovation Showroom</span>
                        </h1>
                        <p className="hero-description">
                            Where robust infrastructure meets bleeding-edge product engineering.
                            Explore how our strategic partnership transforms complex ideas into scalable SaaS reality.
                        </p>
                    </div>
                </section>

                {/* Partnership Intro */}
                <section className="partnership-intro section-padding">
                    <div className="container">
                        <div className="intro-card glass-box animate-fade-up">
                            <div className="intro-icon">
                                <Sparkles size={32} />
                            </div>
                            <div className="intro-text">
                                <h2>A Strategic Alliance</h2>
                                <p>
                                    <strong>Select Tech Inc.</strong> has joined forces with <strong>Loopers Lab</strong> to create a powerhouse of digital transformation.
                                    While Select Tech ensures your physical and network infrastructure is rock-solid, Loopers Lab acts as the "SaaS Engine,"
                                    building the sophisticated software layers that run on top of it. Together, we deliver end-to-end solutions from server rack to software interface.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Product Showroom Grid */}
                <section className="showroom-showcase section-padding">
                    <div className="container">
                        <div className="section-header text-center animate-fade-up">
                            <h2 className="section-title">Featured Projects</h2>
                            <p className="section-subtitle">Real-world examples of our collaborative engineering.</p>
                        </div>

                        <div className="showroom-grid">
                            {products.map((product, index) => (
                                <div key={index} className="product-card animate-fade-up">
                                    <div className="product-visual">
                                        {product.image ? (
                                            <img src={product.image} alt={product.title} className="product-screenshot" />
                                        ) : (
                                            <div className="product-gradient" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)' }}>
                                                <Code2 size={40} className="product-icon-overlay" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="product-content">
                                        <div className="product-header">
                                            <span className="product-category">{product.category}</span>
                                            <h3 className="product-title">{product.title}</h3>
                                        </div>
                                        <p className="product-desc">{product.description}</p>
                                        <div className="product-tags">
                                            {product.tags.map(tag => (
                                                <span key={tag} className="tag">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Synergy / Capabilities */}
                <section className="synergy-section section-padding">
                    <div className="container">
                        <h2 className="section-title text-center animate-fade-up">Why This Partnership Matters</h2>
                        <div className="synergy-grid">
                            <div className="synergy-card animate-fade-up">
                                <Zap size={32} className="synergy-icon text-accent" />
                                <h3>Acceleration</h3>
                                <p>Loopers Lab's proprietary "Loopers Kit" allows us to deploy MVP foundations in days, not months.</p>
                            </div>
                            <div className="synergy-card animate-fade-up">
                                <Infinity size={32} className="synergy-icon text-accent" />
                                <h3>Scalability</h3>
                                <p>Architectures designed from day one to scale from a single user to enterprise-level traffic without rewriting core logic.</p>
                            </div>
                            <div className="synergy-card animate-fade-up">
                                <Shield size={32} className="synergy-icon text-accent" />
                                <h3>Security First</h3>
                                <p>With Select Tech's security DNA, every line of code is written with compliance and data protection in mind.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="page-cta">
                    <div className="cta-container">
                        <h2>Bring Your Vision to Life</h2>
                        <p>Leverage the combined power of Select Tech and Loopers Lab for your next project.</p>
                        <a href="https://looperslab.com/" target="_blank" rel="noopener noreferrer" className="btn-primary">
                            Start Your Project
                        </a>
                    </div>
                </section>
            </div>
        </PageLayout>
    )
}

export default SoftwareDevelopment
