import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import Hero3D from '../Hero/Hero3D'

// Simplified Tech Grid - clear separation between dark/light
const TechGrid = ({ isDark }) => {
    const gridRef = useRef()

    useFrame((state) => {
        if (gridRef.current) {
            gridRef.current.position.z = (state.clock.elapsedTime * 0.3) % 2
        }
    })

    // Distinct colors for each mode
    const primaryColor = isDark ? '#1e40af' : '#3b82f6'
    const secondaryColor = isDark ? '#0f172a' : '#dbeafe'

    return (
        <group ref={gridRef} position={[0, -8, -10]} rotation={[-Math.PI / 2.5, 0, 0]}>
            <gridHelper args={[50, 30, primaryColor, secondaryColor]} />
        </group>
    )
}

// Floating Data Particles - optimized count
const DataParticles = ({ isDark }) => {
    const particlesRef = useRef()
    const count = 80 // Optimized for performance

    const { positions, speeds } = useMemo(() => {
        const positions = new Float32Array(count * 3)
        const speeds = new Float32Array(count)
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 30
            positions[i * 3 + 1] = Math.random() * 18 - 5
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20
            speeds[i] = 0.012 + Math.random() * 0.025
        }
        return { positions, speeds }
    }, [])

    useFrame(() => {
        if (particlesRef.current) {
            const pos = particlesRef.current.geometry.attributes.position.array
            for (let i = 0; i < count; i++) {
                pos[i * 3 + 1] += speeds[i]
                if (pos[i * 3 + 1] > 16) pos[i * 3 + 1] = -5
            }
            particlesRef.current.geometry.attributes.position.needsUpdate = true
        }
    })

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial
                size={isDark ? 0.05 : 0.07}
                color={isDark ? '#38bdf8' : '#0284c7'}
                transparent
                opacity={isDark ? 0.7 : 0.6}
                sizeAttenuation
            />
        </points>
    )
}

// Clean Circuit Lines
const CircuitLines = ({ isDark }) => {
    const groupRef = useRef()

    const circuits = useMemo(() => {
        const lines = []
        for (let i = 0; i < 4; i++) {
            const y = (i - 1.5) * 5
            const z = -6 - i * 2.5

            lines.push({
                points: [[-12, y, z], [12, y, z]],
                colorDark: ['#38bdf8', '#a78bfa', '#34d399', '#fb923c'][i],
                colorLight: ['#0284c7', '#7c3aed', '#059669', '#ea580c'][i]
            })
        }
        return lines
    }, [])

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.children.forEach((line, i) => {
                const baseOpacity = isDark ? 0.35 : 0.45
                line.material.opacity = baseOpacity + Math.sin(state.clock.elapsedTime * 1.2 + i * 0.8) * 0.15
            })
        }
    })

    return (
        <group ref={groupRef}>
            {circuits.map((circuit, i) => (
                <line key={i}>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            count={circuit.points.length}
                            array={new Float32Array(circuit.points.flat())}
                            itemSize={3}
                        />
                    </bufferGeometry>
                    <lineBasicMaterial
                        color={isDark ? circuit.colorDark : circuit.colorLight}
                        transparent
                        opacity={isDark ? 0.35 : 0.45}
                    />
                </line>
            ))}
        </group>
    )
}

// Minimal Tech Nodes
const TechNodes = ({ isDark }) => {
    const groupRef = useRef()

    const nodes = useMemo(() => {
        const n = []
        for (let i = 0; i < 6; i++) {
            n.push({
                pos: [
                    (Math.random() - 0.5) * 18,
                    (Math.random() - 0.5) * 10,
                    -5 - Math.random() * 6
                ],
                size: 0.12 + Math.random() * 0.08,
                pulse: Math.random() * Math.PI * 2
            })
        }
        return n
    }, [])

    const connections = useMemo(() => {
        const conns = []
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dist = Math.sqrt(
                    Math.pow(nodes[i].pos[0] - nodes[j].pos[0], 2) +
                    Math.pow(nodes[i].pos[1] - nodes[j].pos[1], 2)
                )
                if (dist < 8) {
                    conns.push({ from: nodes[i].pos, to: nodes[j].pos })
                }
            }
        }
        return conns
    }, [nodes])

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.children.forEach((child, i) => {
                if (child.type === 'Mesh' && nodes[i]) {
                    const scale = 1 + Math.sin(state.clock.elapsedTime * 1.8 + nodes[i].pulse) * 0.15
                    child.scale.setScalar(scale)
                }
            })
        }
    })

    return (
        <group ref={groupRef}>
            {nodes.map((node, i) => (
                <mesh key={`node-${i}`} position={node.pos}>
                    <octahedronGeometry args={[node.size, 0]} />
                    <meshBasicMaterial
                        color={isDark ? '#38bdf8' : '#0284c7'}
                        transparent
                        opacity={isDark ? 0.85 : 0.75}
                    />
                </mesh>
            ))}
            {connections.map((conn, i) => (
                <line key={`conn-${i}`}>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            count={2}
                            array={new Float32Array([...conn.from, ...conn.to])}
                            itemSize={3}
                        />
                    </bufferGeometry>
                    <lineBasicMaterial
                        color={isDark ? '#38bdf8' : '#0284c7'}
                        transparent
                        opacity={isDark ? 0.15 : 0.22}
                    />
                </line>
            ))}
        </group>
    )
}

// Single elegant ring
const FloatingRing = ({ isDark }) => {
    const ringRef = useRef()

    useFrame((state) => {
        if (ringRef.current) {
            ringRef.current.rotation.x = state.clock.elapsedTime * 0.08
            ringRef.current.rotation.z = state.clock.elapsedTime * 0.04
        }
    })

    return (
        <mesh ref={ringRef} position={[7, 2, -12]}>
            <torusGeometry args={[3, 0.02, 16, 64]} />
            <meshBasicMaterial
                color={isDark ? '#a78bfa' : '#7c3aed'}
                transparent
                opacity={isDark ? 0.4 : 0.45}
            />
        </mesh>
    )
}

// Subtle background glow
const BackgroundGlow = ({ isDark }) => {
    const glowRef = useRef()

    useFrame((state) => {
        if (glowRef.current) {
            glowRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 0.4) * 0.03)
        }
    })

    return (
        <mesh ref={glowRef} position={[8, 3, -18]}>
            <sphereGeometry args={[5, 24, 24]} />
            <meshBasicMaterial
                color={isDark ? '#38bdf8' : '#0ea5e9'}
                transparent
                opacity={isDark ? 0.06 : 0.08}
            />
        </mesh>
    )
}

const ThreeScene = () => {
    const [isDark, setIsDark] = useState(true)

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

    return (
        <div className="three-canvas">
            <Canvas
                camera={{ position: [0, 0, 15], fov: 60 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance',
                    stencil: false,
                    depth: true
                }}
                dpr={[1, 1.5]}
                performance={{ min: 0.5 }}
            >
                <TechGrid isDark={isDark} />
                <DataParticles isDark={isDark} />
                <CircuitLines isDark={isDark} />
                <TechNodes isDark={isDark} />
                <FloatingRing isDark={isDark} />
                <BackgroundGlow isDark={isDark} />
                <Hero3D />

                <fog attach="fog" args={[isDark ? '#0f172a' : '#f8fafc', isDark ? 18 : 22, isDark ? 45 : 55]} />
            </Canvas>
        </div>
    )
}

export default ThreeScene
