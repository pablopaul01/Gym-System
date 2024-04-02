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

const FormEditPayment = ({id, fecha_de_pago, monto, medio_de_pago}) => {
    const [loading, setLoading] = useState(false);
    const [comprobante, setComprobante] = useState(null);

    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
      resolver: yupResolver(
        REGISTERPAYMENT_SCHEMA
      )
    })

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            const fechaSeleccionada = moment(data.fecha_de_pago);
            const fechaArgentina = fechaSeleccionada.utcOffset(-180).format('YYYY-MM-DDTHH:mm:ssZ');
            data.fecha_de_pago = fechaArgentina;
            const response = await axiosInstance.put(`/pago/${id}`, data)
            toast.success("Pago cargado correctamente!",{position:"top-right"});
            dispatch(getPayments())
        } catch (error) {
            console.log(error)
            toast.error("Ocurroió un problema! Intentelo más tarde.",{position:"top-right"})
        } finally {
            document.getElementById(`modal_${id}editPayment`).close()
            setLoading(false); 
            reset();
        }
    }


  return (
    <form
      className="mt-5 flex flex-col gap-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='flex gap-2'>
        <div className='w-50'>
          <label
            className="input input-bordered flex items-center gap-2"
            data-theme="light"
          >
            <input
              type="date"
              className="w-full"
              defaultValue={moment(fecha_de_pago).format('YYYY-MM-DD')}
              name="fecha"
              {...register("fecha_de_pago")}
              maxLength={40}
            />
          </label>
          {
          errors.fecha?.message && (
            <p className="text-red-600 my-0 text-center">{errors.fecha?.message}</p>
          )
          }
        </div>
        <div className='w-50'>
          <label
            className="input input-bordered flex items-center gap-2"
            data-theme="light"
          >
            <RiMoneyDollarCircleLine  className="w-6 h-6 opacity-70" />
            <input
              type="number"
              className="w-full"
              placeholder="Monto"
              defaultValue={monto}
              name="monto"
              {...register("monto")}
              maxLength={40}
              min={0}
            />
          </label>
        </div>
        {
          errors.monto?.message && (
            <p className="text-red-600 my-0 text-center">{errors.monto?.message}</p>
          )
        }
      </div>
      <label
        className="input input-bordered flex items-center gap-2"
        data-theme="light"
      >
        <RiBankFill className="w-6 h-6 opacity-70"/>
        <select name="" id="" {...register("medio_de_pago")} className='w-full' defaultValue={medio_de_pago}>
          <option value="0">Seleccione medio de pago</option>
          <option value="Transferencia">Transferencia</option>
          <option value="Efectivo">Efectivo</option>
        </select>

      </label>
      {loading ? (
        <div className="flex mt-3 justify-center mt-4 mb-3">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <div className="d-grid mt-4 mb-4">
          <ActionButton value={"Actualizar Pago"} type="submit" width={"w-full"}/>
        </div>
      )}
    </form>
  );
};

export default FormEditPayment;
