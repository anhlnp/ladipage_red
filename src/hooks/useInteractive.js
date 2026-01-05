import { useRef, useCallback } from 'react'

/**
 * Hook for magnetic button/element effect
 * Element follows cursor when hovering
 */
export const useMagnetic = (strength = 0.3) => {
    const elementRef = useRef(null)

    const handleMouseMove = useCallback((e) => {
        const element = elementRef.current
        if (!element) return

        const rect = element.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const deltaX = (e.clientX - centerX) * strength
        const deltaY = (e.clientY - centerY) * strength

        element.style.transform = `translate(${deltaX}px, ${deltaY}px)`
    }, [strength])

    const handleMouseLeave = useCallback(() => {
        const element = elementRef.current
        if (!element) return
        element.style.transform = 'translate(0, 0)'
    }, [])

    return { elementRef, handleMouseMove, handleMouseLeave }
}

/**
 * Hook for 3D tilt effect on cards
 * Card tilts based on cursor position
 */
export const useTilt = (maxTilt = 10, perspective = 1000) => {
    const elementRef = useRef(null)

    const handleMouseMove = useCallback((e) => {
        const element = elementRef.current
        if (!element) return

        const rect = element.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const rotateX = ((y - centerY) / centerY) * -maxTilt
        const rotateY = ((x - centerX) / centerX) * maxTilt

        element.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    }, [maxTilt, perspective])

    const handleMouseLeave = useCallback(() => {
        const element = elementRef.current
        if (!element) return
        element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    }, [])

    return { elementRef, handleMouseMove, handleMouseLeave }
}

/**
 * Hook for spotlight/glow effect following cursor
 */
export const useSpotlight = () => {
    const elementRef = useRef(null)

    const handleMouseMove = useCallback((e) => {
        const element = elementRef.current
        if (!element) return

        const rect = element.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        element.style.setProperty('--spotlight-x', `${x}px`)
        element.style.setProperty('--spotlight-y', `${y}px`)
    }, [])

    return { elementRef, handleMouseMove }
}

/**
 * Hook for ripple effect on click
 */
export const useRipple = () => {
    const createRipple = useCallback((e) => {
        const button = e.currentTarget
        const rect = button.getBoundingClientRect()

        const ripple = document.createElement('span')
        ripple.className = 'ripple-effect'

        const size = Math.max(rect.width, rect.height)
        ripple.style.width = ripple.style.height = `${size}px`
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`

        button.appendChild(ripple)

        setTimeout(() => {
            ripple.remove()
        }, 600)
    }, [])

    return { createRipple }
}

export default { useMagnetic, useTilt, useSpotlight, useRipple }
