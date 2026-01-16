import { useState, useEffect } from 'react'
import Map, { NavigationControl, FullscreenControl, GeolocateControl, Marker } from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'
import './LocationSection.css'

// Hickory, NC coordinates (Plus Code: QM68+J9)
const HICKORY_COORDS = {
    longitude: -81.33406,
    latitude: 35.76153
}

// Map styles for light and dark mode
const MAP_STYLES = {
    light: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
    dark: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json'
}

const LocationMap = () => {
    const [isDark, setIsDark] = useState(true)

    useEffect(() => {
        // Check initial theme
        const checkTheme = () => {
            const theme = document.documentElement.getAttribute('data-theme')
            setIsDark(theme !== 'light')
        }
        checkTheme()

        // Listen for theme changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'data-theme') {
                    checkTheme()
                }
            })
        })

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        })

        return () => observer.disconnect()
    }, [])

    return (
        <div className="map-wrapper">
            <Map
                initialViewState={{
                    longitude: HICKORY_COORDS.longitude,
                    latitude: HICKORY_COORDS.latitude,
                    zoom: 12
                }}
                style={{ width: '100%', height: '100%' }}
                mapStyle={isDark ? MAP_STYLES.dark : MAP_STYLES.light}
                attributionControl={false}
                scrollZoom={true}
            >
                <NavigationControl position="bottom-right" />
                <FullscreenControl position="bottom-right" />
                <GeolocateControl position="bottom-right" />

                {/* Custom Marker for Hickory Office */}
                <Marker
                    longitude={HICKORY_COORDS.longitude}
                    latitude={HICKORY_COORDS.latitude}
                    anchor="bottom"
                >
                    <div className="custom-marker">
                        <div className="marker-pulse"></div>
                        <div className="marker-pin">
                            <span>📍</span>
                        </div>
                        <div className="marker-label">Select Tech Inc.</div>
                    </div>
                </Marker>
            </Map>

            {/* Map overlay with gradient */}
            <div className="map-overlay"></div>
        </div>
    )
}

const LocationSection = () => {
    return (
        <section className="location-section" id="location">
            <div className="location-container">
                <div className="location-content">
                    <span className="location-badge">📍 OUR LOCATION</span>
                    <h2>Proudly Serving <span className="gradient-text">North Carolina</span></h2>
                    <p>
                        Based in Hickory, NC, Select Tech has been providing award-winning IT solutions
                        and cybersecurity services to businesses throughout North Carolina for over 23 years.
                    </p>
                    <div className="location-details">
                        <div className="detail-item">
                            <div className="detail-icon">🏢</div>
                            <div>
                                <h4>Headquarters</h4>
                                <p>Hickory, North Carolina</p>
                            </div>
                        </div>
                        <div className="detail-item">
                            <div className="detail-icon">🌍</div>
                            <div>
                                <h4>Service Area</h4>
                                <p>Statewide & Remote Support</p>
                            </div>
                        </div>
                        <div className="detail-item">
                            <div className="detail-icon">⏰</div>
                            <div>
                                <h4>Availability</h4>
                                <p>24/7/365 Support Available</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="location-map">
                    <LocationMap />
                </div>
            </div>
        </section>
    )
}

export default LocationSection
