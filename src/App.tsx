import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import {Login} from '../src/pages/Login'
import toast, { Toaster } from "react-hot-toast";
import {CreateAccount} from '../src/pages/CreateAccount'
import {ForgotPassword} from '../src/pages/ForgotPassword'
import {Home} from '../src/pages/Home'
import {Footer} from '../src/components/Footer'


function App() {
  return (
   <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/create-account/:key' element={<CreateAccount/>}/>
          <Route path='/forgot-password/:key' element={<ForgotPassword/>}/>
        </Routes>
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
      <Footer/>
      </Router>
   </>
  )
}

export default App

