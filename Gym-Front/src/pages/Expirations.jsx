import React, { useEffect,useState } from 'react'
import DashBoardLayout from './DashBoardLayout'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../components/Modal'
import ActionButton from '../components/ActionButton'
import MembersTable from '../components/MembersTable'
import FormCreateMember from '../components/FormCreateMember'
import ExpirationsTable from '../components/ExpirationsTable'
import { getMembers } from '../store/MemberSlice'
import moment from 'moment'


const Expirations = ({isLogged, setIsLogged}) => {
  const [pending, setPending] = useState(true)
  const [filteredMembers, setFilteredMembers] = useState([])
  const members = useSelector(state => state.members.members) // Obtenemos los usuarios del estado de Redux
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(getMembers())
      setPending(false)
  }, [])

  useEffect(() => {
    if (members.length > 0) {
        setFilteredMembers(members);
        setPending(false);
    }
}, [members]);

  const handleVerVencidos = () => {
    const today = moment()
    const filtered = members.filter(member => moment.utc(member.proximo_vencimiento) < today)
    setFilteredMembers(filtered)
  }

  const handleProximosAVencer = () => {
    const filtered = members.filter(member => moment.utc(member.proximo_vencimiento).isBetween(moment(), moment().add(5, 'days').endOf('day')))
    setFilteredMembers(filtered)
  }

  
  return (
    <DashBoardLayout isLogged={isLogged} setIsLogged={setIsLogged}>

    <div className='h-[100vh] bg-slate-100 flex justify-center w-full flex flex-col px-20 gap-5 items-start'>
    <div className='flex justify-start items-center'>
      <div className='flex w-full gap-5'>
        <div>
          <ActionButton value={"Ver todos"} accion={()=>setFilteredMembers(members)} />
        </div>
        <div>
          <ActionButton value={"Ver Vencidos"} accion={handleVerVencidos}>vencidos</ActionButton>
        </div>
        <div>
          <ActionButton value={"Ver proximos a vencer"} accion={handleProximosAVencer}/>
        </div>
      </div>

        {/* <Modal
                btnA={<ActionButton value={`Cargar alumno nuevo`} />}
                id={1}
              >
                <div className='flex flex-col'>
                  <h3 className='font-bold text-xl text-black'>Agregar alumno</h3>
                  <div className='modal-action' method='dialog'>
                    <FormCreateMember />
                  </div>
                </div>
        </Modal> */}
    </div>    
    <ExpirationsTable members={filteredMembers} />

    </div>
    </DashBoardLayout>
  )
}

export default Expirations