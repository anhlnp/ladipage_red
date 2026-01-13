import { useEffect, useRef } from 'react'
import {
    Search,
    KeyRound,
    Lock,
    FolderOpen,
    Users,
    Key,
    Radio,
    Home,
    Mail,
    RefreshCw,
    HardDrive,
    BarChart3,
    DollarSign,
    TrendingDown,
    Scale,
    Clock
} from 'lucide-react'
import PageLayout from '../components/PageLayout/PageLayout'
import ServiceHero from '../components/ServiceHero/ServiceHero'
import './ServicePage.css'
import './AccountingLegal.css'

const AccountingLegal = () => {
    const timelineRef = useRef([])
    const heroImageRef = useRef(null)

    useEffect(() => {
        // Timeline reveal animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible')
                }
            })
        }, { threshold: 0.2 })

        timelineRef.current.forEach(item => {
            if (item) observer.observe(item)
        })

        // Floating animation for hero image
        let animationFrame
        const floatAnimation = () => {
            if (heroImageRef.current) {
                const time = Date.now() / 1000
                heroImageRef.current.style.transform = `translateY(${Math.sin(time) * 10}px)`
            }
            animationFrame = requestAnimationFrame(floatAnimation)
        }
        floatAnimation()

        return () => {
            observer.disconnect()
            cancelAnimationFrame(animationFrame)
        }
    }, [])

    const checklist = [
        { icon: <Search size={20} />, title: "Risk Assessments", desc: "Identify vulnerabilities before they're exploited" },
        { icon: <KeyRound size={20} />, title: "Access Controls", desc: "Role-based access to sensitive data" },
        { icon: <Lock size={20} />, title: "Data Encryption", desc: "End-to-end encryption for all client data" },
        { icon: <FolderOpen size={20} />, title: "Document Management", desc: "Secure storage and sharing systems" },
        { icon: <Users size={20} />, title: "Employee Training", desc: "Security awareness for all staff" },
        { icon: <Key size={20} />, title: "Password Policies", desc: "Multi-factor authentication required" },
        { icon: <Radio size={20} />, title: "Secure Networks", desc: "Protected Wi-Fi and VPN access" },
        { icon: <Home size={20} />, title: "Remote Access", desc: "Secure work-from-home solutions" },
        { icon: <Mail size={20} />, title: "Email Security", desc: "Phishing protection and encryption" },
        { icon: <RefreshCw size={20} />, title: "Software Updates", desc: "Automated patching and updates" },
        { icon: <HardDrive size={20} />, title: "Data Backup", desc: "Automated daily backups with quick recovery" },
        { icon: <BarChart3 size={20} />, title: "System Monitoring", desc: "24/7 threat detection and response" }
    ]

    const risks = [
        { icon: <DollarSign size={20} />, title: "Financial Theft", desc: "Direct monetary losses from breaches" },
        { icon: <TrendingDown size={20} />, title: "Reputation Damage", desc: "Loss of client confidence and trust" },
        { icon: <Scale size={20} />, title: "Regulatory Fines", desc: "Penalties for non-compliance" },
        { icon: <Clock size={20} />, title: "Operational Downtime", desc: "Business disruption and recovery costs" }
    ]

    return (
        <PageLayout>
            <ServiceHero
                tag="PROFESSIONAL SERVICES"
                title="Accounting & Legal"
                gradientText="Cybersecurity"
                description="Cybersecurity is essential for accounting and legal offices protecting sensitive client data, financial records, and legal documents."
            />

            {/* Split-screen section with floating image */}
            <section className="split-hero">
                <div className="split-content">
                    <div className="split-text">
                        <span className="section-tag">TRUSTED BY PROFESSIONALS</span>
                        <h2>Protecting <span className="gradient-text">Client Trust</span></h2>
                        <p>
                            Accounting and legal firms are prime targets for cyber criminals due to the
                            high value of data they possess. We provide comprehensive security solutions
                            tailored for professional services.
                        </p>
                        <div className="risk-cards">
                            {risks.map((risk, idx) => (
                                <div key={idx} className="risk-card">
                                    <span className="risk-icon">{risk.icon}</span>
                                    <div>
                                        <strong>{risk.title}</strong>
                                        <span>{risk.desc}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="split-image" ref={heroImageRef}>
                        <div className="image-frame">
                            <img src="/accounting_office.png" alt="Modern accounting office" />
                            <div className="image-badge">
                                <span className="badge-icon">🛡️</span>
                                <span>Protected</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline-style checklist */}
            <section className="timeline-section">
                <div className="timeline-header">
                    <h2>Our Security <span className="gradient-text">Checklist</span></h2>
                    <p>Comprehensive protection for your practice</p>
                </div>
                <div className="timeline-grid">
                    {checklist.map((item, idx) => (
                        <div
                            key={idx}
                            className="timeline-item"
                            ref={el => timelineRef.current[idx] = el}
                            style={{ transitionDelay: `${idx * 50}ms` }}
                        >
                            <div className="timeline-connector">
                                <div className="connector-dot"></div>
                                {idx < checklist.length - 1 && <div className="connector-line"></div>}
                            </div>
                            <div className="timeline-content glass-box">
                                <span className="timeline-icon">{item.icon}</span>
                                <div className="timeline-text">
                                    <strong>{item.title}</strong>
                                    <span>{item.desc}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="page-cta">
                <div className="cta-container">
                    <h2>Secure Your Practice Today</h2>
                    <p>Minimize the risk of cyberattacks and data breaches with our expert help.</p>
                    <a href="/contact" className="btn-primary">Consult with Experts</a>
                </div>
            </section>
        </PageLayout>
    )
}

export default AccountingLegal

