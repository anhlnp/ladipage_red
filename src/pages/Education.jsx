import PageLayout from '../components/PageLayout/PageLayout'
import ServiceHero from '../components/ServiceHero/ServiceHero'
import './ServicePage.css'

const Education = () => {
    const checklist = [
        "Educate Students, Teachers, and Staff",
        "Implement Strong Access Controls",
        "Secure Network Infrastructure",
        "Keep Software and Systems Updated",
        "Secure Wi-Fi Networks",
        "Backup Data Regularly",
        "Implement BYOD Policy",
        "Monitor Network Activity",
        "Develop Incident Response Plan",
        "Secure Physical Devices",
        "Engage Cybersecurity Professionals"
    ]

    return (
        <PageLayout>
            <ServiceHero
                tag="EDUCATION"
                title="Schools & Education"
                gradientText="Cybersecurity"
                description="Crucial protection for sensitive student information, ensuring availability of educational resources, and maintaining a safe digital learning environment."
            />
            
            <section className="service-content">
                <div className="content-container">
                    <div className="content-block glass-box" style={{ gridColumn: 'span 2' }}>
                        <h3>Securing the Future</h3>
                        <p>
                            Cybersecurity is crucial for schools to protect sensitive student information and maintain 
                            a safe digital learning environment. Select Tech helps educational institutions implement 
                            robust security measures to safeguard data and minimize risk.
                        </p>
                        
                        <h4 style={{ marginTop: '30px', marginBottom: '20px', fontSize: '1.2rem', color: 'var(--text-primary)' }}>
                            We help you implement:
                        </h4>
                        
                        <div className="service-cards" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
                            {checklist.map((item, idx) => (
                                <div key={idx} className="service-card glass-box-light" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <span style={{ color: 'var(--accent-primary)', fontSize: '1.2rem' }}>🎓</span>
                                    <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="page-cta">
                <div className="cta-container">
                    <h2>Safe Digital Learning</h2>
                    <p>Protect your students and staff. Contact us to secure your educational facility.</p>
                    <a href="/contact" className="btn-primary">Get Started</a>
                </div>
            </section>
        </PageLayout>
    )
}

export default Education
