import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Shield, Eye, Lock, Activity, Users, AlertTriangle, FileText,
    Search, Bell, MapPin, Zap, MonitorCheck,
    CheckCircle2, Building2, Stethoscope, Scale, Factory, Car, Pill,
    ArrowRight, Send, Target, RefreshCw, Globe, Server, Cpu
} from 'lucide-react'
import PageLayout from '../components/PageLayout/PageLayout'
import ServiceHero from '../components/ServiceHero/ServiceHero'
import './ServicePage.css'
import './CloudSOCMonitoring.css'

const CloudSOCMonitoring = () => {
    const [formData, setFormData] = useState({
        name: '', company: '', email: '', phone: '', endpoints: '', industry: '', message: ''
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        alert('Thank you! We will be in touch shortly.')
        setFormData({ name: '', company: '', email: '', phone: '', endpoints: '', industry: '', message: '' })
    }

    /* ---- VM Capabilities ---- */
    const vmCapabilities = [
        'Continuous asset discovery across cloud, on-prem, and hybrid environments',
        'Risk-based prioritization using exploit activity, threat intelligence, and asset criticality',
        'Cloud posture monitoring for misconfigurations, identity risk, and security drift',
        'Faster remediation cycles aligned with IT operations and change control',
        'Zero Trust alignment, validating device, identity, and workload posture continuously',
        'Audit-ready reporting supporting HIPAA, FTC Safeguards, NIST, PCI, and cyber-insurance',
        'Reduced ransomware and breach risk through proactive exposure reduction'
    ]

    /* ---- VM Result ---- */
    const vmResults = [
        'Fewer exploitable weaknesses',
        'Stronger cloud governance',
        'Faster response to emerging threats',
        'Lower compliance and insurance friction',
        'Zero Trust environment'
    ]

    /* ---- ZT Includes ---- */
    const ztIncludes = [
        'Approved-only application execution',
        'Blocking of unauthorized scripts, macros, and PowerShell activity',
        'Restrictions on application access to sensitive files and systems',
        'Protection against fileless and "living-off-the-land" attacks',
        'Audit logs and reporting for compliance and cyber insurance'
    ]

    /* ---- ZT Reduces ---- */
    const ztReduces = [
        'Ransomware attacks',
        'Credential theft and account abuse',
        'Fileless malware',
        'Insider misuse',
        'Insurance and compliance exposure'
    ]

    /* ---- Industries ---- */
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

    /* ---- Why Choose ---- */
    const whyChoose = [
        'Preventive security, not reactive cleanup',
        'Policies managed by experienced cybersecurity professionals',
        'Reduced risk for cyber insurance and regulatory reviews',
        'Enterprise-level protection without operational complexity'
    ]

    return (
        <PageLayout>
            {/* ============ HERO ============ */}
            <ServiceHero
                tag="SOC MONITORING"
                title="Cloud Based"
                gradientText="SOC Monitoring"
                description="24/7 SOC monitoring by real cybersecurity professionals — not just alerts, but action."
            />

            {/* ============ Hero Image ============ */}
            <section className="hero-image-section">
                <div className="hero-image-container">
                    <img
                        src="/cloud-computing-electronic-chip-board-cloud-computer-is-system-transfer-data-information-upload-download-application-technology-transformation-concept.jpg"
                        alt="Cloud SOC Monitoring"
                        className="hero-image"
                    />
                </div>
            </section>

            {/* ============ SECTION 1: Why Choose Select Tech ============ */}
            <section className="soc-section">
                <div className="section-inner">
                    <div className="soc-section-header">
                        <span className="soc-section-tag">Why Choose Select Tech</span>
                        <h2 className="soc-section-title">
                            Select Tech as Your{' '}
                            <span className="gradient-text">Security Operations Center</span>
                        </h2>
                    </div>

                    <div className="soc-overview-with-image">
                        <div className="soc-overview-text">
                            <h3>SOC-as-a-Service That Stops Problems Early</h3>
                            <p>
                                Security issues don't start with alarms — they start with small warning signs
                                that are easy to miss. Like a vehicle's check engine light, those signals often
                                go unnoticed until something breaks.
                            </p>
                            <p>
                                Select Tech Inc. provides SOC-as-a-Service, delivering continuous monitoring,
                                early threat detection, and rapid response to help businesses avoid downtime,
                                data loss, and compliance issues. We act as an extension of your IT team,
                                watching your environment so problems are addressed before they escalate.
                            </p>
                            <p>
                                Our clients range from small organizations with as few as <strong>5 endpoints</strong> to
                                complex environments with <strong>1,000+ devices</strong>. Our SOC is architected to support
                                distributed organizations across multiple offices, campuses, and geographic regions.
                            </p>
                            <p>
                                By combining identity-first threat detection, endpoint and network visibility,
                                SaaS activity monitoring, and compliance-ready incident response workflows,
                                Select Tech delivers centralized security oversight that scales seamlessly—from
                                single-site businesses to sophisticated enterprise infrastructures.
                            </p>
                        </div>
                        <div className="soc-overview-image glass-box">
                            <img
                                src="/Comprehensive-Guide-to-Security-Operations.jpg"
                                alt="Security Operations Overview"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ SECTION 2: Real-World SOC Saves ============ */}
            <section className="soc-section soc-saves-section">
                <div className="section-inner">
                    <div className="soc-section-header">
                        <span className="soc-section-tag">Case Studies</span>
                        <h2 className="soc-section-title">
                            Recent Real-World{' '}
                            <span className="gradient-text">SOC Saves</span>
                        </h2>
                    </div>

                    <div className="soc-cases-row">
                        <div className="soc-case-card glass-box">
                            <div className="case-card-image">
                                <img src="/dental_clinic.png" alt="Dental Practice SOC Case" />
                            </div>
                            <div className="case-card-body">
                                <span className="case-badge dental">Large Dental Practice</span>
                                <h4>17 Dental Operatories</h4>
                                <p>
                                    Our SOC detected a cloud email account accessed through a VPN connection
                                    from Germany, while the employee was working in the U.S. — an impossible
                                    travel scenario. Access was immediately secured, preventing data exposure
                                    and helping the practice maintain HIPAA compliance.
                                </p>
                            </div>
                        </div>

                        <div className="soc-case-card glass-box">
                            <div className="case-card-image">
                                <div className="soc-img-placeholder">
                                    <Factory size={40} />
                                    <span>Image Placeholder</span>
                                </div>
                            </div>
                            <div className="case-card-body">
                                <span className="case-badge manufacturing">NC Manufacturing</span>
                                <h4>North Carolina Manufacturing Company</h4>
                                <p>
                                    Overnight monitoring revealed abnormal system behavior that bypassed
                                    traditional antivirus tools. Our SOC isolated the system within minutes,
                                    stopping a potential ransomware event before operations were disrupted.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Co-managed block */}
                    <div className="soc-comanaged glass-box">
                        <div className="comanaged-content">
                            <h3>Real Analysts, Not Just Software</h3>
                            <p>
                                We work alongside some of the area's largest employers and internal IT departments
                                using a co-managed IT support and SOC model. Outsourcing your SOC is smarter,
                                more cost-effective, and consistently delivers better protection and documentation
                                than building a 24/7 SOC internally.
                            </p>
                            <p className="comanaged-highlight">
                                You keep control. We provide the monitoring, expertise, and audit-ready records
                                insurers and regulators expect.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ CTA Banner ============ */}
            <div className="soc-transition-banner">
                <div className="banner-inner glass-box">
                    <p>Don't wait for a failure to find the problem.</p>
                    <Link to="/contact" className="btn-primary" style={{ marginTop: '16px', display: 'inline-flex', alignItems: 'center' }}>
                        Schedule a SOC Readiness Review <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                    </Link>
                    <p className="banner-disclaimer">
                        Disclaimer: Examples are anonymized and summarized for illustrative purposes.
                        Outcomes vary by environment and response timing.
                    </p>
                </div>
            </div>

            {/* ============ SECTION 3: Compliance ============ */}
            <section className="soc-section soc-compliance-section">
                <div className="section-inner">
                    <div className="soc-section-header">
                        <span className="soc-section-tag">Compliance</span>
                        <h2 className="soc-section-title">
                            FDA, FTC Safeguards, HIPAA,{' '}
                            <span className="gradient-text">PCI Compliance</span>
                        </h2>
                    </div>

                    <div className="soc-compliance-layout">
                        <div className="soc-compliance-text">
                            <p className="compliance-lead">
                                When something happens, it's not enough to "fix it." You need to prove what
                                happened, when it happened, and how it was handled.
                            </p>
                            <p>
                                Our SOC captures timelines, activity records, and supporting evidence that
                                align with HIPAA, FTC Safeguards, NIST, and cyber-insurance expectations—without
                                adding work for your staff. Leadership receives clear, plain-language summaries,
                                while technical teams have the detail they need when it matters.
                            </p>
                            <p>
                                And because our SOC is based in <strong>North Carolina</strong>, accountability
                                is real. You're working with engineers who know your environment—not an offshore
                                call center reading from a script.
                            </p>
                            <div className="compliance-advantage glass-box">
                                <CheckCircle2 size={20} className="check-icon" />
                                <span>
                                    Advantage of having a Cloud Native SOC for your FDA, FTC Safeguards, HIPAA,
                                    and other compliance documentation requirements.
                                </span>
                            </div>
                        </div>
                        <div className="soc-compliance-image glass-box">
                            <img
                                src="/Satisfied _FTC_Safeguards _Audit_photo_Jan_2026.png"
                                alt="FTC Safeguards Audit Compliance"
                            />
                        </div>
                    </div>

                    <div className="soc-quote-block">
                        <blockquote>
                            "We don't just monitor threats — we reduce the weaknesses attackers rely on."
                        </blockquote>
                    </div>
                </div>
            </section>

            {/* ============ SECTION 4: Vulnerability Management ============ */}
            <section className="soc-section soc-vm-section">
                <div className="section-inner">
                    <div className="soc-section-header">
                        <span className="soc-section-tag">Vulnerability Management</span>
                        <h2 className="soc-section-title">
                            Vulnerability Management as Part of{' '}
                            <span className="gradient-text">SOC Cloud Monitoring</span>
                        </h2>
                    </div>

                    <div className="soc-vm-layout">
                        <div className="soc-vm-image glass-box">
                            <img
                                src="/futuristic-business-scene-with-ultra-modern-ambiance.jpg"
                                alt="SOC Dashboard"
                            />
                        </div>
                        <div className="soc-vm-text">
                            <p>
                                Modern cyber incidents don't start with alarms — they begin with small,
                                overlooked weaknesses. Cloud services evolve daily, applications change
                                constantly, identities sprawl, and misconfigurations quietly expand the
                                attack surface.
                            </p>
                            <p>
                                Select Tech's SOC integrates continuous Vulnerability Management directly
                                into our 24/7 cloud monitoring operations, aligned with Zero Trust principles.
                                This approach provides ongoing visibility into exposure across cloud, hybrid,
                                and distributed environments.
                            </p>
                            <p>
                                We continuously discover assets across cloud platforms, endpoints, networks,
                                identities, SaaS applications, and workloads. Vulnerabilities are validated,
                                prioritized, and tracked based on real-world exploitability, active threat
                                intelligence, and business impact—not just severity scores.
                            </p>
                        </div>
                    </div>

                    {/* How VM Strengthens SOC */}
                    <div className="soc-vm-capabilities">
                        <h3>How Vulnerability Management Strengthens Our SOC</h3>
                        <div className="vm-caps-grid">
                            {vmCapabilities.map((cap, idx) => (
                                <div key={idx} className="vm-cap-item glass-box">
                                    <CheckCircle2 size={18} className="check-icon" />
                                    <span>{cap}</span>
                                </div>
                            ))}
                        </div>
                        <p className="vm-note">
                            This approach moves organizations from reactive patching to measurable,
                            risk-driven vulnerability reduction.
                        </p>
                    </div>

                    {/* SOC + VM */}
                    <div className="soc-vm-combined glass-box">
                        <h3>SOC + Vulnerability Management = <span className="gradient-text">Real Protection</span></h3>
                        <p>
                            Unlike standalone vulnerability tools, Select Tech's SOC correlates vulnerability
                            data with live threat activity. When exploitation attempts occur, our analysts
                            already understand:
                        </p>
                        <ul className="vm-understand-list">
                            <li><Target size={16} /> Which assets are exposed</li>
                            <li><AlertTriangle size={16} /> Which vulnerabilities matter most</li>
                            <li><Shield size={16} /> What business impact is at risk</li>
                        </ul>
                        <p>
                            This allows our SOC to respond faster, contain threats sooner, and document
                            every action clearly for leadership, auditors, and insurers.
                        </p>
                    </div>

                    {/* The Result */}
                    <div className="soc-vm-results">
                        <h3>The Result</h3>
                        <div className="vm-results-grid">
                            {vmResults.map((item, idx) => (
                                <div key={idx} className="vm-result-pill glass-box">
                                    <CheckCircle2 size={18} className="check-icon" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ SECTION 5: Zero Trust ============ */}
            <section className="soc-section zero-trust-section">
                <div className="section-inner">
                    <div className="soc-section-header">
                        <span className="soc-section-tag">Zero Trust Security</span>
                        <h2 className="soc-section-title">
                            Zero Trust{' '}
                            <span className="gradient-text">Application Control</span>
                        </h2>
                        <p className="soc-section-subtitle">
                            Stop zero-day exploits before they wreck your business.
                        </p>
                    </div>

                    {/* What Is Zero Trust */}
                    <div className="zt-intro-block glass-box">
                        <h3>What Is Zero Trust Security?</h3>
                        <p>
                            Today's cyberattacks hide in plain sight, using trusted tools already on your systems.
                            Select Tech partners with ThreatLocker, the industry leader in Zero-Trust security,
                            to stop these threats at the source.
                        </p>
                        <p>
                            Zero Trust operates on a simple rule: if it isn't approved, it doesn't run.
                            This stops ransomware, fileless malware, credential abuse, and insider misuse at the source.
                        </p>
                        <div className="zt-reduces-grid">
                            {ztReduces.map((item, idx) => (
                                <span key={idx} className="zt-pill">{item}</span>
                            ))}
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
                                All policies are deployed, monitored, and maintained by Select Tech to ensure
                                security without disrupting operations.
                            </p>
                        </div>

                        <div className="zt-feature-block glass-box">
                            <h4>More Than Basic Allowlisting</h4>
                            <p>
                                Security isn't just about what runs—it's about what applications are <strong>allowed to do</strong>.
                            </p>
                            <p>
                                Select Tech limits approved software to its intended purpose, blocking unauthorized
                                access to files, credentials, and system components. This prevents ransomware and
                                misuse even when threats originate from trusted tools.
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
                            <div className="form-row">
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
                                <select
                                    name="industry"
                                    value={formData.industry}
                                    onChange={handleChange}
                                >
                                    <option value="">Industry</option>
                                    <option value="healthcare">Healthcare / Dental</option>
                                    <option value="legal">Legal / Accounting</option>
                                    <option value="manufacturing">Manufacturing</option>
                                    <option value="automotive">Automotive Dealership</option>
                                    <option value="pharmaceutical">Pharmaceutical</option>
                                    <option value="education">Education</option>
                                    <option value="government">Government / Agency</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
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
