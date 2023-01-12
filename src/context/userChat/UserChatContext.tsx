import { createContext } from 'react'
import { User } from '../../models/user.model'

export type ChatUserContextType = {
    currentUser: User | undefined;
    setCurrentUser:React.Dispatch<React.SetStateAction<User | undefined>>;
}

export const ChatUserContext = createContext<ChatUserContextType>(null!)