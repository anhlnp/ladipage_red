import PageLayout from '../components/PageLayout/PageLayout'
import ServiceHero from '../components/ServiceHero/ServiceHero'
import './CoManagedIT.css'

const services = [
    {
        title: 'Break Fix',
        description: 'When your computer breaks, we fix it—fast. Select Tech offers expert, on-demand PC repair services for businesses and individuals. Whether it\'s a failing hard drive, software error, or system crash, our certified technicians diagnose and resolve issues quickly to get you back up and running with minimal downtime. Reliable support when you need it.',
        icon: '🔧'
    },
    {
        title: 'Co-Managed IT',
        description: 'Select Tech partners with your in-house IT team to strengthen your technology operations. Our Co-Managed IT services provide expert support, advanced cybersecurity, and scalable solutions—without replacing your internal staff. We fill in the gaps, handle overflow, and bring enterprise-level tools to help your team succeed.',
        icon: '🤝'
    },
    {
        title: 'Full MSSP',
        description: 'Select Tech delivers end to end cybersecurity protection through our full MSSP services. We monitor, manage, and defend your network 24/7 with advanced threat detection, compliance support, incident response, and data protection. From firewalls to endpoint security, we provide complete peace of mind so you can focus on running your business.',
        icon: '🛡️'
    }
]

const CoManagedIT = () => {
    return (
        <PageLayout>
            <ServiceHero
                tag="IT SERVICES"
                title="Co-Managed"
                gradientText="IT Solutions"
                description="Partner with our expert team to enhance your IT operations without replacing your internal staff."
                ctaText="Get Started"
            />
            
            <section className="comanaged-services">
                <div className="comanaged-container">
                    {services.map((service, idx) => (
                        <div key={idx} className="comanaged-card glass-box">
                            <div className="card-icon">{service.icon}</div>
                            <h3 className="card-title">{service.title}</h3>
                            <p className="card-description">{service.description}</p>
                        </div>
                    ))}
                </div>
            </section>
            
            {/* Feature bar */}
            <section className="feature-bar">
                <div className="feature-bar-container">
                    <div className="feature-item">
                        <span className="feature-text">Experience</span>
                    </div>
                    <div className="feature-item">
                        <span className="feature-text">Trusted Partner</span>
                    </div>
                    <div className="feature-item">
                        <span className="feature-text">Compliance</span>
                    </div>
                </div>
            </section>
        </PageLayout>
    )
}

export default CoManagedIT
