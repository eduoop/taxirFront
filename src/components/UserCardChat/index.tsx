import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/auth/AuthContext";
import { User } from "../../models/user.model";
import { Conversation } from "../../pages/Messages";
import styles from './styles.module.css'
import { HiUser } from "react-icons/hi"

type Props = {
    conversation: Conversation;
    currentConversation: Conversation | undefined;
    setCurrentConversation: React.Dispatch<React.SetStateAction<Conversation | undefined>>;

    currentFriend: User | undefined
    setCurrentFriend: React.Dispatch<React.SetStateAction<User | undefined>>
}

export const UserCardChat = ({ currentConversation, conversation, setCurrentConversation, currentFriend, setCurrentFriend }: Props) => {
    return (
        <div onClick={() => {
            setCurrentFriend(conversation.user)
            setCurrentConversation(conversation)
        }} className={currentFriend && currentFriend.id === conversation.user.id ? `${styles.user_chat_container_active}` : `${styles.user_chat_container}`}>
            <div className={styles.align_with_header}>
                <div className={styles.user_img}>
                    <HiUser color="#d1d7db" fontSize={25} />
                </div>
                <div className={styles.infos}>
                    <h2>{conversation.user.name}</h2>
                </div>
            </div>
            {currentConversation && currentConversation.id === conversation.id ?
                ''
                :
                <div className={styles.border}></div>
            }
        </div>
    )
}
