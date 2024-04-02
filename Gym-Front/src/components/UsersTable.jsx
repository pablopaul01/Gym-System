import React, { useState,useEffect} from 'react'
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { ImBlocked } from "react-icons/im";
import { MdAudiotrack } from "react-icons/md";
import { axiosInstance } from '../config/axiosInstance';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../store/UserSlice';
import Modal from './Modal';
import FormEditUser from './FormEditUser';
import { jwtDecode } from 'jwt-decode';


const UsersTable = () => {
    const [pending, setPending] = useState(true)
    const users = useSelector(state => state.users.users) // Obtenemos los usuarios del estado de Redux
    const estado = useSelector(state => state.users)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers())
        setPending(false)
    }, [])
    
    const checkUserLogin = (id) =>{
      const decode = jwtDecode(localStorage.getItem("token"))
      if(decode.sub === id){
        return true
      }
      else {
        return false
      }
    }
    
    const columns = [
        {
          name: '#',
          selector: (row, index) => index+1,
          width: "fit-content",
        },
        {
          name: 'Nombre',
          selector: row => row.name,
          sortable: true,
          center: "true",
        },
        {
          name: 'Apellido',
          selector: row => row.lastname,
          sortable: true,
          center: "true",
        },
        {
          name: 'Email',
          selector: row => row.email,
          sortable: true,
          center: "true",
        },
        {
          name: "Acciones",
          selector: row => {
              return (
                  <div style={{ display: "flex", gap: "5px", justifyContent: "center" , minWidth: "150px"}}>
                        <Modal
                            btnA={ 
                                <button className="btn btn-outline-light btn-sm d-flex align-items-center " title="Editar">
                                    <FaRegEdit className='t-1'/>
                                </button>
                                }
                            id={row._id+1}
                        >
                            <div className='flex flex-col gap-5'>
                            <h3 className='font-bold text-lg'>Editar Usuario</h3>
                            <FormEditUser id={row._id} name={row.name} lastname={row.lastname} email={row.email}/>
                            </div>
                        </Modal>

                      <button className="btn btn-danger btn-sm d-flex align-items-center" title="Eliminar"  onClick={() => {handleDelete(row._id)  }}><FaTrashAlt className='t-1'/></button>
                  </div>
              )
          },
          center: "true",
      }
      ];

      const paginationComponentOptions = {
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
    };

    const handleDelete = async (id) => {
      if (checkUserLogin(id)) {
        toast.error("No puedes eliminar a ti mismo!",{position:"top-right"});
      }
      else{
        try {
            await axiosInstance.delete(`/usuario/${id}`)
            toast.success("Usuario eliminado correctamente!",{position:"top-right"});
            dispatch(getUsers())
        } catch (error) {
            console.log(error)
        } finally {

        }
      }
    }

  return (
    <div className='w-full overflow-x-auto mb-10 rounded-lg shadow-md p-7 bg-white' data-theme='light'>
      {
        estado.isLoading ?
        (
          <div className="flex mt-3 justify-center mt-4 mb-3">
            <span className="loading loading-bars loading-lg"></span>
          </div>
        )
          :
        (

          <DataTable
            columns={columns}
            data={users}
              pagination
              highlightOnHover
            pointerOnHover
              paginationComponentOptions={paginationComponentOptions}
              // progressPending={pending}
          />
        )

      }
    </div>
  )
}

export default UsersTable