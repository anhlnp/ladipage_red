import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
    Car,
    ShieldCheck,
    Server,
    Wifi,
    Monitor,
    Lock,
    FileCheck,
    Users,
    Headphones,
    CheckCircle,
    ArrowRight,
    Clock,
    Award,
    Zap,
    Globe,
    Database,
    Cloud,
    Settings,
    AlertTriangle,
    ClipboardCheck
} from 'lucide-react'
import PageLayout from '../components/PageLayout/PageLayout'
import './DealershipServices.css'

const DealershipServices = () => {
    const cardsRef = useRef([])

    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal')
                }
            })
        }, observerOptions)

        cardsRef.current.forEach(card => {
            if (card) observer.observe(card)
        })

        return () => observer.disconnect()
    }, [])

    const whatWeDo = [
        {
            icon: <ShieldCheck size={28} />,
            title: "FTC Compliance Management",
            description: "Complete FTC Safeguards Rule compliance including risk assessments, policy development, and ongoing monitoring."
        },
        {
            icon: <Server size={28} />,
            title: "Managed IT Services",
            description: "24/7 proactive monitoring, maintenance, and support for all your dealership technology needs."
        },
        {
            icon: <Wifi size={28} />,
            title: "Secure Network Infrastructure",
            description: "Enterprise-grade networking with VPN, firewall protection, and segmented networks for PCI compliance."
        },
        {
            icon: <Monitor size={28} />,
            title: "DMS Integration & Support",
            description: "Seamless integration with major Dealer Management Systems including CDK, Reynolds, and Dealertrack."
        },
        {
            icon: <Cloud size={28} />,
            title: "Cloud Solutions",
            description: "Secure cloud backup, disaster recovery, and Microsoft 365 management tailored for dealerships."
        },
        {
            icon: <Users size={28} />,
            title: "Security Awareness Training",
            description: "Comprehensive employee training programs to protect against phishing and social engineering attacks."
        }
    ]

    const services = [
        { icon: <Lock size={28} />, title: "Cybersecurity", description: "Multi-layer protection" },
        { icon: <Server size={28} />, title: "Server Management", description: "24/7 monitoring" },
        { icon: <Wifi size={28} />, title: "Network Setup", description: "Enterprise WiFi" },
        { icon: <Monitor size={28} />, title: "Workstation Support", description: "Desktop & laptop" },
        { icon: <Database size={28} />, title: "Data Backup", description: "Automated & secure" },
        { icon: <Headphones size={28} />, title: "Help Desk", description: "Quick response" },
        { icon: <Globe size={28} />, title: "VPN Services", description: "Secure remote access" },
        { icon: <Settings size={28} />, title: "DMS Support", description: "Full integration" },
        { icon: <FileCheck size={28} />, title: "Compliance Audit", description: "Regular assessments" }
    ]

    const ftcRequirements = [
        {
            title: "Written Information Security Program",
            description: "Comprehensive documentation of your security policies and procedures."
        },
        {
            title: "Designated Qualified Individual",
            description: "A designated person responsible for overseeing your security program."
        },
        {
            title: "Risk Assessment",
            description: "Regular assessments to identify and address security vulnerabilities."
        },
        {
            title: "Employee Training",
            description: "Ongoing security awareness training for all staff members."
        }
    ]

    const advantages = [
        {
            icon: <Clock size={32} />,
            title: "Quick Response",
            description: "Average response time under 15 minutes for critical issues"
        },
        {
            icon: <Award size={32} />,
            title: "Industry Expertise",
            description: "15+ years experience with automotive dealerships"
        },
        {
            icon: <Zap size={32} />,
            title: "Proactive Support",
            description: "We fix issues before they impact your business"
        },
        {
            icon: <ShieldCheck size={32} />,
            title: "Compliance Ready",
            description: "Full FTC Safeguards Rule compliance included"
        }
    ]

    return (
        <PageLayout>
            {/* Hero Section */}
            <section className="dealership-hero">
                <div className="dealership-hero-content">
                    <div className="dealership-hero-text">
                        <div className="dealership-hero-tag">
                            <Car size={16} />
                            Auto Dealership Solutions
                        </div>

                        <h1 className="dealership-hero-title">
                            End-to-End <span className="gradient-text">Dealership Services</span>
                        </h1>

                        <p className="dealership-hero-description">
                            Relax – We Got Your FTC Compliance Covered. Select Tech's Custom Compliance Portal
                            is a true ALL-IN-ONE solution for FTC Safeguards Regulation. We provide comprehensive
                            IT services tailored specifically for automotive dealerships.
                        </p>

                        <div className="dealership-hero-cta">
                            <Link to="/contact" className="btn-primary-dealer">
                                Get Compliant Now
                                <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>

                    <div className="dealership-hero-image">
                        <img src="/dealership_hero.png" alt="Modern Car Dealership" />
                    </div>
                </div>
            </section>

            {/* Features Strip */}
            <section className="dealership-features-strip">
                <div className="features-strip-container">
                    <div className="strip-feature">
                        <div className="strip-feature-icon">
                            <ShieldCheck size={32} />
                        </div>
                        <div className="strip-feature-content">
                            <h4>FTC Compliance</h4>
                            <p>Full Safeguards Rule compliance with our all-in-one portal</p>
                        </div>
                    </div>
                    <div className="strip-feature">
                        <div className="strip-feature-icon">
                            <Lock size={32} />
                        </div>
                        <div className="strip-feature-content">
                            <h4>Cybersecurity</h4>
                            <p>Enterprise-grade protection against modern threats</p>
                        </div>
                    </div>
                    <div className="strip-feature">
                        <div className="strip-feature-icon">
                            <Server size={32} />
                        </div>
                        <div className="strip-feature-content">
                            <h4>Managed Services Bundle</h4>
                            <p>Complete IT support with predictable monthly pricing</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Portal Section - What We Do For Dealership */}
            <section className="portal-section">
                <div className="portal-container">
                    <div className="portal-content">
                        <h2>What we do for your dealership.</h2>
                        <h3 className="portal-subtitle">Dealership FTC Compliance & Safety Training Portal</h3>

                        <p className="portal-description">
                            Track your cybersecurity, safety, and other training.<br />
                            From Hazmat to forklift safety, our training portal with AI reminders.
                        </p>

                        <ul className="portal-features">
                            <li>Track FTC Safeguard Rule compliance</li>
                            <li>Cybersecurity Awareness Training</li>
                            <li>Vulnerability scans & Annual Penetration Testing</li>
                            <li>Hazardous Materials, Personal Protective Equipment (PPE) Training</li>
                            <li>Respiratory Fit Testing & Training</li>
                            <li>Forklift Safety & Certification</li>
                            <li>Golf Cart Operation & Safety</li>
                            <li>Customizable-Add HR Workers Handbooks & Orientation</li>
                            <li>All managed in a <strong>single AI-powered portal</strong>.</li>
                        </ul>
                    </div>

                    <div className="portal-image">
                        <img src="/portal.png" alt="Dealership FTC Compliance & Safety Training Portal" />
                    </div>
                </div>
            </section>

            {/* What We Do Cards Section */}
            <section className="dealership-what-we-do">
                <div className="what-we-do-container">
                    <div className="what-we-do-header">
                        <h2>What We Do For Your Dealership</h2>
                        <p>
                            From IT infrastructure to compliance management, we handle everything
                            so you can focus on selling cars.
                        </p>
                    </div>

                    <div className="what-we-do-grid">
                        {whatWeDo.map((item, idx) => (
                            <div key={idx} className="what-we-do-card" ref={el => cardsRef.current[idx] = el}>
                                <div className="what-we-do-icon">
                                    {item.icon}
                                </div>
                                <div className="what-we-do-content">
                                    <h4>{item.title}</h4>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* VPN DMS Section */}
            <section className="dealership-vpn-section">
                <div className="vpn-container">
                    <div className="vpn-content">
                        <h2>How to Take VPN Services for Your DMS</h2>
                        <p>
                            Secure, reliable VPN connectivity is essential for modern dealerships.
                            We provide enterprise-grade VPN solutions that integrate seamlessly with
                            your Dealer Management System.
                        </p>
                        <ul className="vpn-list">
                            <li>
                                <CheckCircle size={20} />
                                Secure site-to-site VPN tunnels for DMS access
                            </li>
                            <li>
                                <CheckCircle size={20} />
                                Compatible with CDK, Reynolds, Dealertrack & more
                            </li>
                            <li>
                                <CheckCircle size={20} />
                                24/7 monitoring and automatic failover
                            </li>
                            <li>
                                <CheckCircle size={20} />
                                Encrypted data transmission for compliance
                            </li>
                            <li>
                                <CheckCircle size={20} />
                                Remote access for managers and staff
                            </li>
                        </ul>
                    </div>
                    <div className="vpn-image">
                        <img src="/dealership_network.png" alt="Dealership Network Infrastructure" />
                    </div>
                </div>
            </section>

            {/* Our Services Grid */}
            <section className="dealership-services-section">
                <div className="services-container">
                    <div className="services-header">
                        <h2>Our Services</h2>
                        <p>Comprehensive IT solutions designed specifically for automotive dealerships</p>
                    </div>

                    <div className="services-grid">
                        {services.map((service, idx) => (
                            <div key={idx} className="service-item">
                                <div className="service-item-icon">
                                    {service.icon}
                                </div>
                                <h4>{service.title}</h4>
                                <p>{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FTC Compliance Section */}
            <section className="ftc-compliance-section">
                <div className="ftc-container">
                    <div className="ftc-image">
                        <img src="/ftc_compliance.png" alt="FTC Compliance Cybersecurity" />
                    </div>
                    <div className="ftc-content">
                        <h2>FTC Safeguards Rule & Cybersecurity</h2>
                        <p>
                            The FTC Safeguards Rule requires auto dealerships to implement comprehensive
                            security measures to protect customer data. Non-compliance can result in
                            significant fines and reputational damage.
                        </p>

                        <div className="ftc-requirements">
                            {ftcRequirements.map((req, idx) => (
                                <div key={idx} className="ftc-requirement">
                                    <ClipboardCheck size={24} />
                                    <div>
                                        <h5>{req.title}</h5>
                                        <p>{req.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Don't Delay Section */}
            <section className="dont-delay-section">
                <div className="dont-delay-container">
                    <AlertTriangle size={48} style={{ marginBottom: '20px' }} />
                    <h2>Don't Delay – Get Compliant Today!</h2>
                    <p>
                        FTC enforcement is increasing. Protect your dealership from fines,
                        data breaches, and reputational damage with our comprehensive compliance solution.
                    </p>
                    <Link to="/contact" className="btn-white">
                        Start Your Compliance Journey
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </section>

            {/* Advantages Section */}
            <section className="advantages-section">
                <div className="advantages-container">
                    <div className="advantages-header">
                        <h2>Advantages of Partnering with Select Tech</h2>
                    </div>

                    <div className="advantages-grid">
                        {advantages.map((advantage, idx) => (
                            <div key={idx} className="advantage-card">
                                <div className="advantage-icon">
                                    {advantage.icon}
                                </div>
                                <h4>{advantage.title}</h4>
                                <p>{advantage.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="page-cta">
                <div className="cta-container">
                    <h2>Ready to Secure Your Dealership?</h2>
                    <p>Let us handle your IT and compliance so you can focus on what you do best – selling cars.</p>
                    <Link to="/contact" className="btn-primary">
                        Schedule a Consultation
                    </Link>
                </div>
            </section>
        </PageLayout>
    )
}

export default DealershipServices
