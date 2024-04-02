import React, { useState,useEffect} from 'react'
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { axiosInstance } from '../config/axiosInstance';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import Modal from './Modal';
import FormEditMember from './FormEditMember';
import { getPrograms } from '../store/ProgramSlice';
import FormEditProgram from './FormEditProgram';


const ProgramsTable = () => {
    const [pending, setPending] = useState(true)
    const programs = useSelector(state => state.programs.programs) // Obtenemos los usuarios del estado de Redux
    const estado = useSelector(state => state.programs)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPrograms())
        setPending(false)
    }, [])
    
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
          name: 'Precio',
          selector: row => <p>${row.price}</p>,
          sortable: true,
          center: "true",
        },
        {
          name: "Acciones",
          selector: row => {
              return (
                  <div className='flex gap-2'>
                        <Modal
                            btnA={ 
                                <button className="btn btn-outline-light btn-sm d-flex align-items-center " title="Editar">
                                    <FaRegEdit className='t-1'/>
                                </button>
                                }
                            id={row._id+1}
                        >
                            <div className='flex flex-col gap-5'>
                            <h3 className='font-bold text-lg'>Editar Alumno</h3>
                            <FormEditProgram id={row._id} name={row.name} price={row.price}  />
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
        try {
            await axiosInstance.delete(`/programa/${id}`)
            toast.success("Programa eliminado correctamente!",{position:"top-right"});
            dispatch(getPrograms())
        } catch (error) {
            console.log(error)
        } finally {

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
              data={programs}
              pagination
              highlightOnHover
              pointerOnHover
              paginationComponentOptions={paginationComponentOptions}
              progressPending={pending}
            />
        )
      }
    </div>
  )
}

export default ProgramsTable