import PageLayout from '../components/PageLayout/PageLayout'
import ServiceHero from '../components/ServiceHero/ServiceHero'
import './ServicePage.css' // Reusing ServicePage styles

const OurTeam = () => {
    // Placeholder data for employees
    const employees = [
        { id: 1, name: 'Employee Name', role: 'Role Title' },
        { id: 2, name: 'Employee Name', role: 'Role Title' },
        { id: 3, name: 'Employee Name', role: 'Role Title' },
        { id: 4, name: 'Employee Name', role: 'Role Title' },
        { id: 5, name: 'Employee Name', role: 'Role Title' },
        { id: 6, name: 'Employee Name', role: 'Role Title' },
    ]

    return (
        <PageLayout>
            <ServiceHero
                tag="OUR TEAM"
                title="Meet the"
                gradientText="Experts"
                description="The dedicated professionals behind our award-winning IT solutions and cybersecurity services."
            />

            <section className="service-content">
                <div className="content-container">
                    <div className="content-block glass-box" style={{ gridColumn: '1 / -1' }}>
                        <h3>Our People</h3>
                        <p style={{ marginBottom: '40px' }}>
                            We are a team of certified engineers, security analysts, and IT professionals passionate about technology and helping businesses grow.
                        </p>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                            gap: '30px'
                        }}>
                            {employees.map((emp) => (
                                <div key={emp.id} className="glass-box-light" style={{
                                    padding: '20px',
                                    textAlign: 'center',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center'
                                }}>
                                    <div style={{
                                        width: '120px',
                                        height: '120px',
                                        borderRadius: '50%',
                                        backgroundColor: 'var(--bg-card)',
                                        marginBottom: '15px',
                                        border: '2px solid var(--accent-primary)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        overflow: 'hidden'
                                    }}>
                                        {/* Placeholder Icon/Image */}
                                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--text-secondary)' }}>
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="12" cy="7" r="4"></circle>
                                        </svg>
                                    </div>
                                    <h4 style={{ margin: '10px 0 5px', color: 'var(--text-primary)' }}>{emp.name}</h4>
                                    <p style={{ margin: 0, color: 'var(--accent-primary)', fontSize: '0.9rem' }}>{emp.role}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </PageLayout>
    )
}

export default OurTeam
