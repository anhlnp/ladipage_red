import { Shield, Eye, Lock, Activity, Users, AlertTriangle, FileText } from 'lucide-react'
import PageLayout from '../components/PageLayout/PageLayout'
import ServiceHero from '../components/ServiceHero/ServiceHero'
import './ServicePage.css'

const CloudSOCMonitoring = () => {
    return (
        <PageLayout>
            <ServiceHero
                tag="SOC MONITORING"
                title="Cloud Based"
                gradientText="SOC Monitoring"
                description="Providing 24×7 Security Operations Center (SOC), Identity Threat Detection & Alerts, Active Directory & Endpoint Protection Monitoring."
            />

            <section className="service-content">
                <div className="content-container">
                    {/* Service Overview - Full Width with Image */}
                    <div className="content-block glass-box" style={{ gridColumn: '1 / -1' }}>
                        <div className="block-image-container" style={{ marginBottom: '30px', borderRadius: '12px', overflow: 'hidden', height: '550px' }}>
                            <img
                                src="/cloud-computing-electronic-chip-board-cloud-computer-is-system-transfer-data-information-upload-download-application-technology-transformation-concept.jpg"
                                alt="Cloud Computing Circuit Board"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                        <h3>Comprehensive Cybersecurity & Network Monitoring</h3>
                        <p>
                            Select Tech delivers a risk-focused approach to monitoring and managing critical IT systems across diverse business environments.
                            Our integrated Security Operations Center (SOC) and Network Operations Center (NOC) operate continuously found to identify
                            abnormal activity, detect emerging threats, and maintain the stability and performance of your network.
                        </p>
                        <p style={{ marginTop: '15px' }}>
                            This engagement provides continuous operational oversight, proactive security monitoring, and compliance-aligned controls
                            for Meraki Switches, WatchGuard Wireless Management, and your entire network ecosystem.
                        </p>

                        <div className="service-cards" style={{ marginTop: '30px', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
                            <div className="service-card glass-box-light">
                                <div className="icon"><Eye size={32} /></div>
                                <h4>Proactive Threat Detection</h4>
                                <p>Continuous monitoring of network performance and security events with response coordination.</p>
                            </div>
                            <div className="service-card glass-box-light">
                                <div className="icon"><Users size={32} /></div>
                                <h4>Identity Oversight</h4>
                                <p>Safeguarding user accounts and privileged access monitoring.</p>
                            </div>
                            <div className="service-card glass-box-light">
                                <div className="icon"><FileText size={32} /></div>
                                <h4>Compliance Aligned</h4>
                                <p>Logging, alerting, and reporting aligned with regulatory requirements.</p>
                            </div>
                        </div>
                    </div>

                    {/* Identity Threat Detection */}
                    <div className="content-block glass-box" style={{ gridColumn: 'span 2' }}>
                        <h3>Identity Threat Detection & Credential Security</h3>
                        <p>
                            Protecting user identities and privileged accounts is essential for maintaining strong security.
                            Select Tech leverages the Cylerian ITDR (Identity Threat Detection & Response) platform to continuously
                            monitor authentication activity, account behavior, and directory changes.
                        </p>
                        <p style={{ marginTop: '15px' }}>
                            Our SOC engineers review, validate, investigate, and escalate identity-based alerts whenever action is required,
                            ensuring rapid response and continuous visibility.
                        </p>
                        <div className="feature-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '25px' }}>
                            <div className="feature-item" style={{ display: 'flex', gap: '15px' }}>
                                <Lock size={24} style={{ color: 'var(--accent-primary)', minWidth: '24px' }} />
                                <div>
                                    <h5 style={{ color: 'var(--text-primary)', marginBottom: '5px' }}>Privileged Account Review</h5>
                                    <p style={{ fontSize: '0.9rem' }}>Analyzing domain admin and service accounts for high-risk behaviors.</p>
                                </div>
                            </div>
                            <div className="feature-item" style={{ display: 'flex', gap: '15px' }}>
                                <AlertTriangle size={24} style={{ color: 'var(--accent-primary)', minWidth: '24px' }} />
                                <div>
                                    <h5 style={{ color: 'var(--text-primary)', marginBottom: '5px' }}>Compromise Detection</h5>
                                    <p style={{ fontSize: '0.9rem' }}>Monitoring for password reuse, repeated failures, and suspicious access.</p>
                                </div>
                            </div>
                            <div className="feature-item" style={{ display: 'flex', gap: '15px' }}>
                                <Activity size={24} style={{ color: 'var(--accent-primary)', minWidth: '24px' }} />
                                <div>
                                    <h5 style={{ color: 'var(--text-primary)', marginBottom: '5px' }}>Directory Analysis</h5>
                                    <p style={{ fontSize: '0.9rem' }}>Monitoring Active Directory for unauthorized changes and privilege adjustments.</p>
                                </div>
                            </div>
                            <div className="feature-item" style={{ display: 'flex', gap: '15px' }}>
                                <Shield size={24} style={{ color: 'var(--accent-primary)', minWidth: '24px' }} />
                                <div>
                                    <h5 style={{ color: 'var(--text-primary)', marginBottom: '5px' }}>Critical Escalation</h5>
                                    <p style={{ fontSize: '0.9rem' }}>Prompt notification for improved identity hygiene and security guidance.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Side Image Column */}
                    <div className="content-block glass-box" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ flex: 1, minHeight: '200px' }}>
                            <img
                                src="/cloud-system-tablet-background-smart-technology-remixed-media.jpg"
                                alt="Cloud Security Monitoring"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                        <div style={{ flex: 1, minHeight: '200px' }}>
                            <img
                                src="/futuristic-business-scene-with-ultra-modern-ambiance.jpg"
                                alt="Modern SOC Environment"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                    </div>

                </div>
            </section>

            <section className="page-cta">
                <div className="cta-container">
                    <h2>Secure Your Infrastructure</h2>
                    <p>Get 24/7 monitoring and proactive threat detection for your business.</p>
                    <a href="/contact" className="btn-primary">Start Monitoring Today</a>
                </div>
            </section>
        </PageLayout>
    )
}

export default CloudSOCMonitoring
