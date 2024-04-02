import React, {useState} from 'react'
import { FaEye } from 'react-icons/fa'
import { FaEyeSlash } from 'react-icons/fa'
import ActionButton from './ActionButton'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import { REGISTRO_SCHEMA } from '../helpers/validationSchemas'
import { toast } from 'sonner'
import { FaUser } from "react-icons/fa6";
import { useDispatch } from 'react-redux'
import { getUsers } from '../store/UserSlice'
import { axiosInstance } from '../config/axiosInstance'


const FormCreateUser = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(REGISTRO_SCHEMA)
    })

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const response = await axiosInstance.post("/registrar", data)
            toast.success("Cuenta creada correctamente!",{position:"top-right"});
            dispatch(getUsers())
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
      className=" flex flex-col gap-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <label
          className="input input-bordered flex items-center gap-2"
          data-theme="light"
        >
          <FaUser className="w-4 h-4 opacity-70" />
          <input
            type="text"
            className="grow"
            placeholder="Nombre"
            name="name"
            required
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
      <div>
        <label
          className="input input-bordered flex items-center gap-2"
          data-theme="light"
        >
          <FaUser className="w-4 h-4 opacity-70" />
          <input
            type="text"
            className="grow"
            placeholder="Apellido"
            required
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
      <div>
        <label
          className="input input-bordered flex items-center gap-2"
          data-theme="light"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="email"
            className="grow"
            placeholder="Email"
            required
            name="email"
            {...register("email")}
            maxLength={40}
          />
        </label>
        <p className="text-red-600 my-0 text-center">{errors.email?.message}</p>
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <div className="join w-full">
            <label
              className="input input-bordered flex items-center gap-2 join-item w-full"
              data-theme="light"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type={showPassword ? "text" : "password"}
                className="grow"
                placeholder="Contraseña"
                name="password"
                {...register("password")}
                minLength={8}
                maxLength={16}
                required
              />
            </label>
            <span
              className={
                showPassword
                  ? "input-group-text btn btn-danger join-item"
                  : "input-group-text btn btn-outline-danger join-item"
              }
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: "pointer" }}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          <p className="text-sm text-gray-400 text-wrap">
          La contraseña debe tener entre 8 y 16 caracteres,una mayúscula y un
            número
          </p>
          <p className="text-red-600 my-0 text-center">
            {errors.password?.message}
          </p>
        </div>
        <div>
          <div className="join w-full">
            <label
              className="input input-bordered flex items-center gap-2 join-item w-full"
              data-theme="light"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type={showPassword ? "text" : "password"}
                className="grow"
                placeholder="Repetir contraseña"
                name="repassword"
                minLength={8}
                maxLength={16}
                required
                {...register("repassword")}
              />
            </label>
            <span
              className={
                showPassword
                  ? "input-group-text btn btn-danger join-item"
                  : "input-group-text btn btn-outline-danger join-item"
              }
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: "pointer" }}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          <p className="text-red-600 my-0 text-center">
            {errors.repassword?.message}
          </p>
        </div>
      </div>
      {loading ? (
        <div className="flex mt-3 justify-center mt-4 mb-3">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <div className="d-grid mt-4 mb-4">
          <ActionButton value={"Crear cuenta"} type="submit" width={"w-full"}/>
        </div>
      )}
    </form>
  );
};

export default FormCreateUser;
