import PageLayout from '../components/PageLayout/PageLayout'
import ServiceHero from '../components/ServiceHero/ServiceHero'
import './ServicePage.css'

const Cybersecurity = () => {
    const certifications = [
        "OSCP - Offensive Security Certified Professional",
        "OSWA - Offensive Security Web Assessor",
        "OSEP - Offensive Security Experienced Penetration Tester",
        "POSED - Offensive Security Exploit Developer",
        "OSCEv3 - Offensive Security Certified Expert 3",
        "OSWP - Offensive Security Wireless Professional",
        "CEH - Certified Ethical Hacker",
        "SEC+ - Security Plus"
    ]

    const pentestSteps = [
        { title: 'Reconnaissance', desc: 'Covertly obtaining information about the target before the actual cyber attack starts.' },
        { title: 'Scanning', desc: 'Used to create a profile of the target organization.' },
        { title: 'Vulnerability Assessment', desc: "Determines whether an organization's network, systems, and hardware have vulnerabilities." },
        { title: 'Exploitation', desc: 'Leveraging the vulnerabilities for malicious activity by hackers using exploit kits.' },
        { title: 'Reporting', desc: 'A detailed document explaining what was exploited and offering solutions.' }
    ]

    return (
        <PageLayout>
            <ServiceHero
                tag="CYBERSECURITY"
                title="Proactive"
                gradientText="Security Solutions"
                description="Protect what is important to you. Select Tech offers comprehensive solutions effectively integrating people, processes, and technology."
            />
            
            <section className="service-content">
                <div className="content-container">
                    {/* Certifications - Full Width */}
                    <div className="content-block glass-box" style={{ gridColumn: '1 / -1' }}>
                        <h3 style={{ textAlign: 'center', marginBottom: '30px' }}>Our Certifications</h3>
                        <div className="cert-badges" style={{ justifyContent: 'center' }}>
                            {certifications.map((cert, idx) => (
                                <span key={idx} className="cert-badge" style={{ padding: '12px 20px', fontSize: '0.9rem' }}>{cert}</span>
                            ))}
                        </div>
                    </div>

                    {/* Services Tiers */}
                    <div className="content-block glass-box">
                        <h3>Tier 1: Essentials</h3>
                        <ul className="feature-list compact">
                            <li>Consulting</li>
                            <li>Threat Analysis</li>
                            <li>Vulnerability Assessment</li>
                            <li>NetSec/Firewall</li>
                            <li>Tech Support (Mon-Fri 9-5)</li>
                        </ul>
                    </div>

                    <div className="content-block glass-box">
                        <h3>Tier 2: Advanced</h3>
                        <ul className="feature-list compact">
                            <li>All Tier 1 Services</li>
                            <li>Training / Zoom Live</li>
                            <li>Password 2Factor & Policy Guidelines</li>
                            <li>Enhanced Security Protocols</li>
                        </ul>
                    </div>

                    <div className="content-block glass-box">
                        <h3>Tier 3: 24/7 Complete</h3>
                        <ul className="feature-list compact">
                            <li>All Tier 2 Services</li>
                            <li><strong>24/7/365 Tech Support</strong></li>
                            <li>Endpoint Detection & Response (EDR)</li>
                            <li>Intrusion Detection System (IDS)</li>
                            <li>24/7/365 Network Monitoring/SIEM</li>
                        </ul>
                    </div>

                    {/* Penetration Testing */}
                    <div className="content-block glass-box" style={{ gridColumn: 'span 2' }}>
                        <h3>Penetration Testing Process</h3>
                        <p>
                            We use the latest tools and techniques to simulate real-world attacks. 
                            Our process provides a thorough evaluation of your systems.
                        </p>
                        <div className="service-cards" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                            {pentestSteps.map((step, idx) => (
                                <div key={idx} className="service-card glass-box-light">
                                    <div className="step-number" style={{ fontSize: '2rem', color: 'var(--accent-primary)', fontWeight: 'bold', marginBottom: '10px' }}>0{idx + 1}</div>
                                    <h4>{step.title}</h4>
                                    <p style={{ fontSize: '0.9rem' }}>{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="content-block glass-box">
                        <h3>Additional Services</h3>
                        <h4 style={{ color: 'var(--text-primary)', marginTop: '15px' }}>Program Management</h4>
                        <p>Customized programs to ensure cybersecurity efforts are properly planned, implemented, and monitored.</p>
                        
                        <h4 style={{ color: 'var(--text-primary)', marginTop: '15px' }}>Training Services</h4>
                        <p>Interactive sessions providing staff with skills to identify and prevent cyber threats.</p>
                    </div>

                </div>
            </section>
            
            <section className="page-cta">
                <div className="cta-container">
                    <h2>Secure Your Organization</h2>
                    <p>Don't wait for a breach. Partner with Select Tech for proactive protection.</p>
                    <a href="/contact" className="btn-primary">Get Security Audit</a>
                </div>
            </section>
        </PageLayout>
    )
}

export default Cybersecurity
