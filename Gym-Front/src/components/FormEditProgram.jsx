import React, {useState, useEffect} from 'react'
import ActionButton from './ActionButton'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'sonner'
import { FaUser } from "react-icons/fa6";
import { axiosInstance } from '../config/axiosInstance'
import { useDispatch, useSelector } from 'react-redux';
import { FaMoneyCheckAlt } from "react-icons/fa";
import { PROGRAMEDIT_SCHEMA } from '../helpers/validationSchemas'
import { getPrograms } from '../store/ProgramSlice'
import { RiMoneyDollarCircleFill } from 'react-icons/ri'



const FormEditProgram = ({id, name, price}) => {
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch()
    

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(PROGRAMEDIT_SCHEMA)
    })


    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const response = await axiosInstance.put(`/programa/${id}`, data)
            toast.success("Programa actualizado correctamente!",{position:"top-right"});
            dispatch(getPrograms())
        } catch (error) {
            console.log(error)
            toast.error("Ocurroió un problema! Intentelo más tarde.",{position:"top-right"})
        } finally {
            document.getElementById(`modal_1`).close()
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
      <div className='flex flex-col gap-5'>
        <div className='w-50'>
          <label
            className="input input-bordered flex items-center gap-2"
            data-theme="light"
          >
            <FaUser className="w-4 h-4 opacity-70" />
            <input
              type="text"
              className="w-full"
              defaultValue={name}
              placeholder='Nombre'
              name="name"
              {...register("name")}
              maxLength={40}
            />
          </label>
        </div>
        <div className='w-50'>
        <label
          className="input input-bordered flex items-center gap-2"
          data-theme="light"
        >
          <RiMoneyDollarCircleFill className="w-6 h-6 opacity-70"/>
          <input
            type="number"
            className="w-full"
            defaultValue={price}
            placeholder="Precio"
            name="price"
            {...register("price")}
            maxLength={40}
            min={0}
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

export default FormEditProgram