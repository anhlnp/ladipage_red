import { Link } from 'react-router-dom'
import { Linkedin, Mail, Award, Shield, Code } from 'lucide-react'
import PageLayout from '../components/PageLayout/PageLayout'
import ServiceHero from '../components/ServiceHero/ServiceHero'
import './ServicePage.css'
import './OurTeam.css'

import chrisImage from '../assets/employee/Chris.png'
import djImage from '../assets/employee/DJ .jpg'

const OurTeam = () => {
    const teamMembers = [
        {
            id: 1,
            name: 'David Willis',
            role: 'Founder & CEO',
            image: '/David Willis.png',
            bio: 'US Navy Veteran with 23+ years of IT experience. Founded Select Tech in 2002 with a mission to bring military-grade professionalism to IT services.',
            specialties: ['IT Consulting', 'Strategic Planning', 'Cybersecurity'],
            featured: true
        },
        {
            id: 2,
            name: 'Chris',
            image: chrisImage,
            featured: false
        },
        {
            id: 3,
            name: 'DJ',
            image: djImage,
            featured: false
        },
    ]

    const featuredMember = teamMembers.find(m => m.featured)
    const otherMembers = teamMembers.filter(m => !m.featured)

    return (
        <PageLayout>
            <ServiceHero
                tag="OUR TEAM"
                title="Meet the"
                gradientText="Experts"
                description="The dedicated professionals behind our award-winning IT solutions and cybersecurity services."
            />

            <section className="team-content">
                <div className="team-container">
                    <div className="team-intro">
                        <p>
                            We are a team of certified engineers, security analysts, and IT professionals passionate about
                            technology and helping businesses grow. Our diverse expertise allows us to provide comprehensive
                            solutions for any IT challenge.
                        </p>
                    </div>

                    {/* Featured Team Member (David Willis) */}
                    {featuredMember && (
                        <div className="featured-member glass-box">
                            <div className="featured-image">
                                <img
                                    src={featuredMember.image}
                                    alt={featuredMember.name}
                                />
                            </div>
                            <div className="featured-info">
                                <div className="featured-badge">
                                    <Award size={16} />
                                    Founder
                                </div>
                                <h2>{featuredMember.name}</h2>
                                <p className="featured-role">{featuredMember.role}</p>
                                <p className="featured-bio">{featuredMember.bio}</p>
                                <div className="featured-specialties">
                                    {featuredMember.specialties.map((spec, idx) => (
                                        <span key={idx} className="specialty-tag">{spec}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Team Grid */}
                    <div className="team-grid">
                        {otherMembers.map((member) => (
                            <div key={member.id} className="team-card glass-box">
                                <div className="team-card-image">
                                    {member.image ? (
                                        <img src={member.image} alt={member.name} />
                                    ) : (
                                        <div className="placeholder-avatar">
                                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                                <circle cx="12" cy="7" r="4"></circle>
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                <div className="team-card-info">
                                    <h3>{member.name}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="team-values">
                <div className="values-container">
                    <div className="value-item">
                        <Shield size={32} />
                        <div>
                            <h4>Security First</h4>
                            <p>Every team member is trained in security best practices</p>
                        </div>
                    </div>
                    <div className="value-item">
                        <Code size={32} />
                        <div>
                            <h4>Continuous Learning</h4>
                            <p>We stay current with the latest technologies and certifications</p>
                        </div>
                    </div>
                    <div className="value-item">
                        <Award size={32} />
                        <div>
                            <h4>Veteran Values</h4>
                            <p>Integrity, professionalism, and dedication in everything we do</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="page-cta">
                <div className="cta-container">
                    <h2>Join Our Team</h2>
                    <p>Interested in a career in IT or cybersecurity? We are always looking for talent.</p>
                    <Link to="/careers" className="btn-primary">View Careers</Link>
                </div>
            </section>
        </PageLayout>
    )
}

export default OurTeam

