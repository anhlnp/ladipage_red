import { ShieldCheck, ClipboardList, GraduationCap } from 'lucide-react'
import PageLayout from '../components/PageLayout/PageLayout'
import ServiceHero from '../components/ServiceHero/ServiceHero'
import './ServicePage.css'

const CarDealerships = () => {
    return (
        <PageLayout>
            <ServiceHero
                tag="AUTO DEALERS"
                title="Dealership"
                gradientText="Compliance & Security"
                description="Select Tech's Custom Compliance Portal is a true ALL-IN-ONE solution for FTC Safeguards Regulation."
            />

            <section className="service-content">
                <div className="content-container">
                    <div className="content-block glass-box" style={{ gridColumn: 'span 2' }}>
                        <h3>FTC Safeguards Solution</h3>
                        <p>
                            At Select Tech, we offer comprehensive cybersecurity services including penetration testing,
                            program management, and awareness training. We help car dealerships protect sensitive
                            information and meet industry standards.
                        </p>
                        <div className="service-cards" style={{ marginTop: '30px' }}>
                            <div className="service-card glass-box">
                                <div className="icon"><ShieldCheck size={32} /></div>
                                <h4>Penetration Testing</h4>
                                <p>Identify vulnerabilities before they can be exploited.</p>
                            </div>
                            <div className="service-card glass-box">
                                <div className="icon"><ClipboardList size={32} /></div>
                                <h4>Program Management</h4>
                                <p>Structured compliance programs to keep you on track.</p>
                            </div>
                            <div className="service-card glass-box">
                                <div className="icon"><GraduationCap size={32} /></div>
                                <h4>Awareness Training</h4>
                                <p>Educate staff on handling data and spotting threats.</p>
                            </div>
                        </div>
                    </div>

                    <div className="content-block glass-box">
                        <h3>Don't Wait</h3>
                        <p>
                            Our team of experts stays up-to-date on the latest threats and trends to provide
                            the best defense against cyberattacks.
                        </p>
                        <ul className="feature-list" style={{ marginTop: '20px' }}>
                            <li>All-in-One Compliance Portal</li>
                            <li>FTC Safeguards Rule Ready</li>
                            <li>Expert Support Team</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="page-cta">
                <div className="cta-container">
                    <h2>Access Compliance Portal</h2>
                    <p>Get the all-in-one solution for FTC Safeguards Regulation.</p>
                    <a href="/contact" className="btn-primary">Get Compliant Now</a>
                </div>
            </section>
        </PageLayout>
    )
}

export default CarDealerships
