import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import toast, { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <div>
     <App />
    <Toaster
        position="bottom-center"
        toastOptions={{
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
   </div>
)
