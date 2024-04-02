import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FaEye } from 'react-icons/fa'
import { FaEyeSlash } from 'react-icons/fa'
import { axiosInstance } from '../config/axiosInstance'
import { toast } from 'sonner'
import ActionButton from './ActionButton'

const ResetForm = () => {
    const [password, setPassword] = useState()
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const {id, token} = useParams()

    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault()
        axiosInstance.put(`/user/reset/${id}/${token}`, {password})
        .then(res => {
            if(res.data.Status === "Success") {
                navigate('/')
               toast.success("Se reestableció correctamente la contraseña")
            }
        }).catch(err => console.log(err)).finally(()=>setLoading(false))
    }
  return (
    <form className="mt-10 flex flex-col gap-5" onSubmit={handleSubmit}>
    <div className="mb-2 pt-4">
        <div className='join w-full'>
            <label className="input input-bordered flex items-center gap-2 join-item w-full" data-theme="light">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                <input type={showPassword ? "text" : "password"} className="grow" placeholder='Contraseña'name="password" minLength={8}
            maxLength={16} onChange={(e) => setPassword(e.target.value)}/>
            </label>
            <span
            className={showPassword ? ("input-group-text btn btn-danger join-item") : ("input-group-text btn btn-outline-danger join-item")}
            onClick={() => setShowPassword(!showPassword)}
            style={{ cursor: "pointer" }} >
            {
                showPassword ? (<FaEye />) : (<FaEyeSlash />)
            }
            </span>
        </div>
    </div>
    {
        loading ?
            (
                <div className="flex mt-3 content-center mt-4">
                    <span className="loading loading-bars loading-lg text-black"></span>
                </div>
            )
            :
            (
                <div className="flex mt-5">
                    <ActionButton value={'Reestablecer contraseña'} type="submit" width={"w-full"}/>
                </div>
            )
    }

    <div className="text-center">
        <Link className=" link mb-4 text-black text-sm">La nueva contraseña tiene que tener como mínimo 8 caracteres y 16 como máximo</Link>
    </div>
</form>
  )
}

export default ResetForm