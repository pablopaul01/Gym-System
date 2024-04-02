import React, {useState} from 'react'
import ActionButton from './ActionButton'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'sonner'
import { FaUser } from "react-icons/fa6";
import { useDispatch } from 'react-redux'
import { axiosInstance } from '../config/axiosInstance'
import { getPrograms } from '../store/ProgramSlice'
import { PROGRAM_SCHEMA } from '../helpers/validationSchemas'
import { RiMoneyDollarCircleFill } from 'react-icons/ri'

const FormCreateProgram = () => {
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(PROGRAM_SCHEMA)
    })

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const response = await axiosInstance.post("/programa", data)
            toast.success("Programa cargado correctamente!",{position:"top-right"});
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
              placeholder="Nombre"
              name="name"
              {...register("name")}
              maxLength={40}
            />
          </label>
          {
          errors.name?.message && (
            <p className="text-red-600 my-0 text-center">{errors.name?.message}</p>
          )
          }
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
              placeholder="Precio"
              name="price"
              {...register("price")}
              min={0}
              maxLength={40}
            />
          </label>
        {
          errors.price?.message && (
            <p className="text-red-600 my-0 text-center">{errors.price?.message}</p>
          )
        }
        </div>
      </div>
      
      {loading ? (
        <div className="flex mt-3 justify-center mt-4 mb-3">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <div className="d-grid mt-4 mb-4">
          <ActionButton value={"Guardar programa"} type="submit" width={"w-full"}/>
        </div>
      )}
    </form>
  );
};

export default FormCreateProgram;
