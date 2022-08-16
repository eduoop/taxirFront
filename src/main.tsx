import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { AuthProvider } from "../src/context/auth/AuthProvider";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <div>
    <AuthProvider>
     <App />
  </AuthProvider>
   </div>
)
