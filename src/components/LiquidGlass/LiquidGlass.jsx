/**
 * LiquidGlass - A reusable liquid glass effect component
 * Uses CSS backdrop-filter for frosted glass effect
 * No external dependencies needed - pure CSS glassmorphism
 */
const LiquidGlass = ({ className = '', children }) => {
    return (
        <div className={`liquid-glass ${className}`}>
            {children}
        </div>
    )
}

export default LiquidGlass
