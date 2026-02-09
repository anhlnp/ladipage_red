import PageLayout from '../components/PageLayout/PageLayout'
import ServiceHero from '../components/ServiceHero/ServiceHero'
import RepairWizard from '../components/RepairWizard/RepairWizard'
import { Smartphone, Tablet, Laptop, Gamepad2, Watch, Package, Clock, Award, Wrench, DollarSign, ShieldCheck, Stethoscope } from 'lucide-react'
import './ServicePage.css'
import './RepairPricing.css'

const RepairPricing = () => {
    const deviceCategories = [
        { icon: <Smartphone size={24} />, label: 'Smartphones', desc: 'iPhone, Samsung, Google & more' },
        { icon: <Tablet size={24} />, label: 'Tablets', desc: 'iPad, Galaxy Tab, Surface' },
        { icon: <Laptop size={24} />, label: 'Computers', desc: 'MacBook, Dell, HP, Lenovo' },
        { icon: <Gamepad2 size={24} />, label: 'Gaming', desc: 'PlayStation, Xbox, Nintendo' },
        { icon: <Watch size={24} />, label: 'Wearables', desc: 'Apple Watch, Galaxy Watch' },
        { icon: <Package size={24} />, label: 'Other', desc: 'Drones, Cameras, Speakers' },
    ]

    const whyChooseUs = [
        { icon: <Clock size={20} />, text: 'Same-day repairs available' },
        { icon: <Award size={20} />, text: 'High-quality replacement parts' },
        { icon: <Wrench size={20} />, text: 'Experienced technicians' },
        { icon: <DollarSign size={20} />, text: 'Competitive pricing' },
        { icon: <ShieldCheck size={20} />, text: 'Warranty on all repairs' },
        { icon: <Stethoscope size={20} />, text: 'Free diagnosis' },
    ]

    return (
        <PageLayout>
            <ServiceHero
                tag="GET A QUOTE"
                title="Repair"
                gradientText="Pricing"
                description="Select your device to see repair pricing. Most repairs completed same-day!"
            />

            <section className="pricing-intro">
                <div className="pricing-intro-container">
                    <h2>We Repair All Devices</h2>
                    <p className="intro-subtitle">Select your device type below to see pricing and get an instant estimate</p>

                    <div className="device-categories-grid">
                        {deviceCategories.map((cat, idx) => (
                            <div key={idx} className="device-category-card glass-box">
                                <div className="category-icon">{cat.icon}</div>
                                <h4>{cat.label}</h4>
                                <p>{cat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="wizard-section">
                <div className="wizard-container">
                    <div className="wizard-header">
                        <h2>Get Your <span className="gradient-text">Price Estimate</span></h2>
                        <p>Follow the steps below to select your device and see repair pricing</p>
                    </div>
                    <RepairWizard />
                </div>
            </section>

            <section className="why-choose-section">
                <div className="why-choose-container">
                    <div className="why-choose-header">
                        <h2>Why Choose <span className="gradient-text">Us?</span></h2>
                        <p>Linh kiện thay thế chất lượng cao</p>
                    </div>
                    <div className="why-choose-grid">
                        {whyChooseUs.map((item, idx) => (
                            <div key={idx} className="why-choose-card glass-box">
                                <div className="why-choose-icon">{item.icon}</div>
                                <span>{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="pricing-info">
                <div className="pricing-info-container">
                    <div className="info-grid">
                        <div className="info-card glass-box">
                            <div className="info-icon">⚡</div>
                            <h4>Same-Day Service</h4>
                            <p>Most repairs completed in just a few hours</p>
                        </div>
                        <div className="info-card glass-box">
                            <div className="info-icon">🛡️</div>
                            <h4>Warranty Included</h4>
                            <p>All repairs come with a warranty for peace of mind</p>
                        </div>
                        <div className="info-card glass-box">
                            <div className="info-icon">✓</div>
                            <h4>Quality Parts</h4>
                            <p>We use only high-quality replacement parts</p>
                        </div>
                        <div className="info-card glass-box">
                            <div className="info-icon">💬</div>
                            <h4>Free Diagnosis</h4>
                            <p>Not sure what's wrong? We'll diagnose it for free</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="page-cta">
                <div className="cta-container">
                    <h2>Ready to Get Your Device Fixed?</h2>
                    <p>Walk-ins welcome! Visit us at 2155 N. Center Street, Hickory, NC 28601</p>
                    <div className="cta-buttons">
                        <a
                            href="https://www.google.com/maps/place/Select+Tech+Inc./@35.761537,-81.3546604,14z"
                            className="btn-primary"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Get Directions
                        </a>
                        <a href="/contact" className="btn-secondary">
                            Contact Us
                        </a>
                    </div>
                </div>
            </section>
        </PageLayout>
    )
}

export default RepairPricing
