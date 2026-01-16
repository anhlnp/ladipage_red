import './LocationSection.css'

const LocationSection = () => {
    return (
        <section className="location-section" id="location">
            <div className="location-container">
                <div className="location-content">
                    <span className="location-badge">📍 OUR LOCATION</span>
                    <h2>Proudly Serving <span className="gradient-text">North Carolina</span></h2>
                    <p>
                        Based in Hickory, NC, Select Tech has been providing award-winning IT solutions
                        and cybersecurity services to businesses throughout North Carolina for over 23 years.
                    </p>
                    <div className="location-details">
                        <div className="detail-item">
                            <div className="detail-icon">🏢</div>
                            <div>
                                <h4>Headquarters</h4>
                                <p>Hickory, North Carolina</p>
                            </div>
                        </div>
                        <div className="detail-item">
                            <div className="detail-icon">🌍</div>
                            <div>
                                <h4>Service Area</h4>
                                <p>Statewide & Remote Support</p>
                            </div>
                        </div>
                        <div className="detail-item">
                            <div className="detail-icon">⏰</div>
                            <div>
                                <h4>Availability</h4>
                                <p>24/7/365 Support Available</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="location-map">
                    {/* North Carolina State SVG Map */}
                    <div className="nc-map-container">
                        <svg viewBox="0 0 500 200" className="nc-map-svg">
                            <defs>
                                <linearGradient id="ncGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#F59E0B" />
                                    <stop offset="100%" stopColor="#D97706" />
                                </linearGradient>
                                <filter id="glow">
                                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                    <feMerge>
                                        <feMergeNode in="coloredBlur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>
                            {/* North Carolina State Shape */}
                            <path
                                className="nc-state"
                                fill="url(#ncGradient)"
                                filter="url(#glow)"
                                d="M10,100 L30,85 L50,90 L80,75 L110,80 L140,70 L170,75 L200,65 L230,70 L260,60 L290,65 L320,55 L350,60 L380,50 L410,55 L440,45 L470,50 L490,60 L485,80 L475,95 L460,105 L440,110 L420,120 L395,125 L370,130 L340,135 L310,140 L280,145 L250,150 L220,148 L190,145 L160,140 L130,135 L100,130 L70,125 L40,120 L20,115 L10,100 Z"
                            />
                            {/* Hickory Location Pin */}
                            <g className="location-pin" transform="translate(180, 85)">
                                <circle cx="0" cy="0" r="12" fill="#EF4444" className="pin-pulse" />
                                <circle cx="0" cy="0" r="6" fill="#fff" />
                                <text x="15" y="5" fill="#fff" fontSize="12" fontWeight="600">Hickory</text>
                            </g>
                        </svg>
                        {/* NC Flag Colors Strip */}
                        <div className="nc-flag-strip">
                            <div className="flag-blue"></div>
                            <div className="flag-red"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LocationSection
