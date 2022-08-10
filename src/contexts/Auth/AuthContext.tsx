import { createContext } from 'react'
import { User } from '../../models/user.model'

export type AuthContextType = {
    user: User | null;
    singin: (email: string, password: string) => Promise<boolean>;
    singout: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!)
