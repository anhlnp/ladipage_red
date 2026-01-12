import { useState } from 'react'
import './RepairWizard.css'

// Import images
import smartphoneImg from '../../assets/devices/smartphone.png'
import tabletImg from '../../assets/devices/tablet.png'
import computerImg from '../../assets/devices/computer.png'
import consoleImg from '../../assets/devices/console.png'
import wearableImg from '../../assets/devices/wearable.png'
import otherImg from '../../assets/devices/other.png'

const RepairWizard = () => {
    const [step, setStep] = useState(1)
    const [selections, setSelections] = useState({
        device: '',
        brand: '',
        model: '',
        issue: ''
    })

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
            brands: ['Apple', 'Dell', 'HP', 'Lenovo', 'Asus', 'Acer', 'Microsoft', 'Custom/Other'],
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
                'Custom/Other': ['Custom Desktop PC', 'Gaming PC', 'All-in-One', 'Other Brand']
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
        },
        wearable: {
            image: wearableImg,
            label: 'Wearables',
            brands: ['Apple', 'Samsung', 'Garmin', 'Fitbit', 'Other'],
            models: {
                'Apple': ['Apple Watch Ultra 2', 'Apple Watch Ultra', 'Apple Watch Series 9', 'Apple Watch Series 8', 'Apple Watch SE', 'Apple Watch Series 7'],
                'Samsung': ['Galaxy Watch 6 Classic', 'Galaxy Watch 6', 'Galaxy Watch 5 Pro', 'Galaxy Watch 5', 'Galaxy Watch 4'],
                'Garmin': ['Fenix 7', 'Epix Gen 2', 'Forerunner', 'Venu'],
                'Fitbit': ['Sense 2', 'Versa 4', 'Charge 6', 'Luxe'],
                'Other': ['Smart Ring', 'Other Smartwatch']
            },
            issues: ['Cracked Screen', 'Battery Replacement', 'Sensor Issue', 'Strapholder Repair', 'Water Damage', 'Software Issue']
        },
        other: {
            image: otherImg,
            label: 'Other',
            brands: ['Drone', 'Camera', 'Speaker', 'Headphones', 'MP3 Player', 'GPS'],
            models: {
                'Drone': ['DJI Mavic 3', 'DJI Mini 3 Pro', 'DJI Air 2S', 'Other Drone'],
                'Camera': ['DSLR', 'Mirrorless', 'Point & Shoot', 'Action Cam (GoPro)'],
                'Speaker': ['Bluetooth Speaker', 'Smart Speaker'],
                'Headphones': ['Over-Ear', 'In-Ear (Earbuds)', 'Noise Cancelling'],
                'MP3 Player': ['iPod Touch', 'iPod Classic', 'Other MP3'],
                'GPS': ['Car GPS', 'Handheld GPS']
            },
            issues: ['Diagnostic', 'Physical Damage', 'Water Damage', 'Battery Issue', 'Port Repair', 'Button Repair']
        }
    }

    const totalSteps = 5

    const handleSelection = (type, value) => {
        setSelections(prev => ({ ...prev, [type]: value }))
        setStep(prev => prev + 1)
    }

    const resetWizard = () => {
        setStep(1)
        setSelections({ device: '', brand: '', model: '', issue: '' })
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
                {step === 5 && 'Get Estimate'}
            </div>
        </div>
    )

    return (
        <div className="repair-wizard glass-box">
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
                    </div>
                )}

                {step === 3 && selections.brand && (
                    <div className="wizard-grid text-grid">
                        {repairData[selections.device].models[selections.brand]?.map(model => (
                            <button 
                                key={model} 
                                className="wizard-option text-option"
                                onClick={() => handleSelection('model', model)}
                            >
                                <span className="option-label">{model}</span>
                            </button>
                        ))}
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
                    </div>
                )}

                {step === 5 && (
                    <div className="wizard-summary">
                        <h3>Estimate Ready!</h3>
                        
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

                        <p className="note">*Subject to parts availability. Contact us to confirm.</p>
                        <div className="wizard-actions">
                            <a href="/contact" className="btn-primary">Call Now</a>
                            <button className="btn-secondary" onClick={resetWizard}>Start Over</button>
                        </div>
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
