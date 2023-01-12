import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { User } from "../../models/user.model";
import { ChatUserContext } from "./UserChatContext";

export const UserChatProvider = ({ children }: { children: JSX.Element }) => {

    const [currentUser, setCurrentUser] = useState<User>()

    useEffect(() => {
        console.log(currentUser)
    }, [currentUser])

    return (
        <ChatUserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </ChatUserContext.Provider>
    );
};
