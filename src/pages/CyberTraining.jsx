import { Shield, Users, Target, CheckCircle, BookOpen, Award } from 'lucide-react'
import PageLayout from '../components/PageLayout/PageLayout'
import ServiceHero from '../components/ServiceHero/ServiceHero'
import './ServicePage.css' // Reusing ServicePage styles for consistency

const CyberTraining = () => {
    return (
        <PageLayout>
            <ServiceHero
                tag="Cybersecurity"
                title="Cyber"
                gradientText="Training"
                description="Comprehensive cybersecurity training for individuals and groups. Empower your team with the knowledge to defend against digital threats."
            />

            <section className="service-content">
                <div className="content-container">
                    {/* Introduction */}
                    <div className="content-block glass-box" style={{ gridColumn: '1 / -1' }}>
                        <div className="block-image-container" style={{ marginBottom: '30px', borderRadius: '12px', overflow: 'hidden' }}>
                            <img
                                src="/cyber_classroom_training.png"
                                alt="Cybersecurity Classroom Training"
                                style={{ width: '100%', maxHeight: '500px', objectFit: 'cover', objectPosition: 'center center', display: 'block' }}
                            />
                        </div>
                        <h3>Empower Your Workforce, Secure Your Future</h3>
                        <p>
                            In today's digital landscape, human error remains one of the greatest security vulnerabilities.
                            Our Cyber Training programs are designed to transform your employees into your strongest line of defense.
                            We offer tailored educational experiences that raise awareness, promote best practices, and build a culture of security.
                        </p>
                    </div>

                    {/* Individual Training */}
                    <div className="content-block glass-box" style={{ gridColumn: 'span 2' }}>
                        <h3>Individual Training</h3>
                        <p>
                            Personalized learning paths for employees at all levels. Our self-paced modules ensure that every team member
                            understands their role in maintaining cybersecurity.
                        </p>
                        <div style={{ marginTop: '20px', marginBottom: '20px', borderRadius: '12px', overflow: 'hidden' }}>
                            <img
                                src="/one_on_one_training.png"
                                alt="One-on-One Cyber Training"
                                style={{ width: '100%', maxHeight: '350px', objectFit: 'cover', objectPosition: 'center 30%', display: 'block' }}
                            />
                        </div>
                        <ul className="feature-list" style={{ listStyle: 'none', padding: 0 }}>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                <BookOpen size={20} className="accent" />
                                <span>Interactive Phishing Simulations</span>
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                <Target size={20} className="accent" />
                                <span>Role-Based Security Modules</span>
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                <Award size={20} className="accent" />
                                <span>Certification upon Completion</span>
                            </li>
                        </ul>
                    </div>

                    {/* Side Image Column */}
                    <div className="content-block glass-box" style={{ padding: 0, overflow: 'hidden' }}>
                        <img
                            src="/internet-3589685.jpg"
                            alt="Cyber Awareness"
                            style={{ width: '100%', height: '100%', minHeight: '300px', objectFit: 'cover', objectPosition: 'center center', display: 'block' }}
                        />
                    </div>

                    {/* Group Training */}
                    <div className="content-block glass-box" style={{ gridColumn: '1 / -1' }}>
                        <h3>Group Training Workshops</h3>
                        <p>
                            Engaging, instructor-led sessions for departments or entire organizations. We facilitate collaborative learning
                            environments where teams can discuss real-world scenarios and strategies.
                        </p>

                        <div className="service-cards" style={{ marginTop: '30px', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
                            <div className="service-card glass-box-light">
                                <div className="icon"><Users size={32} /></div>
                                <h4>Interactive Workshops</h4>
                                <p>Live seminars and Q&A sessions with security experts.</p>
                            </div>
                            <div className="service-card glass-box-light">
                                <div className="icon"><Shield size={32} /></div>
                                <h4>Tabletop Exercises</h4>
                                <p>Simulated cyber attack scenarios to test incident response.</p>
                            </div>
                            <div className="service-card glass-box-light">
                                <div className="icon"><CheckCircle size={32} /></div>
                                <h4>Best Practices Review</h4>
                                <p>Reviewing company policies and secure workflow habits.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="page-cta">
                <div className="cta-container">
                    <h2>Ready to Train Your Team?</h2>
                    <p>Contact us to schedule a training session or learn more about our curriculum.</p>
                    <a href="/contact" className="btn-primary">Get Started</a>
                </div>
            </section>
        </PageLayout>
    )
}

export default CyberTraining
