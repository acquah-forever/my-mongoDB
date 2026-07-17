import { createContext, createElement, useCallback, useContext, useEffect, useState, type ReactNode } from "react"

import type { User } from "../models/user"

import {
    getUser,
    login as loginRequest,
    logout as logoutRequest,
    signUp as signUpRequest,
    type LoginCredentials,
    type SignUpCredentials,
} from "../services/services"

type AuthContextValue = {
    user: User | null
    isLoading: boolean
    login: (credentials: LoginCredentials) => Promise<void>
    signUp: (credentials: SignUpCredentials) => Promise<void>
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const restoreSession = useCallback(async () => {
        try {
            setUser(await getUser())
        } catch {
            setUser(null)
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        void restoreSession()
    }, [restoreSession])

    async function login(credentials: LoginCredentials) {
        setUser(await loginRequest(credentials))
    }

    async function signUp(credentials: SignUpCredentials) {
        setUser(await signUpRequest(credentials))
    }

    async function logout() {
        await logoutRequest()
        setUser(null)
    }

    return createElement(
        AuthContext.Provider,
        { value: { user, isLoading, login, signUp, logout } },
        children,
    )
}

export function useAuth() {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }

    return context
}
