import { useRef, useMemo, useState, useEffect, useCallback } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Sphere, Line, OrbitControls, Html } from '@react-three/drei'
import * as THREE from 'three'

// Convert degree coordinates to radians
const degToRad = (deg) => (deg / 180) * Math.PI

// Parse GeoJSON polygon coordinates to 3D points
const parseGeoJSONToLines = (geojson, radius = 1.012) => {
    const lines = []
    
    if (!geojson?.features) return lines
    
    geojson.features.forEach(feature => {
        if (feature.geometry?.type === 'Polygon') {
            feature.geometry.coordinates.forEach(ring => {
                // Sample every few points to reduce complexity
                const sampledRing = ring.filter((_, i) => i % 3 === 0 || i === ring.length - 1)
                if (sampledRing.length > 2) {
                    const points = sampledRing.map(([lng, lat]) => {
                        const latRad = degToRad(lat)
                        const lngRad = degToRad(lng)
                        return latLngToVector3(latRad, lngRad, radius)
                    })
                    lines.push(points)
                }
            })
        } else if (feature.geometry?.type === 'MultiPolygon') {
            feature.geometry.coordinates.forEach(polygon => {
                polygon.forEach(ring => {
                    const sampledRing = ring.filter((_, i) => i % 3 === 0 || i === ring.length - 1)
                    if (sampledRing.length > 2) {
                        const points = sampledRing.map(([lng, lat]) => {
                            const latRad = degToRad(lat)
                            const lngRad = degToRad(lng)
                            return latLngToVector3(latRad, lngRad, radius)
                        })
                        lines.push(points)
                    }
                })
            })
        }
    })
    
    return lines
}

// Parse countries GeoJSON with country names for interactivity
const parseCountriesGeoJSON = (geojson, radius = 1.013) => {
    const countries = []
    
    if (!geojson?.features) return countries
    
    geojson.features.forEach(feature => {
        const props = feature.properties || {}
        const name = props.ADMIN || props.NAME || props.name || 'Unknown'
        const code = props.ISO_A3 || props.ISO_A2 || ''
        
        const lines = []
        let centerLat = 0, centerLng = 0, pointCount = 0
        
        const processRing = (ring) => {
            const sampledRing = ring.filter((_, i) => i % 2 === 0 || i === ring.length - 1)
            if (sampledRing.length > 2) {
                const points = sampledRing.map(([lng, lat]) => {
                    centerLat += lat
                    centerLng += lng
                    pointCount++
                    
                    const latRad = degToRad(lat)
                    const lngRad = degToRad(lng)
                    return latLngToVector3(latRad, lngRad, radius)
                })
                lines.push(points)
            }
        }
        
        if (feature.geometry?.type === 'Polygon') {
            feature.geometry.coordinates.forEach(processRing)
        } else if (feature.geometry?.type === 'MultiPolygon') {
            feature.geometry.coordinates.forEach(polygon => {
                polygon.forEach(processRing)
            })
        }
        
        if (lines.length > 0 && pointCount > 0) {
            // Calculate center point for label
            centerLat /= pointCount
            centerLng /= pointCount
            const latRad = degToRad(centerLat)
            const lngRad = degToRad(centerLng)
            const centerPos = latLngToVector3(latRad, lngRad, radius)
            
            countries.push({
                name,
                code,
                lines,
                center: centerPos
            })
        }
    })
    
    return countries
}

// Color themes matching the app
const THEME_COLORS = {
    cyan: { primary: '#00d9ff', secondary: '#0891b2', glow: '#00d9ff' },
    red: { primary: '#ef4444', secondary: '#dc2626', glow: '#f87171' },
    purple: { primary: '#a855f7', secondary: '#9333ea', glow: '#c084fc' },
    green: { primary: '#22c55e', secondary: '#16a34a', glow: '#4ade80' },
    gold: { primary: '#eab308', secondary: '#ca8a04', glow: '#facc15' },
}

