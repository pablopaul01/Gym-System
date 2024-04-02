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
import ProgramsTable from '../components/ProgramsTable'
import FormCreateProgram from '../components/FormCreateProgram'

const Programs = ({isLogged, setIsLogged}) => {
    const users = useSelector(state => state.users.users) // Obtenemos los usuarios del estado de Redux
    const dispatch = useDispatch()

  return (
    <DashBoardLayout isLogged={isLogged} setIsLogged={setIsLogged}>

    <div className='h-[100vh] bg-slate-100 flex justify-center w-full flex flex-col px-20 gap-5 items-start'>
    <div className='flex justify-start items-center'>
        <Modal
                btnA={<ActionButton value={`Crear nuevo programa`} />}
                id={1}
              >
                <div className='flex flex-col'>
                  <h3 className='font-bold text-xl text-black'>Crear Programa</h3>
                  <div className='modal-action' method='dialog'>
                    <FormCreateProgram />
                  </div>
                </div>
        </Modal>
    </div>    
        <ProgramsTable />
    </div>
    </DashBoardLayout>
  )
}

export default Programs