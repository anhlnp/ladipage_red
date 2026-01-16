import { useEffect, useRef } from 'react'
import {
    Search,
    KeyRound,
    Lock,
    Users,
    Globe,
    HardDrive,
    Key,
    ShieldCheck,
    BarChart3,
    ClipboardList
} from 'lucide-react'
import PageLayout from '../components/PageLayout/PageLayout'
import ServiceHero from '../components/ServiceHero/ServiceHero'
import './ServicePage.css'
import './MedicalDentalOffices.css'

const MedicalDentalOffices = () => {
    const sectionRef = useRef(null)
    const cardsRef = useRef([])

    useEffect(() => {
        // Staggered reveal animation
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('reveal')
                    }, index * 150)
                }
            })
        }, observerOptions)

        cardsRef.current.forEach(card => {
            if (card) observer.observe(card)
        })

        // Parallax effect on scroll
        const handleScroll = () => {
            if (sectionRef.current) {
                const scrolled = window.scrollY
                const images = sectionRef.current.querySelectorAll('.parallax-image')
                images.forEach((img, i) => {
                    const speed = i % 2 === 0 ? 0.05 : -0.05
                    img.style.transform = `translateY(${scrolled * speed}px)`
                })
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => {
            observer.disconnect()
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const checklist = [
        { icon: <Search size={24} />, title: "Conduct Risk Assessments", desc: "Identify vulnerabilities in your systems" },
        { icon: <KeyRound size={24} />, title: "Strong Access Controls", desc: "Limit access to sensitive patient data" },
        { icon: <Lock size={24} />, title: "Encrypt Data", desc: "Protect data at rest and in transit" },
        { icon: <Users size={24} />, title: "Train Employees", desc: "Security awareness training for all staff" },
        { icon: <Globe size={24} />, title: "Secure Network Infrastructure", desc: "Firewalls, VPNs, and network segmentation" },
        { icon: <HardDrive size={24} />, title: "Regularly Backup Data", desc: "Automated backups with quick recovery" },
        { icon: <Key size={24} />, title: "Strong Password Policies", desc: "Multi-factor authentication required" },
        { icon: <ShieldCheck size={24} />, title: "Antivirus/Antimalware", desc: "Real-time threat detection and removal" },
        { icon: <BarChart3 size={24} />, title: "Monitor and Audit Systems", desc: "24/7 monitoring and compliance audits" },
        { icon: <ClipboardList size={24} />, title: "Incident Response Plan", desc: "Prepared for any security breach" }
    ]

    return (
        <PageLayout>
            <ServiceHero
                tag="HEALTHCARE"
                title="Medical & Dental"
                gradientText="Cybersecurity"
                description="Protecting sensitive information is a critical aspect of healthcare. We help you comply with HIPAA and maintain patient trust."
            />

            {/* Image showcase with staggered layout */}
            <section className="healthcare-showcase" ref={sectionRef}>
                <div className="showcase-grid">
                    <div
                        className="showcase-card large"
                        ref={el => cardsRef.current[0] = el}
                    >
                        <div className="card-image">
                            <img
                                src="/medical_office.png"
                                alt="Modern medical office"
                                className="parallax-image"
                            />
                        </div>
                        <div className="card-content">
                            <span className="card-tag">Medical Offices</span>
                            <h3>Complete IT Solutions for Healthcare Providers</h3>
                            <p>From EHR systems to secure workstations, we've got you covered.</p>
                        </div>
                    </div>

                    <div
                        className="showcase-card"
                        ref={el => cardsRef.current[1] = el}
                    >
                        <div className="card-image">
                            <img
                                src="/dental_clinic.png"
                                alt="Modern dental clinic"
                                className="parallax-image"
                            />
                        </div>
                        <div className="card-content">
                            <span className="card-tag">Dental Clinics</span>
                            <h3>Digital Imaging & Practice Management</h3>
                            <p>Integrated technology for modern dental practices.</p>
                        </div>
                    </div>

                    <div
                        className="showcase-card stats-card"
                        ref={el => cardsRef.current[2] = el}
                    >
                        <div className="stats-content">
                            <div className="stat-item">
                                <span className="stat-number">HIPAA</span>
                                <span className="stat-label">Compliant</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">24/7</span>
                                <span className="stat-label">Monitoring</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">100%</span>
                                <span className="stat-label">Uptime Goal</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="service-content">
                <div className="content-container">
                    <div className="content-block glass-box" style={{ gridColumn: 'span 3' }}>
                        <h3>HIPAA & Patient Data Protection</h3>
                        <p>
                            Given the increasing number of cyber threats, it is essential to implement robust
                            cybersecurity measures to safeguard patient data, comply with regulations such as
                            HIPAA, and maintain the trust of patients.
                        </p>

                        <h4 style={{ marginTop: '30px', marginBottom: '20px', fontSize: '1.2rem', color: 'var(--text-primary)' }}>
                            We help you implement:
                        </h4>

                        <div className="checklist-grid">
                            {checklist.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="checklist-item glass-box-light"
                                    ref={el => cardsRef.current[idx + 3] = el}
                                >
                                    <span className="checklist-icon">{item.icon}</span>
                                    <div className="checklist-text">
                                        <strong>{item.title}</strong>
                                        <span>{item.desc}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="page-cta">
                <div className="cta-container">
                    <h2>HIPAA Compliant Security</h2>
                    <p>Safeguard your facility against breaches and fines.</p>
                    <a href="/contact" className="btn-primary">Secure Your Practice</a>
                </div>
            </section>
        </PageLayout>
    )
}

export default MedicalDentalOffices

