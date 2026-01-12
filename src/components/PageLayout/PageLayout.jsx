import SmoothScroll from '../SmoothScroll/SmoothScroll'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import StarBackground from '../StarBackground/StarBackground'
import CursorGlow from '../CursorGlow'
import ScrollToTop from '../ScrollToTop/ScrollToTop'

// Reusable page layout wrapper for all pages
const PageLayout = ({ children }) => {
    return (
        <SmoothScroll>
            <CursorGlow />
            <StarBackground />
            <Navbar />
            <main>
                {children}
            </main>
            <Footer />
            <ScrollToTop />
        </SmoothScroll>
    )
}

export default PageLayout
