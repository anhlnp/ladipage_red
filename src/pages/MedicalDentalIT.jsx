import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
    Monitor,
    Shield,
    Headphones,
    Server,
    Database,
    Clock,
    Wifi,
    Users,
    CheckCircle2,
    Stethoscope,
    FileCheck,
    Lock
} from 'lucide-react'
import PageLayout from '../components/PageLayout/PageLayout'
import ServiceHero from '../components/ServiceHero/ServiceHero'
import './ServicePage.css'
import './MedicalDentalIT.css'

const MedicalDentalIT = () => {
    const cardsRef = useRef([])

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('reveal')
                    }, index * 100)
                }
            })
        }, { threshold: 0.1 })

        cardsRef.current.forEach(card => {
            if (card) observer.observe(card)
        })

        return () => observer.disconnect()
    }, [])

    const planLevels = [
        {
            level: 'Office Protect Essentials',
            badge: 'ESSENTIALS',
            subtitle: 'Core Protection for Healthcare Practices',
            features: [
                { name: 'Device Monitoring & Alerts', included: true },
                { name: 'Endpoint Protection (Webroot/Bitdefender)', included: true },
                { name: 'Managed Next-Gen Antivirus', included: true },
                { name: 'Windows Security Updates', included: true },
                { name: '24/7 Network Monitoring', included: true },
                { name: 'Firewall Logs Archived', included: true },
                { name: 'Remote Login Access', included: true },
                { name: 'Support: 2 hrs Remote/Month', included: true },
            ],
            tiers: [
                { price: '$399', period: '/mo', workstations: 5, note: 'Workstations' },
            ]
        },
        {
            level: 'Professional Healthcare IT',
            badge: 'PROFESSIONAL',
            subtitle: 'HIPAA-Ready Managed IT & Security',
            features: [
                { name: 'All Office Protect features', included: true },
                { name: 'Managed Detection & Response (MDR)', included: true },
                { name: 'Identity Threat Detection', included: true },
                { name: 'HIPAA Compliance Tools', included: true },
                { name: 'Cybersecurity Awareness Training', included: true },
                { name: 'Microsoft 365 Management', included: true },
                { name: 'Priority Phone & Email Support', included: true },
                { name: 'Support: 2 hrs On-site & Remote/Month', included: true },
            ],
            tiers: [
                { price: '$599', period: '/mo', workstations: 5, note: 'Workstations' },
                { price: '$999', period: '/mo', workstations: 10, note: 'Workstations' },
                { price: '$1,399', period: '/mo', workstations: 15, note: 'Workstations' },
            ]
        },
        {
            level: 'Enterprise Healthcare',
            badge: 'ENTERPRISE',
            subtitle: 'Full-Stack Healthcare IT & Compliance',
            features: [
                { name: 'All Professional features', included: true },
                { name: '24/7 SOC Monitoring & Support', included: true },
                { name: 'Advanced ITDR Protection', included: true },
                { name: 'Human-Led Threat Hunting', included: true },
                { name: 'Unlimited On-site & Remote Support', included: true },
                { name: 'Complete HIPAA Audit & Documentation', included: true },
                { name: 'Server Cloud Backup & Disaster Recovery', included: true },
                { name: 'Dedicated Account Manager', included: true },
            ],
            tiers: [
                { price: '$749', period: '/mo', workstations: 5, note: 'Workstations' },
                { price: '$1,299', period: '/mo', workstations: 10, note: 'Workstations' },
                { price: '$1,799', period: '/mo', workstations: 15, note: 'Workstations' },
                { price: '$2,199', period: '/mo', workstations: 20, note: 'Workstations (price is less if under 20)' },
            ]
        }
    ]

    const addOns = [
        { name: 'PC Cloud Backup', price: '$13', unit: '/device/month', desc: 'Encrypted off-site cloud backup for workstations' },
        { name: 'Cloud Server Backup', price: '$129', unit: '/server/month', desc: 'Secure cloud backup for physical or virtual servers' },
        { name: 'Microsoft 365 Outlook Protection', price: '$3.50', unit: '/user/month', desc: 'Enhanced Outlook email protection' },
        { name: 'Managed Detection & Response (MDR)', price: '$6', unit: '/user/month', desc: 'Human-led threat hunting & analysis' },
        { name: 'Identity Threat Detection & Response', price: '$3', unit: '/user/month', desc: 'Credential theft & BEC protection' },
    ]

    const supportRates = [
        { type: 'On-Site Support (Weekday)', standard: '$140/hr', discounted: '$120/hr', hours: 'Mon–Fri, 8:30 AM–6:00 PM' },
        { type: 'On-Site Support (Afterhours)', standard: '$180/hr', discounted: '$180/hr', hours: 'Evenings, Weekends, Holidays' },
        { type: 'Remote Support (Weekday)', standard: '$95/hr', discounted: '$85/hr', hours: 'Mon–Fri, 8:30 AM–6:00 PM' },
        { type: 'Remote Support (Afterhours)', standard: '$180/hr', discounted: '$140/hr', hours: 'Evenings, Weekends, Holidays' },
    ]

    const services = [
        { icon: <Monitor size={28} />, title: 'Workstation Management', desc: 'Complete desktop and laptop support' },
        { icon: <Server size={28} />, title: 'Server Administration', desc: 'Medical server maintenance & monitoring' },
        { icon: <Database size={28} />, title: 'EHR/EMR Support', desc: 'Integration with practice management systems' },
        { icon: <Wifi size={28} />, title: 'Network Infrastructure', desc: 'Secure, HIPAA-compliant networking' },
        { icon: <Shield size={28} />, title: 'Cybersecurity', desc: 'Advanced threat protection & monitoring' },
        { icon: <Headphones size={28} />, title: 'Help Desk', desc: 'Rapid response technical support' },
    ]

    const whyChoose = [
        'HIPAA Compliant IT Solutions',
        '23+ Years Healthcare IT Experience',
        'EHR/EMR Integration Specialists',
        'Local North Carolina Support Team',
        'No Long-Term Contracts Required',
        '100% Satisfaction Guaranteed'
    ]

    return (
        <PageLayout>
            <ServiceHero
                tag="HEALTHCARE IT"
                title="Medical & Dental"
                gradientText="IT Support"
                description="Specialized IT solutions for healthcare practices. HIPAA-compliant managed services designed specifically for medical and dental offices in North Carolina."
            />

            {/* NC Header Section */}
            <section className="nc-header-section">
                <div className="nc-header-container">
                    <div className="nc-badge">
                        <Stethoscope size={24} />
                        <span>Serving North Carolina Healthcare</span>
                    </div>
                    <h2>
                        Medical & Dental IT Support in <span className="gradient-text">North Carolina</span>
                    </h2>
                    <p>
                        From Hickory to Charlotte, we provide comprehensive IT services tailored for healthcare providers.
                        Our team understands the unique challenges of medical and dental IT environments.
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="medical-services-section">
                <div className="services-container">
                    <h3>Comprehensive IT Services for Healthcare</h3>
                    <div className="services-grid">
                        {services.map((service, idx) => (
                            <div
                                key={idx}
                                className="service-item glass-box"
                                ref={el => cardsRef.current[idx] = el}
                            >
                                <div className="service-icon">{service.icon}</div>
                                <div className="service-text">
                                    <h4>{service.title}</h4>
                                    <p>{service.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="medical-pricing-section">
                <div className="pricing-container">
                    <div className="pricing-header">
                        <span className="section-tag">Endpoint Support Pricing</span>
                        <h2>Healthcare IT Support Plans</h2>
                        <p>Flexible per-endpoint pricing designed for medical and dental practices</p>
                    </div>
                    <div className="dh-plan-cards">
                        {planLevels.map((plan, idx) => (
                            <div key={idx} className="dh-plan-card">
                                <span className="dh-plan-badge">{plan.badge}</span>
                                <div className="dh-plan-features">
                                    <h3>{plan.level}</h3>
                                    <p className="plan-subtitle">{plan.subtitle}</p>
                                    <ul className="dh-feature-list">
                                        {plan.features.map((feature, fidx) => (
                                            <li key={fidx}>
                                                {feature.included ? (
                                                    <CheckCircle2 size={20} className="check-icon" />
                                                ) : (
                                                    <span className="x-icon">✘</span>
                                                )}
                                                <span>{feature.name}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Link to="/contact" className="dh-plan-cta">Get In Touch</Link>
                                </div>
                                <div className="dh-plan-tiers">
                                    {plan.tiers.map((tier, tidx) => (
                                        <div key={tidx} className="dh-tier">
                                            <div className="dh-tier-price">
                                                {tier.price}<small>{tier.period}</small>
                                            </div>
                                            <div className="dh-tier-info">
                                                <div className="dh-ws-badge">{tier.workstations}</div>
                                                <span className="dh-ws-label">{tier.note}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="pricing-note">
                        Minimum 5 endpoints. Custom pricing available for larger practices.
                    </p>
                </div>
            </section>

            {/* Add-Ons Section */}
            <section className="addons-section">
                <div className="addons-container">
                    <div className="addons-header">
                        <h2>Backup & Security Add-Ons</h2>
                        <p>Customize your healthcare IT support with these premium add-ons</p>
                    </div>
                    <div className="addons-grid">
                        {addOns.map((addon, idx) => (
                            <div key={idx} className="addon-item glass-box">
                                <span className="addon-name">{addon.name}</span>
                                {addon.desc && <small style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '4px' }}>{addon.desc}</small>}
                                <span className="addon-price">
                                    {addon.price}<small>{addon.unit}</small>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Support Rates Section */}
            <section className="support-rates-section">
                <div className="rates-container">
                    <div className="rates-header">
                        <h2>Additional Support Rates</h2>
                        <p>Discounted rates for managed service clients</p>
                    </div>
                    <div className="rates-table glass-box">
                        <div className="rates-row header">
                            <span>Service Type</span>
                            <span>Standard Rate</span>
                            <span>Your Rate</span>
                            <span>Availability</span>
                        </div>
                        {supportRates.map((rate, idx) => (
                            <div key={idx} className="rates-row">
                                <span>{rate.type}</span>
                                <span className="strikethrough">{rate.standard}</span>
                                <span className="discounted">{rate.discounted}</span>
                                <span className="hours">{rate.hours}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* HIPAA Compliance */}
            <section className="hipaa-section">
                <div className="hipaa-container glass-box">
                    <div className="hipaa-content">
                        <div className="hipaa-icon">
                            <Lock size={48} />
                        </div>
                        <div className="hipaa-text">
                            <h3>HIPAA Compliance Built-In</h3>
                            <p>
                                All our healthcare IT solutions are designed with HIPAA compliance in mind.
                                From encrypted communications to secure data handling, we help you protect
                                patient data and avoid costly penalties.
                            </p>
                            <div className="compliance-badges">
                                <span className="badge"><FileCheck size={16} /> Risk Assessments</span>
                                <span className="badge"><Shield size={16} /> Data Encryption</span>
                                <span className="badge"><Users size={16} /> Staff Training</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="service-content">
                <div className="content-container">
                    <div className="content-block glass-box" style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
                        <h3>Why Choose Select Tech for Healthcare IT?</h3>
                        <ul className="why-choose-list">
                            {whyChoose.map((item, idx) => (
                                <li key={idx}><CheckCircle2 size={20} /> {item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <section className="page-cta">
                <div className="cta-container">
                    <h2>Schedule a Free IT Assessment</h2>
                    <p>Let us evaluate your practice's IT needs and create a customized support plan.</p>
                    <Link to="/contact" className="btn-primary">Contact Us Today</Link>
                </div>
            </section>
        </PageLayout>
    )
}

export default MedicalDentalIT
