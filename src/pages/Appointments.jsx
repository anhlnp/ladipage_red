import PageLayout from '../components/PageLayout/PageLayout'
import ServiceHero from '../components/ServiceHero/ServiceHero'
import './Appointments.css'

const appointmentServices = [
    {
        name: 'Free Consultation',
        duration: '30 minutes',
        price: 'Free',
        description: 'Get started with a free consultation to discuss your IT needs.'
    },
    {
        name: 'Basic Service',
        duration: '1 hour',
        price: '$99.00',
        description: 'Standard IT support session for troubleshooting and guidance.'
    },
    {
        name: 'Advanced Service',
        duration: '1 hour',
        price: '$199.00',
        description: 'In-depth technical consultation for complex IT challenges.'
    }
]

const Appointments = () => {
    const handleBook = (service) => {
        // TODO: Integrate with booking system
        console.log('Booking:', service.name)
        alert(`Booking ${service.name} - Integration coming soon!`)
    }

    return (
        <PageLayout>
            <ServiceHero
                tag="BOOK NOW"
                title="Schedule your"
                gradientText="appointment"
                description="Stay ahead in the fast-paced world of technology by booking an appointment with our expert team. Our professionals offer insights and updates that empower your business to thrive in today's digital landscape."
            />
            
            <section className="appointments-section">
                <div className="appointments-container">
                    <div className="appointment-cards">
                        {appointmentServices.map((service, idx) => (
                            <div key={idx} className="appointment-card glass-box">
                                <h3 className="service-name">{service.name}</h3>
                                <p className="service-duration">{service.duration}</p>
                                <p className="service-price">{service.price}</p>
                                <p className="service-description">{service.description}</p>
                                <button 
                                    className="btn-primary book-btn"
                                    onClick={() => handleBook(service)}
                                >
                                    Book Now
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Feature bar */}
            <section className="feature-bar">
                <div className="feature-bar-container">
                    <div className="feature-item">
                        <span className="feature-text">Experience</span>
                    </div>
                    <div className="feature-item">
                        <span className="feature-text">Compliance</span>
                    </div>
                    <div className="feature-item">
                        <span className="feature-text">Trusted Partner</span>
                    </div>
                </div>
            </section>
        </PageLayout>
    )
}

export default Appointments
