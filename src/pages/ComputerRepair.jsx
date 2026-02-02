import { useEffect, useRef } from 'react'
import {
    Search,
    HardDrive,
    Wrench,
    Rocket,
    Disc,
    Bug
} from 'lucide-react'
import PageLayout from '../components/PageLayout/PageLayout'
import ServiceHero from '../components/ServiceHero/ServiceHero'
import './ServicePage.css'
import './ComputerRepair.css'

const ComputerRepair = () => {
    const imageLeftRef = useRef(null)
    const imageRightRef = useRef(null)

    useEffect(() => {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in')
                }
            })
        }, observerOptions)

        if (imageLeftRef.current) observer.observe(imageLeftRef.current)
        if (imageRightRef.current) observer.observe(imageRightRef.current)

        return () => observer.disconnect()
    }, [])

    const services = [
        { icon: <Search size={28} />, title: 'Diagnostics', desc: 'Comprehensive system analysis to identify issues' },
        { icon: <HardDrive size={28} />, title: 'Data Services', desc: 'Transfer, backup, import, setup, and recovery' },
        { icon: <Wrench size={28} />, title: 'Hardware Repairs', desc: 'Fixing physical components of Macs and PCs' },
        { icon: <Rocket size={28} />, title: 'Optimization', desc: 'System tuning for better performance' },
        { icon: <Disc size={28} />, title: 'OS Installation', desc: 'Operating system installation and repair' },
        { icon: <Bug size={28} />, title: 'Virus & Spyware', desc: 'Complete removal and cleanup (Spyware PC only)' },
    ]

    return (
        <PageLayout>
            <ServiceHero
                tag="COMPUTER REPAIR"
                title="Mac & PC"
                gradientText="Repair Services"
                description="Expert repair services for individuals and businesses. We partner with Malwarebytes to provide comprehensive protection against digital threats."
            />

            <section className="service-content">
                <div className="content-container">
                    <div className="content-block glass-box" style={{ gridColumn: 'span 2' }}>
                        <h3>Repair Services</h3>
                        <p>
                            At Select Tech Inc., we provide comprehensive solutions to meet all your digital security needs.
                            We offer Malwarebytes Premium partnerships for robust protection against malware, ransomware,
                            and phishing attempts.
                        </p>
                        <div className="service-cards">
                            {services.map((service, idx) => (
                                <div key={idx} className="service-card glass-box">
                                    <div className="icon">{service.icon}</div>
                                    <h4>{service.title}</h4>
                                    <p>{service.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="content-block glass-box">
                        <h3>On-Site Services</h3>
                        <p>
                            We perform on-site services in the convenience of your home or place of business.
                            We offer the same services as in-store repairs, plus additional on-site capabilities.
                        </p>
                        <ul className="feature-list" style={{ marginTop: '20px' }}>
                            <li>PC Delivery and Setup</li>
                            <li>Router and Wireless Installation</li>
                            <li>Basic Networking</li>
                            <li>Backup Solutions</li>
                            <li>On-Site Troubleshooting</li>
                        </ul>
                    </div>

                    <div className="content-block glass-box malwarebytes-block">
                        <h3>Malwarebytes Partnership</h3>
                        <p>
                            With the ever-increasing threat of cyberattacks, we have curated a range of options
                            in partnership with Malwarebytes.
                        </p>
                        <br />
                        <p>
                            <strong>Malwarebytes Premium:</strong> An all-in-one software designed to protect your personal devices.
                            Browse with confidence knowing you are protected against sophisticated threats.
                        </p>
                    </div>

                    {/* Service Note */}
                    <div className="content-block glass-box" style={{ gridColumn: '1 / -1' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '30px', flexWrap: 'wrap' }}>
                            <div style={{ flex: '1', minWidth: '300px' }}>
                                <img
                                    src="/senior_couple_it_support.png"
                                    alt="Senior couple receiving IT support"
                                    style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '12px' }}
                                />
                            </div>
                            <div style={{ flex: '1', minWidth: '300px' }}>
                                <h3>Personal & Business Services</h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '20px' }}>
                                    Whether you're a senior needing help with your home computer or a business requiring
                                    professional IT support, our experienced technicians are here to help.
                                </p>
                                <div className="service-note glass-box-light" style={{
                                    padding: '20px',
                                    borderLeft: '4px solid var(--accent-primary)',
                                    marginTop: '15px'
                                }}>
                                    <p style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>
                                        📋 Free estimates available.
                                    </p>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                                        Minimum service charge: $40
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Creative dual-image section with scroll animations */}
            <section className="repair-showcase">
                <div className="repair-showcase-content">
                    <h2 className="repair-title">
                        Expert <span className="gradient-text">Technicians</span>
                    </h2>
                    <p className="repair-subtitle">
                        Professional repair services with precision and care for all your devices
                    </p>
                </div>
                <div className="repair-images-wrapper">
                    <div
                        ref={imageLeftRef}
                        className="repair-image-card slide-from-left"
                    >
                        <div className="image-glow"></div>
                        <img
                            src="/unsplash-image-sMKUYIasyDM.webp"
                            alt="Computer repair workspace"
                        />
                        <div className="image-overlay">
                            <span>Professional Setup</span>
                        </div>
                    </div>
                    <div
                        ref={imageRightRef}
                        className="repair-image-card slide-from-right"
                    >
                        <div className="image-glow"></div>
                        <img
                            src="/computer_repair_generated.png"
                            alt="Tech repair in action"
                        />
                        <div className="image-overlay">
                            <span>Precision Repair</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="page-cta">
                <div className="cta-container">
                    <h2>Free Estimates Available</h2>
                    <p>If you don't see your problem listed, please contact us. We offer same-day service for many repairs!</p>
                    <a href="/contact" className="btn-primary">Schedule Repair</a>
                </div>
            </section>
        </PageLayout>
    )
}

export default ComputerRepair

