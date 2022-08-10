import { useEffect, useState } from 'react'
import { useApi } from '../../hooks/useApi'
import { User } from '../../models/user.model'
import {AuthContext} from './AuthContext'

export const AuthProvider = ({ children }: { children: JSX.Element}) => {

    const [user, setUser] = useState<User | null>(null)
    const api = useApi()

    useEffect(() => {
        const recoverdUser = localStorage.getItem("user")

        if(recoverdUser) {
            setUser(JSON.parse(recoverdUser))
        }
    }, [])

    const singin = async (email: string, password: string) => {
        const data = await api.singin(email, password)
        if(data.user && data.token) {
            setUser(data.user[0])
        
            const loggedUser = data.user
            setToken(data.token.token)

            localStorage.setItem('user', JSON.stringify(loggedUser))

            return true
        }
        return false
    }

    const setToken = (token: string) => {
        localStorage.setItem('authToken', token)
    }

    const singout = async () => {
        await api.logout()
        localStorage.removeItem("user")
        setToken('')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, singin, singout }}>
            {children}    
        </AuthContext.Provider>
    )
}