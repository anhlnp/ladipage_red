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
                            <a href="#services">Cybersecurity</a>
                            <a href="#services">Managed IT</a>
                            <a href="#services">Device Repair</a>
                            <a href="#services">Infrastructure</a>
                        </div>
                        <div className="footer-col">
                            <h4>Company</h4>
                            <a href="#hero">About Us</a>
                            <a href="#features">Our Team</a>
                            <a href="#contact">Careers</a>
                            <a href="#contact">Contact</a>
                        </div>
                        <div className="footer-col">
                            <h4>Resources</h4>
                            <a href="#">Blog</a>
                            <a href="#clients">Case Studies</a>
                            <a href="#">FAQ</a>
                            <a href="#contact">Support</a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2024 Select Tech Inc. All rights reserved.</p>
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
