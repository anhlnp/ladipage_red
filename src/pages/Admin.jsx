import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AdminPriceManager from '../components/AdminPriceManager/AdminPriceManager'
import AdminDashboard from '../components/AdminDashboard/AdminDashboard'
import './Admin.css'

const Admin = () => {
    const navigate = useNavigate()
    const { user, loading, signOut } = useAuth()
    const [activeTab, setActiveTab] = useState('dashboard')

    // Redirect if not logged in
    useEffect(() => {
        if (!loading && !user) {
            navigate('/admin/login')
        }
    }, [user, loading, navigate])

    const handleSignOut = async () => {
        await signOut()
        navigate('/admin/login')
    }

    if (loading) {
        return (
            <div className="admin-container">
                <div className="admin-loading">
                    <div className="loading-spinner"></div>
                    <p>Loading...</p>
                </div>
            </div>
        )
    }

    if (!user) {
        return null
    }

    return (
        <div className="admin-container">
            <aside className="admin-sidebar">
                <div className="sidebar-header">
                    <div className="admin-logo">
                        <span className="logo-icon">◆</span>
                        <span>SELECT<span className="accent">TECH</span></span>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    <button
                        className={`sidebar-link ${activeTab === 'dashboard' ? 'active' : ''}`}
                        onClick={() => setActiveTab('dashboard')}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="7" height="7" rx="1" />
                            <rect x="14" y="3" width="7" height="7" rx="1" />
                            <rect x="3" y="14" width="7" height="7" rx="1" />
                            <rect x="14" y="14" width="7" height="7" rx="1" />
                        </svg>
                        Dashboard
                    </button>
                    <button
                        className={`sidebar-link ${activeTab === 'prices' ? 'active' : ''}`}
                        onClick={() => setActiveTab('prices')}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="1" x2="12" y2="23" />
                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                        Prices
                    </button>
                    <button
                        className={`sidebar-link ${activeTab === 'contacts' ? 'active' : ''}`}
                        onClick={() => setActiveTab('contacts')}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                        Contacts
                    </button>
                    <button
                        className={`sidebar-link ${activeTab === 'settings' ? 'active' : ''}`}
                        onClick={() => setActiveTab('settings')}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="3" />
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                        </svg>
                        Settings
                    </button>
                </nav>

                <div className="sidebar-footer">
                    <button onClick={handleSignOut} className="signout-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        Sign Out
                    </button>
                </div>
            </aside>

            <main className="admin-main">
                <header className="admin-header">
                    <h1>
                        {activeTab === 'dashboard' && 'Dashboard'}
                        {activeTab === 'prices' && 'Price Management'}
                        {activeTab === 'contacts' && 'Contacts'}
                        {activeTab === 'settings' && 'Settings'}
                    </h1>
                    <div className="user-info">
                        <div className="user-avatar">
                            {user.email?.charAt(0).toUpperCase()}
                        </div>
                        <span>{user.email}</span>
                    </div>
                </header>

                <div className="admin-content">
                    {activeTab === 'dashboard' && (
                        <AdminDashboard userEmail={user.email} />
                    )}

                    {activeTab === 'prices' && (
                        <AdminPriceManager />
                    )}

                    {activeTab === 'contacts' && (
                        <div className="welcome-card">
                            <h2>📬 Contact Management</h2>
                            <p>View and manage customer inquiries from the contact form.</p>
                            <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '10px' }}>
                                Coming soon: Contact list with filtering and status management.
                            </p>
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="welcome-card">
                            <h2>⚙️ Settings</h2>
                            <p>Configure your admin preferences and account settings.</p>
                            <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '10px' }}>
                                Coming soon: Account settings, notifications, and more.
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}

export default Admin

