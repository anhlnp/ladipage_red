import PageLayout from '../components/PageLayout/PageLayout'
import ServiceHero from '../components/ServiceHero/ServiceHero'
import PricingTable from '../components/PricingTable/PricingTable'
import Testimonials from '../components/Testimonials/Testimonials'
import './ManagedITServices.css'

const pricingPlans = [
    { name: 'Office Protect / Basic', price: 'Starting at $499/mo', featured: false },
    { name: 'Silver Managed IT', price: 'Starting at $899/mo', featured: false },
    { name: 'Gold MSSP Elite', price: 'Starting at $1,499/mo', featured: true }
]

const pricingFeatures = [
    { name: '24/7 Monitoring & Alerts', values: [true, true, true] },
    { name: 'Patch Management', values: [true, true, true] },
    { name: 'EDR / Huntress', values: ['Basic', 'MDR', 'ITDR'] },
    { name: 'DNS Filtering', values: [false, true, true] },
    { name: 'Firewall & Network Security', values: [false, true, 'Advanced'] },
    { name: 'Microsoft 365 Security', values: ['Basic', 'Defender P1', 'Defender P2 + DLP'] },
    { name: 'Backup & Recovery', values: [false, 'Local Backup', 'Axcient Cloud'] },
    { name: 'Asset Monitoring', values: [true, true, true] },
    { name: 'Cybersecurity Training', values: [false, true, 'AI-Driven'] },
    { name: 'Compliance Portal Access', values: [false, true, 'Advanced'] },
    { name: 'Risk Assessment', values: [false, 'Annual', 'Quarterly'] },
    { name: 'Virtual CIO Support', values: [false, false, true] },
    { name: 'Onsite Hours / Month', values: ['Remote', '2 hrs', '4 hrs'] },
    { name: 'Incident Response', values: ['Emergency', 'Priority', '24/7'] }
]

const serviceCategories = [
    {
        title: 'Proactive System Monitoring',
        items: ['Real-Time Alerts', 'Regular Maintenance', 'Performance Metrics', 'Root Cause Analysis', 'Growth/Capacity Planning']
    },
    {
        title: 'Cybersecurity Services',
        items: ['Antivirus/EDR management', 'Firewall configuration', 'Security awareness training', 'MFA, conditional access', 'Vulnerability Scan/Pen Testing', 'Dark Web Awareness']
    },
    {
        title: 'Compliance & Audits',
        items: ['HIPAA, PCI-DSS, FTC Safeguards', 'Policy creation and audits', 'Risk assessments and documentation']
    },
    {
        title: 'PC/MAC/Smartphone Repair',
        items: ['Screen Repairs/Replacements', 'Battery & Charging Issues', 'Virus & Malware Removal', 'Custom Gaming Rigs', 'Data Recovery & Backup']
    },
    {
        title: 'VoIP/Unified Communications',
        items: ['Cloud phone systems (3CX, Zoom, Teams)', 'Call flows, auto attendants', 'Headset and hardware setup']
    },
    {
        title: 'On-site and Remote IT Support',
        items: ['Help Desk Support', '24/7 Monitoring', 'Rapid Response Times', 'Customizable Support Plans']
    },
    {
        title: 'Backup and Disaster Recovery',
        items: ['Local & Cloud backups', 'Microsoft 365/Google backup', 'Disaster recovery testing', 'Ransomware protection']
    },
    {
        title: 'CAT5/6/7 & Fiber Installation',
        items: ['Network racks/infrastructure', 'NC Low Voltage License', 'Access Control & Alarm Systems']
    }
]

const testimonials = [
    {
        content: 'Select Tech has been supporting us since 2012. We have received A+ service from everyone in their team. Chris has been a delight to handle all of our PCs and servers. Dave, the owner has built a great team that genuinely cares about their customers. Give them 10 out of 10.',
        author: 'Shelly M.',
        role: 'Managed IT Support'
    },
    {
        content: 'Michael was awesome. He confirmed it was a phishing attempt and his team updated the DMARC records in our email. Select Tech switched us to a managed IT plan to better protect us and save us money. Five Stars guys - Thank you.',
        author: 'Wayne R.',
        role: 'Phishing Protection'
    },
    {
        content: 'Our outside sales rep needed a laptop and iPad repaired when he was in town for the weekend and dropped it off at your Hickory, NC office. Both items were repaired the same day. That\'s awesome.',
        author: 'CEO',
        role: 'Fast Laptop and iPad Repair'
    }
]

const ManagedITServices = () => {
    return (
        <PageLayout>
            {/* Hero Section */}
            <section className="managed-hero">
                <div className="managed-hero-container">
                    <div className="hero-content">
                        <span className="hero-tag">#1 RANKED IN HICKORY, NC</span>
                        <h1 className="hero-title">
                            Managed IT Services in <span className="gradient-text">NC</span>
                        </h1>
                        <ul className="hero-features">
                            <li>✓ Trusted IT Support for 23+ Years</li>
                            <li>✓ All work 100% satisfaction guaranteed</li>
                            <li>✓ Fast, reliable IT support to protect your business</li>
                            <li>✓ Stay with us because you're happy - not because you're locked in</li>
                        </ul>
                        <button className="btn-primary">Let's Connect</button>
                    </div>
                </div>
            </section>

            {/* Value Props */}
            <section className="value-props">
                <div className="value-container">
                    <div className="value-item">
                        <span className="value-icon">⏱️</span>
                        <span className="value-text">Reduce Downtime</span>
                    </div>
                    <div className="value-item">
                        <span className="value-icon">📈</span>
                        <span className="value-text">Grow Your Business</span>
                    </div>
                    <div className="value-item">
                        <span className="value-icon">💰</span>
                        <span className="value-text">Control Costs</span>
                    </div>
                </div>
            </section>

            {/* Pricing Table */}
            <section className="pricing-section">
                <div className="section-header">
                    <h2 className="section-title">Choose Your Protection Plan</h2>
                    <p className="section-subtitle">Select Tech Inc. – MSSP Services & Pricing</p>
                </div>
                <PricingTable plans={pricingPlans} features={pricingFeatures} />
            </section>

            {/* Services Grid */}
            <section className="services-section">
                <div className="section-header">
                    <h2 className="section-title">Services We Provide</h2>
                </div>
                <div className="services-grid">
                    {serviceCategories.map((category, idx) => (
                        <div key={idx} className="service-category glass-box">
                            <h3 className="category-title">{category.title}</h3>
                            <ul className="category-items">
                                {category.items.map((item, iidx) => (
                                    <li key={iidx}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonials */}
            <Testimonials
                testimonials={testimonials}
                title="What Select Tech Partners Are Saying"
            />

            {/* Why Choose Us */}
            <section className="why-choose">
                <div className="why-container">
                    <h2 className="section-title">Why Choose Select Tech?</h2>
                    <div className="why-grid">
                        <div className="why-item">#1 Ranked IT Security Provider in Hickory, NC</div>
                        <div className="why-item">Certified Ethical Hackers On Staff</div>
                        <div className="why-item">Veteran-Owned, 20+ Years Experience</div>
                        <div className="why-item">Local Support + National-Level Cybersecurity Stack</div>
                    </div>
                    <button className="btn-primary cta-btn">
                        📞 Contact Select Tech Today
                    </button>
                </div>
            </section>
        </PageLayout>
    )
}

export default ManagedITServices
