import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const clients = [
    'Miller Knoll',
    'Excela Pharma',
    'Eco Dental',
    'Green Park Dentistry',
    'Star Snax',
    'Aiken Black Tire',
    'Everett Chevrolet',
    'Town of Hudson',
    'Viewmont Auto',
    'Robinson Builders'
]

const testimonials = [
    {
        quote: "Select Tech's Cyber Compliance Portal streamlined our FTC Safeguards and allowed us to focus on our Business Goals!",
        avatar: 'JD',
        name: 'Dealership Owner',
        role: 'Automotive Industry'
    },
    {
        quote: 'Select Tech consistently goes above and beyond with every repair. Reasonably priced with quick turnaround!',
        avatar: 'SM',
        name: 'Small Business Owner',
        role: 'Retail Sector'
    },
    {
        quote: 'The Compliance portal is easy to use and makes it easy to track employee training and safeguards.',
        avatar: 'RK',
        name: 'HR Manager',
        role: 'Healthcare'
    }
]

const Clients = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const sectionRef = useRef(null)

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(prev => (prev + 1) % testimonials.length)
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.section-header',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: '.clients',
                        start: 'top 80%'
                    }
                }
            )
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section id="clients" className="clients" ref={sectionRef}>
            <div className="section-container">
                <div className="section-header">
                    <span className="section-tag">Trusted By</span>
                    <h2 className="section-title">Industry Leaders Choose Select Tech</h2>
                </div>

                <div className="clients-marquee">
                    <div className="marquee-track">
                        {[...clients, ...clients].map((client, index) => (
                            <div key={index} className="client-logo">
                                {client}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Portfolio Showcase */}
                <div className="portfolio-showcase">
                    <div className="showcase-content">
                        <div className="showcase-text">
                            <span className="showcase-tag">Featured Project</span>
                            <h3 className="showcase-title">Cyber Compliance Portal</h3>
                            <p className="showcase-description">
                                Our flagship security dashboard provides real-time monitoring,
                                compliance tracking, and automated threat detection for businesses
                                of all sizes.
                            </p>
                            <ul className="showcase-features">
                                <li>✓ FTC Safeguards Compliance</li>
                                <li>✓ Real-time Security Monitoring</li>
                                <li>✓ Employee Training Tracking</li>
                                <li>✓ Automated Threat Detection</li>
                            </ul>
                        </div>
                        <div className="showcase-image-wrapper">
                            <div className="showcase-image-glow"></div>
                            <img
                                src="/screenshot-1767549325541.png"
                                alt="Cyber Compliance Portal Dashboard"
                                className="showcase-image"
                            />
                        </div>
                    </div>
                </div>

                <div className="testimonials">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className={`testimonial-card ${index === activeIndex ? 'active' : ''}`}
                        >
                            <div className="testimonial-quote">"</div>
                            <p className="testimonial-text">{testimonial.quote}</p>
                            <div className="testimonial-author">
                                <div className="author-avatar">{testimonial.avatar}</div>
                                <div className="author-info">
                                    <span className="author-name">{testimonial.name}</span>
                                    <span className="author-role">{testimonial.role}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="testimonial-nav">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            className={`testimonial-dot ${index === activeIndex ? 'active' : ''}`}
                            onClick={() => setActiveIndex(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Clients
