import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
    Cable,
    Server,
    Network,
    Zap,
    Shield,
    Clock,
    TrendingUp,
    Building2,
    Radio,
    Cpu,
    HardDrive,
    Gauge,
    CheckCircle,
    ArrowRight,
    Database,
    Cloud,
    Layers,
    Settings,
    Calendar,
    User
} from 'lucide-react'
import PageLayout from '../components/PageLayout/PageLayout'
import './FiberDataCenter.css'

const FiberDataCenter = () => {
    const serviceCardsRef = useRef([])
    const benefitsRef = useRef([])
    const applicationsRef = useRef([])
    const blogCardsRef = useRef([])

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

        serviceCardsRef.current.forEach(card => {
            if (card) observer.observe(card)
        })

        benefitsRef.current.forEach(item => {
            if (item) observer.observe(item)
        })

        applicationsRef.current.forEach(card => {
            if (card) observer.observe(card)
        })

        blogCardsRef.current.forEach(card => {
            if (card) observer.observe(card)
        })

        return () => observer.disconnect()
    }, [])

    const services = [
        {
            icon: <Cable size={32} />,
            title: "Fiber Optic Cabling",
            description: "Enterprise-grade fiber optic installation for maximum bandwidth and reliability.",
            features: [
                "Single-Mode & Multi-Mode Fiber",
                "High-Density Cabling Solutions",
                "Pre-Terminated Assemblies",
                "Fusion Splicing Services"
            ]
        },
        {
            icon: <Server size={32} />,
            title: "Data Center Infrastructure",
            description: "Complete data center solutions from design to implementation and maintenance.",
            features: [
                "Structured Cabling Systems",
                "Rack & Cabinet Solutions",
                "Power Distribution Units",
                "Cable Management Systems"
            ]
        },
        {
            icon: <Network size={32} />,
            title: "Network Connectivity",
            description: "High-performance network infrastructure for seamless data transmission.",
            features: [
                "10G/40G/100G Connectivity",
                "MTP/MPO Solutions",
                "Fiber Backbone Design",
                "Cross-Connect Services"
            ]
        },
        {
            icon: <Shield size={32} />,
            title: "Infrastructure Security",
            description: "Robust security measures to protect your critical data infrastructure.",
            features: [
                "Physical Security Integration",
                "Access Control Systems",
                "Environmental Monitoring",
                "Fire Suppression Systems"
            ]
        },
        {
            icon: <Gauge size={32} />,
            title: "Testing & Certification",
            description: "Comprehensive testing and certification for optimal network performance.",
            features: [
                "OTDR Testing",
                "Tier 1 & Tier 2 Certification",
                "Loss Budget Analysis",
                "Documentation & Reporting"
            ]
        },
        {
            icon: <Settings size={32} />,
            title: "Maintenance & Support",
            description: "24/7 support and proactive maintenance to maximize uptime.",
            features: [
                "Emergency Response Services",
                "Preventive Maintenance",
                "Performance Monitoring",
                "Capacity Planning"
            ]
        }
    ]

    const benefits = [
        {
            icon: <Zap size={36} />,
            title: "100 Gbps+",
            description: "Ultra-high bandwidth capacity for demanding applications"
        },
        {
            icon: <Clock size={36} />,
            title: "99.999% Uptime",
            description: "Industry-leading reliability and redundancy"
        },
        {
            icon: <TrendingUp size={36} />,
            title: "Scalable",
            description: "Future-proof infrastructure that grows with you"
        },
        {
            icon: <Shield size={36} />,
            title: "Secure",
            description: "Enterprise-grade security and compliance"
        }
    ]

    const applications = [
        {
            icon: <Building2 size={28} />,
            title: "Enterprise Data Centers",
            description: "Large-scale fiber infrastructure for corporate data centers requiring high-density connectivity, redundant pathways, and carrier-grade reliability."
        },
        {
            icon: <Cloud size={28} />,
            title: "Cloud & Colocation Facilities",
            description: "Optimized connectivity solutions for cloud service providers and colocation data centers with meet-me rooms and multi-tenant capabilities."
        },
        {
            icon: <Radio size={28} />,
            title: "Telecom Networks",
            description: "Carrier-grade fiber solutions for telecommunications providers including central offices, edge data centers, and network points of presence."
        },
        {
            icon: <Database size={28} />,
            title: "Hyperscale Infrastructure",
            description: "Ultra-high-density fiber solutions for hyperscale data centers powering AI, machine learning, and big data applications."
        },
        {
            icon: <Layers size={28} />,
            title: "Campus Networks",
            description: "Multi-building fiber backbone networks for education, healthcare, and corporate campuses requiring reliable inter-building connectivity."
        },
        {
            icon: <Cpu size={28} />,
            title: "Edge Computing",
            description: "Compact, high-performance fiber solutions for edge data centers bringing computing power closer to end users."
        }
    ]

    const blogPosts = [
        {
            id: 'fiber-optics-400g-future',
            image: "/blog_fiber_cables.png",
            category: "Technology",
            date: "January 15, 2026",
            author: "Select Tech Team",
            title: "The Future of Fiber Optics: 400G and Beyond",
            excerpt: "Explore how next-generation fiber optic technology is revolutionizing data center connectivity with speeds exceeding 400 Gbps, enabling unprecedented bandwidth for AI and machine learning workloads.",
            featured: true
        },
        {
            id: 'data-center-cable-management',
            image: "/blog_datacenter.png",
            category: "Infrastructure",
            date: "January 10, 2026",
            author: "David Willis",
            title: "Best Practices for Data Center Cable Management",
            excerpt: "Proper cable management is crucial for maintaining optimal airflow, simplifying troubleshooting, and ensuring scalability. Learn our top strategies for organizing your data center infrastructure."
        },
        {
            id: 'preventive-maintenance-fiber',
            image: "/blog_technician.png",
            category: "Maintenance",
            date: "January 5, 2026",
            author: "Technical Team",
            title: "Preventive Maintenance: Maximizing Fiber Network Uptime",
            excerpt: "Regular maintenance and proactive monitoring can prevent costly downtime. Discover the essential maintenance routines that keep enterprise fiber networks running at peak performance."
        },
        {
            id: 'connecting-datacenter-cloud',
            image: "/blog_cloud.png",
            category: "Cloud",
            date: "December 28, 2025",
            author: "Select Tech Team",
            title: "Connecting Your Data Center to the Cloud",
            excerpt: "Hybrid cloud architectures require robust fiber connectivity. Learn how to design and implement high-performance connections between on-premises data centers and major cloud providers."
        }
    ]

    return (
        <PageLayout>
            {/* Hero Section */}
            <section className="fiber-hero">
                {/* Animated Fiber Lines */}
                <div className="fiber-lines">
                    <div className="fiber-line"></div>
                    <div className="fiber-line"></div>
                    <div className="fiber-line"></div>
                    <div className="fiber-line"></div>
                </div>

                {/* Data Nodes */}
                <div className="data-nodes">
                    <div className="data-node"></div>
                    <div className="data-node"></div>
                    <div className="data-node"></div>
                    <div className="data-node"></div>
                    <div className="data-node"></div>
                    <div className="data-node"></div>
                </div>

                <div className="fiber-hero-content">
                    <div className="fiber-hero-text">
                        <div className="fiber-hero-tag">
                            <Cable size={16} />
                            Data Center Solutions
                        </div>

                        <h1 className="fiber-hero-title">
                            Fiber & <span className="gradient-text">Data Center</span> Services
                        </h1>

                        <p className="fiber-hero-description">
                            Connect your business to growth with enterprise-grade fiber optic infrastructure
                            and data center solutions. We deliver maximum uptime, scalable bandwidth, and
                            smart connectivity that powers your digital transformation.
                        </p>

                        <div className="fiber-hero-stats">
                            <div className="hero-stat">
                                <span className="hero-stat-value">100G+</span>
                                <span className="hero-stat-label">Bandwidth</span>
                            </div>
                            <div className="hero-stat">
                                <span className="hero-stat-value">99.99%</span>
                                <span className="hero-stat-label">Uptime</span>
                            </div>
                            <div className="hero-stat">
                                <span className="hero-stat-value">24/7</span>
                                <span className="hero-stat-label">Support</span>
                            </div>
                        </div>

                        <div className="fiber-hero-cta">
                            <Link to="/contact" className="btn-primary-fiber">
                                Get Started
                                <ArrowRight size={18} />
                            </Link>
                            <a href="#services" className="btn-secondary-fiber">
                                Explore Services
                            </a>
                        </div>
                    </div>

                    <div className="fiber-hero-illustration">
                        <div className="server-rack-visual">
                            <div className="rack-unit">
                                <div className="rack-ports">
                                    <div className="rack-port"></div>
                                    <div className="rack-port"></div>
                                    <div className="rack-port"></div>
                                    <div className="rack-port"></div>
                                    <div className="rack-port"></div>
                                    <div className="rack-port"></div>
                                </div>
                            </div>
                            <div className="rack-unit">
                                <div className="rack-ports">
                                    <div className="rack-port"></div>
                                    <div className="rack-port"></div>
                                    <div className="rack-port"></div>
                                    <div className="rack-port"></div>
                                    <div className="rack-port"></div>
                                    <div className="rack-port"></div>
                                </div>
                            </div>
                            <div className="rack-unit">
                                <div className="rack-ports">
                                    <div className="rack-port"></div>
                                    <div className="rack-port"></div>
                                    <div className="rack-port"></div>
                                    <div className="rack-port"></div>
                                    <div className="rack-port"></div>
                                    <div className="rack-port"></div>
                                </div>
                            </div>
                            <div className="rack-unit">
                                <div className="rack-ports">
                                    <div className="rack-port"></div>
                                    <div className="rack-port"></div>
                                    <div className="rack-port"></div>
                                    <div className="rack-port"></div>
                                    <div className="rack-port"></div>
                                    <div className="rack-port"></div>
                                </div>
                            </div>
                            <div className="rack-unit">
                                <div className="rack-ports">
                                    <div className="rack-port"></div>
                                    <div className="rack-port"></div>
                                    <div className="rack-port"></div>
                                    <div className="rack-port"></div>
                                    <div className="rack-port"></div>
                                    <div className="rack-port"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="fiber-services-section" id="services">
                <div className="fiber-services-header">
                    <h2>Our Data Center Services</h2>
                    <p>
                        From fiber optic cabling to complete data center infrastructure,
                        we provide end-to-end solutions that ensure your business stays connected,
                        secure, and ready for growth.
                    </p>
                </div>

                <div className="fiber-services-grid">
                    {services.map((service, idx) => (
                        <div
                            key={idx}
                            className="fiber-service-card"
                            ref={el => serviceCardsRef.current[idx] = el}
                        >
                            <div className="service-card-icon">
                                {service.icon}
                            </div>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                            <ul className="service-features">
                                {service.features.map((feature, fidx) => (
                                    <li key={fidx}>
                                        <CheckCircle size={16} />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* Benefits Section */}
            <section className="fiber-benefits-section">
                <div className="benefits-container">
                    <div className="benefits-header">
                        <h2>Why Choose Our Fiber Solutions?</h2>
                        <p>Industry-leading performance backed by decades of experience</p>
                    </div>

                    <div className="benefits-grid">
                        {benefits.map((benefit, idx) => (
                            <div
                                key={idx}
                                className="benefit-item"
                                ref={el => benefitsRef.current[idx] = el}
                            >
                                <div className="benefit-icon">
                                    {benefit.icon}
                                </div>
                                <h4>{benefit.title}</h4>
                                <p>{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Applications Section */}
            <section className="fiber-applications-section">
                <div className="applications-container">
                    <div className="applications-header">
                        <h2>Application Areas</h2>
                        <p>Tailored solutions for every industry and use case</p>
                    </div>

                    <div className="applications-grid">
                        {applications.map((app, idx) => (
                            <div
                                key={idx}
                                className="application-card"
                                ref={el => applicationsRef.current[idx] = el}
                            >
                                <div className="application-icon">
                                    {app.icon}
                                </div>
                                <div className="application-content">
                                    <h4>{app.title}</h4>
                                    <p>{app.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog Section */}
            <section className="fiber-blog-section">
                <div className="blog-container">
                    <div className="blog-header">
                        <h2>Insights & Resources</h2>
                        <p>
                            Stay updated with the latest trends, best practices, and insights
                            in data center infrastructure and fiber optic technology.
                        </p>
                    </div>

                    <div className="blog-grid">
                        {blogPosts.map((post, idx) => (
                            <div
                                key={idx}
                                className={`blog-card ${post.featured ? 'featured' : ''}`}
                                ref={el => blogCardsRef.current[idx] = el}
                            >
                                <div className="blog-card-image">
                                    <img src={post.image} alt={post.title} />
                                    <span className="blog-category">{post.category}</span>
                                </div>
                                <div className="blog-card-content">
                                    <div className="blog-meta">
                                        <span>
                                            <Calendar size={14} />
                                            {post.date}
                                        </span>
                                        <span>
                                            <User size={14} />
                                            {post.author}
                                        </span>
                                    </div>
                                    <h3>{post.title}</h3>
                                    <p>{post.excerpt}</p>
                                    <Link to={`/blog/${post.id}`} className="blog-read-more">
                                        Read More
                                        <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="page-cta">
                <div className="cta-container">
                    <h2>Ready to Upgrade Your Infrastructure?</h2>
                    <p>Let us design a fiber solution that meets your specific needs today.</p>
                    <Link to="/contact" className="btn-primary">
                        Request a Consultation
                    </Link>
                </div>
            </section>
        </PageLayout>
    )
}

export default FiberDataCenter
