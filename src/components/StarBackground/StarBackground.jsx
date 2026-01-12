import { useState, useRef, Suspense, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'

const StarBackground = (props) => {
    const ref = useRef()
    const [isDark, setIsDark] = useState(true)
    
    const [sphere] = useState(() => {
        const positions = random.inSphere(new Float32Array(5001), { radius: 1.2 })
        // Filter out any NaN values by replacing with 0
        for (let i = 0; i < positions.length; i++) {
            if (isNaN(positions[i])) {
                positions[i] = 0
            }
        }
        return positions
    })

    // Listen for theme changes
    useEffect(() => {
        const checkTheme = () => {
            const theme = document.documentElement.getAttribute('data-theme')
            setIsDark(theme !== 'light')
        }

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'data-theme') {
                    checkTheme()
                }
            })
        })

        observer.observe(document.documentElement, { attributes: true })
        checkTheme()

        return () => observer.disconnect()
    }, [])

    useFrame((state, delta) => {
        ref.current.rotation.x -= delta / 10
        ref.current.rotation.y -= delta / 15
    })

    // Theme-aware star color - dark stars for light mode, white for dark mode
    const starColor = isDark ? '#ffffff' : '#1e293b'
    const starSize = isDark ? 0.002 : 0.003

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points
                ref={ref}
                positions={sphere}
                stride={3}
                frustumCulled
                {...props}
            >
                <PointMaterial
                    transparent
                    color={starColor}
                    size={starSize}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    )
}

const StarsCanvas = () => (
    <div className="stars-canvas">
        <Canvas camera={{ position: [0, 0, 1] }}>
            <Suspense fallback={null}>
                <StarBackground />
            </Suspense>
        </Canvas>
    </div>
)

export default StarsCanvas
