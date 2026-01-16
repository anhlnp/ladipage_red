import PageLayout from '../components/PageLayout/PageLayout'
import ServiceHero from '../components/ServiceHero/ServiceHero'
import PriceTable from '../components/PriceTable/PriceTable'
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

            <section className="service-content">
                <div className="content-container">
                    <div className="content-block glass-box" style={{ gridColumn: 'span 2', textAlign: 'center', marginBottom: '20px' }}>
                        <h3>Repair Price Guide</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
                            All prices include labor. Actual price depends on specific model and condition.
                        </p>
                    </div>
                </div>

                <PriceTable />

                <div className="content-container" style={{ marginTop: '60px' }}>
                    <div className="content-block glass-box" style={{ gridColumn: 'span 2' }}>
                        <h3>Cell Phone Repair Services</h3>
                        <p>
                            Don't let a broken screen ruin your day. Our expert technicians can repair screens,
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

                    <div className="content-block glass-box">
                        <h3>Why Choose Us?</h3>
                        <ul style={{ color: 'var(--text-secondary)', paddingLeft: '20px' }}>
                            <li>Same-day repairs available</li>
                            <li>High-quality replacement parts</li>
                            <li>Experienced technicians</li>
                            <li>Competitive pricing</li>
                            <li>Warranty on all repairs</li>
                        </ul>
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

