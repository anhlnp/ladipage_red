import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Shield, Eye, Lock, Activity, Users, AlertTriangle, FileText,
    Search, Bell, MapPin, Crosshair, Zap, MonitorCheck,
    CheckCircle2, Building2, Stethoscope, Scale, Factory, Car, Pill,
    ArrowRight, Send
} from 'lucide-react'
import PageLayout from '../components/PageLayout/PageLayout'
import ServiceHero from '../components/ServiceHero/ServiceHero'
import './ServicePage.css'
import './CloudSOCMonitoring.css'

const CloudSOCMonitoring = () => {
    const [formData, setFormData] = useState({
        name: '', company: '', email: '', phone: '', endpoints: '', message: ''
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Submit logic here
        alert('Thank you! We will be in touch shortly.')
        setFormData({ name: '', company: '', email: '', phone: '', endpoints: '', message: '' })
    }

    /* ---- Data ---- */
    const socFeatures = [
        {
            icon: <Shield size={22} />,
            title: 'CEH-Led SOC Oversight',
            desc: 'Your environment is monitored and guided by a Certified Ethical Hacker (CEH)–led security team that thinks like attackers and defends like professionals.'
        },
        {
            icon: <Eye size={22} />,
            title: '24/7 Threat Monitoring & Response',
            desc: 'Continuous monitoring of endpoints, identities, and network activity with rapid response to suspicious or malicious behavior.'
        },
        {
            icon: <Activity size={22} />,
            title: 'Behavior-Based Threat Detection',
            desc: 'We detect attacks based on how systems behave, not just signatures—stopping ransomware, fileless malware, and living-off-the-land attacks early.'
        },
        {
            icon: <Zap size={22} />,
            title: 'Immediate Incident Containment',
            desc: 'Isolate compromised systems, terminate malicious processes, and block further execution before damage spreads.'
        },
        {
            icon: <Users size={22} />,
            title: 'Identity & Privilege Abuse Monitoring',
            desc: 'Detect abnormal login behavior, credential misuse, lateral movement, and unauthorized access attempts.'
        },
        {
            icon: <Search size={22} />,
            title: 'Proactive Threat Hunting',
            desc: 'Our SOC actively searches for hidden threats that automated tools may miss—before they become incidents.'
        },
        {
            icon: <FileText size={22} />,
            title: 'Forensic Evidence Preservation',
            desc: 'Capture logs, timelines, and artifacts to support insurance claims, legal review, and compliance audits.'
        },
        {
            icon: <Lock size={22} />,
            title: 'Compliance-Ready Documentation',
            desc: 'Detailed incident records aligned with HIPAA, FTC Safeguards, NIST, and cyber-insurance requirements.'
        },
        {
            icon: <Bell size={22} />,
            title: 'Real-Time Alerts & Executive Reporting',
            desc: 'Clear, actionable alerts for your team and plain-language reports for leadership—no security jargon.'
        },
        {
            icon: <MapPin size={22} />,
            title: 'Local SOC. Real Accountability.',
            desc: 'A North Carolina-based SOC with real engineers you can call—not an offshore call center.'
        }
    ]

    const industries = [
        {
            icon: <Stethoscope size={20} />,
            title: 'Dental & Medical Practices',
            desc: 'Only approved clinical software can access patient records. Unauthorized tools and malware are blocked from viewing, exporting, or encrypting protected health information.'
        },
        {
            icon: <Scale size={20} />,
            title: 'Law Firms',
            desc: 'Legal applications operate normally, while unapproved software, scripts, and macros are prevented from accessing confidential client files.'
        },
        {
            icon: <Factory size={20} />,
            title: 'Manufacturing & Machine Shops',
            desc: 'Production and design software runs as expected, while ransomware and unauthorized utilities are blocked from disrupting operations or encrypting proprietary data.'
        },
        {
            icon: <Car size={20} />,
            title: 'Automotive Dealerships',
            desc: 'Dealer systems function without interruption, while credential-harvesting tools and unauthorized applications are blocked from accessing customer and financial data.'
        },
        {
            icon: <Pill size={20} />,
            title: 'Pharmaceutical & Regulated Manufacturing',
            desc: 'Only validated applications can execute or interact with controlled systems, supporting audit requirements and preventing unauthorized changes.'
        }
    ]

    const whyChoose = [
        'Preventive security, not reactive cleanup',
        'Policies managed by experienced cybersecurity professionals',
        'Reduced risk for cyber insurance and regulatory reviews',
        'Enterprise-level protection without operational complexity'
    ]

    const ztIncludes = [
        'Approved-only application execution',
        'Blocking of unauthorized scripts, macros, and PowerShell activity',
        'Restrictions on application access to sensitive files and systems',
        'Protection against fileless and "living-off-the-land" attacks',
        'Full audit logs and reporting for compliance and cyber insurance'
    ]

    return (
        <PageLayout>
            {/* ============ HERO ============ */}
            <ServiceHero
                tag="SOC MONITORING"
                title="Cloud Based"
                gradientText="SOC Monitoring"
                description="Select Tech as Your Security Operations Center (SOC). Providing 24×7 threat monitoring, identity threat detection, behavior-based response, and compliance-aligned reporting—led by Certified Ethical Hackers."
            />

            {/* ============ Hero Banner Image ============ */}
            <section className="hero-image-section">
                <div className="hero-image-container">
                    <img
                        src="/cloud-computing-electronic-chip-board-cloud-computer-is-system-transfer-data-information-upload-download-application-technology-transformation-concept.jpg"
                        alt="Cloud Computing Circuit Board"
                        className="hero-image"
                    />
                </div>
            </section>

            {/* ============ SECTION 1: SOC Overview ============ */}
            <section className="soc-section">
                <div className="section-inner">
                    <div className="soc-section-header">
                        <span className="soc-section-tag">Security Operations Center</span>
                        <h2 className="soc-section-title">
                            Comprehensive Cybersecurity &{' '}
                            <span className="gradient-text">Network Monitoring</span>
                        </h2>
                        <p className="soc-section-subtitle">
                            Select Tech delivers a risk-focused approach to monitoring and managing critical IT systems.
                            Our integrated SOC operates continuously to identify abnormal activity, detect emerging threats,
                            and maintain the stability and performance of your network.
                        </p>
                    </div>

                    <div className="soc-overview-grid">
                        <div className="soc-overview-card glass-box">
                            <div className="card-icon"><Eye size={28} /></div>
                            <h4>Proactive Threat Detection</h4>
                            <p>Continuous monitoring of network performance and security events with real-time response coordination.</p>
                        </div>
                        <div className="soc-overview-card glass-box">
                            <div className="card-icon"><Users size={28} /></div>
                            <h4>Identity Oversight</h4>
                            <p>Safeguarding user accounts, privileged access monitoring, and credential abuse detection.</p>
                        </div>
                        <div className="soc-overview-card glass-box">
                            <div className="card-icon"><FileText size={28} /></div>
                            <h4>Compliance Aligned</h4>
                            <p>Logging, alerting, and reporting aligned with HIPAA, FTC Safeguards, NIST, and cyber-insurance requirements.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ SECTION 2: Why Choose Select Tech ============ */}
            <section className="soc-section">
                <div className="section-inner">
                    <div className="soc-section-header">
                        <span className="soc-section-tag">Why Choose Select Tech</span>
                        <h2 className="soc-section-title">
                            Select Tech as Your{' '}
                            <span className="gradient-text">Security Operations Center</span>
                        </h2>
                    </div>

                    <div className="soc-features-grid">
                        {socFeatures.map((feature, idx) => (
                            <div key={idx} className="soc-feature-card glass-box">
                                <div className="soc-feature-icon">{feature.icon}</div>
                                <div className="soc-feature-content">
                                    <h4>{feature.title}</h4>
                                    <p>{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Attack Flow Diagram */}
                    <div className="attack-flow-section">
                        <div className="soc-section-header">
                            <h2 className="soc-section-title">
                                How Select Tech{' '}
                                <span className="gradient-text">Stops Malicious Attacks</span>
                            </h2>
                            <div className="attack-flow-pills">
                                <span className="flow-pill">Behavior-based threat detection</span>
                                <span className="flow-pill">Cloud identity threat monitoring</span>
                                <span className="flow-pill">Continuous SOC monitoring & response</span>
                            </div>
                        </div>

                        <div className="attack-flow-grid">
                            {/* Card 1: Detection */}
                            <div className="attack-flow-card glass-box">
                                <span className="flow-card-badge detect">Advanced Endpoint Behavior</span>
                                <h4>Behavior Analysis</h4>
                                <ul className="flow-card-list">
                                    <li>Behavior analyzed</li>
                                    <li>Hidden execution detected</li>
                                    <li>Unusual parent process</li>
                                </ul>
                                <p className="flow-card-footer">
                                    Cylerian watches how PowerShell behaves, not what it says.
                                </p>
                            </div>

                            {/* Card 2: SOC Response */}
                            <div className="attack-flow-card glass-box">
                                <span className="flow-card-badge respond">Select Tech SOC</span>
                                <h4>Detection & Response</h4>
                                <ul className="flow-card-list">
                                    <li>Isolate endpoint</li>
                                    <li>Terminate process</li>
                                    <li>Disable execution</li>
                                    <li>Preserve evidence</li>
                                </ul>
                                <div className="flow-card-result alert">
                                    Attack Detected & Stopped
                                </div>
                            </div>

                            {/* Card 3: Cloud Identity */}
                            <div className="attack-flow-card glass-box">
                                <span className="flow-card-badge monitor">Cloud Identity Monitoring</span>
                                <h4>Credential & Cloud Watch</h4>
                                <ul className="flow-card-list">
                                    <li>Identity & app access monitored</li>
                                    <li>Unusual mass file access</li>
                                    <li>Suspicious mailbox activity</li>
                                </ul>
                                <p className="flow-card-footer">
                                    Reco.ai watches credentials and cloud behavior.
                                </p>
                                <div className="flow-card-result success">
                                    Threats neutralized in minutes
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ Image Break: Two Side-by-Side ============ */}
            <section className="soc-image-break">
                <div className="soc-image-break-inner">
                    <div className="soc-image-card glass-box">
                        <img
                            src="/cloud-system-tablet-background-smart-technology-remixed-media.jpg"
                            alt="Cloud Security Monitoring"
                        />
                        <div className="soc-image-overlay">
                            <span>Cloud Security Monitoring</span>
                        </div>
                    </div>
                    <div className="soc-image-card glass-box">
                        <img
                            src="/futuristic-business-scene-with-ultra-modern-ambiance.jpg"
                            alt="Modern SOC Environment"
                        />
                        <div className="soc-image-overlay">
                            <span>Modern SOC Environment</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ Transition Banner ============ */}
            <div className="soc-transition-banner">
                <div className="banner-inner glass-box">
                    <p>
                        For Ultimate Protection, Select Tech recommends adopting a{' '}
                        <span className="gradient-text">Zero Trust</span> environment.
                    </p>
                </div>
            </div>

            {/* ============ SECTION 3: Zero Trust ============ */}
            <section className="soc-section zero-trust-section">
                <div className="section-inner">
                    <div className="soc-section-header">
                        <span className="soc-section-tag">Zero Trust Security</span>
                        <h2 className="soc-section-title">
                            Zero Trust{' '}
                            <span className="gradient-text">Application Control</span>
                        </h2>
                        <p className="soc-section-subtitle">
                            Stop zero-day exploits before they wreck your business. Select Tech partners with ThreatLocker,
                            the industry leader in Zero-Trust security, to stop threats at the source.
                        </p>
                    </div>

                    {/* What Is Zero Trust */}
                    <div className="zt-intro-block glass-box">
                        <h3>What Is Zero Trust Security?</h3>
                        <p>
                            Zero Trust operates on a simple rule: only approved applications and actions are allowed to run.
                            Anything unapproved is blocked by default. Unlike traditional antivirus that reacts too late,
                            Zero Trust prevents malicious activity by allowing only approved applications and actions to execute.
                        </p>
                        <div className="zt-reduces-grid">
                            <span className="zt-pill">Ransomware attacks</span>
                            <span className="zt-pill">Credential theft</span>
                            <span className="zt-pill">Fileless malware</span>
                            <span className="zt-pill">Insider misuse</span>
                            <span className="zt-pill">Compliance exposure</span>
                        </div>
                    </div>

                    {/* Two Column: Includes + Beyond Allowlisting */}
                    <div className="zt-features-cols">
                        <div className="zt-feature-block glass-box">
                            <h4>Select Tech Zero Trust Includes</h4>
                            <ul className="zt-check-list">
                                {ztIncludes.map((item, idx) => (
                                    <li key={idx}>
                                        <CheckCircle2 size={18} className="check-icon" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p style={{ marginTop: '16px', fontSize: '0.88rem' }}>
                                All policies are monitored and maintained by Select Tech to ensure security never disrupts operations.
                            </p>
                        </div>

                        <div className="zt-feature-block glass-box">
                            <h4>Beyond Basic Allowlisting</h4>
                            <p>
                                Allowlisting alone is not enough. Select Tech enforces controls on <strong>how applications behave</strong>,
                                not just whether they exist.
                            </p>
                            <p>
                                Approved software is limited to its intended purpose. If an application attempts to access restricted files,
                                credentials, or system components, the action is blocked—stopping ransomware and misuse even when threats
                                originate from trusted tools.
                            </p>
                            <h4 style={{ marginTop: '24px' }}>Key Capabilities</h4>
                            <ul className="zt-check-list">
                                <li><CheckCircle2 size={18} className="check-icon" />Role-based and device-level security policies</li>
                                <li><CheckCircle2 size={18} className="check-icon" />Detailed reporting for audits and insurers</li>
                                <li><CheckCircle2 size={18} className="check-icon" />Centralized management across multiple locations</li>
                                <li><CheckCircle2 size={18} className="check-icon" />Integration with existing IT and security platforms</li>
                            </ul>
                        </div>
                    </div>

                    {/* Zero Trust by Industry */}
                    <div className="soc-section-header" style={{ marginTop: '40px' }}>
                        <h2 className="soc-section-title" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>
                            Zero Trust by <span className="gradient-text">Industry</span>
                        </h2>
                    </div>
                    <div className="zt-industry-grid">
                        {industries.map((ind, idx) => (
                            <div key={idx} className="zt-industry-card glass-box">
                                <div className="industry-icon">{ind.icon}</div>
                                <h5>{ind.title}</h5>
                                <p>{ind.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Why Businesses Choose */}
                    <div className="soc-section-header" style={{ marginTop: '60px' }}>
                        <h2 className="soc-section-title" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>
                            Why Businesses Choose <span className="gradient-text">Select Tech</span>
                        </h2>
                    </div>
                    <div className="zt-why-grid">
                        {whyChoose.map((item, idx) => (
                            <div key={idx} className="zt-why-item glass-box">
                                <div className="why-icon"><CheckCircle2 size={20} /></div>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                    <p className="zt-tagline">Prevent. Control. Monitor. Document.</p>
                </div>
            </section>

            {/* ============ QUOTE / CTA Section ============ */}
            <section className="soc-quote-section">
                <div className="soc-quote-inner">
                    <div className="soc-quote-content">
                        <h2>Need a Quote?<br />We Can Help.</h2>
                        <p className="tagline">No two businesses are alike. Every environment is different.</p>
                        <p>
                            We provide a custom quote built around your actual endpoint count, applications,
                            and security requirements—so you can budget accurately and deploy with confidence.
                        </p>
                        <ul className="quote-benefits">
                            <li>
                                <CheckCircle2 size={18} className="benefit-icon" />
                                <span><strong>Predictable pricing:</strong> Costs based on real-world usage, enabling clear forecasting and easier internal approvals.</span>
                            </li>
                            <li>
                                <CheckCircle2 size={18} className="benefit-icon" />
                                <span><strong>Right-fit features:</strong> Security controls mapped directly to your specific risks and operational needs.</span>
                            </li>
                            <li>
                                <CheckCircle2 size={18} className="benefit-icon" />
                                <span><strong>No surprises:</strong> Full transparency on scope and pricing from day one—no last-minute changes.</span>
                            </li>
                        </ul>

                        <div className="soc-pricing-preview">
                            <div className="pricing-tier glass-box">
                                <h4>Essentials</h4>
                                <p>Core SOC monitoring & Zero Trust baseline</p>
                            </div>
                            <div className="pricing-tier glass-box featured">
                                <h4>Complete</h4>
                                <p>Full SOC + Zero Trust + compliance reporting</p>
                            </div>
                        </div>
                    </div>

                    {/* Intake Form */}
                    <div className="soc-quote-form-card glass-box">
                        <h3>Schedule a Security Review</h3>
                        <p>Fill out the form below and our team will reach out within 24 hours.</p>
                        <form className="soc-intake-form" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="company"
                                    placeholder="Company Name"
                                    value={formData.company}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-row">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone Number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            <select
                                name="endpoints"
                                value={formData.endpoints}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Estimated Endpoint Count</option>
                                <option value="1-25">1 – 25 endpoints</option>
                                <option value="26-50">26 – 50 endpoints</option>
                                <option value="51-100">51 – 100 endpoints</option>
                                <option value="101-250">101 – 250 endpoints</option>
                                <option value="250+">250+ endpoints</option>
                            </select>
                            <textarea
                                name="message"
                                placeholder="Tell us about your environment and security needs..."
                                value={formData.message}
                                onChange={handleChange}
                                rows={4}
                            />
                            <button type="submit" className="btn-primary">
                                Get Your Custom Quote <ArrowRight size={18} style={{ marginLeft: '8px', verticalAlign: 'middle' }} />
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* ============ Final CTA ============ */}
            <section className="page-cta">
                <div className="cta-container glass-box">
                    <div className="cta-content">
                        <h2>Secure Your Infrastructure</h2>
                        <p>Get 24/7 SOC monitoring, Zero Trust application control, and proactive threat detection for your business.</p>
                    </div>
                    <div className="cta-action">
                        <Link to="/contact" className="btn-primary">Start Monitoring Today</Link>
                    </div>
                </div>
            </section>
        </PageLayout>
    )
}

export default CloudSOCMonitoring
