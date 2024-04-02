import React, { useState,useEffect} from 'react'
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { axiosInstance } from '../config/axiosInstance';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import Modal from './Modal';
import { getMembers } from '../store/MemberSlice';
import FormEditMember from './FormEditMember';
import { IoMdEye } from "react-icons/io";
import FormMember from './FormMember';
import { getPrograms } from '../store/ProgramSlice';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';
import FormCreatePayment from './FormCreatePayment';



const MembersTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMembers, setFilteredMembers] = useState([]);
    const [pending, setPending] = useState(true)
    const members = useSelector(state => state.members.members) // Obtenemos los usuarios del estado de Redux
    const estado = useSelector(state => state.members)
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(getPrograms())
    }, [])
    
    useEffect(() => {
        dispatch(getMembers())
        setPending(false)
    }, [])

    useEffect(() => {
      setFilteredMembers(
          members.filter(
              (member) =>
                  member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  member.lastname.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
  }, [searchTerm, members]);
    
    const columns = [
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
          name: 'Dni',
          selector: row => row.dni,
          sortable: true,
          center: "true",
        },
        {
          name: "Acciones",
          selector: row => {
              return (
                  <div className='flex justify-center gap-2'>
                        <Modal
                            btnA={ 
                                <button className="btn btn-outline-light btn-sm d-flex align-items-center" title="Editar">
                                    <FaRegEdit className='t-1'/>
                                </button>
                                }
                            id={row._id+1}
                        >
                            <div className='flex flex-col gap-5'>
                            <h3 className='font-bold text-lg'>Editar Alumno</h3>
                            <FormEditMember id={row._id} name={row.name} lastname={row.lastname} dni={row.dni} whatsapp={row.whatsapp} obraSocial={row.obraSocial} programa={row.clases?._id} />
                            </div>
                        </Modal>

                      <button className="btn btn-danger btn-sm d-flex align-items-center" title="Eliminar"  onClick={() => {handleDelete(row._id)  }}>
                          <FaTrashAlt className='t-1'/>
                      </button>
                      <Modal
                            btnA={ 
                                <button className="btn btn-outline-light btn-sm d-flex align-items-center" title="Ver mas datos">
                                    <IoMdEye size={20}/>
                                </button>
                                }
                            id={row._id+"data"}
                        >
                            <div className='flex flex-col gap-5'>
                            <h3 className='font-bold text-lg'>Ficha del Alumno - {row.name} {row.lastname}</h3>
                            <FormMember id={row._id} name={row.name} lastname={row.lastname} dni={row.dni} whatsapp={row.whatsapp} obraSocial={row.obraSocial} programa={row.programa} proximo_vencimiento={row.proximo_vencimiento} inicioCiclo={row.fecha_inicio_ciclo} 
                            ultimoPago={row?.pagos[row?.pagos.length-1]?.fecha_de_pago} 
                            medioPago={row?.pagos[row?.pagos.length-1]?.medio_de_pago} 
                            montoPago={row?.pagos[row?.pagos.length-1]?.monto} 
                            />
                            </div>
                        </Modal>
                        <Modal
                            btnA={ 
                                <button className="btn btn-outline-light btn-sm d-flex align-items-center" title="Registrar pago">
                                    <RiMoneyDollarCircleFill size={20}/>
                                </button>
                                }
                            id={row._id+"pago"}
                        >
                            <div className='flex flex-col gap-5'>
                            <h3 className='font-bold text-lg'>Cargar Pago</h3>
                            <FormCreatePayment id={row._id}  />
                            </div>
                        </Modal>
                  </div>
              )
          },
          center: "true",
          minWidth: "250px"
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
            await axiosInstance.delete(`/alumno/${id}`)
            toast.success("Alumno eliminado correctamente!",{position:"top-right"});
            dispatch(getMembers())
        } catch (error) {
            console.log(error)
        } finally {

        }
    }

    const handleSearch = (event) => {
      setSearchTerm(event.target.value);
  };

    return (
    <div className='w-full overflow-x-auto mb-10 rounded-lg shadow-md p-7 bg-white' data-theme='light'>
                  <input
                type="text"
                placeholder="Buscar por nombre o apellido"
                value={searchTerm}
                onChange={handleSearch}
                className="input input-bordered mb-5 w-full max-w-xs"
                
            />
      {
        estado.isLoading ? 
        (
          <div className="flex mt-3 justify-center mt-4 mb-3">
            <span className="loading loading-bars loading-lg"></span>
          </div>
          ) : 
          (
            
            <DataTable
                columns={columns}
                data={filteredMembers}
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

export default MembersTable