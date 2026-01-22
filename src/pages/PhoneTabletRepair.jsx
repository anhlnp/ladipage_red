import PageLayout from '../components/PageLayout/PageLayout'
import ServiceHero from '../components/ServiceHero/ServiceHero'
import PriceTable from '../components/PriceTable/PriceTable'
import {
    Smartphone,
    Tablet,
    Clock,
    Award,
    Wrench,
    DollarSign,
    ShieldCheck,
    MapPin,
    Receipt
} from 'lucide-react'
import './ServicePage.css'
import './PhoneTabletRepair.css'

const PhoneTabletRepair = () => {
    const whyChooseUs = [
        { icon: <Clock size={18} />, text: 'Same-day repairs available' },
        { icon: <Award size={18} />, text: 'High-quality replacement parts' },
        { icon: <Wrench size={18} />, text: 'Experienced technicians' },
        { icon: <DollarSign size={18} />, text: 'Competitive pricing' },
        { icon: <ShieldCheck size={18} />, text: 'Warranty on all repairs' },
    ]

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
                    <div className="content-block glass-box price-guide-block">
                        <h3>Repair Price Guide</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
                            All prices include labor. Actual price depends on specific model and condition.
                        </p>
                    </div>
                </div>

                <PriceTable />

                <div className="content-container repair-layout">
                    {/* Left Column: Service Boxes Stacked */}
                    <div className="repair-services-column">
                        <div className="content-block glass-box service-box">
                            <div className="service-box-icon">
                                <Smartphone size={32} />
                            </div>
                            <h3>Cell Phone Repair</h3>
                            <p>
                                Don't let a broken screen ruin your day. Our expert technicians can repair screens,
                                batteries, cameras, charge ports and more! Most repairs completed same day.
                            </p>
                        </div>

                        <div className="content-block glass-box service-box">
                            <div className="service-box-icon">
                                <Tablet size={32} />
                            </div>
                            <h3>Tablet Repair</h3>
                            <p>
                                Whether you use your device for work or play, we know how important it is to you.
                                We repair screens, batteries, software issues and more!
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Why Choose Us */}
                    <div className="content-block glass-box why-choose-panel">
                        <h3>Why Choose Us?</h3>
                        <div className="why-choose-grid">
                            {whyChooseUs.map((item, idx) => (
                                <div key={idx} className="why-choose-item">
                                    <div className="why-choose-icon">{item.icon}</div>
                                    <span>{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="page-cta">
                <div className="cta-container">
                    <h2>Visit Us Today</h2>
                    <p><MapPin size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '8px' }} />Walk-ins welcome! 2155 N. Center Street, Hickory, NC 28601</p>
                    <a
                        href="https://www.google.com/maps/place/Select+Tech+Inc./@35.761537,-81.3546604,14z/data=!4m6!3m5!1s0x8851301bfcdd1787:0x3da4b3b1c4dd04a3!8m2!3d35.761537!4d-81.334061!16s%2Fg%2F1hbpws8t_?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoASAFQAw%3D%3D"
                        className="btn-primary"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Get Directions
                    </a>
                </div>
            </section>
        </PageLayout>
    )
}

export default PhoneTabletRepair

