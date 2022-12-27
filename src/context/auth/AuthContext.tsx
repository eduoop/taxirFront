import { createContext } from 'react'
import { User } from '../../models/user.model'

export type AuthContextType = {
    user: User | null;
    signin: (email: string, password: string) => Promise<boolean>;
    singout: (token: string | null) => void;
    refreshContex: () => void
}

export const AuthContext = createContext<AuthContextType>(null!)
