import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Canvas } from '@react-three/fiber'
import Portal3D from './Portal3D'

gsap.registerPlugin(ScrollTrigger)

const Portal = () => {
    const sectionRef = useRef(null)
    const canvasRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Portal card animation
            gsap.fromTo('.portal-card',
                { opacity: 0, y: 40, x: -30 },
                {
                    opacity: 1,
                    y: 0,
                    x: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.portal',
                        start: 'top 80%'
                    }
                }
            )

            // 3D Canvas animation - slides in from right
            if (canvasRef.current) {
                gsap.fromTo(canvasRef.current,
                    { opacity: 0, x: 50 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: '.portal',
                            start: 'top 75%'
                        }
                    }
                )
            }
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section className="portal" id="portal" ref={sectionRef}>
            <div className="section-container">
                <div className="portal-wrapper">
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
                    <div ref={canvasRef} className="portal-3d">
                        <Canvas
                            camera={{ position: [0, 0, 5], fov: 50 }}
                            gl={{ antialias: true, alpha: true }}
                            dpr={[1, 1.5]}
                        >
                            <ambientLight intensity={0.4} />
                            <directionalLight position={[5, 5, 5]} intensity={0.8} />
                            <pointLight position={[-5, -5, -5]} intensity={0.5} color="#38bdf8" />
                            <Portal3D />
                        </Canvas>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Portal

