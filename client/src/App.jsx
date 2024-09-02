import React, { useState } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Login from './components/login/Login'
import Sign from './components/login/Sign'
import HomePage from './components/HomePage'
import RefreshHandler from './refresh/RefreshHandler'
import 'react-toastify/dist/ReactToastify.css';
import Account from './components/pages/Account'
import Setting from './components/pages/Setting'


const App = () => {
  const isAuthencticated = ()=>{
    return localStorage.getItem('token') !== null;
  }
  const [isAuthencticate, setIsAuthenticate] = useState(false)
  const IsAuth = () => {
    return isAuthencticated() ? <Outlet/> : <Navigate to='/login' />
  }

  return (
    <>
      <RefreshHandler setIsAuthenticate={setIsAuthenticate} />

      <Routes>
        {/* public route */}
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Sign />} />

        {/* private route */}
        
          <Route element={<IsAuth/>}>
          <Route path="/dashboard"  element={ <HomePage />}/>
          <Route path="/setting" element={<Setting />}/>
          <Route path="/account" element={<Account />} />
          
          </Route>

      </Routes>


    </>

  )
}

export default App