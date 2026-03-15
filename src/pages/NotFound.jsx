import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import MagneticButton from '../components/MagneticButton/MagneticButton';
import './IndustryLightMode.css'; // Reusing common styles for consistency

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="page-container">
            <Navbar />
            <main className="not-found-container" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '60vh',
                textAlign: 'center',
                padding: '2rem'
            }}>
                <h1 style={{ fontSize: '6rem', fontWeight: 'bold', color: 'var(--primary-color, #e31837)', marginBottom: '1rem' }}>404</h1>
                <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Page Not Found</h2>
                <p style={{ fontSize: '1.1rem', color: '#666', maxWidth: '600px', marginBottom: '2.5rem' }}>
                    Oops! The page you are looking for doesn't exist or has been moved.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <MagneticButton 
                        className="btn-primary" 
                        onClick={() => navigate('/')} 
                        strength={0.25}
                    >
                        <span style={{ position: 'relative', zIndex: 2 }}>Return to Home</span>
                        <div className="btn-glow"></div>
                    </MagneticButton>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default NotFound;
