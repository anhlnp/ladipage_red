import PageLayout from '../components/PageLayout/PageLayout'
import ServiceHero from '../components/ServiceHero/ServiceHero'
import './ServicePage.css'

const MedicalDentalOffices = () => {
    const checklist = [
        "Conduct Risk Assessments",
        "Implement Strong Access Controls",
        "Encrypt Data",
        "Train Employees",
        "Secure Network Infrastructure",
        "Regularly Backup Data",
        "Maintain Strong Password Policies",
        "Employ Antivirus/Antimalware",
        "Monitor and Audit Systems",
        "Develop Incident Response Plan"
    ]

    return (
        <PageLayout>
            <ServiceHero
                tag="HEALTHCARE"
                title="Medical & Dental"
                gradientText="Cybersecurity"
                description="Protecting sensitive information is a critical aspect of healthcare. We help you comply with HIPAA and maintain patient trust."
            />
            
            <section className="service-content">
                <div className="content-container">
                    <div className="content-block glass-box" style={{ gridColumn: 'span 2' }}>
                        <h3>HIPAA & Patient Data Protection</h3>
                        <p>
                            Given the increasing number of cyber threats, it is essential to implement robust 
                            cybersecurity measures to safeguard patient data, comply with regulations such as 
                            HIPAA, and maintain the trust of patients.
                        </p>
                        
                        <h4 style={{ marginTop: '30px', marginBottom: '20px', fontSize: '1.2rem', color: 'var(--text-primary)' }}>
                            We help you implement:
                        </h4>
                        
                        <div className="service-cards" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                            {checklist.map((item, idx) => (
                                <div key={idx} className="service-card glass-box-light" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <span style={{ color: 'var(--accent-primary)', fontSize: '1.2rem' }}>⚕️</span>
                                    <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="page-cta">
                <div className="cta-container">
                    <h2>HIPAA Compliant Security</h2>
                    <p>Safeguard your facility against breaches and fines.</p>
                    <a href="/contact" className="btn-primary">Secure Your Practice</a>
                </div>
            </section>
        </PageLayout>
    )
}

export default MedicalDentalOffices
