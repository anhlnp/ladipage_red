import './Testimonials.css'

const QuoteIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="quote-icon">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
    </svg>
)

// Testimonials section - customer reviews
const Testimonials = ({ testimonials, title = "What Our Partners Are Saying" }) => {
    return (
        <section className="testimonials-section">
            <div className="testimonials-container">
                {title && <h2 className="testimonials-title">{title}</h2>}
                <div className="testimonials-grid">
                    {testimonials.map((testimonial, idx) => (
                        <div key={idx} className="testimonial-card glass-box">
                            <QuoteIcon />
                            <p className="testimonial-content">{testimonial.content}</p>
                            <div className="testimonial-author">
                                <span className="author-name">{testimonial.author}</span>
                                {testimonial.role && (
                                    <span className="author-role">{testimonial.role}</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Testimonials
