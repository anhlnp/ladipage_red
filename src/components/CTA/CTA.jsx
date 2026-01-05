import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CTA = () => {
    const sectionRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.cta-container',
                { opacity: 0, scale: 0.95 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.cta',
                        start: 'top 80%'
                    }
                }
            )
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section className="cta" ref={sectionRef}>
            <div className="cta-container">
                <div className="cta-content">
                    <div className="cta-badge">Ready to Get Started?</div>
                    <h2 className="cta-title">Transform Your Business Security Today</h2>
                    <p className="cta-text">
                        Schedule a demo and see how Select Tech can revolutionize your cybersecurity and compliance management.
                    </p>
                    <div className="cta-buttons">
                        <a href="tel:+18283284801" className="btn-primary btn-large">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                            <span>(828) 328-4801</span>
                            <div className="btn-glow"></div>
                        </a>
                        <a href="mailto:help@selecttechinc.com" className="btn-secondary btn-large">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                            <span>Email Us</span>
                        </a>
                    </div>
                </div>

                <div className="cta-visual">
                    <div className="orbit-wrapper">
                        <div className="orbit orbit-1"></div>
                        <div className="orbit orbit-2"></div>
                        <div className="orbit orbit-3"></div>
                        <div className="center-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CTA
