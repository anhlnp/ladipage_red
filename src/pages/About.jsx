import PageLayout from '../components/PageLayout/PageLayout'
import ServiceHero from '../components/ServiceHero/ServiceHero'
import './ServicePage.css'

const About = () => {
    return (
        <PageLayout>
            <ServiceHero
                tag="ABOUT US"
                title="Select"
                gradientText="Tech Inc."
                description="Trusted IT Support for over 23 years. Select Tech was established in 2002 to provide the same level of professionalism that our soldiers, sailors & marines demonstrate on a daily basis."
            />

            {/* Reduced whitespace - Content closer to subtitle */}
            <section className="service-content" style={{ paddingTop: '30px' }}>
                <div className="content-container">
                    {/* Founder Section - Top Priority */}
                    <div className="content-block glass-box" style={{ gridColumn: '1 / -1' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '40px',
                            flexWrap: 'wrap'
                        }}>
                            <div style={{
                                flexShrink: 0,
                                textAlign: 'center'
                            }}>
                                <div style={{
                                    width: '180px',
                                    height: '180px',
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    border: '4px solid var(--accent-primary)',
                                    margin: '0 auto 15px'
                                }}>
                                    <img
                                        src="/Willis_Retired_Navy.png"
                                        alt="Dave Willis - Founder"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                                <h3 style={{ fontSize: '1.3rem', marginBottom: '5px' }}>Dave Willis</h3>
                                <p style={{ color: 'var(--accent-primary)', fontSize: '0.95rem', fontWeight: '500' }}>
                                    Founder – IT Consulting
                                </p>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '5px' }}>
                                    US Navy Veteran
                                </p>
                            </div>
                            <div style={{ flex: '1', minWidth: '300px' }}>
                                <h3>Our History & Mission</h3>
                                <p>
                                    We are a Veteran-owned small business that has been serving the community for the past twenty years.
                                    At Select Tech our employees are trained and work as a team and put their customers first.
                                </p>
                                <p style={{ marginTop: '15px' }}>
                                    The mission statement reflects the same professionalism the founder, David Willis, has always lived by:
                                    <strong style={{ color: 'var(--accent-primary)' }}>"Keep your word, do your best"</strong>.
                                </p>
                                <p style={{ marginTop: '15px' }}>
                                    At our location, we repair thousands of computers, mobile devices, and tablets a year.
                                    It would be our pleasure to speak with you and support any IT related issue you may have.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="content-block glass-box" style={{ gridColumn: 'span 2' }}>
                        <h3>Comprehensive IT Services</h3>
                        <p>
                            On-site services range from enterprise IT support for our small and medium businesses, non-profit, local, and residential to federal government clients.
                            We are experts at implementing Microsoft 2008-2015 active directory roll outs, disaster and recovery, firewall and security configuration & updates, and businesses continuity management.
                        </p>
                        <p style={{ marginTop: '15px' }}>
                            Additionally, we provide IT support to the Veterans Administration's Visual Impairment Services Team (VIST).
                            We travel throughout the state providing IT services to veterans with visual impairments.
                        </p>
                    </div>

                    <div className="content-block glass-box">
                        <h3>Certifications & Compliance</h3>
                        <div className="cert-badges">
                            <span className="cert-badge">NC Security Licensed</span>
                            <span className="cert-badge">FTC Compliant</span>
                            <span className="cert-badge">HIPAA Certified</span>
                            <span className="cert-badge">PCI-DSS</span>
                        </div>
                    </div>

                    <div className="content-block glass-box" style={{ gridColumn: '1 / -1' }}>
                        <h3>Why Choose Us</h3>
                        <ul className="feature-list" style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: '15px',
                            marginTop: '20px'
                        }}>
                            <li>#1 Ranked IT Security Provider in Hickory, NC</li>
                            <li>Certified Ethical Hackers On Staff</li>
                            <li>Veteran-Owned, 20+ Years Experience</li>
                            <li>Local Support + National-Level Cybersecurity Stack</li>
                            <li>All work 100% satisfaction guaranteed</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="page-cta">
                <div className="cta-container">
                    <h2>Ready to Work With Us?</h2>
                    <p>Contact our team today to discuss your IT and cybersecurity needs.</p>
                    <a href="/contact" className="btn-primary">Get in Touch</a>
                </div>
            </section>
        </PageLayout>
    )
}

export default About

