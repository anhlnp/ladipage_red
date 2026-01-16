import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import './AdminDashboard.css'

const AdminDashboard = ({ userEmail }) => {
    const [stats, setStats] = useState({
        totalContacts: 0,
        newContacts: 0,
        resolvedContacts: 0,
        totalPrices: 0
    })
    const [recentContacts, setRecentContacts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchDashboardData()
    }, [])

    const fetchDashboardData = async () => {
        if (!supabase) {
            setLoading(false)
            return
        }

        try {
            // Fetch contacts stats
            const { data: contacts, error: contactsError } = await supabase
                .from('contacts')
                .select('*')
                .order('created_at', { ascending: false })

            if (!contactsError && contacts) {
                setStats(prev => ({
                    ...prev,
                    totalContacts: contacts.length,
                    newContacts: contacts.filter(c => c.status === 'new').length,
                    resolvedContacts: contacts.filter(c => c.status === 'resolved').length
                }))
                setRecentContacts(contacts.slice(0, 5))
            }

            // Fetch prices count
            const { count: pricesCount } = await supabase
                .from('repair_prices')
                .select('*', { count: 'exact', head: true })

            if (pricesCount) {
                setStats(prev => ({ ...prev, totalPrices: pricesCount }))
            }
        } catch (error) {
            console.error('Error fetching dashboard data:', error)
        } finally {
            setLoading(false)
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }


    return (
        <div className="admin-dashboard">
            {/* Welcome Section */}
            <div className="dashboard-welcome">
                <div className="welcome-text">
                    <h2>Welcome back! 👋</h2>
                    <p>Here's what's happening with your business today.</p>
                </div>
                <div className="welcome-date">
                    {new Date().toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </div>
            </div>


            {/* Secondary Stats */}
            <div className="dashboard-secondary">
                <div className="secondary-stats">
                    <div className="mini-stat">
                        <div className="mini-stat-icon contacts">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                        </div>
                        <div className="mini-stat-info">
                            <span className="mini-stat-value">{stats.totalContacts}</span>
                            <span className="mini-stat-label">Total Contacts</span>
                        </div>
                    </div>

                    <div className="mini-stat">
                        <div className="mini-stat-icon new">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="16" />
                                <line x1="8" y1="12" x2="16" y2="12" />
                            </svg>
                        </div>
                        <div className="mini-stat-info">
                            <span className="mini-stat-value">{stats.newContacts}</span>
                            <span className="mini-stat-label">New Inquiries</span>
                        </div>
                    </div>

                    <div className="mini-stat">
                        <div className="mini-stat-icon resolved">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                        </div>
                        <div className="mini-stat-info">
                            <span className="mini-stat-value">{stats.resolvedContacts}</span>
                            <span className="mini-stat-label">Resolved</span>
                        </div>
                    </div>

                    <div className="mini-stat">
                        <div className="mini-stat-icon prices">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="12" y1="1" x2="12" y2="23" />
                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                        </div>
                        <div className="mini-stat-info">
                            <span className="mini-stat-value">{stats.totalPrices}</span>
                            <span className="mini-stat-label">Price Entries</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="dashboard-grid">
                {/* Recent Contacts */}
                <div className="dashboard-card">
                    <div className="card-header">
                        <h3>📬 Recent Inquiries</h3>
                        <a href="#contacts" className="view-all">View All</a>
                    </div>
                    <div className="card-content">
                        {loading ? (
                            <div className="loading-state">
                                <div className="loading-spinner"></div>
                                <p>Loading...</p>
                            </div>
                        ) : recentContacts.length > 0 ? (
                            <div className="contacts-list">
                                {recentContacts.map((contact, idx) => (
                                    <div key={idx} className="contact-item">
                                        <div className="contact-avatar">
                                            {contact.name?.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="contact-info">
                                            <span className="contact-name">{contact.name}</span>
                                            <span className="contact-service">{contact.service || 'General Inquiry'}</span>
                                        </div>
                                        <div className="contact-meta">
                                            <span className={`contact-status ${contact.status}`}>{contact.status}</span>
                                            <span className="contact-time">{formatDate(contact.created_at)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="empty-state">
                                <span className="empty-icon">📭</span>
                                <p>No contacts yet</p>
                                <span>New inquiries will appear here</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="dashboard-card">
                    <div className="card-header">
                        <h3>⚡ Quick Actions</h3>
                    </div>
                    <div className="card-content">
                        <div className="quick-actions">
                            <a href="/services/phone-tablet" target="_blank" className="quick-action">
                                <div className="action-icon">📱</div>
                                <span>View Repair Page</span>
                            </a>
                            <a href="/contact" target="_blank" className="quick-action">
                                <div className="action-icon">📝</div>
                                <span>Contact Form</span>
                            </a>
                            <a href="/" target="_blank" className="quick-action">
                                <div className="action-icon">🏠</div>
                                <span>Homepage</span>
                            </a>
                            <a href="https://supabase.com/dashboard" target="_blank" className="quick-action">
                                <div className="action-icon">🗄️</div>
                                <span>Supabase</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* System Status */}
                <div className="dashboard-card full-width">
                    <div className="card-header">
                        <h3>🔧 System Status</h3>
                    </div>
                    <div className="card-content">
                        <div className="status-grid">
                            <div className="status-item">
                                <div className="status-indicator online"></div>
                                <span className="status-name">Website</span>
                                <span className="status-text">Operational</span>
                            </div>
                            <div className="status-item">
                                <div className="status-indicator online"></div>
                                <span className="status-name">Database</span>
                                <span className="status-text">Connected</span>
                            </div>
                            <div className="status-item">
                                <div className="status-indicator online"></div>
                                <span className="status-name">Contact Form</span>
                                <span className="status-text">Active</span>
                            </div>
                            <div className="status-item">
                                <div className="status-indicator online"></div>
                                <span className="status-name">Price API</span>
                                <span className="status-text">Running</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
