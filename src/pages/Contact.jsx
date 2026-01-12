import PageLayout from '../components/PageLayout/PageLayout'
import ContactSection from '../components/Contact/Contact'
import './Contact.css'

const Contact = () => {
    return (
        <PageLayout>
            <div className="contact-page-wrapper">
                <ContactSection />
            </div>
        </PageLayout>
    )
}

export default Contact
