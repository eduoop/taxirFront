import { useContext, useState, useEffect, useRef } from "react";
import { IoMenu, IoSend } from "react-icons/io5";
import { Conversation } from "..";
import { api } from "../../../Config/api";
import { AuthContext } from "../../../context/auth/AuthContext";
import styles from './styles.module.css'
import { io } from "socket.io-client"
import { User } from "../../../models/user.model";

type Props = {
  setCurrentConversation: React.Dispatch<React.SetStateAction<Conversation | undefined>>;
  currentConversation: Conversation | undefined;
  curentFriend: User;
  newFriendConversation: Conversation | undefined;
}

export type Message = {
  id: number;
  content: string;
  user_id: number;
  conversation_id: number;
  created_at: string;
  updated_at: string;
}

export const Chat = ({ currentConversation, setCurrentConversation, curentFriend, newFriendConversation }: Props) => {

  const token = localStorage.getItem("authToken")
  const auth = useContext(AuthContext)

  const [messages, setMessages] = useState<Message[]>([])
  const [message, setMessage] = useState("")
  const [count, setCount] = useState(0)
  const messageRef = useRef<any>(null)
  const messageContainerRef = useRef<any>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const socket = io("http://127.0.0.1:3333");

  const getMessages = () => {
    api.get(`/conversation/${currentConversation?.id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setMessages(res.data.messages)
      })
  }

  useEffect(() => {
    setMessages([])
    getMessages()

    socket.emit("create", `room-${currentConversation?.id}`)
    socket.on("newMessage", (message: Message) => {
      if (messages && message) {
        setMessages((oldMessages) => [...oldMessages, message])
        console.log(message)
      } else {
        setMessages((oldMessages) => [...oldMessages, message])
      }
      console.log(message)
    })
  }, [currentConversation])

  const getTimeOfMessage = (fullTimeWithDay: string) => {
    if (fullTimeWithDay) {
      const justHour = fullTimeWithDay.split("T")[1]
      const filterHour = `${justHour.split(":")[0]}:${justHour.split(":")[1]}`
      return filterHour
    }
  }

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (message.trim()) {
      api.post(`/messages`, {
        content: message,
        receiverId: curentFriend.id
      }, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
        .then(async (res) => {
          setMessage('')
          addalueCount()

          if (currentConversation === undefined) {
            api.get(`/conversation/${res.data.conversation_id}`, {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            })
              .then((res) => {
                setMessages(res.data.messages)
              })
          }
        })
    }
  }

  const addalueCount = () => {
    const nn = count + 1
    setCount(nn)
  }

  useEffect(() => {
    if (messageRef.current && messageContainerRef) {
      messageContainerRef.current.scrollTo(0, messageRef.current.offsetTop)
      inputRef.current?.focus()
      scrollTo(0, 80)
    }
  }, [messages, count]);

  useEffect(() => {
    getMessages()
  }, [newFriendConversation])

  useEffect(() => {
    setMessage("")
  }, [curentFriend])

  return (
    <div className={styles.chat_container}>
      <div className={styles.chat_header}>
        <h2>{curentFriend.name}</h2>
      </div>
      <div className={styles.chat}>
        <div className={styles.list_messages} ref={messageContainerRef}>
          {messages.map((message, index) => (
            message.user_id === auth.user?.id ?
              <div key={message.id} ref={messageRef} className={index === 0 ? `${styles.my_message_container} ${styles.ma_tp_one_em}` : `${styles.my_message_container} ${styles.ma_tp_tree_em}`}>
                <div className={styles.my_message}>
                  <h2>{message.content}</h2>
                  <small>{getTimeOfMessage(message.created_at)}</small>
                </div>
              </div>
              :
              <div key={message.id} ref={messageRef} className={index === 0 ? `${styles.other_message_container} ${styles.ma_tp_one_em}` : `${styles.other_message_container} ${styles.ma_tp_tree_em}`} >
                <div className={styles.other_message}>
                  <h2>{message.content}</h2>
                  <small>{getTimeOfMessage(message.created_at)}</small>
                </div>
              </div>
          ))}
        </div>
        <form onSubmit={(e) => sendMessage(e)}>
          <input ref={inputRef} type="text" placeholder="Digite uma mensagem" value={message} onChange={(e) => setMessage(e.target.value)} />
          <button><IoSend color="#7c8b95" fontSize={30} /></button>
        </form>
      </div>
    </div>
  )
}
