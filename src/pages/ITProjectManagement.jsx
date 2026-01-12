import PageLayout from '../components/PageLayout/PageLayout'
import ServiceHero from '../components/ServiceHero/ServiceHero'
import './ITProjectManagement.css'

const services = [
    {
        title: 'Project Management',
        description: 'Select Tech ensures your IT projects are delivered on time, on budget, and with precision. From network upgrades to full system deployments, our experienced project managers coordinate every detail—minimizing disruptions and maximizing results. We turn complex technology goals into smooth, successful outcomes.',
        icon: '📊'
    },
    {
        title: 'Compliance Management',
        description: 'At Select Tech we provide expert Compliance Management Services to help businesses meet and maintain industry-specific regulatory requirements, including FTC Safeguards, HIPPA, and PCI-DSS. We simplify compliance through our custom Compliance & Training Portal, giving clients clear visibility into their readiness status, employee training, vendor management, and audit preparedness—ensuring you stay protected.',
        icon: '✅'
    }
]

const ITProjectManagement = () => {
    return (
        <PageLayout>
            <ServiceHero
                tag="IT SOLUTIONS"
                title="IT Project"
                gradientText="Management"
                description="Expert project managers to coordinate every detail of your IT initiatives—minimizing disruptions and maximizing results."
                ctaText="Start Your Project"
            />
            
            <section className="project-services">
                <div className="project-container">
                    {services.map((service, idx) => (
                        <div key={idx} className="project-card glass-box">
                            <div className="card-icon">{service.icon}</div>
                            <h3 className="card-title">{service.title}</h3>
                            <p className="card-description">{service.description}</p>
                        </div>
                    ))}
                </div>
            </section>
            
            {/* CTA Section */}
            <section className="project-cta">
                <div className="cta-container">
                    <h2 className="cta-title">Ready to start your next IT project?</h2>
                    <p className="cta-description">
                        Let our experienced team help you achieve your technology goals.
                    </p>
                    <button className="btn-primary">Schedule Consultation</button>
                </div>
            </section>
        </PageLayout>
    )
}

export default ITProjectManagement
