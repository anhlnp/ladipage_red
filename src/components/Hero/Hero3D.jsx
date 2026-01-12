import { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const Hero3D = () => {
    const meshRef = useRef()
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

    // Colors that match ladipage_red theme
    const primaryColor = isDark ? '#38bdf8' : '#0ea5e9'  // accent-primary
    const secondaryColor = isDark ? '#a78bfa' : '#8b5cf6'  // accent-secondary

    // Create wireframe globe geometry
    const geometry = useMemo(() => {
        return new THREE.IcosahedronGeometry(2, 1)
    }, [])

    // Particle positions
    const particlePositions = useMemo(() => {
        const positions = []
        for (let i = 0; i < 20; i++) {
            positions.push([
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 4
            ])
        }
        return positions
    }, [])

    useFrame((state) => {
        if (groupRef.current) {
            // Slow rotation
            groupRef.current.rotation.y += 0.003
            groupRef.current.rotation.x += 0.001

            // Subtle floating
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
        }
    })

    return (
        <group ref={groupRef} position={[8, 2, -8]}>
            {/* Wireframe Globe */}
            <mesh ref={meshRef} geometry={geometry}>
                <meshStandardMaterial
                    color={primaryColor}
                    wireframe
                    emissive={primaryColor}
                    emissiveIntensity={0.3}
                    transparent
                    opacity={isDark ? 0.5 : 0.4}
                />
            </mesh>

            {/* Inner glow sphere */}
            <mesh geometry={geometry}>
                <meshStandardMaterial
                    color={secondaryColor}
                    transparent
                    opacity={isDark ? 0.15 : 0.1}
                    emissive={secondaryColor}
                    emissiveIntensity={0.4}
                />
            </mesh>

            {/* Particles */}
            {particlePositions.map((pos, i) => (
                <mesh key={i} position={pos}>
                    <sphereGeometry args={[0.04, 8, 8]} />
                    <meshStandardMaterial
                        color={primaryColor}
                        emissive={primaryColor}
                        emissiveIntensity={0.8}
                    />
                </mesh>
            ))}
        </group>
    )
}

export default Hero3D
