import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import './AdminContactManager.css'

const AdminContactManager = () => {
    const [contacts, setContacts] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedContact, setSelectedContact] = useState(null)
    const [filter, setFilter] = useState('all')
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        fetchContacts()
    }, [])

    const fetchContacts = async () => {
        if (!supabase) {
            setLoading(false)
            return
        }

        try {
            const { data, error } = await supabase
                .from('contacts')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            setContacts(data || [])
        } catch (error) {
            console.error('Error fetching contacts:', error)
        } finally {
            setLoading(false)
        }
    }

    const updateContactStatus = async (id, status) => {
        if (!supabase) return

        try {
            const { error } = await supabase
                .from('contacts')
                .update({ status, updated_at: new Date().toISOString() })
                .eq('id', id)

            if (error) throw error

            setContacts(contacts.map(c =>
                c.id === id ? { ...c, status } : c
            ))

            if (selectedContact?.id === id) {
                setSelectedContact({ ...selectedContact, status })
            }
        } catch (error) {
            console.error('Error updating contact:', error)
        }
    }

    const deleteContact = async (id) => {
        if (!supabase) return
        if (!confirm('Are you sure you want to delete this contact?')) return

        try {
            const { error } = await supabase
                .from('contacts')
                .delete()
                .eq('id', id)

            if (error) throw error

            setContacts(contacts.filter(c => c.id !== id))
            if (selectedContact?.id === id) {
                setSelectedContact(null)
            }
        } catch (error) {
            console.error('Error deleting contact:', error)
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const getServiceLabel = (service) => {
        const labels = {
            'cybersecurity': 'Cybersecurity & Compliance',
            'managed-it': 'Managed IT Services',
            'repair': 'Mobile Repair',
            'infrastructure': 'Infrastructure',
            'other': 'Other'
        }
        return labels[service] || service || 'General Inquiry'
    }

    const filteredContacts = contacts.filter(contact => {
        const matchesFilter = filter === 'all' || contact.status === filter
        const matchesSearch = !searchTerm ||
            contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.message?.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesFilter && matchesSearch
    })

    const statusCounts = {
        all: contacts.length,
        new: contacts.filter(c => c.status === 'new').length,
        contacted: contacts.filter(c => c.status === 'contacted').length,
        resolved: contacts.filter(c => c.status === 'resolved').length
    }

    if (loading) {
        return (
            <div className="contact-manager-loading">
                <div className="loading-spinner"></div>
                <p>Loading contacts...</p>
            </div>
        )
    }

    return (
        <div className="contact-manager">
            {/* Header */}
            <div className="manager-header">
                <div className="header-info">
                    <h2>📬 Contact Management</h2>
                    <p>View and manage customer inquiries from the contact form.</p>
                </div>
                <button className="refresh-btn" onClick={fetchContacts}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="23 4 23 10 17 10" />
                        <polyline points="1 20 1 14 7 14" />
                        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                    </svg>
                    Refresh
                </button>
            </div>

            {/* Filters and Search */}
            <div className="manager-controls">
                <div className="filter-tabs">
                    <button
                        className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        All <span className="count">{statusCounts.all}</span>
                    </button>
                    <button
                        className={`filter-tab ${filter === 'new' ? 'active' : ''}`}
                        onClick={() => setFilter('new')}
                    >
                        New <span className="count">{statusCounts.new}</span>
                    </button>
                    <button
                        className={`filter-tab ${filter === 'contacted' ? 'active' : ''}`}
                        onClick={() => setFilter('contacted')}
                    >
                        Contacted <span className="count">{statusCounts.contacted}</span>
                    </button>
                    <button
                        className={`filter-tab ${filter === 'resolved' ? 'active' : ''}`}
                        onClick={() => setFilter('resolved')}
                    >
                        Resolved <span className="count">{statusCounts.resolved}</span>
                    </button>
                </div>

                <div className="search-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search contacts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Content */}
            <div className="manager-content">
                {/* Contact List */}
                <div className="contacts-panel">
                    {filteredContacts.length === 0 ? (
                        <div className="empty-state">
                            <span className="empty-icon">📭</span>
                            <p>No contacts found</p>
                            <span>Try adjusting your filters</span>
                        </div>
                    ) : (
                        <div className="contacts-list">
                            {filteredContacts.map(contact => (
                                <div
                                    key={contact.id}
                                    className={`contact-card ${selectedContact?.id === contact.id ? 'selected' : ''} ${contact.status}`}
                                    onClick={() => setSelectedContact(contact)}
                                >
                                    <div className="contact-avatar">
                                        {contact.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="contact-summary">
                                        <div className="contact-header">
                                            <span className="contact-name">{contact.name}</span>
                                            <span className={`status-badge ${contact.status}`}>
                                                {contact.status}
                                            </span>
                                        </div>
                                        <span className="contact-email">{contact.email}</span>
                                        <span className="contact-service">{getServiceLabel(contact.service)}</span>
                                        <span className="contact-date">{formatDate(contact.created_at)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Contact Detail */}
                <div className="detail-panel">
                    {selectedContact ? (
                        <div className="contact-detail">
                            <div className="detail-header">
                                <div className="detail-avatar">
                                    {selectedContact.name?.charAt(0).toUpperCase()}
                                </div>
                                <div className="detail-info">
                                    <h3>{selectedContact.name}</h3>
                                    <span className={`status-badge large ${selectedContact.status}`}>
                                        {selectedContact.status}
                                    </span>
                                </div>
                            </div>

                            <div className="detail-section">
                                <h4>Contact Information</h4>
                                <div className="info-grid">
                                    <div className="info-item">
                                        <span className="info-label">Email</span>
                                        <a href={`mailto:${selectedContact.email}`} className="info-value link">
                                            {selectedContact.email}
                                        </a>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">Phone</span>
                                        <span className="info-value">
                                            {selectedContact.phone || 'Not provided'}
                                        </span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">Service</span>
                                        <span className="info-value">{getServiceLabel(selectedContact.service)}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">Submitted</span>
                                        <span className="info-value">{formatDate(selectedContact.created_at)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="detail-section">
                                <h4>Message</h4>
                                <div className="message-content">
                                    {selectedContact.message}
                                </div>
                            </div>

                            <div className="detail-actions">
                                <h4>Update Status</h4>
                                <div className="status-buttons">
                                    <button
                                        className={`status-btn new ${selectedContact.status === 'new' ? 'active' : ''}`}
                                        onClick={() => updateContactStatus(selectedContact.id, 'new')}
                                    >
                                        New
                                    </button>
                                    <button
                                        className={`status-btn contacted ${selectedContact.status === 'contacted' ? 'active' : ''}`}
                                        onClick={() => updateContactStatus(selectedContact.id, 'contacted')}
                                    >
                                        Contacted
                                    </button>
                                    <button
                                        className={`status-btn resolved ${selectedContact.status === 'resolved' ? 'active' : ''}`}
                                        onClick={() => updateContactStatus(selectedContact.id, 'resolved')}
                                    >
                                        Resolved
                                    </button>
                                </div>

                                <div className="action-buttons">
                                    <a
                                        href={`mailto:${selectedContact.email}?subject=Re: ${getServiceLabel(selectedContact.service)} Inquiry`}
                                        className="action-btn reply"
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M3 10l9 6 9-6" />
                                            <path d="M3 6h18v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6z" />
                                        </svg>
                                        Reply via Email
                                    </a>
                                    <button
                                        className="action-btn delete"
                                        onClick={() => deleteContact(selectedContact.id)}
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="3 6 5 6 21 6" />
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                        </svg>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="no-selection">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                            <p>Select a contact to view details</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AdminContactManager
