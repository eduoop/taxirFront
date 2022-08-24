import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import {Login} from '../src/pages/Login'
import toast, { Toaster } from "react-hot-toast";
import {CreateAccount} from '../src/pages/CreateAccount'
import {ForgotPassword} from '../src/pages/ForgotPassword'
import {Home} from '../src/pages/Home'
import {Footer} from '../src/components/Footer'
import {Travels} from '../src/pages/Travels'
import {Nav} from '../src/components/Nav'

function App() {

  const [currentNav, setCurrentNav] = useState('')

  return (
   <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/travels' element={<Travels/>}/>
          <Route path='/create-account/:key' element={<CreateAccount/>}/>
          <Route path='/forgot-password/:key' element={<ForgotPassword/>}/>
        </Routes>
        <div className='not_hide'>
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
        <Nav currentNav={currentNav} setCurrentNav={setCurrentNav}/>
      <Footer/>
      </Router>
   </>
  )
}

export default App

