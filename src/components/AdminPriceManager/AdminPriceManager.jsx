import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import './AdminPriceManager.css'

const AdminPriceManager = () => {
    const [prices, setPrices] = useState([])
    const [loading, setLoading] = useState(true)
    const [editingId, setEditingId] = useState(null)
    const [editForm, setEditForm] = useState({})
    const [showAddForm, setShowAddForm] = useState(false)
    const [newPrice, setNewPrice] = useState({
        category: 'iphone',
        service_name: '',
        model_range: '',
        price_min: '',
        price_max: '',
        note: '',
        display_order: 0
    })
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState({ type: '', text: '' })

    useEffect(() => {
        fetchPrices()
    }, [])

    const fetchPrices = async () => {
        if (!supabase) {
            setMessage({ type: 'error', text: 'Supabase not configured' })
            setLoading(false)
            return
        }

        try {
            const { data, error } = await supabase
                .from('repair_prices')
                .select('*')
                .order('category')
                .order('display_order')

            if (error) throw error
            setPrices(data || [])
        } catch (error) {
            console.error('Error fetching prices:', error)
            setMessage({ type: 'error', text: 'Failed to load prices' })
        } finally {
            setLoading(false)
        }
    }

    const handleEdit = (price) => {
        setEditingId(price.id)
        setEditForm({
            price_min: price.price_min,
            price_max: price.price_max,
            note: price.note || ''
        })
    }

    const handleCancelEdit = () => {
        setEditingId(null)
        setEditForm({})
    }

    const handleSaveEdit = async (id) => {
        if (!supabase) return
        setSaving(true)

        try {
            const { error } = await supabase
                .from('repair_prices')
                .update({
                    price_min: parseFloat(editForm.price_min),
                    price_max: parseFloat(editForm.price_max),
                    note: editForm.note || null
                })
                .eq('id', id)

            if (error) throw error

            setMessage({ type: 'success', text: 'Price updated successfully!' })
            setEditingId(null)
            fetchPrices()
        } catch (error) {
            console.error('Error updating price:', error)
            setMessage({ type: 'error', text: 'Failed to update price' })
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this price?')) return
        if (!supabase) return

        try {
            const { error } = await supabase
                .from('repair_prices')
                .delete()
                .eq('id', id)

            if (error) throw error

            setMessage({ type: 'success', text: 'Price deleted successfully!' })
            fetchPrices()
        } catch (error) {
            console.error('Error deleting price:', error)
            setMessage({ type: 'error', text: 'Failed to delete price' })
        }
    }

    const handleAddPrice = async (e) => {
        e.preventDefault()
        if (!supabase) return
        setSaving(true)

        try {
            const { error } = await supabase
                .from('repair_prices')
                .insert([{
                    category: newPrice.category,
                    service_name: newPrice.service_name,
                    model_range: newPrice.model_range,
                    price_min: parseFloat(newPrice.price_min),
                    price_max: parseFloat(newPrice.price_max),
                    note: newPrice.note || null,
                    display_order: parseInt(newPrice.display_order) || 0,
                    is_active: true
                }])

            if (error) throw error

            setMessage({ type: 'success', text: 'Price added successfully!' })
            setShowAddForm(false)
            setNewPrice({
                category: 'iphone',
                service_name: '',
                model_range: '',
                price_min: '',
                price_max: '',
                note: '',
                display_order: 0
            })
            fetchPrices()
        } catch (error) {
            console.error('Error adding price:', error)
            setMessage({ type: 'error', text: 'Failed to add price' })
        } finally {
            setSaving(false)
        }
    }

    const groupedPrices = prices.reduce((acc, price) => {
        if (!acc[price.category]) acc[price.category] = []
        acc[price.category].push(price)
        return acc
    }, {})

    if (loading) {
        return (
            <div className="price-manager-loading">
                <div className="loading-spinner"></div>
                <p>Loading prices...</p>
            </div>
        )
    }

    return (
        <div className="price-manager">
            <div className="price-manager-header">
                <h2>📱 Repair Price Management</h2>
                <button
                    className="btn-add-price"
                    onClick={() => setShowAddForm(!showAddForm)}
                >
                    {showAddForm ? '✕ Cancel' : '+ Add Price'}
                </button>
            </div>

            {message.text && (
                <div className={`price-message ${message.type}`}>
                    {message.text}
                    <button onClick={() => setMessage({ type: '', text: '' })}>✕</button>
                </div>
            )}

            {showAddForm && (
                <form className="add-price-form" onSubmit={handleAddPrice}>
                    <h3>Add New Price</h3>
                    <div className="form-row">
                        <div className="form-field">
                            <label>Category</label>
                            <select
                                value={newPrice.category}
                                onChange={(e) => setNewPrice({ ...newPrice, category: e.target.value })}
                            >
                                <option value="iphone">iPhone</option>
                                <option value="ipad">iPad</option>
                            </select>
                        </div>
                        <div className="form-field">
                            <label>Service Name</label>
                            <input
                                type="text"
                                value={newPrice.service_name}
                                onChange={(e) => setNewPrice({ ...newPrice, service_name: e.target.value })}
                                placeholder="e.g. Screen, Battery"
                                required
                            />
                        </div>
                        <div className="form-field">
                            <label>Model Range</label>
                            <input
                                type="text"
                                value={newPrice.model_range}
                                onChange={(e) => setNewPrice({ ...newPrice, model_range: e.target.value })}
                                placeholder="e.g. iPhone X - 17 Pro Max"
                                required
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-field">
                            <label>Min Price ($)</label>
                            <input
                                type="number"
                                value={newPrice.price_min}
                                onChange={(e) => setNewPrice({ ...newPrice, price_min: e.target.value })}
                                placeholder="100"
                                required
                            />
                        </div>
                        <div className="form-field">
                            <label>Max Price ($)</label>
                            <input
                                type="number"
                                value={newPrice.price_max}
                                onChange={(e) => setNewPrice({ ...newPrice, price_max: e.target.value })}
                                placeholder="150"
                                required
                            />
                        </div>
                        <div className="form-field">
                            <label>Note (optional)</label>
                            <input
                                type="text"
                                value={newPrice.note}
                                onChange={(e) => setNewPrice({ ...newPrice, note: e.target.value })}
                                placeholder="e.g. $includes new digi"
                            />
                        </div>
                        <div className="form-field">
                            <label>Order</label>
                            <input
                                type="number"
                                value={newPrice.display_order}
                                onChange={(e) => setNewPrice({ ...newPrice, display_order: e.target.value })}
                                placeholder="1"
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn-save" disabled={saving}>
                        {saving ? 'Saving...' : 'Add Price'}
                    </button>
                </form>
            )}

            {Object.entries(groupedPrices).map(([category, categoryPrices]) => (
                <div key={category} className="price-category">
                    <h3 className="category-title">
                        {category === 'iphone' ? '📱 iPhone Prices' : '📟 iPad Prices'}
                    </h3>
                    <div className="price-table-admin">
                        <table>
                            <thead>
                                <tr>
                                    <th>Service</th>
                                    <th>Model Range</th>
                                    <th>Min Price</th>
                                    <th>Max Price</th>
                                    <th>Note</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categoryPrices.map(price => (
                                    <tr key={price.id}>
                                        <td>{price.service_name}</td>
                                        <td>{price.model_range}</td>
                                        <td>
                                            {editingId === price.id ? (
                                                <input
                                                    type="number"
                                                    value={editForm.price_min}
                                                    onChange={(e) => setEditForm({ ...editForm, price_min: e.target.value })}
                                                    className="edit-input"
                                                />
                                            ) : (
                                                `$${price.price_min}`
                                            )}
                                        </td>
                                        <td>
                                            {editingId === price.id ? (
                                                <input
                                                    type="number"
                                                    value={editForm.price_max}
                                                    onChange={(e) => setEditForm({ ...editForm, price_max: e.target.value })}
                                                    className="edit-input"
                                                />
                                            ) : (
                                                `$${price.price_max}`
                                            )}
                                        </td>
                                        <td>
                                            {editingId === price.id ? (
                                                <input
                                                    type="text"
                                                    value={editForm.note}
                                                    onChange={(e) => setEditForm({ ...editForm, note: e.target.value })}
                                                    className="edit-input"
                                                    placeholder="Optional note"
                                                />
                                            ) : (
                                                price.note || '-'
                                            )}
                                        </td>
                                        <td className="action-cell">
                                            {editingId === price.id ? (
                                                <>
                                                    <button
                                                        className="btn-action save"
                                                        onClick={() => handleSaveEdit(price.id)}
                                                        disabled={saving}
                                                    >
                                                        ✓
                                                    </button>
                                                    <button
                                                        className="btn-action cancel"
                                                        onClick={handleCancelEdit}
                                                    >
                                                        ✕
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        className="btn-action edit"
                                                        onClick={() => handleEdit(price)}
                                                    >
                                                        ✎
                                                    </button>
                                                    <button
                                                        className="btn-action delete"
                                                        onClick={() => handleDelete(price.id)}
                                                    >
                                                        🗑
                                                    </button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}

            {prices.length === 0 && (
                <div className="no-prices">
                    <p>No prices found. Click "Add Price" to create your first entry.</p>
                </div>
            )}
        </div>
    )
}

export default AdminPriceManager
