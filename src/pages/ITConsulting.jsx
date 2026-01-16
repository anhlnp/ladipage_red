import { useEffect, useRef } from 'react'
import {
    Monitor,
    Cloud,
    Shield,
    Server,
    Network,
    Users,
    Award,
    Clock,
    Handshake,
    CheckCircle,
    Building,
    FileCheck
} from 'lucide-react'
import PageLayout from '../components/PageLayout/PageLayout'
import './ITConsulting.css'

const ITConsulting = () => {
    const cardsRef = useRef([])
    const whyChooseRef = useRef([])

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

        whyChooseRef.current.forEach(item => {
            if (item) observer.observe(item)
        })

        return () => observer.disconnect()
    }, [])

    const expertiseList = [
        {
            title: "Technology Assessments",
            desc: "Comprehensive reviews of your business to identify performance, security, or compliance issues."
        },
        {
            title: "Cloud and Hybrid Deployments",
            desc: "Microsoft 365, Azure, Google Workspace, or a hybrid setup that suits your business model."
        },
        {
            title: "Cybersecurity & Regulatory Compliance",
            desc: "Help achieving HIPAA, FTC Safeguards, PCI DSS, and NIST 800-53 compliance."
        },
        {
            title: "Business Continuity & Disaster Recovery",
            desc: "Development of recovery strategies including cloud failover and redundant systems."
        },
        {
            title: "Network Architecture & Optimization",
            desc: "Design and implement fast, secure networks using Fortinet, SonicWall, and other technologies."
        }
    ]

    const services = [
        {
            icon: <Monitor size={28} />,
            title: "Technology Assessments",
            desc: "Comprehensive reviews to identify gaps in performance, security, and compliance across your entire IT infrastructure."
        },
        {
            icon: <Cloud size={28} />,
            title: "Cloud Solutions",
            desc: "Expert deployment and management of Microsoft 365, Azure, AWS, and Google Workspace environments."
        },
        {
            icon: <Shield size={28} />,
            title: "Cybersecurity Services",
            desc: "Full-spectrum security including threat assessment, compliance auditing, and incident response planning."
        },
        {
            icon: <Server size={28} />,
            title: "Disaster Recovery",
            desc: "Business continuity planning with cloud failover, redundant systems, and rapid recovery protocols."
        },
        {
            icon: <Network size={28} />,
            title: "Network Architecture",
            desc: "Design and implementation of secure, high-performance networks using enterprise-grade technologies."
        },
        {
            icon: <FileCheck size={28} />,
            title: "Compliance Consulting",
            desc: "Navigate complex regulations including HIPAA, FTC Safeguards, PCI DSS, and NIST frameworks."
        }
    ]

    const whyChoose = [
        {
            icon: <Award size={32} />,
            title: "20+ Years Experience",
            desc: "Two decades of guiding businesses through digital transformation and cybersecurity challenges."
        },
        {
            icon: <CheckCircle size={32} />,
            title: "93% Client Retention",
            desc: "Proven results and trusted partnerships across 100+ local businesses and organizations."
        },
        {
            icon: <Clock size={32} />,
            title: "24/7 Support",
            desc: "On Guard around the clock so you can focus on running your business."
        },
        {
            icon: <Building size={32} />,
            title: "Veteran Owned",
            desc: "Founded by a US Navy Senior Chief with a commitment to excellence and professionalism."
        },
        {
            icon: <Handshake size={32} />,
            title: "Trusted Partner",
            desc: "Licensed & bonded contractor with a track record of regulatory compliance."
        },
        {
            icon: <Users size={32} />,
            title: "Expert Team",
            desc: "Certified Ethical Hackers, Penetration Testers, and cybersecurity professionals on staff."
        }
    ]

    return (
        <PageLayout>
            {/* Hero Section with Background Image */}
            <section className="it-consulting-hero">
                <div className="hero-content-wrapper">
                    {/* Title */}
                    <div className="hero-title-section">
                        <h1>IT Consulting Services | Select Tech Inc.</h1>
                        <h2>On Guard 24/7, So You Can Focus on Your Business</h2>
                        <p className="hero-subtitle">
                            Proven Results: 93% Client Retention Across 100+ Local Partnerships
                        </p>
                    </div>

                    {/* Description */}
                    <div className="hero-description">
                        <p>
                            Select Tech brings over two decades of experience guiding North Carolina businesses
                            through digital transformation, cybersecurity challenges, and compliance requirements.
                            We specialize in developing tailored IT strategies for healthcare, legal, automotive,
                            and enterprise sectors — helping you achieve long-term growth with technology you can trust.
                        </p>
                    </div>

                    {/* Expertise Section */}
                    <div className="expertise-section">
                        <h3>What We Provide and Our Expertise:</h3>
                        <ul className="expertise-list">
                            {expertiseList.map((item, idx) => (
                                <li key={idx}>
                                    <strong>{item.title}:</strong> {item.desc}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Licensed Badge */}
                    <div className="licensed-badge">
                        <p>
                            <strong>Licensed & Bonded:</strong> Headquartered in Hickory, NC. Licensed low-voltage
                            electrical contractor with a track record of regulatory compliance.
                        </p>
                    </div>

                    {/* Security Badge */}
                    <div className="security-badge">
                        <p>
                            <strong>Advanced Security Expertise:</strong> Certified Ethical Hackers,
                            Penetration Testers, and cybersecurity professionals on staff.
                        </p>
                    </div>
                </div>

                {/* Founder Section */}
                <div className="founder-section">
                    <div className="founder-content">
                        <div className="founder-text">
                            <p>
                                Founder, <strong>Dave Willis</strong>, a retired US Navy Senior Chief who served throughout
                                the world in F-14a, S-3 Viking, IT, Cybersecurity, and shore and sea based electronics.
                                Veteran-owned small business that has been serving the community for the past twenty years.
                                Select Tech was established in 2002 to provide the same level of professionalism that our
                                soldiers, sailors & marines demonstrate on a daily basis. At Select Tech our employees are
                                trained and work as a team and put their customers first. The mission statement reflects
                                the same professionalism the founder, David Willis, has always lived by: "Keep your word, do your best".
                            </p>
                        </div>
                        <div className="founder-image">
                            <img
                                src="/Willis_Retired_Navy.png"
                                alt="Dave Willis - Retired US Navy Senior Chief, Founder of Select Tech"
                            />
                        </div>
                    </div>
                </div>

                {/* Bottom Stats Bar */}
                <div className="stats-bar">
                    <div className="stats-bar-content">
                        <div className="stat-box">
                            <h4>Experience</h4>
                            <p>20+ years serving NC businesses</p>
                        </div>
                        <div className="stat-box">
                            <h4>Compliance</h4>
                            <p>HIPAA, PCI DSS, NIST certified</p>
                        </div>
                        <div className="stat-box">
                            <h4>Trusted Partner</h4>
                            <p>Licensed & Bonded contractor</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Additional Services Section */}
            <section className="consulting-services-section">
                <div className="consulting-services-grid">
                    {services.map((service, idx) => (
                        <div
                            key={idx}
                            className="consulting-service-card"
                            ref={el => cardsRef.current[idx] = el}
                        >
                            <div className="service-icon">
                                {service.icon}
                            </div>
                            <h3>{service.title}</h3>
                            <p>{service.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Why Choose Section */}
            <section className="why-choose-section">
                <div className="why-choose-container">
                    <div className="why-choose-header">
                        <h2>Why Choose Select Tech?</h2>
                        <p>
                            Trusted by over 100 local businesses for reliable IT consulting and cybersecurity solutions.
                        </p>
                    </div>
                    <div className="why-choose-grid">
                        {whyChoose.map((item, idx) => (
                            <div
                                key={idx}
                                className="why-choose-item"
                                ref={el => whyChooseRef.current[idx] = el}
                            >
                                <div className="why-icon">
                                    {item.icon}
                                </div>
                                <h4>{item.title}</h4>
                                <p>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="page-cta">
                <div className="cta-container">
                    <h2>Ready to Transform Your IT?</h2>
                    <p>Schedule a consultation with our expert team today.</p>
                    <a href="/contact" className="btn-primary">Let's Talk Today</a>
                </div>
            </section>
        </PageLayout>
    )
}

export default ITConsulting
