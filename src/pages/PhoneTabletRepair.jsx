import PageLayout from '../components/PageLayout/PageLayout'
import ServiceHero from '../components/ServiceHero/ServiceHero'
import RepairWizard from '../components/RepairWizard/RepairWizard'
import './ServicePage.css'

const PhoneTabletRepair = () => {
    return (
        <PageLayout>
            <ServiceHero
                tag="QUICK REPAIR"
                title="Phone & Tablet"
                gradientText="Repair Services"
                description="Expert repair using only high-quality parts. Most repairs are done same-day!"
            />

            <section className="service-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>Free Repair Estimate</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Select your device below to get started</p>
                </div>

                <RepairWizard />
                
                <div className="content-container" style={{ marginTop: '80px' }}>
                    <div className="content-block glass-box" style={{ gridColumn: 'span 2' }}>
                        <h3>Cell Phone Repair Services</h3>
                        <p>
                            Don’t let a broken screen ruin your day. Our expert technicians can repair screens, 
                            batteries, cameras, charge ports and more! We know how important your device is, 
                            so most cell phone repairs can be completed same day.
                        </p>
                    </div>

                    <div className="content-block glass-box">
                        <h3>Tablet Repair Services</h3>
                        <p>
                            Whether you use your device for work or play, we know how important it is to you. 
                            Our expert technicians can repair screens, batteries, software issues and more!
                            Pricing varies by device model and size.
                        </p>
                    </div>
                </div>
            </section>
            
            <section className="page-cta">
                <div className="cta-container">
                    <h2>Visit Us Today</h2>
                    <p>Walk-ins welcome! 2155 N. Center Street Hickory, NC</p>
                    <a href="/contact" className="btn-primary">Get Directions</a>
                </div>
            </section>
        </PageLayout>
    )
}

export default PhoneTabletRepair
