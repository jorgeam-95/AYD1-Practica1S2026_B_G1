import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from '../Modulos/Login/login.jsx'
import Home from '../Modulos/Home/home.jsx'
import Registrarse from '../Modulos/Resitro/Resitrarse.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} /> 
        <Route path='/home/:usuario' element={ <Home /> } ></Route>
        <Route path='/registro' element={<Registrarse />} /> 
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
