import PageLayout from '../components/PageLayout/PageLayout'
import ServiceHero from '../components/ServiceHero/ServiceHero'
import './ServicePage.css'

const AccountingLegal = () => {
    const checklist = [
        "Conduct Risk Assessments",
        "Implement Strong Access Controls",
        "Encrypt Data",
        "Secure Document Management",
        "Train Employees",
        "Maintain Strong Password Policies",
        "Use Secure Networks and Wi-Fi",
        "Secure Remote Access",
        "Implement Email Security Measures",
        "Regularly Update Software and Systems",
        "Backup Data Regularly",
        "Monitor and Audit Systems"
    ]

    return (
        <PageLayout>
            <ServiceHero
                tag="PROFESSIONAL SERVICES"
                title="Accounting & Legal"
                gradientText="Cybersecurity"
                description="Cybersecurity is essential for accounting and legal offices protecting sensitive client data, financial records, and legal documents."
            />
            
            <section className="service-content">
                <div className="content-container">
                    <div className="content-block glass-box" style={{ gridColumn: 'span 2' }}>
                        <h3>Protecting Client Trust</h3>
                        <p>
                            Protecting client data is critical to maintaining trust, complying with regulations, 
                            and avoiding potential legal and financial repercussions. Regardless of business size, 
                            cybersecurity must be a priority to safeguard sensitive information.
                        </p>
                        
                        <h4 style={{ marginTop: '30px', marginBottom: '20px', fontSize: '1.2rem', color: 'var(--text-primary)' }}>
                            Let Select Tech Cybersecurity help you implement:
                        </h4>
                        
                        <div className="service-cards" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
                            {checklist.map((item, idx) => (
                                <div key={idx} className="service-card glass-box-light" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <span style={{ color: 'var(--accent-primary)', fontSize: '1.2rem' }}>✓</span>
                                    <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="content-block glass-box">
                        <h3>Why It Matters</h3>
                        <p>
                            Accounting and legal firms are prime targets for cyber criminals due to the high value 
                            of data they possess. A breach can lead to:
                        </p>
                        <ul className="feature-list">
                            <li>Financial Theft & Fraud</li>
                            <li>Reputational Damage</li>
                            <li>Regulatory Fines</li>
                            <li>Loss of Client Trust</li>
                            <li>Operational Downtime</li>
                        </ul>
                    </div>
                </div>
            </section>
            
            <section className="page-cta">
                <div className="cta-container">
                    <h2>Secure Your Practice Today</h2>
                    <p>Minimize the risk of cyberattacks and data breaches with our expert help.</p>
                    <a href="/contact" className="btn-primary">Consult with Experts</a>
                </div>
            </section>
        </PageLayout>
    )
}

export default AccountingLegal
