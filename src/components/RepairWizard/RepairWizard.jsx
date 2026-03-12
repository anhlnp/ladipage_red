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
    }

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

    const sendEstimateEmail = async (payload) => {
        try {
            setSendingEmail(true)
            await fetch('/api/send-estimate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
        } catch (err) {
            // optionally log or handle error
            console.error('Email send failed', err)
        } finally {
            setSendingEmail(false)
        }
    }

    return (
        <div className="repair-wizard">
            {renderProgressBar()}

            <div className="wizard-content">
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
                            <div className="wizard-other-box">
                                <h4 className="wizard-other-title">Brand not listed?</h4>
                                <p className="wizard-other-subtitle">Type the brand name below</p>
                                <input
                                    type="text"
                                    className="wizard-other-input"
                                    value={customBrandText}
                                    onChange={(e) => setCustomBrandText(e.target.value)}
                                    placeholder="Enter brand (e.g. Nothing, Realme, etc.)"
                                />
                                <div className="wizard-other-actions">
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
                                        Continue
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
                            /* brand had no predefined models (custom brand) -> show model input */
                            <div className="wizard-other-box">
                                <h4 className="wizard-other-title">Model not listed?</h4>
                                <p className="wizard-other-subtitle">Type the model name below</p>
                                <input
                                    type="text"
                                    className="wizard-other-input"
                                    value={customModelText}
                                    onChange={(e) => setCustomModelText(e.target.value)}
                                    placeholder="Enter model name (e.g. Model X)"
                                />
                                <div className="wizard-other-actions">
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
                                        Continue
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
                            <div className="wizard-other-box">
                                <h4 className="wizard-other-title">Model not listed?</h4>
                                <p className="wizard-other-subtitle">Type the model name below</p>
                                <input
                                    type="text"
                                    className="wizard-other-input"
                                    value={customModelText}
                                    onChange={(e) => setCustomModelText(e.target.value)}
                                    placeholder="Enter model name"
                                />
                                <div className="wizard-other-actions">
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
                                        Continue
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

                        {/* "Issue not listed?" textarea section */}
                        <div className="wizard-other-box wizard-other-box--full">
                            <h4 className="wizard-other-title">Issue not listed? Share a short description:</h4>
                            <textarea
                                className="wizard-other-textarea"
                                placeholder="Briefly describe the issue..."
                                value={otherIssueText}
                                onChange={(e) => setOtherIssueText(e.target.value)}
                                rows={4}
                            />
                            <div className="wizard-other-actions">
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
                                    Continue
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

                        {/* Additional message + Submit */}
                        {!submitSuccess ? (
                            <div className="wizard-message-section">
                                <label className="wizard-message-label" htmlFor="additional-msg">
                                    Anything else we should know?
                                </label>
                                <textarea
                                    id="additional-msg"
                                    className="wizard-other-textarea"
                                    placeholder="Contact info, preferred schedule, special requests…"
                                    value={additionalMessage}
                                    onChange={(e) => setAdditionalMessage(e.target.value)}
                                    rows={4}
                                />

                                <div className="wizard-actions">
                                    <button
                                        className="btn-submit"
                                        disabled={sendingEmail}
                                        onClick={async () => {
                                            const payload = {
                                                selections,
                                                additionalMessage: additionalMessage.trim(),
                                                source: 'repair-wizard',
                                                timestamp: new Date().toISOString()
                                            }
                                            await sendEstimateEmail(payload)
                                            setSubmitSuccess(true)
                                        }}
                                    >
                                        {sendingEmail ? 'Sending…' : 'Submit Request'}
                                    </button>
                                    <button className="btn-secondary" onClick={resetWizard}>Start Over</button>
                                </div>
                            </div>
                        ) : (
                            <div className="wizard-success">
                                <div className="success-icon">✓</div>
                                <h4>Request Submitted!</h4>
                                <p>We've received your repair request and will get back to you shortly.</p>
                                <button className="btn-secondary" onClick={resetWizard}>Start a New Request</button>
                            </div>
                        )}
                    </div>
                )}

                {step > 1 && step < 5 && (
                    <button className="btn-back" onClick={() => setStep(s => s - 1)}>
                        ← Back
                    </button>
                )}
            </div>
        </div>
    )
}

export default RepairWizard

