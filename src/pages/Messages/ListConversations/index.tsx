import { useContext, useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { HiUser } from "react-icons/hi";
import { IoClose, IoMenu } from "react-icons/io5";
import { Conversation } from "..";
import { UserCardChat } from "../../../components/UserCardChat";
import { api } from "../../../Config/api";
import { AuthContext } from "../../../context/auth/AuthContext";
import { ChatUserContext } from "../../../context/userChat/UserChatContext";
import { User } from "../../../models/user.model";
import getFirstEndSecondName from "../../../Utils/getFirstEndSecondName";
import styles from './styles.module.css'

type Props = {
    setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>
    conversations: Conversation[];
    setCurrentConversation: React.Dispatch<React.SetStateAction<Conversation | undefined>>;
    currentConversation: Conversation | undefined;

    currentFriend: User | undefined
    setCurrentFriend: React.Dispatch<React.SetStateAction<User | undefined>>

    setNewFriendConversation: React.Dispatch<React.SetStateAction<Conversation | undefined>>
    newFriendConversation: Conversation | undefined
}

export const ListConversations = ({ conversations, setConversations, currentConversation, setCurrentConversation, currentFriend, setCurrentFriend, newFriendConversation, setNewFriendConversation }: Props) => {

    const auth = useContext(AuthContext)
    const userChat = useContext(ChatUserContext);
    const token = localStorage.getItem("authToken")
    const [search, setSearch] = useState("")

    const [newFriend, setNewFriend] = useState<User>()

    useEffect(() => {
        api.get("/conversation", {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            setConversations(res.data)

            if (userChat.currentUser !== undefined) {
                const userInFriend = (res.data.filter((user: { user_id_one: string | undefined; user_id_two: string | undefined; }) => user.user_id_one === userChat.currentUser?.id || user.user_id_two === userChat.currentUser?.id))[0]

                if (userInFriend) {
                    setCurrentConversation(userInFriend)
                    setCurrentFriend(userInFriend.user)
                    userChat.setCurrentUser(undefined)
                } else {
                    setCurrentFriend(userChat.currentUser)
                    setNewFriend(userChat.currentUser)
                    userChat.setCurrentUser(undefined)
                }

            }
        })
    }, [userChat.currentUser])

    const searchConversation = () => {
        api.get(`/conversation?search=${search}`, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            setConversations(res.data)
        })
    }

    useEffect(() => {
        searchConversation()
    }, [search])

    const sub = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    return (
        <div className={styles.list_end_top_container}>

            <div className={styles.top}>
                <div className={styles.top_items}>
                    {auth.user?.avatar?.url ?
                        <img src={auth.user?.avatar?.url} />
                        :
                        <h2>{auth.user && getFirstEndSecondName(auth.user.name)}</h2>
                    }
                    {auth.showNav === true ?
                        <IoClose color="#e6e9ec" fontSize={30} cursor="pointer" onClick={() => auth.setShowNav(!auth.showNav)} />
                        :
                        <IoMenu color="#e6e9ec" fontSize={30} cursor="pointer" onClick={() => auth.setShowNav(!auth.showNav)} />
                    }
                </div>
            </div>

            <div className={styles.list_end_search}>
                <form onSubmit={(e) => sub(e)} className={styles.search}>
                    <div className={styles.input_search}>
                        <div className={styles.search_icon}>
                            <AiOutlineSearch style={{ cursor: "pointer" }} fontSize={20} color="#d1d7db" />
                        </div>
                        <input onChange={(e) => setSearch(e.target.value)} value={search} type="text" placeholder="Pesquisar conversa" />
                    </div>
                </form>

                <div className={styles.list_conversations}>
                    {newFriend &&
                        <div onClick={() => {
                            setCurrentFriend(newFriend)
                            if (newFriendConversation !== undefined) {
                                setCurrentConversation(newFriendConversation)
                            } else {
                                setCurrentConversation(undefined)
                            }
                        }} className={currentFriend && currentFriend.id === newFriend.id ? `${styles.user_chat_container_active}` : `${styles.user_chat_container}`}>
                            <div className={styles.align_with_header}>
                                <div className={styles.user_img}>
                                    <HiUser color="#d1d7db" fontSize={25} />
                                </div>
                                <div className={styles.infos}>
                                    <h2>{newFriend.name}</h2>
                                </div>
                            </div>
                            {currentFriend && currentFriend.id === newFriend.id ?
                                ''
                                :
                                <div className={styles.border}></div>
                            }
                        </div>
                    }
                    {conversations.map((conversation) => (
                        <div onClick={() => {
                            setCurrentFriend(conversation.user)
                            setCurrentConversation(conversation)
                        }} className={currentFriend && currentFriend.id === conversation.user.id ? `${styles.user_chat_container_active}` : `${styles.user_chat_container}`}>
                            <div className={styles.align_with_header}>
                                {!conversation.user.avatar?.url ?
                                    <div className={styles.user_img}>
                                        <HiUser color="#d1d7db" fontSize={25} />
                                    </div>
                                    :
                                    <img style={{ width: "50px", height: "50px", borderRadius: "50%"}} src={conversation.user.avatar?.url} alt="" />
                                 }

                                <div className={styles.infos}>
                                    <h2>{conversation.user.name}</h2>
                                </div>
                            </div>
                            {currentFriend && currentFriend.id === conversation.user.id ?
                                ''
                                :
                                <div className={styles.border}></div>
                            }
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
