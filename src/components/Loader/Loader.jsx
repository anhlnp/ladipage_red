import { useTheme } from '../../context/ThemeContext'

const Loader = ({ progress }) => {
    const { isDark } = useTheme()

    return (
        <div
            className="loader"
            style={{
                background: isDark
                    ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
                    : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
            }}
        >
            <div className="loader-content">
                <div className="loader-logo">
                    <img
                        src="/Select Tech inc.svg"
                        alt="Select Tech"
                        style={{ height: '60px', width: 'auto', marginBottom: '12px' }}
                    />
                    <div>
                        <span
                            className="logo-text"
                            style={{ fontSize: '2.8rem', color: isDark ? '#f8fafc' : '#0f172a' }}
                        >
                            SELECT<span className="accent">TECH</span> <span style={{ fontSize: '1.4rem', opacity: 0.7 }}>Inc.</span>
                        </span>
                    </div>
                </div>
                <div className="loader-bar" style={{
                    width: '240px',
                    height: '4px',
                    background: isDark ? 'rgba(56, 189, 248, 0.2)' : 'rgba(14, 165, 233, 0.2)',
                    borderRadius: '4px'
                }}>
                    <div
                        className="loader-progress"
                        style={{
                            width: `${progress}%`,
                            background: isDark
                                ? 'linear-gradient(90deg, #38bdf8, #a78bfa, #34d399)'
                                : 'linear-gradient(90deg, #0ea5e9, #8b5cf6, #10b981)',
                            borderRadius: '4px',
                            transition: 'width 0.3s ease'
                        }}
                    />
                </div>
                <div className="loader-text" style={{
                    color: isDark ? '#94a3b8' : '#64748b',
                    marginTop: '20px',
                    fontSize: '0.9rem'
                }}>
                    {progress < 30 && '🔐 Securing connections...'}
                    {progress >= 30 && progress < 60 && '⚡ Loading resources...'}
                    {progress >= 60 && progress < 90 && '🚀 Almost ready...'}
                    {progress >= 90 && '✨ Welcome!'}
                </div>
            </div>
        </div>
    )
}

export default Loader
