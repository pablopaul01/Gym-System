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
import { FaPencilAlt } from "react-icons/fa";
import moment from 'moment';
import FormEditExpiration from './FormEditExpiration';
import FormEditCicle from './FormEditCicle';
import ActionButton from './ActionButton';



const ExpirationsTable = ({members}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
    const [pending, setPending] = useState(true)
    const dispatch = useDispatch()
    const estado = useSelector(state => state.members)

    useEffect(() => {
      setFilteredMembers(
          members.filter(
              (member) =>
                  member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  member.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  member.clases?.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
  }, [searchTerm, members]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
};
    
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
          name: 'Dni',
          selector: row => row.dni,
          sortable: true,
          center: "true",
        },
        {
          name: 'Programa',
          selector: row => row.clases?.name,
          sortable: true,
          center: "true",
        },
        {
          name: 'Inicio de ciclo',
          selector: row => 
          <div className='flex justify-center items-center'>
            {moment(row.fecha_inicio_ciclo).format('DD/MM/YYYY')} 
            <Modal
                      btnA={ 
                          <button className="btn btn-ghost btn-sm d-flex align-items-center" title="Editar inicio de ciclo">
                              <FaPencilAlt />
                          </button>
                          }
                      id={row._id+1}
                  >
                      <div className='flex flex-col gap-5'>
                      <h3 className='font-bold text-lg text-black'>Editar inicio de ciclo</h3>
                      <FormEditCicle id={row._id} vencimiento={row.fecha_inicio_ciclo} />
                      </div>
                  </Modal>
          </div>,
          sortable: true,
          center: "true",
        },
        {
          name: 'Vencimiento',
          selector: row => 
            <div className='flex justify-center items-center'>
              {moment(row.proximo_vencimiento).format('DD/MM/YYYY')}
                  <Modal
                      btnA={ 
                          <button className="btn btn-ghost btn-sm d-flex align-items-center" title="Editar Vencimiento">
                              <FaPencilAlt />
                          </button>
                          }
                      id={row._id+2}
                  >
                      <div className='flex flex-col gap-5'>
                      <h3 className='font-bold text-lg text-black'>Editar Vencimiento</h3>
                      <FormEditExpiration id={row._id} vencimiento={row.proximo_vencimiento} />
                      </div>
                  </Modal>
            </div>,
          sortable: true,
          center: "true",
        },
      ];
      const conditionalRowStyles = [
        {
          when: row => moment(row.proximo_vencimiento).isBefore(moment()),
          style: {
            backgroundColor: 'rgba(242, 38, 19, 0.9)', // Rojo
            color: 'white',
            '&:hover': {
              cursor: 'pointer',
            },
          },
        },
        {
          when: row => moment(row.proximo_vencimiento).isBetween(
            moment().startOf('day'), 
            moment().add(5, 'days').endOf('day')
          ),
          style: {
            backgroundColor: 'rgba(255, 235, 59, 0.9)', // Amarillo
            color: 'black',
            '&:hover': {
              cursor: 'pointer',
            },
          },
        },
        {
          when: row => moment(row.proximo_vencimiento).isAfter(moment().add(5, 'days').endOf('day')),
          style: {
            backgroundColor: 'rgba(63, 195, 128, 0.9)', // Verde
            color: 'white',
            '&:hover': {
              cursor: 'pointer',
            },
          },
        },
      ];
      
      const paginationComponentOptions = {
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
    };

    const handleStartDateChange = (date) => {
      setStartDate(date);
    };
    
    const handleEndDateChange = (date) => {
      setEndDate(date);
    };
  
    const handleSearchDate = () => {
      setFilteredMembers(
        members.filter((member) => {
          const paymentDate = moment(member.proximo_vencimiento);
          return (
            (!startDate || paymentDate.isSameOrAfter(startDate, 'day')) &&
            (!endDate || paymentDate.isSameOrBefore(endDate, 'day')) &&
            member.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        })
      );
    };

  return (
    <div className='w-full overflow-x-auto mb-10 rounded-lg shadow-md p-7 bg-white' data-theme='light'>
      <div className='flex w-full items-end gap-2 justify-between mb-10'>
            <input
                type="text"
                placeholder="Buscar por nombre o apellido o programa"
                value={searchTerm}
                onChange={handleSearch}
                className="input input-bordered w-[40%]"
              />
            <div className="flex gap-2 w-50 items-end">
          <div className="w-50">
            <p>Desde</p>
            <label className="input input-bordered flex items-center gap-2" data-theme="light">
              <input
                type="date"
                className="w-full"
                placeholder="Fecha de inicio"
                value={startDate}
                onChange={(e) => handleStartDateChange(e.target.value)}
              />
            </label>
          </div>

          <div className="w-50">
          <p>Hasta</p>
            <label className="input input-bordered flex items-center gap-2" data-theme="light">
              <input
                type="date"
                className="w-full"
                placeholder="Fecha de fin"
                value={endDate}
                onChange={(e) => handleEndDateChange(e.target.value)}
              />
            </label>
          </div>
            <ActionButton accion={handleSearchDate} value="Filtrar Vencimiento" />
        </div>
      </div>
      {estado.isLoading ? 
      (
        <div className="flex mt-3 justify-center mt-4 mb-3">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      )
      :
      (
        <DataTable
        noDataComponent="No hay datos para mostrar"
        columns={columns}
        data={filteredMembers}
        pagination
        pointerOnHover
        paginationComponentOptions={paginationComponentOptions}
        conditionalRowStyles={conditionalRowStyles}
      />
      )
      }

    </div>
  )
}

export default ExpirationsTable