import React, {useState} from 'react'
import ActionButton from './ActionButton'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'sonner'
import { FaUser } from "react-icons/fa6";
import { useDispatch } from 'react-redux'
import { axiosInstance } from '../config/axiosInstance'
import { FaWhatsapp } from "react-icons/fa";
import { PiIdentificationCardLight } from "react-icons/pi";
import { RiHealthBookLine } from "react-icons/ri";
import { getMembers } from '../store/MemberSlice'
import { MEMBER_SCHEMA } from '../helpers/validationSchemas'

const FormCreateMember = () => {
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(MEMBER_SCHEMA)
    })

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const response = await axiosInstance.post("/alumno", data)
            toast.success("Alumno cargado correctamente!",{position:"top-right"});
            dispatch(getMembers())
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
      <div className='flex gap-2'>
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
              required
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
            <FaUser className="w-4 h-4 opacity-70" />
            <input
              type="text"
              className="w-full"
              placeholder="Apellido"
              name="lastname"
              required
              {...register("lastname")}
              maxLength={40}
            />
          </label>
          {
          errors.lastname?.message && (
            <p className="text-red-600 my-0 text-center">{errors.lastname?.message}</p>
          )
        }
        </div>
      </div>
      <div>
        <label
          className="input input-bordered flex items-center gap-2"
          data-theme="light"
        >
          <PiIdentificationCardLight className="w-4 h-4 opacity-70"/>
          <input
            type="number"
            className="grow"
            placeholder="DNI"
            required
            name="dni"
            {...register("dni")}
            maxLength={40}
          />
        </label>
        {
          errors.dni?.message && (
            <p className="text-red-600 my-0 text-center">{errors.dni?.message}</p>
          )
        }
      </div>
      <div>
        <label
          className="input input-bordered flex items-center gap-2"
          data-theme="light"
        >
          <FaWhatsapp className="w-4 h-4 opacity-70"/>
          <input
            type="number"
            className="grow"
            required
            placeholder="Whatsapp"
            name="whatsapp"
            {...register("whatsapp")}
            maxLength={40}
          />
        </label>
        {
          errors.whatsapp?.message && (
            <p className="text-red-600 my-0 text-center">{errors.whatsapp?.message}</p>
          )
        }
      </div>
      <div>
        <label
          className="input input-bordered flex items-center gap-2"
          data-theme="light"
        >
          <RiHealthBookLine className="w-4 h-4 opacity-70"/>
          <input
            type="text"
            className="grow"
            placeholder="Obra social"
            name="obraSocial"
            required
            {...register("obraSocial")}
            maxLength={40}
          />
        </label>
        {
          errors.obraSocial?.message && (
            <p className="text-red-600 my-0 text-center">{errors.obraSocial?.message}</p>
          )
        }
      </div>
      {loading ? (
        <div className="flex mt-3 justify-center mt-4 mb-3">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <div className="d-grid mt-4 mb-4">
          <ActionButton value={"Cargar Alumno"} type="submit" width={"w-full"}/>
        </div>
      )}
    </form>
  );
};

export default FormCreateMember;
