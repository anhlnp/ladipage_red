import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [session, setSession] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!supabase) {
            setLoading(false)
            return
        }

        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            setUser(session?.user ?? null)
            setLoading(false)
        })

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                setSession(session)
                setUser(session?.user ?? null)
                setLoading(false)
            }
        )

        return () => subscription.unsubscribe()
    }, [])

    // Sign in with email and password
    const signInWithEmail = async (email, password) => {
        if (!supabase) return { data: null, error: { message: 'Supabase not configured' } }
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        return { data, error }
    }

    // Sign out
    const signOut = async () => {
        if (!supabase) return { error: null }
        const { error } = await supabase.auth.signOut()
        return { error }
    }

    // Check if user is admin
    const checkIsAdmin = async (email) => {
        if (!supabase) return false
        const { data, error } = await supabase
            .from('admins')
            .select('id')
            .eq('email', email)
            .eq('is_active', true)
            .single()

        return !error && data
    }

    const value = {
        user,
        session,
        loading,
        signInWithEmail,
        signOut,
        checkIsAdmin,
        supabase,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

