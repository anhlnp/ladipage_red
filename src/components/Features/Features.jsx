import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const features = [
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
        ),
        title: 'Regulatory Compliance',
        description: 'Automated tools to track ever-changing regulations'
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
        ),
        title: 'Data Protection',
        description: 'Advanced cybersecurity measures for sensitive data'
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 20V10" />
                <path d="M18 20V4" />
                <path d="M6 20v-4" />
            </svg>
        ),
        title: 'Analytics & Reporting',
        description: 'Comprehensive insights into compliance status'
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
        ),
        title: 'Customized Solutions',
        description: 'Tailored options for unique business needs'
    }
]

const codeLines = [
    { content: <><span className="code-keyword">const</span> <span className="code-var">security</span> = <span className="code-func">initializeAI</span>();</> },
    { content: <><span className="code-keyword">await</span> security.<span className="code-func">scanThreats</span>();</> },
    { content: <span className="code-comment">// FTC Safeguards: ✓ Compliant</span> },
    { content: <span className="code-comment">// PCI Standards: ✓ Verified</span> },
    { content: <span className="code-comment">// HIPAA: ✓ Protected</span> },
    { content: <><span className="code-keyword">return</span> {'{'} status: <span className="code-string">"SECURE"</span> {'}'}</> }
]

const Features = () => {
    const sectionRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate feature items
            gsap.fromTo('.feature-item',
                { opacity: 0, x: -30 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.features-list',
                        start: 'top 80%'
                    }
                }
            )

            // Animate code lines
            gsap.fromTo('.code-line',
                { opacity: 0, x: -20 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.5,
                    stagger: 0.15,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.visual-content',
                        start: 'top 80%'
                    }
                }
            )

            // Animate visual card
            gsap.fromTo('.visual-card',
                { opacity: 0, y: 40, rotateY: -10 },
                {
                    opacity: 1,
                    y: 0,
                    rotateY: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.feature-visual',
                        start: 'top 80%'
                    }
                }
            )
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section id="features" className="features" ref={sectionRef}>
            <div className="section-container">
                <div className="features-layout">
                    <div className="features-left">
                        <span className="section-tag">Why Choose Us</span>
                        <h2 className="section-title">Award-Winning Compliance & Cybersecurity Portal</h2>
                        <p className="features-desc">
                            Our all-in-one portal helps dealerships maintain FTC Safeguards and Cyber Awareness Training with ease.
                        </p>

                        <div className="features-list">
                            {features.map((feature, index) => (
                                <div key={index} className="feature-item">
                                    <div className="feature-icon-small">
                                        {feature.icon}
                                    </div>
                                    <div className="feature-text">
                                        <h4>{feature.title}</h4>
                                        <p>{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="features-right">
                        <div className="feature-visual">
                            <div className="visual-card">
                                <div className="visual-header">
                                    <div className="visual-dots">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                    <span className="visual-title">compliance_portal.exe</span>
                                </div>
                                <div className="visual-content">
                                    {codeLines.map((line, index) => (
                                        <div key={index} className="code-line">
                                            {line.content}
                                        </div>
                                    ))}
                                </div>
                                <div className="visual-status">
                                    <div className="status-indicator"></div>
                                    <span>All systems operational</span>
                                </div>
                            </div>

                            <div className="floating-badge badge-1">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                </svg>
                                <span>Protected</span>
                            </div>

                            <div className="floating-badge badge-2">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                                </svg>
                                <span>99.9% Uptime</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Features
