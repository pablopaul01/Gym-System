import React, {useState, useEffect} from 'react'
import ActionButton from './ActionButton'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'sonner'
import { FaUser } from "react-icons/fa6";
import { axiosInstance } from '../config/axiosInstance'
import { useDispatch, useSelector } from 'react-redux';
import { getMembers } from '../store/MemberSlice'
import moment from 'moment'


const FormEditCicle = ({id, vencimiento}) => {
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch()
    

    const { register, handleSubmit, formState: { errors }, reset } = useForm()


    const onSubmit = async (data) => {
        try {
            setLoading(true);
            // Obtener la fecha seleccionada en el input date
            const fechaSeleccionada = moment(data.inicioCiclo);
            // Convertir la fecha a la zona horaria de Argentina (GMT-0300) y establecer la hora a las 23:59
            const fechaArgentina = fechaSeleccionada.utcOffset(-180).format('YYYY-MM-DDTHH:mm:ssZ');
            // Actualizar el valor de la fecha en los datos a enviar
            data.inicioCiclo = fechaArgentina;
            const response = await axiosInstance.put(`/alumno/inicioCiclo/${id}`, data)
            toast.success("Fecha actualizada correctamente!",{position:"top-right"});
            dispatch(getMembers())
        } catch (error) {
            console.log(error)
            toast.error("Ocurroió un problema! Intentelo más tarde.",{position:"top-right"})
        } finally {
          document.getElementById(`modal_${id+1}`).close()
            setLoading(false); 
            reset();
        }
    }

    const handleReset = () => {
        reset()
        document.getElementById(`modal_${id+1}`).close()
    }

  return (
    <form
      className="mt-5 flex flex-col gap-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='flex gap-2'>
        <div className='w-full'>
          <label
            className="input input-bordered flex items-center gap-2"
            data-theme="light"
          >
            <FaUser className="w-4 h-4 opacity-70" />
            <input
              type="date"
              className="w-full"
              defaultValue={moment(vencimiento).format("YYYY-MM-DD")}
              placeholder='Fecha de vencimiento'
              name="inicioCiclo"
              {...register("inicioCiclo")}
              maxLength={40}
            />
          </label>
        </div>
      </div>
      
      {loading ? (
        <div className="flex mt-3 justify-center mt-4 mb-3">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <div className="flex justify-end mt-8 mb-4 gap-3">
            <div className='w-50' >
                <ActionButton value={"Salir sin guardar"} type="button"  accion={handleReset} variante={"btn-error"} />
            </div>
            <div className='w-50'>
                <ActionButton value={"Guardar cambios"} type="submit" />
            </div>
        </div>
      )}

    </form>
  )
}

export default FormEditCicle