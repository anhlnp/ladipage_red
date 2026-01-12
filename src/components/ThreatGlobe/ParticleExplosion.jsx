import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Particle Explosion Component - burst effect when attack reaches target
const ParticleExplosion = ({ position, color, onComplete }) => {
    const meshRef = useRef()
    const startTime = useRef(null)
    const duration = 0.8 // seconds
    const particleCount = 12
    
    // Create instanced geometry for particles
    const { geometry, positions, velocities, scales } = useMemo(() => {
        const geo = new THREE.SphereGeometry(0.003, 4, 4)
        const pos = []
        const vel = []
        const scl = []
        
        for (let i = 0; i < particleCount; i++) {
            // Random direction on sphere
            const theta = Math.random() * Math.PI * 2
            const phi = Math.acos(2 * Math.random() - 1)
            
            const speed = 0.02 + Math.random() * 0.03
            vel.push(new THREE.Vector3(
                Math.sin(phi) * Math.cos(theta) * speed,
                Math.sin(phi) * Math.sin(theta) * speed,
                Math.cos(phi) * speed
            ))
            
            pos.push(new THREE.Vector3(0, 0, 0))
            scl.push(0.5 + Math.random() * 0.5)
        }
        
        return { geometry: geo, positions: pos, velocities: vel, scales: scl }
    }, [])
    
    // Update particles each frame
    useFrame((state) => {
        if (!meshRef.current) return
        
        if (startTime.current === null) {
            startTime.current = state.clock.elapsedTime
        }
        
        const elapsed = state.clock.elapsedTime - startTime.current
        const progress = elapsed / duration
        
        if (progress >= 1) {
            if (onComplete) onComplete()
            return
        }
        
        // Update each instance
        const matrix = new THREE.Matrix4()
        const posVec = new THREE.Vector3()
        const scaleVec = new THREE.Vector3()
        
        for (let i = 0; i < particleCount; i++) {
            // Move particle outward
            positions[i].add(velocities[i].clone().multiplyScalar(0.016))
            
            posVec.copy(position).add(positions[i])
            
            // Scale down as they move
            const s = scales[i] * (1 - progress * 0.8)
            scaleVec.set(s, s, s)
            
            matrix.compose(posVec, new THREE.Quaternion(), scaleVec)
            meshRef.current.setMatrixAt(i, matrix)
        }
        
        meshRef.current.instanceMatrix.needsUpdate = true
        
        // Fade out
        if (meshRef.current.material) {
            meshRef.current.material.opacity = 1 - progress
        }
    })
    
    // Dispose on unmount
    useEffect(() => {
        return () => {
            if (geometry) geometry.dispose()
        }
    }, [geometry])
    
    return (
        <instancedMesh ref={meshRef} args={[geometry, null, particleCount]}>
            <meshBasicMaterial color={color} transparent opacity={1} />
        </instancedMesh>
    )
}

export default ParticleExplosion
