import { createContext } from 'react'
import { User } from '../../models/user.model'

export type AuthContextType = {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    signin: (email: string, password: string) => Promise<boolean>;
    singout: (token: string | null) => void;
    refreshContex: () => void;
    nav: string;
    setNav: React.Dispatch<React.SetStateAction<string>>;

    showNav: boolean;
    setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType>(null!)
