import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './AdminLogin.css'

const AdminLogin = () => {
    const navigate = useNavigate()
    const { user, loading, signInWithEmail } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Redirect if already logged in
    useEffect(() => {
        if (!loading && user) {
            navigate('/admin')
        }
    }, [user, loading, navigate])

    const handleEmailAuth = async (e) => {
        e.preventDefault()
        setError('')
        setIsSubmitting(true)

        try {
            const { error } = await signInWithEmail(email, password)
            if (error) {
                setError(error.message)
            }
        } catch (err) {
            setError('An unexpected error occurred')
        } finally {
            setIsSubmitting(false)
        }
    }

    if (loading) {
        return (
            <div className="admin-login-container">
                <div className="admin-login-card">
                    <div className="loading-spinner"></div>
                    <p>Loading...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="admin-login-container">
            <div className="admin-login-card">
                <div className="admin-login-header">
                    <div className="admin-logo">
                        <span className="logo-icon">◆</span>
                        <span>SELECT<span className="accent">TECH</span></span>
                    </div>
                    <h1>Admin Portal</h1>
                    <p>Sign in to continue</p>
                </div>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleEmailAuth} className="admin-login-form">
                    <div className="form-group">
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            minLength={6}
                        />
                    </div>

                    <button
                        type="submit"
                        className="auth-btn primary-btn"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Please wait...' : 'Sign In'}
                    </button>
                </form>

                <a href="/" className="back-link">← Back to website</a>
            </div>
        </div>
    )
}

export default AdminLogin

