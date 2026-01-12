import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const Portal3D = () => {
    const groupRef = useRef()
    const [isDark, setIsDark] = useState(true)

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

    // Theme-aware colors
    const primaryColor = isDark ? '#38bdf8' : '#0ea5e9'  // accent-primary
    const secondaryColor = isDark ? '#a78bfa' : '#8b5cf6'  // accent-secondary

    useFrame((state) => {
        if (groupRef.current) {
            // Slow rotation
            groupRef.current.rotation.y += 0.008
            groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.15
        }
    })

    return (
        <group ref={groupRef} scale={0.8}>
            {/* Main torus */}
            <mesh position={[0, 0, 0]}>
                <torusGeometry args={[1.5, 0.4, 16, 100]} />
                <meshStandardMaterial
                    color={primaryColor}
                    wireframe
                    emissive={primaryColor}
                    emissiveIntensity={0.4}
                    transparent
                    opacity={isDark ? 0.6 : 0.5}
                />
            </mesh>

            {/* Inner ring - perpendicular */}
            <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1, 0.25, 16, 100]} />
                <meshStandardMaterial
                    color={secondaryColor}
                    wireframe
                    emissive={secondaryColor}
                    emissiveIntensity={0.3}
                    transparent
                    opacity={isDark ? 0.45 : 0.35}
                />
            </mesh>

            {/* Center sphere with glow */}
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[0.35, 32, 32]} />
                <meshStandardMaterial
                    color={primaryColor}
                    emissive={primaryColor}
                    emissiveIntensity={0.7}
                    transparent
                    opacity={isDark ? 0.6 : 0.5}
                />
            </mesh>
        </group>
    )
}

export default Portal3D
