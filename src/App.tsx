import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import {Login} from '../src/pages/Login'
import {CreateAccount} from '../src/pages/CreateAccount'
import {ForgotPassword} from '../src/pages/ForgotPassword'

function App() {
  return (
   <>
      <Router>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/create-account/:key' element={<CreateAccount/>}/>
          <Route path='/forgot-password/:key' element={<ForgotPassword/>}/>
        </Routes>
      </Router>
   </>
  )
}

export default App