// Generate random attack data
const generateAttacks = (count = 15) => {
    const attacks = []
    for (let i = 0; i < count; i++) {
        // Random source point on globe
        const srcLat = (Math.random() - 0.5) * Math.PI
        const srcLng = Math.random() * Math.PI * 2
        
        // Random target point
        const tgtLat = (Math.random() - 0.5) * Math.PI
        const tgtLng = Math.random() * Math.PI * 2
        
        attacks.push({
            id: i,
            source: { lat: srcLat, lng: srcLng },
            target: { lat: tgtLat, lng: tgtLng },
            progress: Math.random(), // Animation offset
            speed: 0.3 + Math.random() * 0.5,
            active: true,
        })
    }
    return attacks
}

// Convert lat/lng to 3D position
const latLngToVector3 = (lat, lng, radius = 1) => {
    const x = -radius * Math.cos(lat) * Math.cos(lng) // Flip X to fix mirroring
    const y = radius * Math.sin(lat)
    const z = radius * Math.cos(lat) * Math.sin(lng)
    return new THREE.Vector3(x, y, z)
}

// Create arc between two points
const createArc = (start, end, segments = 50, height = 0.3) => {
    const points = []
    for (let i = 0; i <= segments; i++) {
        const t = i / segments
        const point = new THREE.Vector3().lerpVectors(start, end, t)
        // Add height curve
        const arcHeight = Math.sin(t * Math.PI) * height * start.distanceTo(end)
        point.normalize().multiplyScalar(1 + arcHeight)
        points.push(point)
    }
    return points
}

// Attack Arc Component
const AttackArc = ({ attack, color, glowColor }) => {
    const lineRef = useRef()
    const [progress, setProgress] = useState(attack.progress)
    
    const { points, visiblePoints } = useMemo(() => {
        const start = latLngToVector3(attack.source.lat, attack.source.lng)
        const end = latLngToVector3(attack.target.lat, attack.target.lng)
        const allPoints = createArc(start, end, 40, 0.25)
        return { points: allPoints, visiblePoints: allPoints }
    }, [attack])

    useFrame((state, delta) => {
        setProgress(prev => {
            const next = prev + delta * attack.speed
            return next > 1 ? 0 : next
        })
    })

    // Calculate visible portion of arc
    const visibleCount = Math.floor(progress * points.length)
    const displayPoints = points.slice(0, Math.max(2, visibleCount))

    if (displayPoints.length < 2) return null

    return (
        <Line
            ref={lineRef}
            points={displayPoints}
            color={color}
            lineWidth={1.5}
            transparent
            opacity={0.8}
        />
    )
}

// Impact Point Component
const ImpactPoint = ({ position, color, delay = 0 }) => {
    const meshRef = useRef()
    const [scale, setScale] = useState(0)
    
    useFrame((state) => {
        const time = state.clock.elapsedTime + delay
        const pulse = (Math.sin(time * 3) + 1) * 0.5
        setScale(0.02 + pulse * 0.015)
    })

    return (
        <mesh ref={meshRef} position={position}>
            <sphereGeometry args={[scale, 8, 8]} />
            <meshBasicMaterial color={color} transparent opacity={0.9} />
        </mesh>
    )
}

// Check if point [lng, lat] is inside polygon rings
const isPointInPolygon = (point, vs) => {
    // ray-casting algorithm based on
    // https://github.com/substack/point-in-polygon
    const x = point[0], y = point[1]
    let inside = false
    for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        const xi = vs[i][0], yi = vs[i][1]
        const xj = vs[j][0], yj = vs[j][1]
        const intersect = ((yi > y) !== (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)
        if (intersect) inside = !inside
    }
    return inside
}

// Simple point in GeoJSON feature check
const geoContains = (feature, [lng, lat]) => {
    const point = [lng, lat]
    if (feature.geometry.type === 'Polygon') {
        return isPointInPolygon(point, feature.geometry.coordinates[0])
    } else if (feature.geometry.type === 'MultiPolygon') {
        return feature.geometry.coordinates.some(polygon => 
            isPointInPolygon(point, polygon[0])
        )
    }
    return false
}

