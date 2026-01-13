import { useEffect, useRef, useState } from 'react'
import PageLayout from '../components/PageLayout/PageLayout'
import ServiceHero from '../components/ServiceHero/ServiceHero'
import './ServicePage.css'
import './Education.css'

const Education = () => {
    const sectionRef = useRef(null)
    const bentoRef = useRef(null)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        // Scroll-triggered reveal animation
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in')
                }
            })
        }, observerOptions)

        const animatedElements = document.querySelectorAll('.bento-item, .feature-card, .checklist-row')
        animatedElements.forEach(el => observer.observe(el))

        // 3D tilt effect on mouse move for bento cards
        const handleMouseMove = (e) => {
            if (bentoRef.current) {
                const rect = bentoRef.current.getBoundingClientRect()
                const x = (e.clientX - rect.left) / rect.width
                const y = (e.clientY - rect.top) / rect.height
                setMousePosition({ x, y })
            }
        }

        // Parallax scroll effect
        const handleScroll = () => {
            if (sectionRef.current) {
                const scrolled = window.scrollY
                const parallaxElements = sectionRef.current.querySelectorAll('.parallax-layer')
                parallaxElements.forEach((el, i) => {
                    const speed = (i + 1) * 0.03
                    el.style.transform = `translateY(${scrolled * speed}px)`
                })
            }
        }

        window.addEventListener('scroll', handleScroll)
        window.addEventListener('mousemove', handleMouseMove)

        return () => {
            observer.disconnect()
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    const checklist = [
        { icon: "📚", title: "Educate Students, Teachers, and Staff", desc: "Comprehensive cybersecurity awareness training" },
        { icon: "🔐", title: "Implement Strong Access Controls", desc: "Role-based access to sensitive student data" },
        { icon: "🌐", title: "Secure Network Infrastructure", desc: "Protected networks for safe digital learning" },
        { icon: "🔄", title: "Keep Software and Systems Updated", desc: "Regular patches and security updates" },
        { icon: "📶", title: "Secure Wi-Fi Networks", desc: "Protected wireless access for all devices" },
        { icon: "💾", title: "Backup Data Regularly", desc: "Automated backups with quick recovery" },
        { icon: "📱", title: "Implement a BYOD Policy", desc: "Secure bring-your-own-device guidelines" },
        { icon: "📊", title: "Monitor Network Activity", desc: "Real-time threat detection and alerts" },
        { icon: "📋", title: "Develop an Incident Response Plan", desc: "Be prepared for any security breach" },
        { icon: "💻", title: "Secure Physical Devices", desc: "Protect hardware from theft and tampering" },
        { icon: "👨‍💻", title: "Engage with Cybersecurity Professionals", desc: "Expert guidance and support" }
    ]

    return (
        <PageLayout>
            <ServiceHero
                tag="EDUCATION"
                title="Schools & Education"
                gradientText="Cybersecurity"
                description="Protecting sensitive student information, ensuring availability of educational resources, and maintaining a safe digital learning environment."
            />

            {/* Innovative Bento Grid Section */}
            <section className="edu-bento-section" ref={sectionRef}>
                <div className="bento-glow-orb bento-orb-1"></div>
                <div className="bento-glow-orb bento-orb-2"></div>

                <div className="edu-bento-grid" ref={bentoRef}>
                    {/* Main Featured Image - Language Lab */}
                    <div
                        className="bento-item bento-featured"
                        style={{
                            transform: `perspective(1000px) rotateY(${(mousePosition.x - 0.5) * 5}deg) rotateX(${(0.5 - mousePosition.y) * 5}deg)`
                        }}
                    >
                        <div className="bento-image-wrapper">
                            <img
                                src="/language-lab-181083.jpg"
                                alt="Language Lab - Modern Learning Environment"
                                className="parallax-layer"
                            />
                            <div className="bento-shine"></div>
                        </div>
                        <div className="bento-content">
                            <span className="bento-badge">Digital Learning</span>
                            <h3>Modern Language Labs</h3>
                            <p>State-of-the-art digital classrooms secured with enterprise-grade protection</p>
                        </div>
                        <div className="bento-blur-bg"></div>
                    </div>

                    {/* Student Working - Vertical Card */}
                    <div className="bento-item bento-vertical">
                        <div className="bento-image-wrapper">
                            <img
                                src="/student-849825.jpg"
                                alt="Student Learning"
                                className="parallax-layer"
                            />
                            <div className="bento-shine"></div>
                        </div>
                        <div className="bento-content">
                            <span className="bento-badge">Student Safety</span>
                            <h3>Secure Learning</h3>
                            <p>Protected digital environments for focused education</p>
                        </div>
                    </div>

                    {/* Stats Card - Interactive */}
                    <div className="bento-item bento-stats">
                        <div className="stats-grid">
                            <div className="stat-block">
                                <div className="stat-circle">
                                    <svg viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(139,92,246,0.2)" strokeWidth="8" />
                                        <circle cx="50" cy="50" r="45" fill="none" stroke="url(#gradient1)" strokeWidth="8" strokeDasharray="283" strokeDashoffset="28" strokeLinecap="round" className="stat-progress" />
                                    </svg>
                                    <defs>
                                        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#8b5cf6" />
                                            <stop offset="100%" stopColor="#ec4899" />
                                        </linearGradient>
                                    </defs>
                                </div>
                                <span className="stat-value">FERPA</span>
                                <span className="stat-subtitle">Compliant</span>
                            </div>
                            <div className="stat-block">
                                <span className="stat-big-number">24<span className="stat-suffix">/7</span></span>
                                <span className="stat-subtitle">Monitoring</span>
                            </div>
                            <div className="stat-block">
                                <span className="stat-big-number">100<span className="stat-suffix">%</span></span>
                                <span className="stat-subtitle">Protected</span>
                            </div>
                        </div>
                    </div>

                    {/* Data Security - Wide Card */}
                    <div className="bento-item bento-wide">
                        <div className="bento-image-wrapper">
                            <img
                                src="/data-security-9145391.jpg"
                                alt="Data Security"
                                className="parallax-layer"
                            />
                            <div className="bento-shine"></div>
                        </div>
                        <div className="bento-content bento-content-overlay">
                            <div className="content-left">
                                <span className="bento-badge">Data Protection</span>
                                <h3>Enterprise-Grade Security</h3>
                                <p>Safeguarding sensitive student information with cutting-edge encryption</p>
                            </div>
                            <div className="security-icons">
                                <div className="security-icon"><span>🔒</span></div>
                                <div className="security-icon"><span>🛡️</span></div>
                                <div className="security-icon"><span>🔑</span></div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Features - Text Card */}
                    <div className="bento-item bento-text">
                        <h4>Why Choose Us?</h4>
                        <ul className="quick-features">
                            <li><span className="feature-dot"></span>Specialized in K-12 & Higher Education</li>
                            <li><span className="feature-dot"></span>FERPA & COPPA Compliance Experts</li>
                            <li><span className="feature-dot"></span>24/7 Security Operations Center</li>
                            <li><span className="feature-dot"></span>Rapid Incident Response</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Floating Feature Cards Section */}
            <section className="edu-features-section">
                <div className="section-header">
                    <span className="section-tag">OUR APPROACH</span>
                    <h2>🎓 Cybersecurity for Schools & Education Facilities</h2>
                    <p>Comprehensive protection tailored for educational institutions</p>
                </div>

                <div className="features-orbit">
                    <div className="orbit-center">
                        <div className="center-icon">🏫</div>
                        <span>Education Security</span>
                    </div>
                    {[
                        { icon: "🔐", title: "Access Control", color: "#8b5cf6" },
                        { icon: "📊", title: "Monitoring", color: "#ec4899" },
                        { icon: "🛡️", title: "Protection", color: "#06b6d4" },
                        { icon: "📚", title: "Training", color: "#f59e0b" }
                    ].map((item, idx) => (
                        <div
                            key={idx}
                            className="feature-card orbit-item"
                            style={{ '--orbit-delay': `${idx * -5}s`, '--feature-color': item.color }}
                        >
                            <span className="feature-icon">{item.icon}</span>
                            <span className="feature-title">{item.title}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Modern Checklist Section */}
            <section className="edu-checklist-section">
                <div className="checklist-container">
                    <div className="checklist-header">
                        <h3>We Help You Implement:</h3>
                    </div>

                    <div className="checklist-timeline">
                        {checklist.map((item, idx) => (
                            <div
                                key={idx}
                                className="checklist-row"
                                style={{ '--delay': `${idx * 0.1}s` }}
                            >
                                <div className="checklist-number">{String(idx + 1).padStart(2, '0')}</div>
                                <div className="checklist-icon-box">
                                    <span>{item.icon}</span>
                                </div>
                                <div className="checklist-info">
                                    <strong>{item.title}</strong>
                                    <span>{item.desc}</span>
                                </div>
                                <div className="checklist-line"></div>
                            </div>
                        ))}
                    </div>

                    <div className="priority-message">
                        <div className="priority-icon">⚡</div>
                        <p>
                            Regardless of the size of the school or organization type, cybersecurity should be a priority.
                            By implementing effective cybersecurity measures, educational institutions can safeguard
                            sensitive information, protect student data, and minimize the risk of cyberattacks and data breaches.
                        </p>
                    </div>
                </div>
            </section>

            <section className="page-cta">
                <div className="cta-container">
                    <h2>Safe Digital Learning</h2>
                    <p>Protect your students and staff. Contact us to secure your educational facility.</p>
                    <a href="/contact" className="btn-primary">Get Started</a>
                </div>
            </section>
        </PageLayout>
    )
}

export default Education
