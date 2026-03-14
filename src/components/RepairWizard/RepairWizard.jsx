import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import './RepairWizard.css'

// Import images
import smartphoneImg from '../../assets/devices/smartphone.png'
import tabletImg from '../../assets/devices/tablet.png'
import computerImg from '../../assets/devices/computer.png'
import consoleImg from '../../assets/devices/console.png'

const RepairWizard = (props) => {
    const [step, setStep] = useState(1)
    const [selections, setSelections] = useState({
        device: '',
        brand: '',
        model: '',
        issue: ''
    })
    const [prices, setPrices] = useState([])
    const [loadingPrices, setLoadingPrices] = useState(false)
    const [selectedIssue, setSelectedIssue] = useState('')
    const [otherIssueText, setOtherIssueText] = useState('')
    const [additionalMessage, setAdditionalMessage] = useState('')
    const [sendingEmail, setSendingEmail] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)

    // Contact form fields
    const [contactName, setContactName] = useState('')
    const [contactEmail, setContactEmail] = useState('')
    const [contactPhone, setContactPhone] = useState('')
    const [contactErrors, setContactErrors] = useState({})

    // Custom "Other" inputs state
    const [showBrandInput, setShowBrandInput] = useState(false)
    const [customBrandText, setCustomBrandText] = useState('')
    const [showModelInput, setShowModelInput] = useState(false)
    const [customModelText, setCustomModelText] = useState('')

    const repairData = {
        smartphone: {
            image: smartphoneImg,
            label: 'Smartphone',
            brands: ['Apple', 'Samsung', 'Google', 'Motorola', 'LG', 'OnePlus', 'Huawei', 'Xiaomi', 'Sony', 'Oppo'],
            models: {
                'Apple': [
                    'iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15 Plus', 'iPhone 15',
                    'iPhone 14 Pro Max', 'iPhone 14 Pro', 'iPhone 14 Plus', 'iPhone 14',
                    'iPhone 13 Pro Max', 'iPhone 13 Pro', 'iPhone 13', 'iPhone 13 mini',
                    'iPhone 12 Pro Max', 'iPhone 12 Pro', 'iPhone 12', 'iPhone 12 mini',
                    'iPhone 11 Pro Max', 'iPhone 11 Pro', 'iPhone 11',
                    'iPhone SE (3rd Gen)', 'iPhone SE (2nd Gen)',
                    'iPhone XS Max', 'iPhone XS', 'iPhone XR', 'iPhone X',
                    'iPhone 8 Plus', 'iPhone 8', 'iPhone 7 Plus', 'iPhone 7', 'iPhone 6S'
                ],
                'Samsung': [
                    'Galaxy S24 Ultra', 'Galaxy S24+', 'Galaxy S24',
                    'Galaxy S23 Ultra', 'Galaxy S23+', 'Galaxy S23', 'Galaxy S23 FE',
                    'Galaxy Z Fold 5', 'Galaxy Z Flip 5',
                    'Galaxy S22 Ultra', 'Galaxy S22+', 'Galaxy S22',
                    'Galaxy S21 Ultra', 'Galaxy S21+', 'Galaxy S21',
                    'Galaxy Note 20 Ultra', 'Galaxy Note 20', 'Galaxy Note 10+',
                    'Galaxy A54', 'Galaxy A53', 'Galaxy A34', 'Galaxy A14', 'Galaxy A04s'
                ],
                'Google': [
                    'Pixel 8 Pro', 'Pixel 8',
                    'Pixel 7 Pro', 'Pixel 7', 'Pixel 7a',
                    'Pixel 6 Pro', 'Pixel 6', 'Pixel 6a'
                ],
                'Motorola': ['Razr+', 'Edge+', 'Moto G Stylus', 'Moto G Power', 'Moto G Pure'],
                'LG': ['Wing', 'Velvet', 'V60 ThinQ', 'G8 ThinQ', 'Stylo 6'],
                'OnePlus': ['OnePlus 11', 'OnePlus 10 Pro', 'OnePlus 9 Pro', 'Nord N300', 'Nord N200'],
                'Huawei': ['P60 Pro', 'P50 Pro', 'Mate 50 Pro', 'Nova 10'],
                'Xiaomi': ['13 Pro', '13 Ultra', 'Redmi Note 12', 'Poco X5'],
                'Sony': ['Xperia 1 V', 'Xperia 5 IV', 'Xperia 10 V'],
                'Oppo': ['Find X6 Pro', 'Reno 10 Pro', 'A78']
            },
            issues: ['Cracked Screen', 'Battery Replacement', 'Charging Port', 'Back Glass', 'Camera Lens', 'Water Damage', 'Speaker/Mic', 'Buttons', 'Software Issue', 'Data Recovery']
        },
        tablet: {
            image: tabletImg,
            label: 'Tablet',
            brands: ['Apple', 'Samsung', 'Microsoft', 'Amazon', 'Lenovo'],
            models: {
                'Apple': [
                    'iPad Pro 12.9" (M2)', 'iPad Pro 12.9" (M1)', 'iPad Pro 12.9" (Gen 3/4)',
                    'iPad Pro 11" (M2)', 'iPad Pro 11" (M1)',
                    'iPad Air (5th Gen)', 'iPad Air (4th Gen)',
                    'iPad (10th Gen)', 'iPad (9th Gen)', 'iPad (8th Gen)',
                    'iPad mini (6th Gen)', 'iPad mini (5th Gen)'
                ],
                'Samsung': [
                    'Galaxy Tab S9 Ultra', 'Galaxy Tab S9+', 'Galaxy Tab S9',
                    'Galaxy Tab S8 Ultra', 'Galaxy Tab S8+', 'Galaxy Tab S8',
                    'Galaxy Tab S7 FE', 'Galaxy Tab A8', 'Galaxy Tab A7 Lite'
                ],
                'Microsoft': ['Surface Pro 9', 'Surface Pro 8', 'Surface Go 3'],
                'Amazon': ['Fire Max 11', 'Fire HD 10', 'Fire HD 8'],
                'Lenovo': ['Tab P12 Pro', 'Tab P11 Pro', 'Tab M10 Plus']
            },
            issues: ['Cracked Screen', 'Battery Issue', 'Charging Port', 'LCD Replacement', 'Home Button', 'Camera Issues', 'Software Fix']
        },
        computer: {
            image: computerImg,
            label: 'Computer',
            brands: ['Apple', 'Dell', 'HP', 'Lenovo', 'Asus', 'Acer', 'Microsoft', 'Desktop/Other'],
            models: {
                'Apple': [
                    'MacBook Pro 16" (M3)', 'MacBook Pro 14" (M3)',
                    'MacBook Pro 16" (M2/M1)', 'MacBook Pro 14" (M2/M1)',
                    'MacBook Pro 13" (M2/M1)',
                    'MacBook Air 15" (M2)', 'MacBook Air 13" (M2)', 'MacBook Air 13" (M1)',
                    'iMac 24" (M1/M3)', 'iMac 27" (Intel)', 'Mac mini', 'Mac Studio', 'Mac Pro'
                ],
                'Dell': ['XPS Series', 'Inspiron Series', 'Latitude Series', 'Alienware', 'Precision'],
                'HP': ['Spectre Series', 'Envy Series', 'Pavilion Series', 'Omen', 'EliteBook'],
                'Lenovo': ['ThinkPad X1', 'ThinkPad T/L/E Series', 'Yoga Series', 'Legion', 'IdeaPad'],
                'Asus': ['ZenBook', 'VivoBook', 'ROG Series', 'TUF Gaming'],
                'Acer': ['Swift', 'Aspire', 'Predator', 'Nitro'],
                'Microsoft': ['Surface Laptop', 'Surface Pro', 'Surface Studio'],
                'Desktop/Other': ['Custom Desktop PC', 'Gaming PC', 'All-in-One', 'Other Brand']
            },
            issues: ['Screen Replacement', 'Battery Replacement', 'Keyboard Replacement', 'Trackpad Issue', 'Hinge Repair', 'Charging Port', 'Water Damage', 'Data Recovery', 'Virus Removal', 'OS Reinstall', 'Hard Drive/SSD Upgrade', 'RAM Upgrade']
        },
        console: {
            image: consoleImg,
            label: 'Gaming System',
            brands: ['PlayStation', 'Xbox', 'Nintendo', 'Steam', 'Other'],
            models: {
                'PlayStation': ['PlayStation 5 (Disc)', 'PlayStation 5 (Digital)', 'PlayStation 4 Pro', 'PlayStation 4 Slim', 'PlayStation 4'],
                'Xbox': ['Xbox Series X', 'Xbox Series S', 'Xbox One X', 'Xbox One S', 'Xbox One'],
                'Nintendo': ['Switch OLED', 'Switch (Standard)', 'Switch Lite', 'Wii U', '3DS'],
                'Steam': ['Steam Deck', 'Steam Deck OLED'],
                'Other': ['Retro Console', 'VR Headset']
            },
            issues: ['HDMI Port Repair', 'Disc Drive Issue', 'Overheating/Cleaning', 'Controller Drift', 'No Power', 'Software Error', 'Hard Drive Upgrade']
        }
    }

    // Determine price category based on device and brand
    const getPriceCategory = () => {
        if (selections.device === 'smartphone' && selections.brand === 'Apple') {
            return 'iphone'
        }
        if (selections.device === 'tablet' && selections.brand === 'Apple') {
            return 'ipad'
        }
        return null
    }

    // Determine model range based on selected model
    const getModelRange = () => {
        if (!selections.model) return null

        const model = selections.model

        // iPhone model ranges
        if (selections.brand === 'Apple' && selections.device === 'smartphone') {
            // Older models: iPhone 5/5S/SE/6-8+ & SE2
            const olderModels = ['iPhone 6S', 'iPhone 7', 'iPhone 7 Plus', 'iPhone 8', 'iPhone 8 Plus',
                'iPhone SE (2nd Gen)', 'iPhone SE (3rd Gen)']
            if (olderModels.some(m => model.includes(m.replace(' Plus', '').replace(' (2nd Gen)', '').replace(' (3rd Gen)', '')))) {
                return 'iPhone 5/5S/SE/6-8+ & SE2'
            }
            // Newer models: iPhone X and above
            return 'iPhone X - 17 Pro Max / iPhone Air'
        }

        // iPad model ranges
        if (selections.brand === 'Apple' && selections.device === 'tablet') {
            if (model.includes('Pro')) {
                return 'iPad Pro 1 - 13th Gen'
            }
            if (model.includes('Air')) {
                return 'iPad Air 1 - 13th Gen'
            }
            return 'iPad 2 - 11th Gen'
        }

        return null
    }

    // Fetch prices when reaching step 5
    useEffect(() => {
        if (step === 5) {
            fetchPrices()
        }
    }, [step])

    const fetchPrices = async () => {
        const category = getPriceCategory()
        const modelRange = getModelRange()

        if (!category) {
            setPrices([])
            return
        }

        setLoadingPrices(true)

        try {
            if (supabase) {
                const { data, error } = await supabase
                    .from('repair_prices')
                    .select('*')
                    .eq('category', category)
                    .eq('is_active', true)
                    .order('display_order')

                if (error) throw error

                if (data) {
                    const rangePrices = modelRange ? data.filter(p => p.model_range === modelRange) : data
                    const exactPrices = data.filter(p => p.model_range.toLowerCase() === selections.model.toLowerCase())

                    if (exactPrices.length === 0) {
                        setPrices(rangePrices)
                    } else {
                        const mergedMap = new Map()
                        rangePrices.forEach(p => mergedMap.set(p.service_name.toLowerCase(), p))
                        exactPrices.forEach(p => mergedMap.set(p.service_name.toLowerCase(), p))

                        const mergedPrices = Array.from(mergedMap.values()).sort((a, b) => a.display_order - b.display_order)
                        setPrices(mergedPrices)
                    }
                } else {
                    setPrices([])
                }
            } else {
                // Fallback to static data
                setPrices(getStaticPrices(category, modelRange))
            }
        } catch (error) {
            console.error('Error fetching prices:', error)
            setPrices(getStaticPrices(category, modelRange))
        } finally {
            setLoadingPrices(false)
        }
    }

    const getStaticPrices = (category, modelRange) => {
        const allPrices = {
            iphone: [
                { service_name: 'Screen', model_range: 'iPhone 5/5S/SE/6-8+ & SE2', price_min: '100', price_max: '120' },
                { service_name: 'Screen', model_range: 'iPhone X - 17 Pro Max / iPhone Air', price_min: '140', price_max: '525' },
                { service_name: 'Battery', model_range: 'iPhone 5/5S/SE/6-8+ & SE2', price_min: '80', price_max: '110' },
                { service_name: 'Battery', model_range: 'iPhone X - 17 Pro Max / iPhone Air', price_min: '128', price_max: '170' },
                { service_name: 'Charge Port', model_range: 'iPhone 5/5S/SE/6-8+ & SE2', price_min: '170', price_max: '180' },
                { service_name: 'Charge Port', model_range: 'iPhone X - 17 Pro Max / iPhone Air', price_min: '180', price_max: '290' },
                { service_name: 'Ring Spkr / Ear Spkr', model_range: 'iPhone 5/5S/SE/6-8+ & SE2', price_min: '110', price_max: '120' },
                { service_name: 'Ring Spkr / Ear Spkr', model_range: 'iPhone X - 17 Pro Max / iPhone Air', price_min: '120', price_max: '130' },
                { service_name: 'Prox/Frnt Camera', model_range: 'iPhone 5/5S/SE/6-8+ & SE2', price_min: '110', price_max: '120' },
                { service_name: 'Prox/Frnt Camera', model_range: 'iPhone X - 17 Pro Max / iPhone Air', price_min: '115', price_max: '240' },
                { service_name: 'Rear Camera', model_range: 'iPhone 5/5S/SE/6-8+ & SE2', price_min: '110', price_max: '120' },
                { service_name: 'Rear Camera', model_range: 'iPhone X - 17 Pro Max / iPhone Air', price_min: '115', price_max: '240' },
                { service_name: 'Rear Cam Lens', model_range: 'iPhone 5/5S/SE/6-8+ & SE2', price_min: '110', price_max: '120' },
                { service_name: 'Rear Cam Lens', model_range: 'iPhone X - 17 Pro Max / iPhone Air', price_min: '115', price_max: '240' },
            ],
            ipad: [
                { service_name: 'Digitizer', model_range: 'iPad Air 1 - 13th Gen', price_min: '125', price_max: '165' },
                { service_name: 'Digitizer', model_range: 'iPad Pro 1 - 13th Gen', price_min: '255', price_max: '135' },
                { service_name: 'Digitizer', model_range: 'iPad 2 - 11th Gen', price_min: '120', price_max: '160' },
                { service_name: 'LCD', model_range: 'iPad Air 1 - 13th Gen', price_min: '145', price_max: '480', note: '$includes new digi' },
                { service_name: 'LCD', model_range: 'iPad Pro 1 - 13th Gen', price_min: '260', price_max: '405', note: '$includes new digi' },
                { service_name: 'LCD', model_range: 'iPad 2 - 11th Gen', price_min: '130', price_max: '235', note: '$includes new digi' },
                { service_name: 'Battery', model_range: 'iPad Air 1 - 13th Gen', price_min: '125', price_max: '250', note: '$includes new digi' },
                { service_name: 'Battery', model_range: 'iPad Pro 1 - 13th Gen', price_min: '120', price_max: '300', note: '$includes new digi' },
                { service_name: 'Battery', model_range: 'iPad 2 - 11th Gen', price_min: '120', price_max: '220', note: '$includes new digi' },
            ]
        }

        const categoryPrices = allPrices[category] || []

        let rangePrices = categoryPrices
        if (modelRange) {
            rangePrices = categoryPrices.filter(p => p.model_range === modelRange)
        }

        const exactPrices = categoryPrices.filter(p => p.model_range.toLowerCase() === selections.model.toLowerCase())

        if (exactPrices.length === 0) {
            return rangePrices
        }

        const mergedMap = new Map()
        rangePrices.forEach(p => mergedMap.set(p.service_name.toLowerCase(), p))
        exactPrices.forEach(p => mergedMap.set(p.service_name.toLowerCase(), p))
        return Array.from(mergedMap.values())
    }

    const totalSteps = 5

    const handleSelection = (type, value) => {
        setSelections(prev => ({ ...prev, [type]: value }))
        setStep(prev => prev + 1)
    }

    const resetWizard = () => {
        setStep(1)
        setSelections({ device: '', brand: '', model: '', issue: '' })
        setPrices([])
        setAdditionalMessage('')
        setSubmitSuccess(false)
        setOtherIssueText('')
        setSelectedIssue('')
        setContactName('')
        setContactEmail('')
        setContactPhone('')
        setContactErrors({})
    }

    // Validate contact fields
    const validateContact = () => {
        const errors = {}
        if (!contactName.trim()) errors.name = 'Name is required'
        if (!contactEmail.trim()) {
            errors.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail.trim())) {
            errors.email = 'Please enter a valid email'
        }
        setContactErrors(errors)
        return Object.keys(errors).length === 0
    }

    // Send email via SMTP2GO – accepts partial info for early submit
    const sendRepairEmail = async (info = {}) => {
        const apiKey = import.meta.env.VITE_SMTP2GO_API_KEY
        const senderEmail = import.meta.env.VITE_SMTP2GO_SENDER || 'noreply@selecttech.com'
        const recipientEmail = import.meta.env.VITE_SMTP2GO_RECIPIENT || 'info@selecttechinc.com'

        if (!apiKey || apiKey === 'your_api_key') {
            console.log('SMTP2GO not configured, skipping email send')
            return { success: true, skipped: true }
        }

        const sel = { ...selections, ...info }
        const deviceLabel = repairData[sel.device]?.label || sel.device || 'Not selected'
        const brand = sel.brand || 'Not selected'
        const model = sel.model || 'Not selected'
        const issue = sel.issue || 'Not specified'
        const msg = info.additionalMessage ?? additionalMessage

        const emailBody = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #dc2626; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">
                    🔧 New Repair Request
                </h2>
                
                <div style="margin: 20px 0;">
                    <h3 style="color: #374151; margin-bottom: 8px;">Customer Information</h3>
                    <p><strong>Name:</strong> ${contactName}</p>
                    <p><strong>Email:</strong> ${contactEmail}</p>
                    <p><strong>Phone:</strong> ${contactPhone || 'Not provided'}</p>
                </div>
                
                <div style="background: #fef2f2; padding: 20px; border-radius: 8px; border-left: 4px solid #dc2626;">
                    <h3 style="margin-top: 0; color: #374151;">Device Details</h3>
                    <p><strong>Device Type:</strong> ${deviceLabel}</p>
                    <p><strong>Brand:</strong> ${brand}</p>
                    <p><strong>Model:</strong> ${model}</p>
                    <p><strong>Issue:</strong> ${issue}</p>
                </div>

                ${msg && msg.trim() ? `
                <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin-top: 16px;">
                    <h3 style="margin-top: 0; color: #374151;">Additional Notes</h3>
                    <p style="white-space: pre-wrap;">${msg}</p>
                </div>
                ` : ''}

                ${prices.length > 0 ? `
                <div style="margin-top: 16px;">
                    <h3 style="color: #374151;">Estimated Pricing</h3>
                    <table style="width: 100%; border-collapse: collapse; border: 1px solid #e5e7eb;">
                        <thead>
                            <tr style="background: #0891b2; color: #fff;">
                                <th style="padding: 8px 12px; text-align: left;">Service</th>
                                <th style="padding: 8px 12px; text-align: right;">Price Range</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${prices.map(p => {
                                const pMin = String(p.price_min).replace(/\.00$/, '')
                                const pMax = String(p.price_max).replace(/\.00$/, '')
                                return `<tr style="border-top: 1px solid #e5e7eb;">
                                    <td style="padding: 8px 12px;">${p.service_name}</td>
                                    <td style="padding: 8px 12px; text-align: right; font-weight: 600;">${pMin === pMax ? pMin + ' and up*' : pMin + ' - ' + pMax}</td>
                                </tr>`
                            }).join('')}
                        </tbody>
                    </table>
                </div>
                ` : '<p style="margin-top: 16px; color: #6b7280;"><em>No predefined pricing available — custom quote needed.</em></p>'}
                
                <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
                    <p>This email was sent from the Select Tech Repair Wizard.</p>
                    <p>© ${new Date().getFullYear()} Select Tech Inc.</p>
                </div>
            </div>
        `

        try {
            const response = await fetch('https://api.smtp2go.com/v3/email/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    api_key: apiKey,
                    to: [recipientEmail],
                    sender: senderEmail,
                    subject: `Repair Request: ${brand} ${model} - ${contactName}`,
                    html_body: emailBody,
                    text_body: `Repair Request\n\nCustomer: ${contactName}\nEmail: ${contactEmail}\nPhone: ${contactPhone || 'Not provided'}\n\nDevice: ${deviceLabel}\nBrand: ${brand}\nModel: ${model}\nIssue: ${issue}\n\nAdditional Notes: ${msg || 'None'}`
                })
            })

            const data = await response.json()
            if (data.data?.succeeded > 0) {
                return { success: true }
            } else {
                console.error('SMTP2GO email failed:', data)
                return { success: false, error: data }
            }
        } catch (error) {
            console.error('Failed to send email:', error)
            return { success: false, error: error.message }
        }
    }

    // Submit repair request: save to Supabase + send email
    // info = partial overrides for selections (e.g. from early submit at Other steps)
    const handleRepairSubmit = async (info = {}) => {
        if (!validateContact()) return

        setSendingEmail(true)
        try {
            const sel = { ...selections, ...info }
            const deviceLabel = repairData[sel.device]?.label || sel.device || 'Not selected'
            const brand = sel.brand || 'Not selected'
            const model = sel.model || 'Not selected'
            const issue = sel.issue || 'Not specified'
            const msg = info.additionalMessage ?? additionalMessage

            // Save to Supabase contacts table
            if (supabase) {
                const { error } = await supabase
                    .from('contacts')
                    .insert([{
                        name: contactName.trim(),
                        email: contactEmail.trim(),
                        phone: contactPhone.trim() || null,
                        service: 'repair',
                        message: `Repair Request\nDevice: ${deviceLabel}\nBrand: ${brand}\nModel: ${model}\nIssue: ${issue}${msg && msg.trim() ? '\n\nAdditional: ' + msg.trim() : ''}`,
                        status: 'new',
                        is_read: false
                    }])

                if (error) {
                    console.error('Supabase insert error:', error)
                }
            }

            // Send email notification
            const emailResult = await sendRepairEmail(info)
            if (!emailResult.success && !emailResult.skipped) {
                console.warn('Email notification failed, but contact was saved:', emailResult.error)
            }

            setSubmitSuccess(true)
        } catch (err) {
            console.error('Submit error:', err)
        } finally {
            setSendingEmail(false)
        }
    }

    // Reusable inline contact fields for all "Other" boxes
    const renderContactFields = (idSuffix = '') => (
        <div className="wizard-contact-inline">
            <h4 className="wizard-contact-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                </svg>
                Leave your contact info
            </h4>
            <div className="wizard-contact-fields">
                <div className="wizard-field-group">
                    <label className="wizard-field-label" htmlFor={`wiz-name-${idSuffix}`}>Name *</label>
                    <input
                        id={`wiz-name-${idSuffix}`}
                        type="text"
                        className={`wizard-field-input ${contactErrors.name ? 'wizard-field-error' : ''}`}
                        placeholder="Your full name"
                        value={contactName}
                        onChange={(e) => { setContactName(e.target.value); setContactErrors(prev => ({ ...prev, name: '' })) }}
                    />
                    {contactErrors.name && <span className="wizard-error-text">{contactErrors.name}</span>}
                </div>
                <div className="wizard-field-group">
                    <label className="wizard-field-label" htmlFor={`wiz-email-${idSuffix}`}>Email *</label>
                    <input
                        id={`wiz-email-${idSuffix}`}
                        type="email"
                        className={`wizard-field-input ${contactErrors.email ? 'wizard-field-error' : ''}`}
                        placeholder="your@email.com"
                        value={contactEmail}
                        onChange={(e) => { setContactEmail(e.target.value); setContactErrors(prev => ({ ...prev, email: '' })) }}
                    />
                    {contactErrors.email && <span className="wizard-error-text">{contactErrors.email}</span>}
                </div>
                <div className="wizard-field-group">
                    <label className="wizard-field-label" htmlFor={`wiz-phone-${idSuffix}`}>Phone <span className="wizard-optional">(optional)</span></label>
                    <input
                        id={`wiz-phone-${idSuffix}`}
                        type="tel"
                        className="wizard-field-input"
                        placeholder="(555) 123-4567"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                    />
                </div>
            </div>
            <div className="wizard-field-group" style={{ marginTop: '12px' }}>
                <label className="wizard-field-label" htmlFor={`wiz-msg-${idSuffix}`}>Additional message <span className="wizard-optional">(optional)</span></label>
                <textarea
                    id={`wiz-msg-${idSuffix}`}
                    className="wizard-other-textarea"
                    placeholder="Preferred schedule, special requests…"
                    value={additionalMessage}
                    onChange={(e) => setAdditionalMessage(e.target.value)}
                    rows={2}
                />
            </div>
        </div>
    )

    // Global success overlay – shown when submitSuccess is true at any step
    const renderSuccessState = () => (
        <div className="wizard-success">
            <div className="success-icon">✓</div>
            <h4>Request Submitted!</h4>
            <p>Thank you, <strong>{contactName}</strong>! We've received your repair request and will contact you at <strong>{contactEmail}</strong> shortly.</p>
            <button className="btn-secondary" onClick={resetWizard}>Start a New Request</button>
        </div>
    )

    const renderProgressBar = () => (
        <div className="wizard-progress">
            <div className="progress-track">
                <div
                    className="progress-fill"
                    style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
                ></div>
            </div>
            <div className="steps-indicator">
                {[1, 2, 3, 4, 5].map(s => (
                    <div
                        key={s}
                        className={`step-dot ${s <= step ? 'active' : ''} ${s === step ? 'current' : ''}`}
                    >
                        {s}
                    </div>
                ))}
            </div>
            <div className="step-label">
                {step === 1 && 'Select Device'}
                {step === 2 && 'Select Brand'}
                {step === 3 && 'Select Model'}
                {step === 4 && 'Select Issue'}
                {step === 5 && 'Price Estimate'}
            </div>
        </div>
    )

    const renderPriceTable = () => {
        if (loadingPrices) {
            return (
                <div className="price-loading">
                    <div className="loading-spinner"></div>
                    <p>Loading prices...</p>
                </div>
            )
        }

        if (prices.length === 0) {
            return (
                <div className="no-prices">
                    <p>Contact us for a custom quote for your {selections.brand} device.</p>
                </div>
            )
        }

        return (
            <div className="wizard-price-table">
                <h4>Price Range for {selections.model}</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Service</th>
                            <th>Price Range</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prices.map((price, idx) => {
                            const pMin = String(price.price_min).replace(/\.00$/, '')
                            const pMax = String(price.price_max).replace(/\.00$/, '')
                            return (
                                <tr key={idx}>
                                    <td>
                                        {price.service_name}
                                        {price.note && <span className="price-note">{price.note}</span>}
                                    </td>
                                    <td className="price-cell">
                                        {pMin === pMax
                                            ? `${pMin} and up*`
                                            : `${pMin} - ${pMax}`}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <p className="price-disclaimer">*Prices may vary depending on part quality, device condition, and current availability.</p>
            </div>
        )
    }



    return (
        <div className="repair-wizard">
            {renderProgressBar()}

            <div className="wizard-content">
                {/* Global success overlay – applies at any step */}
                {submitSuccess ? renderSuccessState() : (<>

                {step === 1 && (
                    <div className="wizard-grid device-grid">
                        {Object.entries(repairData).map(([key, data]) => (
                            <button
                                key={key}
                                className="wizard-option device-option"
                                onClick={() => handleSelection('device', key)}
                            >
                                <div className="option-image-container">
                                    <img src={data.image} alt={data.label} className="option-image" />
                                </div>
                                <span className="option-label">{data.label}</span>
                            </button>
                        ))}
                    </div>
                )}

                {step === 2 && selections.device && (
                    <div className="wizard-grid text-grid">
                        {repairData[selections.device].brands.map(brand => (
                            <button
                                key={brand}
                                className="wizard-option text-option"
                                onClick={() => handleSelection('brand', brand)}
                            >
                                <span className="option-label">{brand}</span>
                            </button>
                        ))}

                        {/* Other brand option */}
                        <button
                            className="wizard-option text-option"
                            onClick={() => {
                                setShowBrandInput(true)
                            }}
                        >
                            <span className="option-label">Other</span>
                        </button>

                        {showBrandInput && (
                            <div className="wizard-other-box wizard-other-box--full">
                                <h4 className="wizard-other-title">Brand not listed?</h4>
                                <p className="wizard-other-subtitle">Type the brand name below and leave your contact info — we'll get back to you!</p>
                                <input
                                    type="text"
                                    className="wizard-other-input"
                                    value={customBrandText}
                                    onChange={(e) => setCustomBrandText(e.target.value)}
                                    placeholder="Enter brand (e.g. Nothing, Realme, etc.)"
                                />

                                {renderContactFields('brand')}

                                <div className="wizard-other-actions">
                                    <button
                                        className="btn-submit"
                                        disabled={!customBrandText.trim() || sendingEmail}
                                        onClick={() => handleRepairSubmit({ brand: customBrandText.trim() })}
                                    >
                                        {sendingEmail ? (
                                            <><span className="btn-spinner"></span> Sending…</>
                                        ) : (
                                            <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg> Submit Request</>
                                        )}
                                    </button>
                                    <button
                                        className="wizard-other-btn-continue"
                                        onClick={() => {
                                            const txt = customBrandText.trim()
                                            if (!txt) return
                                            setSelections(prev => ({ ...prev, brand: txt, model: '' }))
                                            setShowBrandInput(false)
                                            setCustomBrandText('')
                                            setStep(3)
                                        }}
                                        disabled={!customBrandText.trim()}
                                    >
                                        Skip & Continue →
                                    </button>
                                    <button
                                        className="wizard-other-btn-cancel"
                                        onClick={() => {
                                            setShowBrandInput(false)
                                            setCustomBrandText('')
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {step === 3 && selections.brand && (
                    <div className="wizard-grid text-grid">
                        {/* If we have a models list for the brand show it, else present custom model input */}
                        {repairData[selections.device].models[selections.brand] ? (
                            <>
                                {repairData[selections.device].models[selections.brand].map(model => (
                                    <button
                                        key={model}
                                        className="wizard-option text-option"
                                        onClick={() => handleSelection('model', model)}
                                    >
                                        <span className="option-label">{model}</span>
                                    </button>
                                ))}

                                {/* Other model option */}
                                <button
                                    className="wizard-option text-option"
                                    onClick={() => setShowModelInput(true)}
                                >
                                    <span className="option-label">Other</span>
                                </button>
                            </>
                        ) : (
                            /* brand had no predefined models (custom brand) -> show model input + contact */
                            <div className="wizard-other-box wizard-other-box--full">
                                <h4 className="wizard-other-title">Enter your model</h4>
                                <p className="wizard-other-subtitle">Type the model name below and leave your info — we'll follow up!</p>
                                <input
                                    type="text"
                                    className="wizard-other-input"
                                    value={customModelText}
                                    onChange={(e) => setCustomModelText(e.target.value)}
                                    placeholder="Enter model name (e.g. Model X)"
                                />

                                {renderContactFields('model-custom')}

                                <div className="wizard-other-actions">
                                    <button
                                        className="btn-submit"
                                        disabled={!customModelText.trim() || sendingEmail}
                                        onClick={() => handleRepairSubmit({ model: customModelText.trim() })}
                                    >
                                        {sendingEmail ? (
                                            <><span className="btn-spinner"></span> Sending…</>
                                        ) : (
                                            <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg> Submit Request</>
                                        )}
                                    </button>
                                    <button
                                        className="wizard-other-btn-continue"
                                        onClick={() => {
                                            const txt = customModelText.trim()
                                            if (!txt) return
                                            setSelections(prev => ({ ...prev, model: txt }))
                                            setCustomModelText('')
                                            setStep(4)
                                        }}
                                        disabled={!customModelText.trim()}
                                    >
                                        Skip & Continue →
                                    </button>
                                    <button
                                        className="wizard-other-btn-cancel"
                                        onClick={() => setCustomModelText('')}
                                    >
                                        Clear
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* custom model input panel when user clicks Other on a predefined model list */}
                        {showModelInput && (
                            <div className="wizard-other-box wizard-other-box--full">
                                <h4 className="wizard-other-title">Model not listed?</h4>
                                <p className="wizard-other-subtitle">Type the model name and leave your contact info — we'll get back to you!</p>
                                <input
                                    type="text"
                                    className="wizard-other-input"
                                    value={customModelText}
                                    onChange={(e) => setCustomModelText(e.target.value)}
                                    placeholder="Enter model name"
                                />

                                {renderContactFields('model-other')}

                                <div className="wizard-other-actions">
                                    <button
                                        className="btn-submit"
                                        disabled={!customModelText.trim() || sendingEmail}
                                        onClick={() => handleRepairSubmit({ model: customModelText.trim() })}
                                    >
                                        {sendingEmail ? (
                                            <><span className="btn-spinner"></span> Sending…</>
                                        ) : (
                                            <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg> Submit Request</>
                                        )}
                                    </button>
                                    <button
                                        className="wizard-other-btn-continue"
                                        onClick={() => {
                                            const txt = customModelText.trim()
                                            if (!txt) return
                                            setSelections(prev => ({ ...prev, model: txt }))
                                            setShowModelInput(false)
                                            setCustomModelText('')
                                            setStep(4)
                                        }}
                                        disabled={!customModelText.trim()}
                                    >
                                        Skip & Continue →
                                    </button>
                                    <button
                                        className="wizard-other-btn-cancel"
                                        onClick={() => {
                                            setShowModelInput(false)
                                            setCustomModelText('')
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {step === 4 && selections.device && (
                    <div className="wizard-grid text-grid">
                        {repairData[selections.device].issues.map(issue => (
                            <button
                                key={issue}
                                className="wizard-option text-option"
                                onClick={() => handleSelection('issue', issue)}
                            >
                                <span className="option-label">{issue}</span>
                            </button>
                        ))}

                        {/* "Issue not listed?" textarea section + contact form */}
                        <div className="wizard-other-box wizard-other-box--full">
                            <h4 className="wizard-other-title">Issue not listed? Share a short description:</h4>
                            <textarea
                                className="wizard-other-textarea"
                                placeholder="Briefly describe the issue..."
                                value={otherIssueText}
                                onChange={(e) => setOtherIssueText(e.target.value)}
                                rows={3}
                            />

                            {renderContactFields('issue')}

                            <div className="wizard-other-actions">
                                <button
                                    className="btn-submit"
                                    type="button"
                                    disabled={!otherIssueText.trim() || sendingEmail}
                                    onClick={() => handleRepairSubmit({ issue: otherIssueText.trim() })}
                                >
                                    {sendingEmail ? (
                                        <><span className="btn-spinner"></span> Sending…</>
                                    ) : (
                                        <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg> Submit Request</>
                                    )}
                                </button>
                                <button
                                    className="wizard-other-btn-continue"
                                    type="button"
                                    onClick={() => {
                                        const trimmed = otherIssueText.trim()
                                        if (!trimmed) return
                                        setSelections(prev => ({ ...prev, issue: trimmed }))
                                        setSelectedIssue('other')
                                        setStep(5)
                                    }}
                                    disabled={!otherIssueText.trim()}
                                >
                                    Skip & Continue →
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {step === 5 && (
                    <div className="wizard-summary">
                        <h3>Your Repair Estimate</h3>

                        <div className="summary-card">
                            <div className="summary-image">
                                <img src={repairData[selections.device].image} alt="Device" />
                            </div>
                            <div className="summary-text">
                                <div className="summary-item">
                                    <span>Device:</span>
                                    <strong>{selections.brand} {selections.model}</strong>
                                </div>
                                <div className="summary-item">
                                    <span>Issue:</span>
                                    <strong>{selections.issue}</strong>
                                </div>
                                <div className="summary-highlight">
                                    <span>Est. Time:</span>
                                    <strong>Same Day*</strong>
                                </div>
                            </div>
                        </div>

                        {renderPriceTable()}

                        {/* Contact form + Additional message + Submit */}
                        {!submitSuccess ? (
                            <div className="wizard-message-section">
                                <div className="wizard-contact-form">
                                    <h4 className="wizard-contact-title">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                            <circle cx="12" cy="7" r="4" />
                                        </svg>
                                        Leave Your Contact Info
                                    </h4>
                                    <p className="wizard-contact-subtitle">We'll reach out to confirm your repair details and schedule.</p>

                                    <div className="wizard-contact-fields">
                                        <div className="wizard-field-group">
                                            <label className="wizard-field-label" htmlFor="wizard-name">Name *</label>
                                            <input
                                                id="wizard-name"
                                                type="text"
                                                className={`wizard-field-input ${contactErrors.name ? 'wizard-field-error' : ''}`}
                                                placeholder="Your full name"
                                                value={contactName}
                                                onChange={(e) => { setContactName(e.target.value); setContactErrors(prev => ({ ...prev, name: '' })) }}
                                            />
                                            {contactErrors.name && <span className="wizard-error-text">{contactErrors.name}</span>}
                                        </div>

                                        <div className="wizard-field-group">
                                            <label className="wizard-field-label" htmlFor="wizard-email">Email *</label>
                                            <input
                                                id="wizard-email"
                                                type="email"
                                                className={`wizard-field-input ${contactErrors.email ? 'wizard-field-error' : ''}`}
                                                placeholder="your@email.com"
                                                value={contactEmail}
                                                onChange={(e) => { setContactEmail(e.target.value); setContactErrors(prev => ({ ...prev, email: '' })) }}
                                            />
                                            {contactErrors.email && <span className="wizard-error-text">{contactErrors.email}</span>}
                                        </div>

                                        <div className="wizard-field-group">
                                            <label className="wizard-field-label" htmlFor="wizard-phone">Phone <span className="wizard-optional">(optional)</span></label>
                                            <input
                                                id="wizard-phone"
                                                type="tel"
                                                className="wizard-field-input"
                                                placeholder="(555) 123-4567"
                                                value={contactPhone}
                                                onChange={(e) => setContactPhone(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <label className="wizard-message-label" htmlFor="additional-msg">
                                    Anything else we should know?
                                </label>
                                <textarea
                                    id="additional-msg"
                                    className="wizard-other-textarea"
                                    placeholder="Preferred schedule, special requests…"
                                    value={additionalMessage}
                                    onChange={(e) => setAdditionalMessage(e.target.value)}
                                    rows={3}
                                />

                                <div className="wizard-actions">
                                    <button
                                        className="btn-submit"
                                        disabled={sendingEmail}
                                        onClick={handleRepairSubmit}
                                    >
                                        {sendingEmail ? (
                                            <><span className="btn-spinner"></span> Sending…</>
                                        ) : (
                                            <><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg> Submit Request</>
                                        )}
                                    </button>
                                    <button className="btn-secondary" onClick={resetWizard}>Start Over</button>
                                </div>
                            </div>
                        ) : renderSuccessState()}
                    </div>
                )}

                {step > 1 && step < 5 && (
                    <button className="btn-back" onClick={() => setStep(s => s - 1)}>
                        ← Back
                    </button>
                )}

                </>)}{/* end submitSuccess ternary */}
            </div>
        </div>
    )
}

export default RepairWizard

