import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

// Available color themes
const COLOR_THEMES = [
    { name: 'cyan', label: 'Cyan Blue', emoji: '💎' },
    { name: 'red', label: 'Ruby Red', emoji: '🔴' },
    { name: 'purple', label: 'Royal Purple', emoji: '💜' },
    { name: 'green', label: 'Emerald Green', emoji: '💚' },
    { name: 'gold', label: 'Golden Yellow', emoji: '🌟' },
]

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}

export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(() => {
        // Check localStorage or system preference
        const saved = localStorage.getItem('theme')
        if (saved) return saved === 'dark'
        return window.matchMedia('(prefers-color-scheme: dark)').matches
    })

    const [colorTheme, setColorTheme] = useState(() => {
        // Check localStorage for saved color theme
        const saved = localStorage.getItem('colorTheme')
        return saved || 'cyan'
    })

    useEffect(() => {
        // Apply dark/light theme to document
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
        localStorage.setItem('theme', isDark ? 'dark' : 'light')
    }, [isDark])

    useEffect(() => {
        // Apply color theme to document
        document.documentElement.setAttribute('data-color-theme', colorTheme)
        localStorage.setItem('colorTheme', colorTheme)
    }, [colorTheme])

    const toggleTheme = () => setIsDark(prev => !prev)

    // Cycle through color themes
    const cycleColorTheme = () => {
        setColorTheme(prev => {
            const currentIndex = COLOR_THEMES.findIndex(t => t.name === prev)
            const nextIndex = (currentIndex + 1) % COLOR_THEMES.length
            return COLOR_THEMES[nextIndex].name
        })
    }

    // Get current theme info
    const getCurrentColorTheme = () => {
        return COLOR_THEMES.find(t => t.name === colorTheme) || COLOR_THEMES[0]
    }

    return (
        <ThemeContext.Provider value={{
            isDark,
            toggleTheme,
            colorTheme,
            cycleColorTheme,
            getCurrentColorTheme,
            colorThemes: COLOR_THEMES
        }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContext

