import React from 'react'
import Sidebar from '../components/Sidebar'

const DashBoardLayout = ({isLogged, setIsLogged,  children}) => {
  return (
    <div className='flex'>
        <Sidebar isLogged={isLogged} setIsLogged={setIsLogged}/>
        {children}
    </div>
  )
}

export default DashBoardLayout