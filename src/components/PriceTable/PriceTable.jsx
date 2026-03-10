import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Smartphone, Tablet } from 'lucide-react'
import './PriceTable.css'

const PriceTable = () => {
    const [iphonePrices, setIphonePrices] = useState([])
    const [ipadPrices, setIpadPrices] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchPrices()
    }, [])

    const fetchPrices = async () => {
        if (!supabase) {
            // Fallback to static data if Supabase not configured
            setIphonePrices(getStaticIphonePrices())
            setIpadPrices(getStaticIpadPrices())
            setLoading(false)
            return
        }

        try {
            const { data, error } = await supabase
                .from('repair_prices')
                .select('*')
                .eq('is_active', true)
                .order('display_order')

            if (error) throw error

            const iphone = data.filter(p => p.category === 'iphone')
            const ipad = data.filter(p => p.category === 'ipad')

            setIphonePrices(iphone.length > 0 ? iphone : getStaticIphonePrices())
            setIpadPrices(ipad.length > 0 ? ipad : getStaticIpadPrices())
        } catch (error) {
            console.error('Error fetching prices:', error)
            setIphonePrices(getStaticIphonePrices())
            setIpadPrices(getStaticIpadPrices())
        } finally {
            setLoading(false)
        }
    }

    // Group prices by service name for table display
    const groupByService = (prices) => {
        const grouped = {}
        prices.forEach(price => {
            if (!grouped[price.service_name]) {
                grouped[price.service_name] = {}
            }
            grouped[price.service_name][price.model_range] = price
        })
        return grouped
    }

    // Get unique model ranges
    const getModelRanges = (prices) => {
        return [...new Set(prices.map(p => p.model_range))]
    }

    const formatPrice = (min, max) => {
        return `$${min} - $${max}`
    }

    if (loading) {
        return (
            <div className="price-tables-loading">
                <div className="loading-spinner"></div>
                <p>Loading prices...</p>
            </div>
        )
    }

    const iphoneGrouped = groupByService(iphonePrices)
    const iphoneModels = getModelRanges(iphonePrices)
    const ipadGrouped = groupByService(ipadPrices)
    const ipadModels = getModelRanges(ipadPrices)

    return (
        <div className="price-tables">
            {/* iPhone Price Table */}
            <div className="price-table-wrapper">
                <h3 className="price-table-title">
                    <Smartphone size={24} className="title-icon" />
                    iPhone Repair Prices
                </h3>
                <div className="price-table-container">
                    <table className="price-table iphone-table">
                        <thead>
                            <tr>
                                <th className="service-header">Includes Labor</th>
                                {iphoneModels.map(model => (
                                    <th key={model}>{model}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(iphoneGrouped).map(([service, models]) => (
                                <tr key={service}>
                                    <td className="service-name">{service}</td>
                                    {iphoneModels.map(model => (
                                        <td key={model}>
                                            {models[model]
                                                ? formatPrice(models[model].price_min, models[model].price_max)
                                                : '-'
                                            }
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* iPad Price Table */}
            <div className="price-table-wrapper">
                <h3 className="price-table-title">
                    <Tablet size={24} className="title-icon" />
                    iPad Repair Prices
                </h3>
                <div className="price-table-container">
                    <table className="price-table ipad-table">
                        <thead>
                            <tr>
                                <th className="service-header">Includes Labor</th>
                                {ipadModels.map(model => (
                                    <th key={model}>{model}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(ipadGrouped).map(([service, models]) => (
                                <tr key={service}>
                                    <td className="service-name">
                                        {service}
                                        {Object.values(models)[0]?.note && (
                                            <span className="service-note">{Object.values(models)[0].note}</span>
                                        )}
                                    </td>
                                    {ipadModels.map(model => (
                                        <td key={model}>
                                            {models[model]
                                                ? formatPrice(models[model].price_min, models[model].price_max)
                                                : '-'
                                            }
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

// Static fallback data
const getStaticIphonePrices = () => [
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
]

const getStaticIpadPrices = () => [
    { service_name: 'Digitizer', model_range: 'iPad Air 1 - 13th Gen', price_min: '125', price_max: '165', note: null },
    { service_name: 'Digitizer', model_range: 'iPad Pro 1 - 13th Gen', price_min: '255', price_max: '135', note: null },
    { service_name: 'Digitizer', model_range: 'iPad 2 - 11th Gen', price_min: '120', price_max: '160', note: null },
    { service_name: 'LCD', model_range: 'iPad Air 1 - 13th Gen', price_min: '145', price_max: '480', note: '$includes new digi' },
    { service_name: 'LCD', model_range: 'iPad Pro 1 - 13th Gen', price_min: '260', price_max: '405', note: '$includes new digi' },
    { service_name: 'LCD', model_range: 'iPad 2 - 11th Gen', price_min: '130', price_max: '235', note: '$includes new digi' },
    { service_name: 'Battery', model_range: 'iPad Air 1 - 13th Gen', price_min: '125', price_max: '250', note: '$includes new digi' },
    { service_name: 'Battery', model_range: 'iPad Pro 1 - 13th Gen', price_min: '120', price_max: '300', note: '$includes new digi' },
    { service_name: 'Battery', model_range: 'iPad 2 - 11th Gen', price_min: '120', price_max: '220', note: '$includes new digi' },
]

export default PriceTable
