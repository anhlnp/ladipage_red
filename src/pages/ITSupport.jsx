import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
    Monitor,
    Shield,
    FileCheck,
    Smartphone,
    Phone,
    Headphones,
    Database,
    Cable,
    CheckCircle2,
    Star,
    Clock,
    TrendingUp,
    DollarSign
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
        {
            icon: <Monitor size={28} />,
            title: 'Proactive System Monitoring',
            features: ['Real-Time Alerts', 'Regular Maintenance', 'Performance Metrics', 'Root Cause Analysis', 'Growth/Capacity Planning']
        },
        {
            icon: <Shield size={28} />,
            title: 'Cybersecurity Services',
            features: ['Antivirus/EDR Management', 'Firewall Configuration', 'Security Awareness Training', 'MFA & Conditional Access', 'Vulnerability Scan/Pen Testing', 'Dark Web Awareness']
        },
        {
            icon: <FileCheck size={28} />,
            title: 'Compliance & Audits',
            features: ['HIPAA, PCI-DSS, FTC Safeguards', 'Auto Dealership Compliance', 'Policy Creation & Audits', 'Risk Assessments', 'WISP & NIST Documentation']
        },
        {
            icon: <Smartphone size={28} />,
            title: 'PC/MAC/Smartphone Repair',
            features: ['Screen Repairs/Replacements', 'Battery & Charging Issues', 'Virus & Malware Removal', 'Custom Gaming Rigs', 'Data Recovery & Backup']
        },
        {
            icon: <Phone size={28} />,
            title: 'VoIP/Unified Communications',
            features: ['Cloud Phone Systems (3CX, Zoom, Teams)', 'Call Flows & Auto Attendants', 'Voicemail-to-Email', 'Headset & Hardware Setup']
        },
        {
            icon: <Headphones size={28} />,
            title: 'On-site & Remote IT Support',
            features: ['Help Desk Support', '24/7 Monitoring', 'Rapid Response Times', 'Customizable Support Plans', 'Proactive Maintenance']
        },
        {
            icon: <Database size={28} />,
            title: 'Backup & Disaster Recovery',
            features: ['Local & Cloud Image-based Backups', 'Microsoft 365/Google Backup', 'Disaster Recovery Testing', 'Ransomware Protection & Rollback']
        },
        {
            icon: <Cable size={28} />,
            title: 'CAT5/6/7 & Fiber Installation',
            features: ['Network Racks/Infrastructure', 'NC Low Voltage License', 'Access Control & Alarm Systems', 'Full Office Audio/Messaging']
        }
    ]

    const pricingPlans = [
        {
            name: 'Office Protect / Basic',
            price: '$499',
            highlight: false,
            features: [
                { name: '24/7 Monitoring & Alerts', included: true },
                { name: 'Patch Management', included: true },
                { name: 'EDR / Huntress', value: 'Basic' },
                { name: 'DNS Filtering', included: false },
                { name: 'Firewall & Network Security', included: false },
                { name: 'Microsoft 365 Security', value: 'Basic' },
                { name: 'Backup & Recovery', included: false },
                { name: 'Asset Monitoring', included: true },
                { name: 'Cybersecurity Training', included: false },
                { name: 'Onsite Hours / Month', value: 'Remote' },
                { name: 'Incident Response', value: 'Emergency' }
            ]
        },
        {
            name: 'Silver Managed IT',
            price: '$899',
            highlight: true,
            features: [
                { name: '24/7 Monitoring & Alerts', included: true },
                { name: 'Patch Management', included: true },
                { name: 'EDR / Huntress', value: 'MDR' },
                { name: 'DNS Filtering', included: true },
                { name: 'Firewall & Network Security', included: true },
                { name: 'Microsoft 365 Security', value: 'Defender P1' },
                { name: 'Backup & Recovery', value: 'Local Backup' },
                { name: 'Asset Monitoring', included: true },
                { name: 'Cybersecurity Training', included: true },
                { name: 'Onsite Hours / Month', value: '2 hrs' },
                { name: 'Incident Response', value: 'Priority' }
            ]
        },
        {
            name: 'Gold MSSP Elite',
            price: '$1,499',
            highlight: false,
            features: [
                { name: '24/7 Monitoring & Alerts', included: true },
                { name: 'Patch Management', included: true },
                { name: 'EDR / Huntress', value: 'ITDR' },
                { name: 'DNS Filtering', included: true },
                { name: 'Firewall & Network Security', value: 'Advanced' },
                { name: 'Microsoft 365 Security', value: 'Defender P2 + DLP' },
                { name: 'Backup & Recovery', value: 'Axcient Cloud' },
                { name: 'Asset Monitoring', included: true },
                { name: 'Cybersecurity Training', value: 'AI-Driven' },
                { name: 'Onsite Hours / Month', value: '4 hrs' },
                { name: 'Incident Response', value: '24/7' }
            ]
        }
    ]

    const testimonials = [
        {
            quote: "Select Tech has been supporting us since 2012. We have received A+ service from everyone in their team. Chris has been a delight to handle all of our PCs and servers. Dave, the owner has built a great team that genuinely cares about their customers. Give them 10 out of 10.",
            author: "Shelly M.",
            title: "Managed IT Support"
        },
        {
            quote: "Michael was awesome. He confirmed it was a phishing attempt and his team updated the DMARC records in our email. Select Tech switched us to a managed IT plan to better protect us and save us money. Five Stars guys - Thank you.",
            author: "Wayne R.",
            title: "Phishing Email Protection"
        },
        {
            quote: "Our outside sales rep needed a laptop and iPad repaired when he was in town for the weekend and dropped it off at your Hickory, NC office. Both items were repaired the same day. That's awesome.",
            author: "CEO",
            title: "Fast Laptop and iPad Repair"
        }
    ]

    const whyChooseUs = [
        '#1 Ranked IT Security Provider in Hickory, NC',
        'Certified Ethical Hackers On Staff',
        'Veteran-Owned, 20+ Years Experience',
        'Local Support + National-Level Cybersecurity Stack'
    ]

    return (
        <PageLayout>
            <ServiceHero
                tag="MANAGED IT SERVICES"
                title="Managed IT Services in"
                gradientText="North Carolina"
                description="Trusted IT Support for 23+ Years. All work 100% satisfaction guaranteed. We deliver fast, reliable IT support to protect your business and staff."
            />

            <section className="service-content">
                <div className="content-container">
                    {/* Key Benefits - Full Width */}
                    <div className="content-block glass-box" style={{ gridColumn: '1 / -1' }}>
                        <div className="benefits-grid">
                            <div className="benefit-item">
                                <Clock size={48} className="benefit-icon" />
                                <h4>Reduce Downtime</h4>
                                <p>24/7 monitoring and rapid response keeps your systems running smoothly</p>
                            </div>
                            <div className="benefit-item">
                                <TrendingUp size={48} className="benefit-icon" />
                                <h4>Grow Your Business</h4>
                                <p>Focus on what you do best while we handle all your IT needs</p>
                            </div>
                            <div className="benefit-item">
                                <DollarSign size={48} className="benefit-icon" />
                                <h4>Control Costs</h4>
                                <p>Predictable monthly pricing with no surprise fees or hidden charges</p>
                            </div>
                        </div>
                        <div className="tagline-box">
                            <p className="tagline">Stay with us because you're happy - not because you're locked in</p>
                            <div className="trust-badges">
                                <span>✓ No Long-Term Contracts</span>
                                <span>✓ 100% Satisfaction Guaranteed</span>
                                <span>✓ 23+ Years Trusted Service</span>
                            </div>
                        </div>
                    </div>


                    {/* Section Title - Services */}
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', marginTop: '40px' }}>
                        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.2rem)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
                            Services We Provide
                        </h2>
                        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
                            Managed IT Services to Hickory, NC & Surrounding Areas
                        </p>
                    </div>

                    {/* Services Grid - 8 Cards */}
                    {services.map((service, idx) => (
                        <div key={idx} className="content-block glass-box service-item">
                            <div className="service-icon-wrapper">
                                {service.icon}
                            </div>
                            <h3>{service.title}</h3>
                            <ul className="feature-list compact">
                                {service.features.map((feature, fidx) => (
                                    <li key={fidx}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Full-width image banner */}
                    <div className="image-banner" style={{ gridColumn: '1 / -1' }}>
                        <img
                            src="/pexels-cookiecutter-19226354.jpg"
                            alt="IT Support Team"
                        />
                        <div className="image-banner-overlay">
                            <h3 className="gradient-text">Professional IT Support You Can Trust</h3>
                            <p>Serving businesses across North Carolina</p>
                        </div>
                    </div>

                    {/* Why Choose Us */}
                    <div className="content-block glass-box" style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
                        <h3>Why Choose Select Tech?</h3>
                        <ul className="why-choose-list">
                            {whyChooseUs.map((item, idx) => (
                                <li key={idx}><CheckCircle2 size={20} /> {item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="pricing-section">
                <div className="pricing-container">
                    <div className="pricing-header">
                        <span className="section-tag">MSSP Services & Pricing</span>
                        <h2>Choose Your Protection Plan</h2>
                        <p>Your Trusted Local Cybersecurity & Compliance Experts</p>
                    </div>
                    <div className="pricing-cards">
                        {pricingPlans.map((plan, idx) => (
                            <div key={idx} className={`pricing-card glass-box ${plan.highlight ? 'highlighted' : ''}`}>
                                {plan.highlight && <span className="popular-badge">Most Popular</span>}
                                <h3>{plan.name}</h3>
                                <div className="price">
                                    <span className="amount">{plan.price}</span>
                                    <span className="period">/month</span>
                                </div>
                                <ul className="pricing-features">
                                    {plan.features.map((feature, fidx) => (
                                        <li key={fidx}>
                                            {feature.included === true ? (
                                                <><CheckCircle2 size={16} className="check" /> {feature.name}</>
                                            ) : feature.included === false ? (
                                                <><span className="x">✘</span> {feature.name}</>
                                            ) : (
                                                <><CheckCircle2 size={16} className="check" /> {feature.name}: <strong>{feature.value}</strong></>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                                <Link to="/contact" className="btn-primary">Get Started</Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Add-Ons Section */}
            <section className="addons-section">
                <div className="addons-container">
                    <div className="addons-header">
                        <h2>Add-Ons & Enhancements</h2>
                        <p>Customize your IT support package with these premium add-ons</p>
                    </div>
                    <div className="addons-list glass-box">
                        <div className="addon-row">
                            <div className="addon-info">
                                <FileCheck size={20} />
                                <span>HIPAA & FTC Compliance Toolkit</span>
                            </div>
                            <span className="addon-price">$199<small>/mo</small></span>
                        </div>
                        <div className="addon-row">
                            <div className="addon-info">
                                <FileCheck size={20} />
                                <span>Onsite Compliance Audit</span>
                            </div>
                            <span className="addon-price">$799<small> one-time</small></span>
                        </div>
                        <div className="addon-row">
                            <div className="addon-info">
                                <Database size={20} />
                                <span>Disaster Recovery Appliance</span>
                            </div>
                            <span className="addon-price">Starting at $1,299</span>
                        </div>
                        <div className="addon-row">
                            <div className="addon-info">
                                <Shield size={20} />
                                <span>Advanced Endpoint Response Team</span>
                            </div>
                            <span className="addon-price accent">Custom Quote</span>
                        </div>
                        <div className="addon-row">
                            <div className="addon-info">
                                <Monitor size={20} />
                                <span>Workforce Security Training Portal</span>
                            </div>
                            <span className="addon-price">$99<small>/mo</small></span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="page-cta">
                <div className="cta-container">
                    <h2>Schedule a Free Cybersecurity Assessment</h2>
                    <p>Contact Select Tech today to protect your business with trusted, local IT support.</p>
                    <Link to="/contact" className="btn-primary">Contact Us</Link>
                </div>
            </section>
        </PageLayout>
    )
}

export default ITSupport
