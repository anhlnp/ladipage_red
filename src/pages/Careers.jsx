import { Link } from 'react-router-dom'
import {
    Rocket,
    Brain,
    Shield,
    Users,
    Zap,
    Heart,
    Award,
    TrendingUp,
    Code,
    Cpu
} from 'lucide-react'
import PageLayout from '../components/PageLayout/PageLayout'
import ServiceHero from '../components/ServiceHero/ServiceHero'
import './Careers.css'

const Careers = () => {
    const whyWorkWithUs = [
        {
            icon: <Rocket size={32} />,
            title: "Shape the Future",
            description: "Work on cutting-edge AI and cybersecurity solutions that protect businesses from emerging threats."
        },
        {
            icon: <Brain size={32} />,
            title: "AI-First Approach",
            description: "We're actively investing in AI engineering talent to build next-generation security tools."
        },
        {
            icon: <Shield size={32} />,
            title: "Make an Impact",
            description: "Your work directly protects businesses and their customers from cyber threats every day."
        },
        {
            icon: <Users size={32} />,
            title: "Collaborative Culture",
            description: "Join a veteran-owned team that values expertise, integrity, and mutual respect."
        },
        {
            icon: <TrendingUp size={32} />,
            title: "Growth Opportunities",
            description: "Continuous learning, certifications, and career advancement in a growing industry."
        },
        {
            icon: <Heart size={32} />,
            title: "Work-Life Balance",
            description: "Flexible arrangements and a supportive environment that values your wellbeing."
        }
    ]

    const openPositions = [
        {
            title: "AI/ML Engineer",
            type: "Full-time",
            location: "Hickory, NC / Remote",
            tags: ["AI", "Machine Learning", "Python"],
            description: "Build intelligent security systems using machine learning to detect and respond to threats in real-time.",
            featured: true
        },
        {
            title: "Senior AI Security Researcher",
            type: "Full-time",
            location: "Remote",
            tags: ["AI", "Security Research", "LLM"],
            description: "Research and develop AI-powered threat detection systems and automated security responses.",
            featured: true
        },
        {
            title: "Cybersecurity Analyst",
            type: "Full-time",
            location: "Hickory, NC",
            tags: ["Security", "SIEM", "Threat Analysis"],
            description: "Monitor, analyze, and respond to security incidents across our client environments."
        },
        {
            title: "Penetration Tester",
            type: "Full-time",
            location: "Hickory, NC / Remote",
            tags: ["Ethical Hacking", "OSCP", "Security"],
            description: "Identify vulnerabilities in client systems through authorized penetration testing."
        },
        {
            title: "IT Support Technician",
            type: "Full-time",
            location: "Hickory, NC",
            tags: ["Help Desk", "Networking", "Windows"],
            description: "Provide exceptional technical support to our managed services clients."
        }
    ]

    const values = [
        { icon: <Award size={24} />, text: "Veteran-Owned & Operated" },
        { icon: <Zap size={24} />, text: "23+ Years of Excellence" },
        { icon: <Code size={24} />, text: "Innovation-Driven" },
        { icon: <Cpu size={24} />, text: "AI-Powered Solutions" }
    ]

    const lifeAtSelectTech = [
        {
            icon: <Heart size={28} />,
            title: "Looking Out for You",
            description: "Comprehensive health coverage and wellness programs to take care of you and your family."
        },
        {
            icon: <TrendingUp size={28} />,
            title: "Fueling Your Ambition",
            description: "Certification reimbursement, training opportunities, and clear paths for advancement."
        },
        {
            icon: <Zap size={28} />,
            title: "Flexible Work",
            description: "Remote and hybrid options available. We trust you to do great work, wherever you are."
        },
        {
            icon: <Users size={28} />,
            title: "Team Culture",
            description: "From team events to daily collaboration, we build relationships that last."
        }
    ]

    return (
        <PageLayout>
            <ServiceHero
                tag="WE'RE HIRING"
                title="Join Our Team of"
                gradientText="Innovators"
                description="We're seeking highly motivated individuals who want to solve the world's toughest cybersecurity challenges. If you're driven, curious, and ready to make an impact – we want to meet you."
            />

            {/* AI Talent Call-out Banner */}
            <section className="ai-talent-banner">
                <div className="ai-banner-container">
                    <div className="ai-banner-glow"></div>
                    <div className="ai-banner-content">
                        <div className="ai-banner-icon">
                            <Brain size={48} />
                        </div>
                        <div className="ai-banner-text">
                            <h2>
                                <span className="gradient-text-alt">Calling All AI Engineers</span>
                            </h2>
                            <p>
                                We're building the future of AI-powered cybersecurity. If you're passionate about
                                machine learning, threat detection, and pushing the boundaries of what's possible –
                                <strong> we're actively looking for talent like you.</strong>
                            </p>
                        </div>
                        <Link to="/contact" className="ai-banner-cta">
                            Apply for AI Roles
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Highlight Banner - Stats */}
            <section className="careers-highlight">
                <div className="highlight-container">
                    <div className="highlight-content">
                        <h2>Why <span className="gradient-text">Select Tech?</span></h2>
                        <p>
                            Our strong values and supportive environment empower us to solve our clients'
                            toughest cybersecurity challenges and make the world a safer place.
                        </p>
                    </div>
                    <div className="highlight-stats">
                        <div className="stat">
                            <span className="stat-number">23+</span>
                            <span className="stat-label">Years Strong</span>
                        </div>
                        <div className="stat">
                            <span className="stat-number">#1</span>
                            <span className="stat-label">Rated in Hickory</span>
                        </div>
                        <div className="stat">
                            <span className="stat-number">100%</span>
                            <span className="stat-label">Satisfaction</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Life at Select Tech */}
            <section className="life-at-company">
                <div className="life-container">
                    <div className="section-header">
                        <h2>Life at <span className="gradient-text">Select Tech</span></h2>
                        <p>More than a job – a place to grow, contribute, and belong</p>
                    </div>
                    <div className="life-grid">
                        {lifeAtSelectTech.map((item, idx) => (
                            <div key={idx} className="life-card glass-box">
                                <div className="life-icon">{item.icon}</div>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Work With Us */}
            <section className="careers-why">
                <div className="why-container">
                    <div className="section-header">
                        <h2>Why <span className="gradient-text">Select Tech?</span></h2>
                        <p>Join a team that values innovation, integrity, and impact</p>
                    </div>
                    <div className="why-grid">
                        {whyWorkWithUs.map((item, idx) => (
                            <div key={idx} className="why-card glass-box">
                                <div className="why-icon">{item.icon}</div>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Strip */}
            <section className="careers-values">
                <div className="values-container">
                    {values.map((value, idx) => (
                        <div key={idx} className="value-item">
                            {value.icon}
                            <span>{value.text}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Open Positions */}
            <section className="careers-positions">
                <div className="positions-container">
                    <div className="section-header">
                        <h2>Open <span className="gradient-text">Positions</span></h2>
                        <p>Take the next step in your career</p>
                    </div>
                    <div className="positions-grid">
                        {openPositions.map((position, idx) => (
                            <div key={idx} className={`position-card glass-box ${position.featured ? 'featured' : ''}`}>
                                <div className="position-header">
                                    <h3>{position.title}</h3>
                                    <div className="position-meta">
                                        <span className="position-type">{position.type}</span>
                                        <span className="position-location">{position.location}</span>
                                    </div>
                                </div>
                                <p>{position.description}</p>
                                <div className="position-tags">
                                    {position.tags.map((tag, tidx) => (
                                        <span key={tidx} className="tag">{tag}</span>
                                    ))}
                                </div>
                                <Link to="/contact" className="position-apply">
                                    Apply Now
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Don't See Your Role CTA */}
            <section className="careers-cta">
                <div className="cta-container glass-box">
                    <h2>Don't See Your Role?</h2>
                    <p>
                        We're always looking for highly motivated individuals with unique skills and perspectives.
                        Send us your resume and let's start a conversation.
                    </p>
                    <Link to="/contact" className="btn-primary">
                        Get in Touch
                    </Link>
                </div>
            </section>
        </PageLayout>
    )
}

export default Careers