// Globe Component
const Globe = ({ colorTheme, isDark }) => {
    const globeRef = useRef()
    const [attacks, setAttacks] = useState(() => generateAttacks(12))
    const [countries, setCountries] = useState([])
    const [hoveredCountry, setHoveredCountry] = useState(null)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    
    const colors = THEME_COLORS[colorTheme] || THEME_COLORS.cyan
    const globeColor = isDark ? '#1a1a2e' : '#e2e8f0'
    const wireColor = isDark ? colors.primary : colors.secondary
    const attackColor = colors.glow

    // Fetch GeoJSON on mount
    useEffect(() => {
        fetch('/countries-110m.json')
            .then(res => res.json())
            .then(data => {
                const parsed = parseCountriesGeoJSON(data)
                // Keep raw opacity features for hit testing
                const enriched = parsed.map((c, i) => ({
                    ...c,
                    feature: data.features[i] // Assumes order is preserved, which it is
                }))
                setCountries(enriched)
            })
            .catch(err => console.error('Failed to load country data:', err))
    }, [])

    useFrame((state, delta) => {
        if (globeRef.current && !hoveredCountry) {
            // Slow auto-rotation only when not hovering a country
            globeRef.current.rotation.y += delta * 0.03
        }
    })

    // Handle mouse move on globe surface for hover detection
    const onGlobePointerMove = useCallback((e) => {
        e.stopPropagation()
        if (!globeRef.current) return

        // Convert world intersection point to local object space
        // This accounts for the globe's rotation and position
        const localPoint = globeRef.current.worldToLocal(e.point.clone())
        
        // Normalize to ensure it's on the unit sphere (radius 1) for math
        localPoint.normalize()
        
        // Calculate Lat/Lng from local point
        const lat = Math.asin(localPoint.y) * 180 / Math.PI
        
        // NOTE: We flipped X in latLngToVector3 (x = -r*...), so we must account for it here.
        // x = -cos * cos
        // z = cos * sin
        // So tan(lng) = z / -x
        const lng = Math.atan2(localPoint.z, -localPoint.x) * 180 / Math.PI // -180 to 180
        
        // Find country
        const found = countries.find(c => geoContains(c.feature, [lng, lat]))
        
        if (found) {
            setHoveredCountry(found)
            setMousePos({ x: e.clientX, y: e.clientY })
            document.body.style.cursor = 'pointer'
        } else {
            setHoveredCountry(null)
            document.body.style.cursor = 'default'
        }
    }, [countries])

    const onGlobePointerOut = useCallback(() => {
        setHoveredCountry(null)
        document.body.style.cursor = 'default'
    }, [])

    // Regenerate attacks periodically
    useEffect(() => {
        const interval = setInterval(() => {
            setAttacks(generateAttacks(12))
        }, 8000)
        return () => clearInterval(interval)
    }, [])

    // Generate wireframe points
    const wireframePoints = useMemo(() => {
        const lines = []
        const segments = 24
        
        // Latitude lines
        for (let i = 1; i < 6; i++) {
            const lat = (i / 6) * Math.PI - Math.PI / 2
            const points = []
            for (let j = 0; j <= segments; j++) {
                const lng = (j / segments) * Math.PI * 2
                points.push(latLngToVector3(lat, lng, 1.01))
            }
            lines.push(points)
        }
        
        // Longitude lines  
        for (let i = 0; i < 12; i++) {
            const lng = (i / 12) * Math.PI * 2
            const points = []
            for (let j = 0; j <= segments; j++) {
                const lat = (j / segments) * Math.PI - Math.PI / 2
                points.push(latLngToVector3(lat, lng, 1.01))
            }
            lines.push(points)
        }
        
        return lines
    }, [])

    return (
        <group ref={globeRef}>
            {/* Main globe sphere with hit testing */}
            <Sphere 
                args={[1, 32, 32]} 
                onPointerMove={onGlobePointerMove}
                onPointerLeave={onGlobePointerOut}
            >
                <meshPhongMaterial
                    color={globeColor}
                    transparent
                    opacity={0.85}
                    shininess={10}
                />
            </Sphere>
            
            {/* Inner glow */}
            <Sphere args={[0.98, 24, 24]}>
                <meshBasicMaterial
                    color={colors.primary}
                    transparent
                    opacity={0.1}
                />
            </Sphere>

            {/* Interactive Country Outlines */}
            {countries.map((country, idx) => {
                const isHovered = hoveredCountry?.name === country.name
                return (
                    <group key={`country-${country.code}-${idx}`}>
                        {country.lines.map((points, lineIdx) => (
                            <Line
                                key={`line-${lineIdx}`}
                                points={points}
                                color={isHovered ? '#ffffff' : colors.primary}
                                lineWidth={isHovered ? 1.5 : 0.4}
                                transparent
                                opacity={isHovered ? 1 : 0.4}
                            />
                        ))}
                    </group>
                )
            })}
            
            {/* Tooltip */}
            {hoveredCountry && (
                <Html position={hoveredCountry.center} style={{ pointerEvents: 'none' }}>
                    <div style={{
                        background: 'rgba(0,0,0,0.8)',
                        color: colors.primary,
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        border: `1px solid ${colors.primary}`,
                        whiteSpace: 'nowrap',
                        transform: 'translate3d(-50%, -150%, 0)',
                        backdropFilter: 'blur(4px)',
                        boxShadow: `0 0 10px ${colors.glow}`
                    }}>
                        {hoveredCountry.name}
                    </div>
                </Html>
            )}

            {/* Wireframe grid */}
            {wireframePoints.map((points, i) => (
                <Line
                    key={i}
                    points={points}
                    color={wireColor}
                    lineWidth={0.3}
                    transparent
                    opacity={0.3}
                />
            ))}

            {/* Attack arcs */}
            {attacks.map((attack) => (
                <AttackArc
                    key={attack.id}
                    attack={attack}
                    color={attackColor}
                    glowColor={colors.glow}
                />
            ))}

            {/* Impact points */}
            {attacks.map((attack, i) => (
                <ImpactPoint
                    key={`impact-${attack.id}`}
                    position={latLngToVector3(attack.target.lat, attack.target.lng, 1.02)}
                    color={attackColor}
                    delay={i * 0.5}
                />
            ))}
        </group>
    )
}

