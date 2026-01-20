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

            <section className="service-content">
                <div className="content-container">
                    <div className="content-block glass-box" style={{ gridColumn: 'span 2' }}>
                        <h3>Our History & Mission</h3>
                        <p>
                            We are a Veteran-owned small business that has been serving the community for the past twenty years.
                            At Select Tech our employees are trained and work as a team and put their customers first.
                            The mission statement reflects the same professionalism the founder, David Willis, has always lived by: “Keep your word, do your best”.
                        </p>
                        <p style={{ marginTop: '15px' }}>
                            At our location, we repair thousands of computers, mobile devices, and tablets a year.
                            It would be our pleasure to speak with you and support any IT related issue you may have.
                        </p>
                    </div>

                    <div className="content-block glass-box">
                        <h3>Comprehensive IT Services</h3>
                        <p>
                            On-site services range from enterprise IT support for our small and medium businesses, non-profit, local, and residential to federal government clients.
                            We are experts at implementing Microsoft 2008-2012 active directory roll outs, disaster and recovery, firewall and security configuration & updates, and businesses continuity management.
                        </p>
                        <p style={{ marginTop: '15px' }}>
                            Additionally, we provide IT support to the Veterans Administration’s Visual Impairment Services Team (VIST).
                            We travel throughout the state providing IT services to veterans with visual impairments.
                        </p>
                    </div>

                    <div className="content-block glass-box" style={{ gridColumn: 'span 2' }}>
                        <h3>Why Choose Us</h3>
                        <ul className="feature-list">
                            <li>#1 Ranked IT Security Provider in Hickory, NC</li>
                            <li>Certified Ethical Hackers On Staff</li>
                            <li>Veteran-Owned, 20+ Years Experience</li>
                            <li>Local Support + National-Level Cybersecurity Stack</li>
                            <li>All work 100% satisfaction guaranteed</li>
                        </ul>
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
                </div>
            </section>
        </PageLayout>
    )
}

export default About
