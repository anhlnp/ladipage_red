import PageLayout from '../components/PageLayout/PageLayout'
import ServiceHero from '../components/ServiceHero/ServiceHero'
import './ServicePage.css'

const Business = () => {
    return (
        <PageLayout>
            <ServiceHero
                tag="BUSINESS SECURITY"
                title="Organization"
                gradientText="Cybersecurity"
                description="Robust cybersecurity practices are crucial for businesses of all sizes - from large enterprises to small and medium-sized businesses (SMBs)."
            />
            
            <section className="service-content">
                <div className="content-container">
                    <div className="content-block glass-box">
                        <h3>Large Businesses</h3>
                        <p>
                            Large businesses face the need for strong cybersecurity measures due to the vast amount of data 
                            they handle, system complexity, and their attractiveness as targets. The volume of data 
                            increases potential impact, improving the need for comprehensive security strategies.
                        </p>
                    </div>

                    <div className="content-block glass-box">
                        <h3>SMBs</h3>
                        <p>
                            Cybersecurity is equally important for SMBs as they are often targeted due to perceived vulnerabilities. 
                            SMBs must protect sensitive data, customer information, and maintain business continuity just as strictly 
                            as larger corporations.
                        </p>
                    </div>

                    <div className="content-block glass-box" style={{ gridColumn: '1 / -1' }}>
                        <h3>People, Processes, Technology</h3>
                        <p>
                            Enhancing the security performance of its people, processes, and technology safeguards companies 
                            against the devastating impacts of cybercrime. This shields them from:
                        </p>
                        <div className="service-cards" style={{ marginTop: '20px' }}>
                            <div className="service-card glass-box-light">
                                <div className="icon">💰</div>
                                <h4>Financial Losses</h4>
                                <p>Preventing theft, fraud, and ransom payments.</p>
                            </div>
                            <div className="service-card glass-box-light">
                                <div className="icon">⚙️</div>
                                <h4>Operational Disruptions</h4>
                                <p>Avoiding downtime and productivity loss.</p>
                            </div>
                            <div className="service-card glass-box-light">
                                <div className="icon">😟</div>
                                <h4>Emotional Distress</h4>
                                <p>Reducing stress and uncertainty for management and staff.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="page-cta">
                <div className="cta-container">
                    <h2>Make Security a Priority</h2>
                    <p>Regardless of size, businesses must implement effective measures to safeguard sensitive information.</p>
                    <a href="/contact" className="btn-primary">Secure Your Business</a>
                </div>
            </section>
        </PageLayout>
    )
}

export default Business
