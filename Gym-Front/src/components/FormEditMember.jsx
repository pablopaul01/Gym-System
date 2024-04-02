import React, {useState, useEffect} from 'react'
import ActionButton from './ActionButton'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'sonner'
import { FaUser } from "react-icons/fa6";
import { axiosInstance } from '../config/axiosInstance'
import { useDispatch, useSelector } from 'react-redux';
import { PiIdentificationCardLight } from "react-icons/pi";
import { RiHealthBookLine } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa";
import { getMembers } from '../store/MemberSlice'
import { EDITMEMBER_SCHEMA } from '../helpers/validationSchemas'
import { CgGym } from 'react-icons/cg'
import { getPrograms } from '../store/ProgramSlice'


const FormEditMember = ({id, name, lastname, dni, whatsapp, obraSocial, programa}) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    
    const programs = useSelector(state => state.programs.programs)
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(EDITMEMBER_SCHEMA)
    })


    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const response = await axiosInstance.put(`/alumno/${id}`, data)
            toast.success("Cuenta actualizada correctamente!",{position:"top-right"});
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
            defaultValue={lastname}
            placeholder="Apellido"
            name="lastname"
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
      <div className='flex gap-2'>
        <div className='w-50'>
          <label
            className="input input-bordered flex items-center gap-2"
            data-theme="light"
          >
            <PiIdentificationCardLight className="w-4 h-4 opacity-70"/>
            <input
              type="number"
              className="grow w-full"
              placeholder="DNI"
              defaultValue={dni}
              name="dni"
              {...register("dni")}
              maxLength={40}
              min={0}
              required
            />
          </label>
          {
          errors.dni?.message && (
            <p className="text-red-600 my-0 text-center">{errors.dni?.message}</p>
          )
        }
        </div>
        <div className='w-50'>
          <label
            className="input input-bordered flex items-center gap-2"
            data-theme="light"
          >
            <FaWhatsapp className="w-4 h-4 opacity-70"/>
            <input
              type="number"
              className="grow w-full"
              placeholder="Whatsapp"
              defaultValue={whatsapp}
              name="whatsapp"
              {...register("whatsapp")}
              maxLength={40}
              required
            />
          </label>
          {
          errors.whatsapp?.message && (
            <p className="text-red-600 my-0 text-center">{errors.whatsapp?.message}</p>
          )
        }
        </div>
      </div>
      <div className="flex gap-2">
        <div className="w-50">
          <label
            className="input input-bordered flex items-center gap-2"
            data-theme="light"
          >
            <RiHealthBookLine className="w-4 h-4 opacity-70"/>
            <input
              type="text"
              className="grow w-full"
              placeholder="Obra social"
              defaultValue={obraSocial}
              required
              name="obraSocial"
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
        <div className="w-50">
          <label
            className="input input-bordered flex items-center gap-2"
            data-theme="light"
          >
            <CgGym className="w-5 h-5 opacity-70"/>
            <select id="" className='w-full'  name="clases" {...register("clases") } defaultValue={programa}>
              <option value="0">Seleccione programa</option>
              {
                programs.map(program =>(
                  <option key={program._id} value={program._id}  >{program.name}</option>
                ))
              }
            </select>
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

export default FormEditMember