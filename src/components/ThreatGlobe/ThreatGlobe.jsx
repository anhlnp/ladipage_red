import { useRef, useMemo, useState, useEffect, useCallback, memo, startTransition } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Sphere, Line, OrbitControls, Html } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { attackArcVertexShader, attackArcFragmentShader } from './shaders'
import ImpactRipple from './ImpactRipple'

// Throttle utility for pointer events
const throttle = (fn, delay) => {
    let lastCall = 0
    return (...args) => {
        const now = Date.now()
        if (now - lastCall >= delay) {
            lastCall = now
            return fn(...args)
        }
    }
}

// Detect touch device
const isTouchDevice = () => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window
}

const ATTACK_TYPES = [
    { name: 'DDoS', color: '#ef5350' }, // Red
    { name: 'Malware', color: '#ffa726' }, // Orange
    { name: 'Phishing', color: '#ba68c8' }, // Purple
    { name: 'Botnet', color: '#4fc3f7' }, // Blue
    { name: 'Exploit', color: '#66bb6a' }, // Green
]

const Atmosphere = ({ color = '#4fc3f7' }) => {
  const materialRef = useRef()
  
  // Create stable uniforms object
  const uniforms = useMemo(() => ({
    uColor: { value: new THREE.Color(color) }
  }), []) // Empty deps - create once
  
  // Update color uniform when prop changes
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uColor.value.set(color)
    }
  }, [color])
  
  return (
    <mesh scale={[1.12, 1.12, 1.12]}>
      <sphereGeometry args={[1, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        transparent
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
        uniforms={uniforms}
        vertexShader={`
            varying vec3 vNormal;
            void main() {
                vNormal = normalize(normalMatrix * normal);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `}
        fragmentShader={`
            uniform vec3 uColor;
            varying vec3 vNormal;
            void main() {
                float intensity = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 6.0);
                gl_FragColor = vec4(uColor, 1.0) * intensity * 1.5;
            }
        `}
      />
    </mesh>
  )
}

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
        // Use 3D vector accumulation for accurate centroid (handles date line crossing)
        let sumX = 0, sumY = 0, sumZ = 0, pointCount = 0
        
        const processRing = (ring) => {
            const sampledRing = ring.filter((_, i) => i % 2 === 0 || i === ring.length - 1)
            if (sampledRing.length > 2) {
                const points = sampledRing.map(([lng, lat]) => {
                    const latRad = degToRad(lat)
                    const lngRad = degToRad(lng)
                    const v = latLngToVector3(latRad, lngRad, radius)
                    
                    // Accumulate for centroid
                    sumX += v.x
                    sumY += v.y
                    sumZ += v.z
                    pointCount++
                    
                    return v
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
            // Calculate center point from 3D average
            const centerPos = new THREE.Vector3(sumX, sumY, sumZ).divideScalar(pointCount).normalize().multiplyScalar(radius)
            
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
const getRandomLatLon = (countries = []) => {
    if (countries.length > 0) {
        // Try to pick a valid point on a country border
        try {
            const country = countries[Math.floor(Math.random() * countries.length)]
            const feature = country.feature
            let ring = []
            
            if (feature?.geometry?.type === 'Polygon') {
                ring = feature.geometry.coordinates[0]
            } else if (feature?.geometry?.type === 'MultiPolygon') {
                const poly = feature.geometry.coordinates[Math.floor(Math.random() * feature.geometry.coordinates.length)]
                ring = poly[0]
            }
            
            if (ring && ring.length > 0) {
                const pt = ring[Math.floor(Math.random() * ring.length)]
                // GeoJSON is [lng, lat] in degrees
                return { lat: degToRad(pt[1]), lng: degToRad(pt[0]) }
            }
        } catch (e) {
            console.warn('Error picking country point:', e)
        }
    }
    
    // Fallback to random point
    const lat = (Math.random() - 0.5) * Math.PI
    const lng = Math.random() * Math.PI * 2
    return { lat, lng }
}

// Generate random attack data
const generateAttacks = (count = 8, countries = []) => {
    const attacks = []
    const now = Date.now()
    for (let i = 0; i < count; i++) {
        const source = getRandomLatLon(countries)
        const target = getRandomLatLon(countries)
        const type = ATTACK_TYPES[Math.floor(Math.random() * ATTACK_TYPES.length)]
        
        attacks.push({
            id: i,
            source,
            target,
            color: type.color,
            type: type.name,
            progress: Math.random(), // Animation offset
            speed: 0.08 + Math.random() * 0.1, // Slower for smoothness
            spawnTime: now - Math.random() * 2000, // Stagger initial spawns
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



// Attack Arc Component using TubeGeometry and ShaderMaterial for performance
const AttackArc = memo(({ attack, color }) => {
    const materialRef = useRef()
    const spawnTimeRef = useRef(attack.spawnTime || Date.now())
    
    // Create static curve geometry once
    const curve = useMemo(() => {
        const start = latLngToVector3(attack.source.lat, attack.source.lng)
        const end = latLngToVector3(attack.target.lat, attack.target.lng)
        const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(1.4)
        return new THREE.QuadraticBezierCurve3(start, mid, end)
    }, [attack.source.lat, attack.source.lng, attack.target.lat, attack.target.lng])

    // Calculate spawn offset for fade-in (in seconds from start)
    const spawnOffset = useMemo(() => {
        return (Date.now() - spawnTimeRef.current) / 1000
    }, [])

    // Create stable uniforms object once - prevents shader recompilation
    const uniforms = useMemo(() => ({
        uColor: { value: new THREE.Color(color) },
        uProgress: { value: attack.progress || 0 },
        uTime: { value: 0 },
        uSpawnOffset: { value: spawnOffset }
    }), []) // Empty deps - create once

    // Update color uniform when prop changes (without recreating uniforms object)
    useEffect(() => {
        if (materialRef.current) {
            materialRef.current.uniforms.uColor.value.set(color)
        }
    }, [color])

    // Update uniform in loop without React re-renders
    useFrame((state, delta) => {
        if (materialRef.current) {
            attack.progress += delta * attack.speed
            if (attack.progress > 1) attack.progress = 0
            materialRef.current.uniforms.uProgress.value = attack.progress
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
        }
    })

    // Dispose geometry and material on unmount
    useEffect(() => {
        return () => {
            if (materialRef.current) {
                materialRef.current.dispose()
            }
        }
    }, [])

    return (
        <mesh>
            <tubeGeometry args={[curve, 20, 0.002, 4, false]} />
            <shaderMaterial
                ref={materialRef}
                transparent
                depthWrite={false}
                uniforms={uniforms}
                vertexShader={attackArcVertexShader}
                fragmentShader={attackArcFragmentShader}
            />
        </mesh>
    )
})

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

// Memoized Country Group to avoid full globe re-renders on hover
const CountryGroup = memo(({ country, isHovered, colors, isDark }) => {
    return (
        <group>
            {country.lines.map((points, lineIdx) => (
                <Line
                    key={`line-${lineIdx}`}
                    points={points}
                    color={isHovered ? (isDark ? '#ffffff' : colors.secondary) : (isDark ? colors.primary : colors.secondary)}
                    lineWidth={isHovered ? 1.5 : (isDark ? 0.5 : 0.8)}
                    transparent
                    opacity={isHovered ? 1 : (isDark ? 0.4 : 0.7)}
                />
            ))}
        </group>
    )
})

// Globe Component
const Globe = ({ colorTheme, isDark }) => {
    const globeRef = useRef()
    const countriesRef = useRef([])
    const [attacks, setAttacks] = useState(() => generateAttacks(12, []))
    const [countries, setCountries] = useState([])
    const [hoveredCountry, setHoveredCountry] = useState(null)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const [isFocused, setIsFocused] = useState(false)
    const [isTouch, setIsTouch] = useState(false)
    
    // Detect touch device on mount
    useEffect(() => {
        setIsTouch(isTouchDevice())
    }, [])
    
    const colors = THEME_COLORS[colorTheme] || THEME_COLORS.cyan
    const globeColor = isDark ? '#1a1a2e' : '#fef9f3'
    const wireColor = isDark ? colors.primary : '#94a3b8'
    const attackColor = colors.glow

    // Fetch GeoJSON on mount - use startTransition to avoid blocking render
    useEffect(() => {
        fetch('/countries-110m.json')
            .then(res => res.json())
            .then(data => {
                const parsed = parseCountriesGeoJSON(data)
                const enriched = parsed.map((c, i) => ({
                    ...c,
                    feature: data.features[i]
                }))
                
                // Use startTransition to defer state updates (non-blocking)
                startTransition(() => {
                    setCountries(enriched)
                    countriesRef.current = enriched
                    
                    setAttacks(generateAttacks(12, enriched).map(a => ({
                        ...a,
                        id: `${a.id}-${Date.now()}`
                    })))
                })
            })
            .catch(err => console.error('Failed to load country data:', err))
    }, [])
    
    // ... useFrame ... (omitted from replace block to keep context simple if possible, but I need to start from 275)

    useFrame((state, delta) => {
        if (globeRef.current && !isFocused) {
            // Keep rotating, just slower when hovering
            globeRef.current.rotation.y += delta * (hoveredCountry ? 0.005 : 0.03)
        }
    })

    const onGlobeClick = useCallback((e) => {
        e.stopPropagation()
        if (hoveredCountry) {
            setIsFocused(true)
            
            // Get country center in local space (normalized)
            const p = hoveredCountry.center.clone().normalize()
            
            // Get camera direction from globe (camera position normalized)
            const camDir = e.camera.position.clone().normalize()
            
            // Calculate quaternion to rotate P to face camera
            const targetQuat = new THREE.Quaternion().setFromUnitVectors(p, camDir)
            const targetEuler = new THREE.Euler().setFromQuaternion(targetQuat)
            
            gsap.to(globeRef.current.rotation, {
                x: targetEuler.x,
                y: targetEuler.y,
                z: targetEuler.z,
                duration: 1.5,
                ease: 'power2.inOut'
            })
            
        } else {
            // Click outside to resume
            setIsFocused(false)
            gsap.to(globeRef.current.rotation, {
                x: 0,
                y: globeRef.current.rotation.y, // Keep current Y
                z: 0,
                duration: 1,
                ease: 'power2.out'
            })
        }
    }, [hoveredCountry])

    // Handle mouse move on globe surface for hover detection (throttled, skip on touch)
    const onGlobePointerMoveRaw = useCallback((e) => {
        // Skip hover detection on touch devices
        if (isTouch) return
        
        e.stopPropagation()
        if (!globeRef.current) return

        const localPoint = globeRef.current.worldToLocal(e.point.clone())
        localPoint.normalize()
        
        const lat = Math.asin(localPoint.y) * 180 / Math.PI
        const lng = Math.atan2(localPoint.z, -localPoint.x) * 180 / Math.PI
        
        const found = countries.find(c => geoContains(c.feature, [lng, lat]))
        
        if (found) {
            setHoveredCountry(found)
            setMousePos({ x: e.clientX, y: e.clientY })
            document.body.style.cursor = 'pointer'
        } else {
            setHoveredCountry(null)
            document.body.style.cursor = 'default'
        }
    }, [countries, isTouch])
    
    // Throttled version - 16ms = 60fps max
    const onGlobePointerMove = useMemo(
        () => throttle(onGlobePointerMoveRaw, 16),
        [onGlobePointerMoveRaw]
    )

    const onGlobePointerOut = useCallback(() => {
        setHoveredCountry(null)
        document.body.style.cursor = 'default'
    }, [])

    // Regenerate attacks periodically - staggered updates (slower)
    useEffect(() => {
        const interval = setInterval(() => {
            if (!countriesRef.current.length) return
            
            setAttacks(prev => {
                const idx = Math.floor(Math.random() * prev.length)
                const newAttack = {
                    ...generateAttacks(1, countriesRef.current)[0],
                    progress: 0,
                    spawnTime: Date.now() // Fresh spawn time for fade-in
                }
                return prev.map((a, i) => i === idx ? { ...newAttack, id: a.id } : a)
            })
        }, 4000) // Replace 1 attack every 4s (slower)
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
                onClick={onGlobeClick}
            >
                <meshPhongMaterial
                    color={globeColor}
                    transparent
                    opacity={0.85}
                    shininess={10}
                />
            </Sphere>
            
            {/* Atmosphere - hidden in light mode */}
            {isDark && <Atmosphere color={colors.glow} />}
            
            {/* Inner glow */}
            <Sphere args={[0.98, 24, 24]}>
                <meshBasicMaterial
                    color={colors.primary}
                    transparent
                    opacity={0.1}
                />
            </Sphere>

            {/* Interactive Country Outlines */}
            {countries.map((country, idx) => (
                <CountryGroup 
                    key={`country-${country.code}-${idx}`}
                    country={country}
                    isHovered={hoveredCountry?.name === country.name}
                    colors={colors}
                    isDark={isDark}
                />
            ))}
            
            {/* Tooltip - hide on touch devices */}
            {hoveredCountry && !isTouch && (
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

            {/* Wireframe grid - Latitude/Longitude lines */}
            {wireframePoints.map((points, i) => (
                <Line
                    key={i}
                    points={points}
                    color={wireColor}
                    lineWidth={0.3}
                    transparent
                    opacity={0.2}
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

            {/* Impact ripples */}
            {attacks.map((attack) => (
                <ImpactRipple
                    key={`impact-${attack.id}`}
                    position={latLngToVector3(attack.target.lat, attack.target.lng, 1.02)}
                    color={attackColor}
                    spawnTime={attack.spawnTime}
                />
            ))}
        </group>
    )
}

// Main ThreatGlobe Component
const ThreatGlobe = () => {
    const [colorTheme, setColorTheme] = useState('cyan')
    const [isDark, setIsDark] = useState(true)
    const [isTouch, setIsTouch] = useState(false)

    // Detect touch device on mount
    useEffect(() => {
        setIsTouch(isTouchDevice())
    }, [])

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
                    minDistance={3}
                    maxDistance={5}
                    autoRotate={false}
                    rotateSpeed={isTouch ? 0.8 : 0.5}
                    zoomSpeed={0.3}
                    touchRotate={true}
                />
            </Canvas>
        </div>
    )
}

export default ThreatGlobe
