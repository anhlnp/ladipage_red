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

    const pricingTiers = [
        {
            name: 'Office Protect Essentials',
            price: '$55',
            perUnit: '/endpoint/month',
            highlight: false,
            features: [
                { name: 'Device Monitoring & Alerts', included: true },
                { name: 'Endpoint Protection (Webroot/Bitdefender)', included: true },
                { name: 'Managed Next-Gen Antivirus', included: true },
                { name: 'Windows Security Updates', included: true },
                { name: '24/7 Network Monitoring', included: true },
                { name: 'Firewall Logs Archived', included: true },
                { name: 'Remote Login Access', included: true },
                { name: 'MDR/Identity Protection', included: false },
                { name: 'On-site support hours', included: false },
            ]
        },
        {
            name: 'Professional Healthcare IT',
            price: '$75',
            perUnit: '/endpoint/month',
            highlight: true,
            features: [
                { name: 'All Office Protect features', included: true },
                { name: 'Managed Detection & Response (MDR)', value: '$6/user' },
                { name: 'Identity Threat Detection', value: '$3/user' },
                { name: 'HIPAA Compliance Tools', included: true },
                { name: 'Cybersecurity Awareness Training', included: true },
                { name: '2 hrs On-site Support/month', included: true },
                { name: 'Microsoft 365 Management', included: true },
                { name: 'Priority Phone & Email Support', included: true },
            ]
        },
        {
            name: 'Enterprise Healthcare',
            price: '$110',
            perUnit: '/endpoint/month',
            highlight: false,
            features: [
                { name: 'All Professional features', included: true },
                { name: '24/7 SOC Monitoring & Support', included: true },
                { name: 'Advanced ITDR Protection', included: true },
                { name: 'Human-Led Threat Hunting', included: true },
                { name: 'Unlimited On-site Visits', included: true },
                { name: 'Complete HIPAA Audit & Docs', included: true },
                { name: 'Cloud Backup & Disaster Recovery', included: true },
                { name: 'Dedicated Account Manager', included: true },
            ]
        }
    ]

    const addOns = [
        { name: 'Server Data Backup/Recovery (x360 Recover)', price: '$119', unit: '/month' },
        { name: 'Desktop Cloud Backup (Axcient Cloudfinder)', price: '$13', unit: '/PC/month' },
        { name: 'Microsoft 365 Email Backup', price: '$3', unit: '/email/month' },
        { name: 'Managed Detection & Response (MDR)', price: '$6', unit: '/user/month' },
        { name: 'Identity Threat Detection & Response', price: '$3', unit: '/user/month' },
        { name: 'Axcient 8TB Data Recovery Server', price: '$999', unit: ' one-time', note: '(Reg. $1,299)' },
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
                    <div className="pricing-cards">
                        {pricingTiers.map((plan, idx) => (
                            <div
                                key={idx}
                                className={`pricing-card glass-box ${plan.highlight ? 'highlighted' : ''}`}
                                ref={el => cardsRef.current[idx + services.length] = el}
                            >
                                {plan.highlight && <span className="popular-badge">Most Popular</span>}
                                <h3>{plan.name}</h3>
                                <div className="price">
                                    <span className="amount">{plan.price}</span>
                                    <span className="period">{plan.perUnit}</span>
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
                                <span className="addon-price">
                                    {addon.price}<small>{addon.unit}</small>
                                    {addon.note && <em> {addon.note}</em>}
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
