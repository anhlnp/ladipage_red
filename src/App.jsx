import { useState, useEffect } from 'react'
import './index.css'
import { ThemeProvider } from './context/ThemeContext'
import SmoothScroll from './components/SmoothScroll/SmoothScroll'
import Loader from './components/Loader/Loader'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Services from './components/Services/Services'
import Features from './components/Features/Features'
import Clients from './components/Clients/Clients'
import Portal from './components/Portal/Portal'
import CTA from './components/CTA/CTA'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import ThreeScene from './components/ThreeScene/ThreeScene'
import CursorGlow from './components/CursorGlow'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'

function App() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setLoading(false), 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <ThemeProvider>
        <Loader progress={Math.min(progress, 100)} />
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider>
      <SmoothScroll>
        <CursorGlow />
        <ThreeScene />
        <Navbar />
        <main>
          <Hero />
          <Services />
          <Features />
          <Clients />
          <Portal />
          <CTA />
          <Contact />
        </main>
        <Footer />
        <ScrollToTop />
      </SmoothScroll>
    </ThemeProvider>
  )
}

export default App
