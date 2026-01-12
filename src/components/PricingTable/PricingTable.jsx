import './PricingTable.css'

const CheckIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="check-icon">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
)

const XIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="x-icon">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
)

// Pricing table for service comparison
const PricingTable = ({ plans, features }) => {
    return (
        <div className="pricing-table-container">
            <div className="pricing-table glass-box">
                {/* Header */}
                <div className="pricing-header">
                    <div className="pricing-cell feature-header">Service Features</div>
                    {plans.map((plan, idx) => (
                        <div 
                            key={idx} 
                            className={`pricing-cell plan-header ${plan.featured ? 'featured' : ''}`}
                        >
                            <span className="plan-name">{plan.name}</span>
                            <span className="plan-price">{plan.price}</span>
                        </div>
                    ))}
                </div>
                
                {/* Features */}
                {features.map((feature, idx) => (
                    <div key={idx} className="pricing-row">
                        <div className="pricing-cell feature-name">{feature.name}</div>
                        {feature.values.map((value, vidx) => (
                            <div key={vidx} className="pricing-cell feature-value">
                                {value === true ? (
                                    <CheckIcon />
                                ) : value === false ? (
                                    <XIcon />
                                ) : (
                                    <span className="feature-text">{value}</span>
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PricingTable
