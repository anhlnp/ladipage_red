import { Link } from 'react-router-dom'

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-main">
                    <div className="footer-brand">
                        <div className="footer-logo" onClick={scrollToTop}>
                            <span className="logo-icon">◆</span>
                            SELECT<span className="accent">TECH</span>
                        </div>
                        <p>
                            Award-winning IT solutions and cybersecurity services. Protecting businesses in Hickory, NC and beyond for 23+ years.
                        </p>
                        <div className="footer-awards">
                            <div className="award">
                                <span className="award-year">2024</span>
                                <span className="award-title">Best Computer IT & Consulting</span>
                            </div>
                            <div className="award">
                                <span className="award-year">2024</span>
                                <span className="award-title">Best Computer Repair</span>
                            </div>
                        </div>
                    </div>

                    <div className="footer-links">
                        <div className="footer-col">
                            <h4>Services</h4>
                            <Link to="/cybersecurity">Cybersecurity</Link>
                            <Link to="/it-support">Managed IT</Link>
                            <Link to="/phone-tablet-repair">Mobile Repair</Link>
                            <Link to="/fiber-data-center">Infrastructure</Link>
                        </div>
                        <div className="footer-col">
                            <h4>Company</h4>
                            <Link to="/about">About Us</Link>
                            <Link to="/our-team">Our Team</Link>
                            <Link to="/contact">Careers</Link>
                            <Link to="/contact">Contact</Link>
                        </div>
                        <div className="footer-col">
                            <h4>Resources</h4>
                            <Link to="/blog">Blog</Link>
                            <Link to="/about">Case Studies</Link>
                            <a href="#">FAQ</a>
                            <Link to="/contact">Support</Link>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-copyright">
                        <p>&copy; 2024 Select Tech Inc. All rights reserved.</p>
                        <a href="https://looperslab.com/" target="_blank" rel="noopener noreferrer" className="developer-link">
                            Developed by Loopers Lab
                        </a>
                    </div>
                    <div className="footer-legal">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
