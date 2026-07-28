import { createContext, useContext, useState, type ReactNode } from 'react'

export type UserType = 'particular' | 'empresa'

const USER_TYPE_KEY = 'nexo3d_user_type'

interface UserTypeContextValue {
    userType: UserType | null
    setUserType: (type: UserType) => void
    clearUserType: () => void
}

const UserTypeCtx = createContext<UserTypeContextValue | null>(null)

function loadUserType(): UserType | null {
    const v = localStorage.getItem(USER_TYPE_KEY)
    return v === 'particular' || v === 'empresa' ? v : null
}

export function UserTypeProvider({ children }: { children: ReactNode }) {
    const [userType, setUserTypeState] = useState<UserType | null>(loadUserType)

    function setUserType(type: UserType) {
        localStorage.setItem(USER_TYPE_KEY, type)
        setUserTypeState(type)
    }

    function clearUserType() {
        localStorage.removeItem(USER_TYPE_KEY)
        setUserTypeState(null)
    }

    return (
        <UserTypeCtx.Provider value={{ userType, setUserType, clearUserType }}>
            {children}
        </UserTypeCtx.Provider>
    )
}

export function useUserType() {
    const ctx = useContext(UserTypeCtx)
    if (!ctx) throw new Error('useUserType must be inside UserTypeProvider')
    return ctx
}