// Main ThreatGlobe Component
const ThreatGlobe = () => {
    const [colorTheme, setColorTheme] = useState('cyan')
    const [isDark, setIsDark] = useState(true)

    // Listen for theme changes
    useEffect(() => {
        const checkTheme = () => {
            const theme = document.documentElement.getAttribute('data-theme')
            const color = document.documentElement.getAttribute('data-color-theme')
            setIsDark(theme !== 'light')
            setColorTheme(color || 'cyan')
        }

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'data-theme' || 
                    mutation.attributeName === 'data-color-theme') {
                    checkTheme()
                }
            })
        })

        observer.observe(document.documentElement, { attributes: true })
        checkTheme()

        return () => observer.disconnect()
    }, [])

    // Use ref to attach wheel event with { passive: false } to allow preventDefault
    const containerRef = useRef(null)
    
    useEffect(() => {
        const container = containerRef.current
        if (!container) return
        
        const handleWheel = (e) => {
            e.preventDefault()
            e.stopPropagation()
        }
        
        container.addEventListener('wheel', handleWheel, { passive: false })
        
        return () => {
            container.removeEventListener('wheel', handleWheel)
        }
    }, [])

    return (
        <div 
            ref={containerRef}
            className="threat-globe" 
        >
            <Canvas
                camera={{ position: [0, 0, 2.8], fov: 45 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
            >
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={0.6} />
                <pointLight position={[-10, -10, -10]} intensity={0.3} />
                <Globe colorTheme={colorTheme} isDark={isDark} />
                <OrbitControls 
                    enableZoom={true}
                    enablePan={false}
                    minDistance={2.2}
                    maxDistance={4}
                    autoRotate={false}
                    rotateSpeed={0.5}
                    zoomSpeed={0.5}
                />
            </Canvas>
        </div>
    )
}

export default ThreatGlobe
