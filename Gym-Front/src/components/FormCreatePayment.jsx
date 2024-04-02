import React, {useState} from 'react'
import ActionButton from './ActionButton'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { axiosInstance } from '../config/axiosInstance'
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { RiBankFill } from "react-icons/ri";
import moment from 'moment'
import { getPayments } from '../store/PaymentsSlice'
import { REGISTERPAYMENT_SCHEMA } from '../helpers/validationSchemas'

const FormCreatePayment = ({id}) => {
    const [loading, setLoading] = useState(false);
    const [comprobante, setComprobante] = useState(null);

    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
      resolver: yupResolver(REGISTERPAYMENT_SCHEMA)
  })

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            data.alumno = id;
            // Obtener la fecha seleccionada en el input date
            const fechaSeleccionada = moment(data.fecha);
            // Convertir la fecha a la zona horaria de Argentina (GMT-0300) y establecer la hora a las 23:59
            const fechaArgentina = fechaSeleccionada.utcOffset(-180).format('YYYY-MM-DDTHH:mm:ssZ');
            // Actualizar el valor de la fecha en los datos a enviar
            data.fecha = fechaArgentina;
            const formData = new FormData();
            formData.append('comprobante', comprobante);
            formData.append('fecha', data.fecha);
            formData.append('monto', data.monto);
            formData.append('medio', data.medio);
            formData.append('alumno', data.alumno);
            const response = await axiosInstance.post("/pago", formData, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          })
            toast.success("Pago cargado correctamente!",{position:"top-right"});
            dispatch(getPayments())
        } catch (error) {
            console.log(error)
            toast.error("Ocurroió un problema! Intentelo más tarde.",{position:"top-right"})
        } finally {
            document.getElementById(`modal_${id}pago`).close()
            setLoading(false); 
            reset();
        }
    }


    const handleFileChange = (event) => {
      setComprobante(event.target.files[0]);
  };
  return (
    <form
      className="mt-5 flex flex-col gap-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='flex flex-col gap-5'>
        <div className='w-50'>
          <label
            className="input input-bordered flex items-center gap-2"
            data-theme="light"
          >
            <input
              type="date"
              className="w-full"
              placeholder="Fecha de Pago"
              required
              name="fecha"
              {...register("fecha")}
              maxLength={40}
            />
          </label> 
          {errors.fecha?.message && console.log(errors.fecha?.message)}
          {
          errors.fecha?.message && (
            <p className="text-red-600 my-0 text-center">{errors.fecha?.message}</p>
          )
        }
        </div>
        <div className='w-50'>
          <label
            className="input input-bordered flex items-center gap-2 w-50"
            data-theme="light"
          >
            <RiMoneyDollarCircleLine  className="w-6 h-6 opacity-70" />
            <input
              type="number"
              className="w-full"
              placeholder="Monto"
              required
              name="monto"
              {...register("monto")}
              maxLength={40}
              min={0}
            />
          </label>
          {
          errors.monto?.message && (
            <p className="text-red-600 my-0 text-center">{errors.monto?.message}</p>
          )
        }
        </div>
      </div>
      <label
        className="input input-bordered flex items-center gap-2"
        data-theme="light"
      >
        <RiBankFill className="w-6 h-6 opacity-70"/>
        <select name="" id="" {...register("medio")} className='w-full' required>
          <option value="0">Seleccione medio de pago</option>
          <option value="Transferencia">Transferencia</option>
          <option value="Efectivo">Efectivo</option>
        </select>

      </label>
      <div className='flex flex-col'>
        <label htmlFor="comprobante">Comprobante de Pago</label>
        <input
            type="file"
            id="comprobante"
            name="comprobante"
            onChange={handleFileChange}
            className="file-input w-full max-w-xs"
            data-theme="light"
        />
      </div>
      {loading ? (
        <div className="flex mt-3 justify-center mt-4 mb-3">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <div className="d-grid mt-4 mb-4">
          <ActionButton value={"Cargar Pago"} type="submit" width={"w-full"}/>
        </div>
      )}
    </form>
  );
};

export default FormCreatePayment;
