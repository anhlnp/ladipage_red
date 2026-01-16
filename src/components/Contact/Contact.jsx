import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { supabase } from '../../lib/supabase'

gsap.registerPlugin(ScrollTrigger)

const Contact = () => {
    const sectionRef = useRef(null)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' })

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.contact-info',
                { opacity: 0, x: -40 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: '.contact-layout',
                        start: 'top 80%'
                    }
                }
            )

            gsap.fromTo('.contact-form-wrapper',
                { opacity: 0, x: 40 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: '.contact-layout',
                        start: 'top 80%'
                    }
                }
            )
        }, sectionRef)

        return () => ctx.revert()
    }, [])


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
        // Clear status when user starts typing
        if (submitStatus.message) {
            setSubmitStatus({ type: '', message: '' })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus({ type: '', message: '' })

        try {
            if (!supabase) {
                throw new Error('Database not configured')
            }

            const { error } = await supabase
                .from('contacts')
                .insert([{
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone || null,
                    service: formData.service,
                    message: formData.message,
                    status: 'new',
                    is_read: false
                }])

            if (error) throw error

            setSubmitStatus({
                type: 'success',
                message: 'Thank you for your message! We will get back to you soon.'
            })
            setFormData({
                name: '',
                email: '',
                phone: '',
                service: '',
                message: ''
            })
        } catch (error) {
            console.error('Error submitting contact:', error)
            setSubmitStatus({
                type: 'error',
                message: 'Something went wrong. Please try again or contact us directly.'
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section id="contact" className="contact" ref={sectionRef}>
            <div className="section-container">
                <div className="contact-layout">
                    <div className="contact-info">
                        <span className="section-tag">Get In Touch</span>
                        <h2 className="section-title">Let's Discuss Your IT Needs</h2>
                        <p className="contact-desc">
                            We're here to help you with all your technology needs. Reach out to our team today.
                        </p>

                        <div className="contact-details">
                            <div className="contact-item">
                                <div className="contact-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                </div>
                                <div>
                                    <h4>Located at</h4>
                                    <p>2155 N. Center Street</p>
                                    <p>Hickory, North Carolina 28601</p>
                                </div>
                            </div>

                            <div className="contact-item">
                                <div className="contact-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <polyline points="12 6 12 12 16 14" />
                                    </svg>
                                </div>
                                <div>
                                    <h4>Hours</h4>
                                    <p>Monday — Friday</p>
                                    <p>9:00 AM - 6:00 PM</p>
                                </div>
                            </div>

                            <div className="contact-item">
                                <div className="contact-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72" />
                                    </svg>
                                </div>
                                <div>
                                    <h4>Contact</h4>
                                    <p>(828) 328-4801</p>
                                    <p>info@selecttech.com</p>
                                </div>
                            </div>
                        </div>

                        <div className="certifications">
                            <span className="cert-badge">NC Security Licensed</span>
                            <span className="cert-badge">FTC Compliant</span>
                            <span className="cert-badge">HIPAA Certified</span>
                        </div>
                    </div>

                    <div className="contact-form-wrapper">
                        {submitStatus.message && (
                            <div className={`submit-status ${submitStatus.type}`}>
                                {submitStatus.type === 'success' && (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                        <polyline points="22 4 12 14.01 9 11.01" />
                                    </svg>
                                )}
                                {submitStatus.type === 'error' && (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <line x1="15" y1="9" x2="9" y2="15" />
                                        <line x1="9" y1="9" x2="15" y2="15" />
                                    </svg>
                                )}
                                <span>{submitStatus.message}</span>
                            </div>
                        )}
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder=" "
                                    required
                                    disabled={isSubmitting}
                                />
                                <label htmlFor="name">Your Name</label>
                            </div>

                            <div className="form-group">
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder=" "
                                    required
                                    disabled={isSubmitting}
                                />
                                <label htmlFor="email">Email Address</label>
                            </div>

                            <div className="form-group">
                                <input
                                    type="tel"
                                    id="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder=" "
                                    disabled={isSubmitting}
                                />
                                <label htmlFor="phone">Phone Number</label>
                            </div>

                            <div className="form-group">
                                <select
                                    id="service"
                                    value={formData.service}
                                    onChange={handleChange}
                                    required
                                    disabled={isSubmitting}
                                >
                                    <option value="" disabled></option>
                                    <option value="cybersecurity">Cybersecurity & Compliance</option>
                                    <option value="managed-it">Managed IT Services</option>
                                    <option value="repair">Mobile Repair</option>
                                    <option value="infrastructure">Infrastructure</option>
                                    <option value="other">Other</option>
                                </select>
                                <label htmlFor="service">Service Needed</label>
                            </div>

                            <div className="form-group full-width">
                                <textarea
                                    id="message"
                                    rows="4"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder=" "
                                    required
                                    disabled={isSubmitting}
                                ></textarea>
                                <label htmlFor="message">Your Message</label>
                            </div>

                            <button
                                type="submit"
                                className={`btn-primary btn-full ${isSubmitting ? 'loading' : ''}`}
                                disabled={isSubmitting}
                            >
                                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                                {!isSubmitting && (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="22" y1="2" x2="11" y2="13" />
                                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                    </svg>
                                )}
                                {isSubmitting && (
                                    <div className="spinner"></div>
                                )}
                                <div className="btn-glow"></div>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact
