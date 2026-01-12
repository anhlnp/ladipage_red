import { useRef, useMemo, useEffect, memo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { impactRippleVertexShader, impactRippleFragmentShader } from './shaders'

// Impact Ripple Component - expanding ring effect at impact point
const ImpactRipple = memo(({ position, color, spawnTime }) => {
    const meshRef = useRef()
    const materialRef = useRef()
    const spawnOffset = useRef((Date.now() - (spawnTime || Date.now())) / 1000)
    
    // Calculate rotation to face outward from globe center (0,0,0)
    const rotation = useMemo(() => {
        const pos = position instanceof THREE.Vector3 ? position : new THREE.Vector3(...position)
        // Create a quaternion that makes the plane face outward from center
        const quaternion = new THREE.Quaternion()
        // The plane's normal is (0,0,1), we want it to point in the direction of pos
        const up = new THREE.Vector3(0, 0, 1)
        const dir = pos.clone().normalize()
        quaternion.setFromUnitVectors(up, dir)
        const euler = new THREE.Euler().setFromQuaternion(quaternion)
        return [euler.x, euler.y, euler.z]
    }, [position])
    
    // Create stable uniforms once
    const uniforms = useMemo(() => ({
        uColor: { value: new THREE.Color(color) },
        uTime: { value: 0 },
        uDuration: { value: 2.0 },
        uRings: { value: 3.0 }
    }), [])

    // Update color when prop changes
    useEffect(() => {
        if (materialRef.current) {
            materialRef.current.uniforms.uColor.value.set(color)
        }
    }, [color])

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime + spawnOffset.current
        }
    })

    // Dispose on unmount
    useEffect(() => {
        return () => {
            if (meshRef.current?.geometry) {
                meshRef.current.geometry.dispose()
            }
            if (materialRef.current) {
                materialRef.current.dispose()
            }
        }
    }, [])

    return (
        <mesh ref={meshRef} position={position} rotation={rotation}>
            <planeGeometry args={[0.15, 0.15]} />
            <shaderMaterial
                ref={materialRef}
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                side={THREE.DoubleSide}
                uniforms={uniforms}
                vertexShader={impactRippleVertexShader}
                fragmentShader={impactRippleFragmentShader}
            />
        </mesh>
    )
})

export default ImpactRipple
