import React, {useState} from 'react'
import CardUser from '../components/CardUser'
import RecoverForm from '../components/RecoverForm'

const RecoverPass = () => {
  return (
    <div className='flex min-h-[800px] h-[100vh] bg-slate-100 flex justify-center items-center'>
      <div className='w-[70%] flex justify-center'>
        <div className='w-[40%]'>

          <CardUser title={"Recuperar contraseña"} subTitle={"Ingrese el correo electrónico de la cuenta que desea recuperar contraseña"} className="w-[50%]">
               <RecoverForm />
          </CardUser>
        </div>
      </div>
        <div className="h-full w-[50%] bg-[#18181B] flex  flex-col justify-center items-center gap-5 relative">
          <div>
            <img src="https://res.cloudinary.com/dm1sgld8c/image/upload/v1710946840/media/logo2_c1gnzt.png" alt="Logo" className='w-100 py-5'/>
            <h1 className='text-5xl text-white'>Sistema de Gestión</h1>
          </div>
          <div className='absolute bottom-0 mb-5'>
            <p>Desarrollado por 
              <a className='hover:cursor-pointer' href='https://jpsalomon.com.ar/' target='blank'>
                <span className='text-[#52bc68] font-semibold'> &lt;</span><span className='text-white font-semibold'>JPS /</span><span className='text-[#52bc68] font-semibold'>&gt;</span> 
              </a>
            </p>
          </div>
        </div>
    </div>
  )
}

export default RecoverPass