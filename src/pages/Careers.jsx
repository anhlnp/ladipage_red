import { Link } from 'react-router-dom'
import {
    Brain,
    Shield,
    Users,
    Zap,
    Heart,
    Award,
    HeartPulse,
    Briefcase,
    Globe,
    Quote,
    MapPin,
    ChevronRight,
    Star,
    GraduationCap,
    Coffee,
    Target,
    Sparkles
} from 'lucide-react'
import PageLayout from '../components/PageLayout/PageLayout'
import './Careers.css'

const Careers = () => {

    const lifeAtSelectTech = [
        {
            icon: <HeartPulse size={28} />,
            title: "Looking Out for Your Health",
            description: "Comprehensive health coverage and wellness programs to take care of you and your family – because your well-being matters to us."
        },
        {
            icon: <GraduationCap size={28} />,
            title: "Fueling Your Ambition",
            description: "There are no limits to what you can accomplish. Certification reimbursement, training opportunities, and clear paths for career advancement."
        },
        {
            icon: <Zap size={28} />,
            title: "Striking the Right Balance",
            description: "Life's not all about work, even when you love it. Find the balance you need with flexible PTO and remote work opportunities."
        },
        {
            icon: <Heart size={28} />,
            title: "Caring for the Whole You",
            description: "From wellness initiatives and fitness challenges to mental health support, you'll find resources for your complete well-being."
        },
        {
            icon: <Coffee size={28} />,
            title: "Turning Coworkers into Friends",
            description: "The work we do is serious, but we build lasting friendships through team events, celebrations, and collaborative culture."
        },
        {
            icon: <Globe size={28} />,
            title: "Making the World Safer",
            description: "By solving our clients' toughest cybersecurity challenges, we help them become more secure and successful. That's something to be proud of."
        }
    ]

    const teamQuotes = [
        {
            question: "Why are you working in cybersecurity?",
            quote: "Cybersecurity keeps evolving with ever-expanding scope. You're constantly faced with new challenges, new learning opportunities, and always presented with opportunities if you're willing to push yourself.",
            name: "Security Analyst",
            role: "3 years at Select Tech"
        },
        {
            question: "How has Select Tech helped advance your career?",
            quote: "Thanks to the amazing leaders and mentors I've been lucky to work with, I've advanced from a junior technician to a senior engineer. I genuinely learn something new every day, whether from collaborating with teammates or tackling new responsibilities.",
            name: "Senior Engineer",
            role: "5 years at Select Tech"
        },
    ]

    const spiritStats = [
        {
            number: "50+",
            label: "Certifications held by our team"
        },
        {
            number: "#1",
            label: "Rated IT services in Hickory, NC"
        },
        {
            number: "23+",
            label: "Years of trusted excellence"
        },
        {
            number: "100%",
            label: "Client satisfaction rate"
        }
    ]

    const coreValues = [
        {
            icon: <Shield size={24} />,
            title: "Stronger Together",
            description: "Everyone at Select Tech has something to contribute. Our differences broaden our perspectives and fuel innovation."
        },
        {
            icon: <Users size={24} />,
            title: "A Culture of Integrity",
            description: "As a veteran-owned company, integrity isn't just a value – it's the foundation of everything we do and how we serve our clients."
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

    return (
        <PageLayout>
            {/* Hero Section */}
            <section className="careers-hero">
                <div className="careers-hero-bg">
                    <div className="careers-hero-glow careers-hero-glow--1"></div>
                    <div className="careers-hero-glow careers-hero-glow--2"></div>
                    <div className="careers-hero-grid-pattern"></div>
                </div>
                <div className="careers-hero-container">
                    <span className="careers-hero-tag">
                        <Sparkles size={14} />
                        CAREERS AT SELECT TECH
                    </span>
                    <h1 className="careers-hero-title">
                        Elevate Your Career.
                        <br />
                        <span className="gradient-text">Shape an Industry.</span>
                    </h1>
                    <p className="careers-hero-description">
                        Our strong values and supportive environment empower us to solve our clients'
                        toughest cybersecurity challenges and make the world a safer place. If you're
                        looking to grow your career, help define what's next, and be part of a
                        community that truly makes a difference – welcome to Select Tech.
                    </p>
                    <div className="careers-hero-actions">
                        <a href="#positions" className="careers-hero-btn careers-hero-btn--primary">
                            <Briefcase size={18} />
                            View Open Positions
                        </a>
                        <Link to="/about" className="careers-hero-btn careers-hero-btn--secondary">
                            Learn About Our Values
                            <ChevronRight size={18} />
                        </Link>
                    </div>

                    {/* Hero Banner Image */}
                    <div className="careers-hero-banner">
                        <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=400&fit=crop&crop=faces" alt="Select Tech team collaborating" />
                    </div>
                </div>
            </section>

            {/* Life at Select Tech Section */}
            <section className="careers-life">
                <div className="careers-life-container">
                    <div className="careers-section-header">
                        <span className="careers-section-tag">BENEFITS & CULTURE</span>
                        <h2>Life at <span className="gradient-text">Select Tech</span></h2>
                        <p>More than a job – a place to grow, contribute, and belong</p>
                    </div>
                    <div className="careers-life-layout">
                        <div className="careers-life-grid">
                            {lifeAtSelectTech.map((item, idx) => (
                                <div key={idx} className="careers-life-card">
                                    <div className="careers-life-card-icon">
                                        {item.icon}
                                    </div>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </div>
                            ))}
                        </div>
                        <div className="careers-life-photo">
                            <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=750&fit=crop&crop=faces" alt="Happy team members together" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Team Voices Section */}
            <section className="careers-voices">
                <div className="careers-voices-container">
                    <div className="careers-section-header">
                        <span className="careers-section-tag">OUR TEAM</span>
                        <h2>Hear From <span className="gradient-text">Our People</span></h2>
                        <p>Real stories from the team that powers Select Tech</p>
                    </div>

                    {/* Team photo strip */}
                    <div className="careers-voices-photo-strip">
                        <div className="voices-photo">
                            <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=250&fit=crop" alt="Tech workspace" />
                        </div>
                        <div className="voices-photo">
                            <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=250&fit=crop" alt="Team discussion" />
                        </div>
                        <div className="voices-photo">
                            <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=250&fit=crop" alt="Office work" />
                        </div>
                    </div>
                    <div className="careers-voices-grid">
                        {teamQuotes.map((item, idx) => (
                            <div key={idx} className="careers-voice-card glass-box">
                                <div className="voice-question">
                                    <Target size={18} />
                                    {item.question}
                                </div>
                                <div className="voice-quote">
                                    <Quote size={32} className="voice-quote-icon" />
                                    <p>{item.quote}</p>
                                </div>
                                <div className="voice-author">
                                    <div className="voice-avatar">
                                        <Users size={20} />
                                    </div>
                                    <div>
                                        <span className="voice-name">{item.name}</span>
                                        <span className="voice-role">{item.role}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Core Values Subsection */}
                    <div className="careers-core-values">
                        {coreValues.map((item, idx) => (
                            <div key={idx} className="core-value-card">
                                <div className="core-value-icon">{item.icon}</div>
                                <div>
                                    <h4>{item.title}</h4>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Spirit / Stats Section */}
            <section className="careers-spirit">
                <div className="careers-spirit-bg-image">
                    <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&h=600&fit=crop" alt="Team celebration" />
                </div>
                <div className="careers-spirit-container">
                    <div className="careers-spirit-header">
                        <h2>In the Spirit of <span className="gradient-text">Select Tech</span></h2>
                    </div>
                    <div className="careers-spirit-stats">
                        {spiritStats.map((stat, idx) => (
                            <div key={idx} className="spirit-stat">
                                <span className="spirit-stat-number">{stat.number}</span>
                                <span className="spirit-stat-label">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                    <div className="careers-spirit-badges">
                        <div className="spirit-badge">
                            <Award size={20} />
                            <span>Veteran-Owned & Operated</span>
                        </div>
                        <div className="spirit-badge">
                            <Star size={20} />
                            <span>Top Rated Since 2002</span>
                        </div>
                        <div className="spirit-badge">
                            <Shield size={20} />
                            <span>Military-Grade Professionalism</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* AI Talent Call-out */}
            <section className="careers-ai-banner">
                <div className="careers-ai-container">
                    <div className="careers-ai-glow"></div>
                    <div className="careers-ai-content">
                        <div className="careers-ai-icon">
                            <Brain size={48} />
                        </div>
                        <div className="careers-ai-text">
                            <h2>
                                <span className="gradient-text-alt">Calling All AI Engineers</span>
                            </h2>
                            <p>
                                We're building the future of AI-powered cybersecurity. If you're passionate about
                                machine learning, threat detection, and pushing boundaries –
                                <strong> we're actively looking for talent like you.</strong>
                            </p>
                        </div>
                        <Link to="/contact?service=careers" className="careers-ai-cta">
                            Apply for AI Roles
                            <ChevronRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Open Positions */}
            <section id="positions" className="careers-positions">
                <div className="careers-positions-container">
                    <div className="careers-section-header">
                        <span className="careers-section-tag">OPPORTUNITIES</span>
                        <h2>Open <span className="gradient-text">Positions</span></h2>
                        <p>Take the next step in your career</p>
                    </div>
                    <div className="careers-positions-list">
                        {openPositions.map((position, idx) => (
                            <div key={idx} className={`careers-position-card ${position.featured ? 'featured' : ''}`}>
                                {position.featured && (
                                    <span className="position-hot-badge">
                                        <Sparkles size={12} />
                                        HOT
                                    </span>
                                )}
                                <div className="position-main">
                                    <div className="position-info">
                                        <h3>{position.title}</h3>
                                        <div className="position-meta">
                                            <span className="position-type">
                                                <Briefcase size={14} />
                                                {position.type}
                                            </span>
                                            <span className="position-location">
                                                <MapPin size={14} />
                                                {position.location}
                                            </span>
                                        </div>
                                        <p className="position-desc">{position.description}</p>
                                    </div>
                                    <div className="position-actions">
                                        <div className="position-tags">
                                            {position.tags.map((tag, tidx) => (
                                                <span key={tidx} className="position-tag">{tag}</span>
                                            ))}
                                        </div>
                                        <Link to="/contact?service=careers" className="position-apply-btn">
                                            Apply Now
                                            <ChevronRight size={16} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Apply Today CTA */}
            <section className="careers-apply-cta">
                <div className="careers-apply-container">
                    <div className="careers-apply-glow"></div>
                    <div className="careers-apply-layout">
                        <div className="careers-apply-content">
                            <h2>Don't See Your Role?</h2>
                            <p>
                                Grow your career by joining a team of the cybersecurity industry's best and brightest.
                                We're always looking for highly motivated individuals with unique skills and perspectives.
                            </p>
                            <div className="careers-apply-actions">
                                <Link to="/contact?service=careers" className="careers-hero-btn careers-hero-btn--primary">
                                    <Briefcase size={18} />
                                    Get in Touch
                                </Link>
                                <Link to="/our-team" className="careers-hero-btn careers-hero-btn--secondary">
                                    Meet Our Team
                                    <ChevronRight size={18} />
                                </Link>
                            </div>
                        </div>
                        <div className="careers-apply-photo">
                            <img src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=350&fit=crop&crop=faces" alt="Professional at work" />
                        </div>
                    </div>
                </div>
            </section>
        </PageLayout>
    )
}

export default Careers
