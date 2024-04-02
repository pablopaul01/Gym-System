import React, { useEffect,useState } from 'react'
import DashBoardLayout from './DashBoardLayout'

import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../store/UserSlice'
import UsersTable from '../components/UsersTable'
import Modal from '../components/Modal'
import ActionButton from '../components/ActionButton'
import FormCreateUser from '../components/FormCreateUser'
import MembersTable from '../components/MembersTable'
import FormCreateMember from '../components/FormCreateMember'
import PaymentsTable from '../components/PaymentsTable'
import FormCreatePayment from '../components/FormCreatePayment'


const Payments = ({isLogged, setIsLogged}) => {
    const users = useSelector(state => state.users.users) // Obtenemos los usuarios del estado de Redux
    const dispatch = useDispatch()

  return (
    <DashBoardLayout isLogged={isLogged} setIsLogged={setIsLogged}>

    <div className='min-h-[100vh] bg-slate-100 flex justify-center w-full flex flex-col px-20 gap-5 items-start'>
   
      <PaymentsTable />
    </div>
    </DashBoardLayout>
  )
}

export default Payments