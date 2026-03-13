import { useEffect, useRef } from 'react'
import storeImage from '../assets/employee/Computer-repair.png'
import {
    Search,
    HardDrive,
    Wrench,
    Rocket,
    Disc,
    Bug,
    ClipboardList,
    DollarSign,
    Stethoscope,
    FileCheck,
    CheckCircle,
    Zap,
    Monitor,
    MemoryStick,
    Cpu,
    Gamepad2,
    ShieldCheck,
    Clock,
    Award,
    MapPin,
    Users,
    ChevronRight
} from 'lucide-react'
import PageLayout from '../components/PageLayout/PageLayout'
import ServiceHero from '../components/ServiceHero/ServiceHero'
import './ServicePage.css'
import './ComputerRepair.css'

const ComputerRepair = () => {
    const imageLeftRef = useRef(null)
    const imageRightRef = useRef(null)
    const stepsRef = useRef([])
    const servicesRef = useRef([])

    useEffect(() => {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in')
                }
            })
        }, observerOptions)

        if (imageLeftRef.current) observer.observe(imageLeftRef.current)
        if (imageRightRef.current) observer.observe(imageRightRef.current)
        stepsRef.current.forEach(el => { if (el) observer.observe(el) })
        servicesRef.current.forEach(el => { if (el) observer.observe(el) })

        return () => observer.disconnect()
    }, [])

    const repairSteps = [
        {
            number: '01',
            icon: <ClipboardList size={28} />,
            title: 'Quick Intake & Consultation',
            desc: 'When you bring your device to Select Tech, we start with a brief interview to understand the issue, symptoms, and your goals.',
            color: '#00d9ff'
        },
        {
            number: '02',
            icon: <DollarSign size={28} />,
            title: 'Diagnostic Deposit ($50)',
            desc: 'We collect a $50 diagnostic deposit to cover our technician\'s time for troubleshooting and testing.',
            bullets: ['Ensures your device is properly evaluated', 'Allows us to dedicate expert time to your issue'],
            color: '#06b6d4'
        },
        {
            number: '03',
            icon: <Stethoscope size={28} />,
            title: 'Full Diagnosis & Evaluation',
            desc: 'Our technicians perform a comprehensive diagnostic to determine the root cause — not just the symptom.',
            color: '#0891b2'
        },
        {
            number: '04',
            icon: <FileCheck size={28} />,
            title: 'Repair Estimate & Approval',
            desc: 'We contact you with a clear repair plan and cost estimate before any work is performed.',
            bullets: ['No surprises', 'No unauthorized repairs'],
            color: '#0e7490'
        },
        {
            number: '05',
            icon: <CheckCircle size={28} />,
            title: 'Repair & Completion',
            desc: 'Your device is repaired, tested, and returned ready for use.',
            bullets: ['The $50 deposit is applied toward your repair', 'Device repaired, tested, and returned ready'],
            note: 'If you choose not to proceed, the $50 serves as the diagnostic fee.',
            color: '#155e75'
        },
    ]

    const topServices = [
        {
            icon: <Zap size={32} />,
            title: 'Slow Computers & Virus Removal',
            items: ['Malware / ransomware cleanup', 'System optimization', 'Startup and performance tuning'],
        },
        {
            icon: <HardDrive size={32} />,
            title: 'Hard Drive Failures & Upgrades',
            items: ['Replace failing drives', 'Upgrade to high-speed SSDs', 'Data migration & recovery'],
            highlight: 'Huge performance improvement',
        },
        {
            icon: <Monitor size={32} />,
            title: 'Broken Laptop Screens',
            items: ['Cracked or black screens', 'Flickering displays', 'Full screen replacements'],
        },
        {
            icon: <MemoryStick size={32} />,
            title: 'Memory (RAM) Upgrades & Failures',
            items: ['Fix crashing or freezing systems', 'Upgrade for better performance', 'Compatibility testing'],
        },
        {
            icon: <Cpu size={32} />,
            title: 'Advanced Hardware Diagnostics',
            items: ['Motherboard or processor issues', 'Power problems / no boot', 'Charging port repairs'],
        },
        {
            icon: <Gamepad2 size={32} />,
            title: 'Custom Business & Gaming Systems',
            items: ['High-performance desktop systems', 'Built for speed & reliability', 'Future-proof upgrades'],
            isSpecial: true,
        },
    ]

    const whyChoose = [
        { icon: <Wrench size={20} />, text: 'Repairing 800+ devices per year' },
        { icon: <Users size={20} />, text: 'Experienced technicians & cybersecurity experts' },
        { icon: <DollarSign size={20} />, text: 'Honest, upfront pricing' },
        { icon: <Clock size={20} />, text: 'Fast turnaround times' },
        { icon: <MapPin size={20} />, text: 'Local, trusted service in the Hickory area' },
        { icon: <ShieldCheck size={20} />, text: 'Warranty on all repairs' },
    ]

    return (
        <PageLayout>
            <ServiceHero
                tag="PC, MAC & MOBILE REPAIR"
                title="PC, Mac & Mobile"
                gradientText="Repair Services"
                description="Fast. Professional. Transparent. We repair hundreds of PCs, Macs, and mobile devices each year with a process designed to be simple, clear, and fair."
                backgroundImage={storeImage}
            />

            {/* ═══════════ 5-STEP REPAIR PROCESS ═══════════ */}
            <section className="repair-process-section">
                <div className="repair-process-container">
                    <div className="section-header">
                        <span className="section-tag">HOW IT WORKS</span>
                        <h2>Our 5-Step <span className="gradient-text">Repair Process</span></h2>
                        <p>Simple, clear, and fair — so you always know what to expect.</p>
                    </div>

                    <div className="steps-timeline">
                        <div className="timeline-line" />
                        {repairSteps.map((step, idx) => (
                            <div
                                key={idx}
                                className={`step-card fade-up`}
                                ref={el => stepsRef.current[idx] = el}
                                style={{ '--step-color': step.color, '--delay': `${idx * 0.1}s` }}
                            >
                                <div className="step-number-badge">
                                    <span>{step.number}</span>
                                </div>
                                <div className="step-icon">{step.icon}</div>
                                <div className="step-content">
                                    <h3>{step.title}</h3>
                                    <p>{step.desc}</p>
                                    {step.bullets && (
                                        <ul className="step-bullets">
                                            {step.bullets.map((b, i) => (
                                                <li key={i}><CheckCircle size={14} /> {b}</li>
                                            ))}
                                        </ul>
                                    )}
                                    {step.note && (
                                        <div className="step-note">
                                            {step.note}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════ TOP SERVICES ═══════════ */}
            <section className="top-services-section">
                <div className="top-services-container">
                    <div className="section-header">
                        <span className="section-tag">WHAT WE FIX</span>
                        <h2>Top Services <span className="gradient-text">We Provide</span></h2>
                        <p>We repair well over 1,000 PCs, Macs, and smartphones annually.</p>
                    </div>

                    <div className="services-grid">
                        {topServices.map((service, idx) => (
                            <div
                                key={idx}
                                className={`top-service-card fade-up ${service.isSpecial ? 'special-card' : ''}`}
                                ref={el => servicesRef.current[idx] = el}
                                style={{ '--delay': `${idx * 0.08}s` }}
                            >
                                <div className="top-service-icon">
                                    {service.icon}
                                </div>
                                <h3>{service.title}</h3>
                                <ul>
                                    {service.items.map((item, i) => (
                                        <li key={i}><ChevronRight size={14} /> {item}</li>
                                    ))}
                                </ul>
                                {service.highlight && (
                                    <div className="service-highlight">
                                        {service.highlight}
                                    </div>
                                )}
                                {service.isSpecial && (
                                    <p className="special-note">
                                        We design and build high-performance desktop systems tailored to your needs — whether for business productivity or high-end gaming.
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════ CUSTOM BUILDS SHOWCASE ═══════════ */}
            <section className="repair-showcase">
                <div className="repair-showcase-content">
                    <h2 className="repair-title">
                        Custom <span className="gradient-text">Builds & Repairs</span>
                    </h2>
                    <p className="repair-subtitle">
                        From custom gaming rigs to professional workstations — built for speed, reliability, and future upgrades
                    </p>
                </div>
                <div className="repair-images-wrapper">
                    <div
                        ref={imageLeftRef}
                        className="repair-image-card slide-from-left"
                    >
                        <div className="image-glow"></div>
                        <img
                            src={storeImage}
                            alt="Computer repair workspace"
                        />
                        <div className="image-overlay">
                            <span>Professional Repair</span>
                        </div>
                    </div>
                    <div
                        ref={imageRightRef}
                        className="repair-image-card slide-from-right"
                    >
                        <div className="image-glow"></div>
                        <img
                            src="/computer_repair_generated.png"
                            alt="Custom build in action"
                        />
                        <div className="image-overlay">
                            <span>Custom Gaming Builds</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════ WHY CHOOSE SELECT TECH ═══════════ */}
            <section className="why-choose-repair">
                <div className="why-choose-repair-container">
                    <div className="section-header">
                        <span className="section-tag">WHY US</span>
                        <h2>Why Choose <span className="gradient-text">Select Tech?</span></h2>
                    </div>
                    <div className="why-choose-grid-repair">
                        {whyChoose.map((item, idx) => (
                            <div key={idx} className="why-choose-card">
                                <div className="why-choose-card-icon">{item.icon}</div>
                                <span>{item.text}</span>
                            </div>
                        ))}
                    </div>
                    <div className="why-choose-tagline">
                        <p className="tagline-main">Simple. Professional. Done Right.</p>
                        <p className="tagline-sub">Select Tech — Keeping Your Technology Running.</p>
                    </div>
                </div>
            </section>

            {/* ═══════════ CTA ═══════════ */}
            <section className="page-cta">
                <div className="cta-container">
                    <h2>Ready to Get Your Device Fixed?</h2>
                    <p>Contact us today for a free consultation. Walk-ins welcome at our Hickory, NC location!</p>
                    <a href="/contact" className="btn-primary">Schedule Repair</a>
                </div>
            </section>
        </PageLayout>
    )
}

export default ComputerRepair
