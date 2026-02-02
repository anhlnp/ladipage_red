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

            {/* Portal Section - Near Top */}
            <section className="portal-cta-section" style={{
                padding: '40px 20px',
                background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
                <div style={{
                    maxWidth: '900px',
                    margin: '0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '30px',
                    flexWrap: 'wrap'
                }}>
                    <div style={{ textAlign: 'center', flex: '1', minWidth: '280px' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', color: 'var(--text-primary)' }}>
                            Access Your Compliance Portal
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
                            Track FTC Safeguards compliance, training modules, and security assessments all in one place.
                        </p>
                        <a
                            href="https://portal.selecttechinc.com/login"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                            Access Portal
                        </a>
                    </div>
                </div>
            </section>

            <section className="service-content">
                <div className="content-container">
                    <div className="content-block glass-box" style={{ gridColumn: 'span 2' }}>
                        <div className="block-image-container" style={{ marginBottom: '25px', borderRadius: '12px', overflow: 'hidden', height: '300px' }}>
                            <img
                                src="/pexels-thisisengineering-3862618.jpg"
                                alt="Car Dealership Engineering"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
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
                        <div className="block-image-container" style={{ marginBottom: '25px', borderRadius: '12px', overflow: 'hidden', height: '200px' }}>
                            <img
                                src="/pexels-kindelmedia-9799743.jpg"
                                alt="Automotive Data Security"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
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

                    <div className="content-block glass-box" style={{ padding: 0, overflow: 'hidden', display: 'flex', gridColumn: '1 / -1' }}>
                        <img
                            src="/pexels-shkrabaanthony-7144176.jpg"
                            alt="Car Dealership Showroom"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', maxHeight: '400px' }}
                        />
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
