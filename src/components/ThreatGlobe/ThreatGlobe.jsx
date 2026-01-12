import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, Line, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

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
    const x = radius * Math.cos(lat) * Math.cos(lng)
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

// Globe Component
const Globe = ({ colorTheme, isDark }) => {
    const globeRef = useRef()
    const [attacks, setAttacks] = useState(() => generateAttacks(12))
    
    const colors = THEME_COLORS[colorTheme] || THEME_COLORS.cyan
    const globeColor = isDark ? '#1a1a2e' : '#e2e8f0'
    const wireColor = isDark ? colors.primary : colors.secondary
    const attackColor = colors.glow

    useFrame((state, delta) => {
        if (globeRef.current) {
            // Slow auto-rotation (can be overridden by OrbitControls)
            globeRef.current.rotation.y += delta * 0.03
        }
    })

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
            {/* Main globe sphere */}
            <Sphere args={[1, 32, 32]}>
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

            {/* Wireframe grid */}
            {wireframePoints.map((points, i) => (
                <Line
                    key={i}
                    points={points}
                    color={wireColor}
                    lineWidth={0.5}
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
