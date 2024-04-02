import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import { getMembers } from "../store/MemberSlice";
import FormEditMember from "./FormEditMember";
import { IoMdEye } from "react-icons/io";
import FormMember from "./FormMember";
import { getPrograms } from "../store/ProgramSlice";
import { getPayments } from "../store/PaymentsSlice";
import moment from "moment";
import ActionButton from "./ActionButton";
import FormEditPayment from "./FormEditPayment";

const PaymentsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [pending, setPending] = useState(true);
  const payments = useSelector((state) => state.payments.payments); // Obtenemos los usuarios del estado de Redux
  const estado = useSelector((state) => state.payments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPayments());
    setPending(false);
  }, []);

  useEffect(() => {
    setFilteredPayments(
      payments.filter(
        (payment) =>
          payment.alumno?.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          payment.alumno?.lastname
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, payments]);

  const columns = [
    {
      id: "fecha_de_pago",
      name: "Fecha",
      selector: (row) => moment(row.fecha_de_pago).format("DD/MM/YYYY"),
      sortable: true,
      center: "true",
    },
    {
      name: "Monto",
      selector: (row) => row.monto,
      sortable: true,
      center: "true",
    },
    {
      name: "Medio",
      selector: (row) => row.medio_de_pago,
      sortable: true,
      center: "true",
    },
    {
      name: "comprobante",
      selector: (row) => (
        <a href={row.comprobante} target="blank">
          {row.comprobante ? "Ver Comprobante" : ""}
        </a>
      ),
      sortable: true,
      center: "true",
    },
    {
      name: "Alumno",
      selector: (row) => (
        <div>
          {row.alumno.name} {row.alumno.lastname}
        </div>
      ),
      sortable: true,
      center: "true",
    },
    {
      name: "Acciones",
      selector: (row) => {
        return (
          <div className="flex justify-center gap-2">
            <Modal
              btnA={
                <button
                  className="btn btn-outline-light btn-sm d-flex align-items-center"
                  title="Editar"
                >
                  <FaRegEdit className="t-1" />
                </button>
              }
              id={row._id + "editPayment"}
            >
              <div className="flex flex-col gap-5">
                <h3 className="font-bold text-lg">Editar Pago</h3>
                <FormEditPayment
                  id={row._id}
                  fecha_de_pago={row.fecha_de_pago}
                  monto={row.monto}
                  medio_de_pago={row.medio_de_pago}
                />
              </div>
            </Modal>

            <button
              className="btn btn-danger btn-sm d-flex align-items-center"
              title="Eliminar"
              onClick={() => {
                handleDelete(row.alumno._id, row._id);
              }}
            >
              <FaTrashAlt className="t-1" />
            </button>
          </div>
        );
      },
      center: "true",
    },
  ];

  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  const handleDelete = async (id, pagoId) => {
    try {
      await axiosInstance.delete(`/pago/${id}/${pagoId}`,pagoId);
      toast.success("Pago eliminado correctamente!", {
        position: "top-right",
      });
      dispatch(getPayments());
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };
  
  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleSearchDate = () => {
    setFilteredPayments(
      payments.filter((payment) => {
        const paymentDate = moment(payment.fecha_de_pago);
        return (
          (!startDate || paymentDate.isSameOrAfter(startDate, 'day')) &&
          (!endDate || paymentDate.isSameOrBefore(endDate, 'day')) &&
          payment.alumno?.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    );
  };
  

  return (
    <div
      className="w-full overflow-x-auto mb-10 rounded-lg shadow-md p-7 bg-white"
      data-theme="light"
    >

      <div className="flex gap-2 justify-between items-end mb-10 px-5">
        <input
          type="text"
          placeholder="Buscar por nombre o apellido"
          value={searchTerm}
          onChange={handleSearch}
          className="input input-bordered w-full max-w-xs"
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
            <ActionButton accion={handleSearchDate} value="Filtrar" />
        </div>
      </div>
      {estado.isLoading ? (
        <div className="flex mt-3 justify-center mt-4 mb-3">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={filteredPayments}
          pagination
          highlightOnHover
          pointerOnHover
          paginationComponentOptions={paginationComponentOptions}
          defaultSortAsc={false}
          defaultSortFieldId="fecha_de_pago"
          // progressPending={pending}
        />
      )}
    </div>
  );
};

export default PaymentsTable;
