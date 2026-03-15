import { useRef, useCallback } from 'react'

const MagneticButton = ({ children, className, onClick, strength = 0.3 }) => {
    const buttonRef = useRef(null)

    const handleMouseMove = useCallback((e) => {
        const button = buttonRef.current
        if (!button) return

        const rect = button.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const deltaX = (e.clientX - centerX) * strength
        const deltaY = (e.clientY - centerY) * strength

        button.style.transform = `translate(${deltaX}px, ${deltaY}px)`
    }, [strength])

    const handleMouseLeave = useCallback(() => {
        const button = buttonRef.current
        if (!button) return
        button.style.transform = 'translate(0, 0)'
    }, [])

    // Ripple effect on click
    const handleClick = useCallback((e) => {
        const button = buttonRef.current
        if (!button) return

        const rect = button.getBoundingClientRect()
        const ripple = document.createElement('span')
        ripple.className = 'ripple-effect'

        const size = Math.max(rect.width, rect.height)
        ripple.style.width = ripple.style.height = `${size}px`
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`

        button.appendChild(ripple)
        setTimeout(() => ripple.remove(), 600)

        if (onClick) onClick(e)
    }, [onClick])

    return (
        <button
            ref={buttonRef}
            className={`${className} magnetic-btn ripple-container btn-lift`}
            onClick={handleClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </button>
    )
}

export default MagneticButton
