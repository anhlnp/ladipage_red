import { useEffect, useRef } from 'react'
import {
    HardDrive,
    Rocket,
    Globe,
    Shield,
    Wrench,
    Cloud,
    HeartPulse,
    Smartphone
} from 'lucide-react'
import PageLayout from '../components/PageLayout/PageLayout'
import ServiceHero from '../components/ServiceHero/ServiceHero'
import './ServicePage.css'
import './ITSupport.css'

const ITSupport = () => {
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
        { icon: <HardDrive size={28} />, title: 'Backup & Disaster Recovery', desc: 'Secure solutions to protect your critical business data' },
        { icon: <Rocket size={28} />, title: 'Network Performance', desc: 'Cleanup and optimization for maximum speed and reliability' },
        { icon: <Globe size={28} />, title: 'Internet & Intranet', desc: 'Setup and support for your internal and external connectivity' },
        { icon: <Shield size={28} />, title: 'Virus & Spyware Removal', desc: 'Detection, removal, and prevention of malicious software' },
        { icon: <Wrench size={28} />, title: 'Hardware & Software', desc: 'Repair, installation, and upgrades for all your systems' },
        { icon: <Cloud size={28} />, title: 'Cloud Services', desc: 'Office 365, Hosted Desktop, Exchange, and SharePoint solutions' },
        { icon: <HeartPulse size={28} />, title: 'Medical/Dental IT', desc: 'Specialized EHR rollout and support specialists' },
        { icon: <Smartphone size={28} />, title: 'Infrastructure', desc: 'Cabling, VOIP, and network installation services' },
    ]

    const features = [
        { title: 'Cost-Effective Support', desc: 'No contract obligation ticketed system or agreed terms. Charged in 30-minute increments.' },
        { title: 'High Standard Service', desc: 'Ad-hoc clients receive the same high-level support as contracted clients.' },
        { title: 'Emergency Services', desc: 'Emergency IT support and consultation available to all customers.' },
        { title: 'Expert Team', desc: 'Invested in your success with 15+ years of experience in North Carolina.' },
    ]

    return (
        <PageLayout>
            <ServiceHero
                tag="IT SUPPORT"
                title="Professional"
                gradientText="IT Services"
                description="We are your local IT support company invested in your success. Committed to keeping your PCs and servers up and running with practical solutions."
            />

            <section className="service-content">
                <div className="content-container">
                    <div className="content-block glass-box" style={{ gridColumn: 'span 2' }}>
                        <h3>Comprehensive IT Services</h3>
                        <p>
                            Select Tech has over 15 years of experience providing IT support in North Carolina.
                            Our IT Department takes complete responsibility for your network, managing all day-to-day
                            IT-related tasks allowing you to concentrate on your business.
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
                        <h3>Pay-As-You-Go Support</h3>
                        <p>
                            We offer flexible support with no contract obligation. You can pay for support using
                            our 'ticketed' prepayment system or agreed terms.
                        </p>
                        <ul className="feature-list" style={{ marginTop: '20px' }}>
                            {features.map((feature, idx) => (
                                <li key={idx} style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
                                    <strong style={{ color: 'var(--text-primary)' }}>{feature.title}</strong>
                                    <span style={{ fontSize: '0.9rem' }}>{feature.desc}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="content-block glass-box why-choose-block">
                        <h3>Why Choose Select Tech?</h3>
                        <p>
                            We make the transition easy! We fully manage the transfer of services from your existing IT supplier.
                            A recent audit showed our support costs saved customers over 24% compared to others.
                        </p>
                        <br />
                        <p>
                            We are not a one-man show. We offer a team approach of technicians supporting your business.
                            Most service calls are performed on the same or next day.
                        </p>
                    </div>
                </div>
            </section>

            {/* Creative dual-image section with scroll animations */}
            <section className="team-showcase">
                <div className="team-showcase-content">
                    <h2 className="team-title">
                        Our Team is <span className="gradient-text">Your Team</span>
                    </h2>
                    <p className="team-subtitle">
                        A dedicated team of IT professionals celebrating every success with you
                    </p>
                </div>
                <div className="team-images-wrapper">
                    <div
                        ref={imageLeftRef}
                        className="team-image-card slide-from-left"
                    >
                        <div className="image-glow"></div>
                        <img
                            src="/business+people+high+five.webp"
                            alt="Business team high five"
                        />
                        <div className="image-overlay">
                            <span>Success Together</span>
                        </div>
                    </div>
                    <div
                        ref={imageRightRef}
                        className="team-image-card slide-from-right"
                    >
                        <div className="image-glow"></div>
                        <img
                            src="/business_high_five_generated.png"
                            alt="Team collaboration celebration"
                        />
                        <div className="image-overlay">
                            <span>Celebrate Wins</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="page-cta">
                <div className="cta-container">
                    <h2>Need IT Help Today?</h2>
                    <p>Contact us for a consultation. We can help with phone repair, cabling, VOIP, and network infrastructure too.</p>
                    <a href="/contact" className="btn-primary">Get Support</a>
                </div>
            </section>
        </PageLayout>
    )
}

export default ITSupport
