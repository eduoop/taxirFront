import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/auth/AuthContext";
import { ChatUserContext } from "../../context/userChat/UserChatContext";
import { User } from "../../models/user.model";
import { Chat } from "./Chat";
import { ListConversations } from "./ListConversations";
import styles from './styles.module.css'

export type Conversation = {
  id: number;
  user_id_one: number;
  user_id_two: number;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    name: string;
    role: string;
    phone: string;
    email: string;
    remember_me_token: null,
    performed_travels: number;
    created_at: string;
    updated_at: string;
  }
}

export const Messages = () => {

  const authContext = useContext(AuthContext);
  const userChat = useContext(ChatUserContext);

  const [conversations, setConversations] = useState<Conversation[]>([])
  const [currentConversation, setCurrentConversation] = useState<Conversation>()
  const [currentFriend, setCurrentFriend] = useState<User>()
  const [newFriendConversation, setNewFriendConversation] = useState<Conversation>()


  useEffect(() => {
    authContext.setNav("messages")
    authContext.setShowNav(false)
  }, [])

  useEffect(() => {
    authContext.setShowNav(false)
  }, [currentFriend])

  return (
    <div className={styles.messages_container}>
      <ListConversations newFriendConversation={newFriendConversation} setNewFriendConversation={setNewFriendConversation} currentConversation={currentConversation} setCurrentConversation={setCurrentConversation} conversations={conversations} setConversations={setConversations} currentFriend={currentFriend} setCurrentFriend={setCurrentFriend}/>
      {currentFriend ?
        <Chat newFriendConversation={newFriendConversation} curentFriend={currentFriend} currentConversation={currentConversation} setCurrentConversation={setCurrentConversation} />
        :
        <div style={{ width: "100%", height: "100vh", backgroundColor: "#111b21"}}></div>
      }
    </div>
  )
}
