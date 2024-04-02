import { useState } from 'react'
import { Toaster } from 'sonner'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import Main from './pages/Main'
import Users from './pages/Users'
import Members from './pages/Members'
import Expirations from './pages/Expirations'
import Programs from './pages/Programs'
import Payments from './pages/Payments'
import PrivateRoutes from './routes/PrivateRoutes'
import RecoverPass from './pages/RecoverPass'
import ResetPass from './pages/ResetPass'
import PrivateLoginRoutes from './routes/PrivateLoginRoutes'

function App() {
  const [isLogged, setIsLogged] = useState(()=>{
    return !!localStorage.getItem('token') || false
  })

  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <>
      <Toaster richColors/>
      <Routes>
        <Route element={<PrivateLoginRoutes/>}>
          <Route path='/' element={<Login setIsLogged={setIsLogged}/>}/>
          <Route path="/recover" element={<RecoverPass/>}/>
          <Route path='/reset_password/:id/:token' element={<ResetPass />} />
        </Route>
        <Route element={<PrivateRoutes/>}>
          <Route path='/main' element={<Main isLogged={isLogged} setIsLogged={setIsLogged}/>}/>
          <Route path='/users' element={<Users isLogged={isLogged} setIsLogged={setIsLogged}/>}/>
          <Route path='/members' element={<Members isLogged={isLogged} setIsLogged={setIsLogged}/>}/>
          <Route path='/expirations' element={<Expirations isLogged={isLogged} setIsLogged={setIsLogged}/>}/>
          <Route path='/programs' element={<Programs isLogged={isLogged} setIsLogged={setIsLogged}/>}/>
          <Route path='/payments' element={<Payments isLogged={isLogged} setIsLogged={setIsLogged}/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
