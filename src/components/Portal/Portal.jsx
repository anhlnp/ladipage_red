import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Portal = () => {
    const sectionRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.portal-card',
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.portal',
                        start: 'top 80%'
                    }
                }
            )
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section className="portal" id="portal" ref={sectionRef}>
            <div className="section-container">
                <div className="portal-card">
                    <div className="portal-content">
                        <div className="portal-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                <circle cx="12" cy="16" r="1" />
                            </svg>
                        </div>
                        <div className="portal-text">
                            <h3>Client Portal</h3>
                            <p>Access your security dashboard, training modules, and compliance reports</p>
                        </div>
                    </div>
                    <a
                        href="https://portal.selecttechinc.com/login"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="portal-btn"
                    >
                        <span>Access Portal</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15,3 21,3 21,9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    )
}

export default Portal
