import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { AuthProvider } from "../src/context/auth/AuthProvider";
import { UserChatProvider } from "../src/context/userChat/UserChatProvider";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <div>
      <UserChatProvider>
         <AuthProvider>
            <App />
         </AuthProvider>
      </UserChatProvider>
   </div>
)
