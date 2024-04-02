import React, {useState} from 'react'
import ActionButton from '../components/ActionButton'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import { LOGIN_SCHEMA } from '../helpers/validationSchemas'
import {axiosInstance} from '../config/axiosInstance'
import { toast } from 'sonner'


const RecoverForm = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState()
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setLoading(true)
        axiosInstance.post('/usuario/recuperar', data)
        .then(res => {
            if(res.data.Status === "Success") {
                navigate('/')
               toast.success("Se envió mail de recuperación de contraseña, verifique su casilla")
            }
        }).catch(err => console.log(err.response.data.mensaje))
        .finally(()=>setLoading(false))
    }

  return (
    <form className='mt-10 flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
                 <div>
                    <label className="input input-bordered flex items-center gap-2" data-theme="light">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                        <input type="email" className="grow" placeholder="Email"  name="email" {...register("email")} maxLength={40}/>
                    </label>
                    <p className="text-red-600 text-center">
                        {errors.email?.message}
                    </p>
                </div>
                
                    {
                    loading ?
                        (
                        <div className="flex mt-3 justify-center mt-4 mb-3">
                            <span className="loading loading-bars loading-lg"></span>
                        </div>
                        )
                        :
                        (
                        <div className="d-grid mt-10 mb-4">
                            <ActionButton value={'Enviar correo de recuperación'} type="submit" width={"w-full"}/>
                        </div>
                        )
                    }
                    <p onClick={()=> navigate("/")} className='hover:cursor-pointer'>← Volver a inicio de sesión</p>
            </form>
  )
}

export default RecoverForm