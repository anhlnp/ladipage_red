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
import './ManagedITServices.css'

const ManagedITServices = () => {
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

    const planLevels = [
        {
            level: 'Office Protect',
            badge: 'ESSENTIALS',
            subtitle: 'Basic Protection for Small Offices',
            features: [
                { name: '24/7 Monitoring & Alerts', included: true },
                { name: 'Patch Management', included: true },
                { name: 'EDR / Huntress: Basic', included: true },
                { name: 'Asset Monitoring', included: true },
                { name: 'Support: 2 hrs Remote/Month', included: true },
                { name: 'Emergency Incident Response', included: true },
            ],
            tiers: [
                { price: '$399', period: '/mo', workstations: 5, note: 'Workstations' },
            ]
        },
        {
            level: 'Managed IT & Cybersecurity',
            badge: 'MOST POPULAR',
            subtitle: 'Comprehensive Managed IT & Security',
            features: [
                { name: '24/7 Monitoring & Alerts', included: true },
                { name: 'Patch Management', included: true },
                { name: 'EDR / Huntress: MDR', included: true },
                { name: 'DNS Filtering', included: true },
                { name: 'Firewall & Network Security', included: true },
                { name: 'Microsoft 365 Security: Defender P1', included: true },
                { name: 'Server & Workstation Cloud Backup', included: true },
                { name: 'SOC / Threat Hunting', included: true },
                { name: 'Cybersecurity Training', included: true },
                { name: 'Support: 1.5 hrs On-site & Remote/Month', included: true },
                { name: 'Priority Incident Response', included: true },
                { name: 'Dedicated Account Manager', included: true },
            ],
            tiers: [
                { price: '$499', period: '/mo', workstations: 5, note: 'Workstations (New Customer Special)' },
                { price: '$699', period: '/mo', workstations: 5, note: 'Standard Pricing' },
            ]
        },
        {
            level: 'Gold MSSP Elite',
            badge: 'GOLD LEVEL',
            subtitle: 'Enterprise-Grade Security & Compliance',
            features: [
                { name: '24/7 Monitoring & Alerts', included: true },
                { name: 'Patch Management', included: true },
                { name: 'EDR / Huntress: ITDR', included: true },
                { name: 'DNS Filtering', included: true },
                { name: 'Advanced Firewall & Network Security', included: true },
                { name: 'Microsoft 365 Security: Defender P2 + DLP', included: true },
                { name: 'Backup & Recovery: Server Cloud Backup', included: true },
                { name: 'Asset Monitoring', included: true },
                { name: 'AI-Driven Cybersecurity Training', included: true },
                { name: 'Unlimited Remote & On-site Support', included: true },
                { name: '24/7 Incident Response', included: true },
            ],
            tiers: [
                { price: '$749', period: '/mo', workstations: 5, note: 'Workstations' },
                { price: '$1,299', period: '/mo', workstations: 10, note: 'Workstations' },
                { price: '$1,799', period: '/mo', workstations: 15, note: 'Workstations' },
                { price: '$2,199', period: '/mo', workstations: 20, note: 'Workstations (price is less if under 20)' },
            ]
        }
    ]

    const supportRates = [
        { type: 'On-Site Support (Weekday)', standard: '$140/hr', discounted: '$120/hr', hours: 'Mon–Fri, 8:30 AM–6:00 PM' },
        { type: 'Remote Support (Weekday)', standard: '$95/hr', discounted: '$85/hr', hours: 'Mon–Fri, 8:30 AM–6:00 PM' },
        { type: 'After-Hours / Emergency', standard: 'Custom Quote', discounted: 'Custom Quote', hours: 'Evenings, Weekends, Holidays' },
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
                    <p className="pricing-note">All plans include a 5-workstation minimum. Contact us for custom enterprise pricing.</p>
                </div>
            </section>

            {/* Optional Add-On Services */}
            <section className="addons-section">
                <div className="addons-container" style={{ maxWidth: '1000px' }}>
                    <div className="addons-header">
                        <h2>Optional Add-On Services</h2>
                        <p>The following services may be added to any Select Tech Managed IT or MSSP plan.</p>
                    </div>

                    {/* Backup & Data Protection */}
                    <h3 style={{ color: 'var(--accent-primary)', fontSize: '1.15rem', marginBottom: '16px', marginTop: '8px' }}>Backup & Data Protection</h3>
                    <div className="addons-list glass-box" style={{ marginBottom: '32px' }}>
                        <div className="addon-row">
                            <div className="addon-info">
                                <Database size={20} />
                                <div>
                                    <span>PC Cloud Backup</span>
                                    <small style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem' }}>Encrypted off-site cloud backup for workstations</small>
                                </div>
                            </div>
                            <span className="addon-price">$13<small>/device/mo</small></span>
                        </div>
                        <div className="addon-row">
                            <div className="addon-info">
                                <Database size={20} />
                                <div>
                                    <span>Cloud Server Backup</span>
                                    <small style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem' }}>Secure cloud backup for physical or virtual servers</small>
                                </div>
                            </div>
                            <span className="addon-price">$129<small>/server/mo</small></span>
                        </div>
                    </div>

                    {/* Microsoft 365 Protection */}
                    <h3 style={{ color: 'var(--accent-primary)', fontSize: '1.15rem', marginBottom: '16px' }}>Microsoft 365 Protection</h3>
                    <div className="addons-list glass-box" style={{ marginBottom: '32px' }}>
                        <div className="addon-row">
                            <div className="addon-info">
                                <Shield size={20} />
                                <div>
                                    <span>Microsoft 365 Outlook Protection</span>
                                    <small style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem' }}>Enhanced Outlook email protection</small>
                                </div>
                            </div>
                            <span className="addon-price">$3.50<small>/user/mo</small></span>
                        </div>
                        <div className="addon-row">
                            <div className="addon-info">
                                <Monitor size={20} />
                                <div>
                                    <span>Customer-Managed Microsoft 365 Plan</span>
                                    <small style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem' }}>Licensing and tenant owned by customer</small>
                                </div>
                            </div>
                            <span className="addon-price" style={{ color: 'var(--text-secondary)' }}>Customer Provided</span>
                        </div>
                    </div>

                    {/* Identity Threat Detection */}
                    <h3 style={{ color: 'var(--accent-primary)', fontSize: '1.15rem', marginBottom: '16px' }}>Identity Threat Detection & Response (ITDR)</h3>
                    <div className="addons-list glass-box">
                        <div className="addon-row">
                            <div className="addon-info">
                                <Shield size={20} />
                                <div>
                                    <span>Advanced Identity Protection</span>
                                    <small style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem', maxWidth: '400px' }}>Helps prevent Business Email Compromise (BEC), credential theft, and unauthorized logins</small>
                                </div>
                            </div>
                            <span className="addon-price accent">Contact Us</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Support Rates Section */}
            <section className="support-rates-section">
                <div className="rates-container">
                    <div className="rates-header">
                        <h2>Additional Support Rates</h2>
                        <p>Preferential rates for managed service clients beyond included hours</p>
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
                                <span data-label="Service Type">{rate.type}</span>
                                <span className="strikethrough" data-label="Standard Rate">{rate.standard}</span>
                                <span className="discounted" data-label="Your Rate">{rate.discounted}</span>
                                <span className="hours" data-label="Availability">{rate.hours}</span>
                            </div>
                        ))}
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

export default ManagedITServices
