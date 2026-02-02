import PageLayout from '../components/PageLayout/PageLayout'
import ServiceHero from '../components/ServiceHero/ServiceHero'
import RepairWizard from '../components/RepairWizard/RepairWizard'
import {
    Clock,
    Award,
    Wrench,
    DollarSign,
    ShieldCheck,
    MapPin
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
                tag="GET A QUOTE"
                title="Phone & Tablet"
                gradientText="Repair Pricing"
                description="Select your device below to see repair pricing. Most repairs completed same-day!"
            />

            <section className="wizard-section">
                <div className="wizard-container">
                    <div className="wizard-header">
                        <h2>Select Your <span className="gradient-text">Device</span></h2>
                        <p>Choose your device type to see available repair services and pricing</p>
                    </div>
                    <RepairWizard />
                </div>
            </section>

            <section className="service-content">
                <div className="content-container repair-layout">
                    {/* Why Choose Us Panel */}
                    <div className="content-block glass-box why-choose-panel full-width">
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
