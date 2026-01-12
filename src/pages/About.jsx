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
                description="Trusted IT Support for over 23 years. We are a veteran-owned company providing enterprise-level IT solutions to businesses in Hickory, NC and surrounding areas."
            />
            
            <section className="service-content">
                <div className="content-container">
                    <div className="content-block glass-box">
                        <h3>Our Mission</h3>
                        <p>
                            Select Tech delivers fast, reliable IT support to protect your business and staff. 
                            We focus on building lasting relationships with our clients, providing personalized 
                            technology solutions that help businesses thrive in today's digital landscape.
                        </p>
                    </div>
                    
                    <div className="content-block glass-box">
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
