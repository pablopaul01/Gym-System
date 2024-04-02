import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DashBoardLayout from './DashBoardLayout'
import { getPagosMensual } from '../store/MonthlyPaymentsSlice'
import { getPagosMensualMedio } from '../store/MonthlyPaymentsMethodSlice'
import { getAlumnosStats } from '../store/MembersStats'
import { getPrograms } from '../store/ProgramSlice'
import { FaDumbbell, FaUsers } from 'react-icons/fa'
import { RiMoneyDollarCircleFill } from 'react-icons/ri'


const Main = ({isLogged, setIsLogged}) => {
  const dispatch = useDispatch()
  const pagosMensual = useSelector(state => state.monthlyPayments.pagosMensual)
  const pagosPorMedio = useSelector(state => state.monthlyPaymentsMethod.pagosMensualMedios)
  const alumnosStats = useSelector(state => state.alumnosStats)
  const programs = useSelector(state => state.programs.programs)
  
  useEffect(() => {
    // Obtener el mes actual (0-indexado)
    const currentMonth = new Date().getMonth() + 1
    dispatch(getPagosMensual(currentMonth))
    dispatch(getPagosMensualMedio(currentMonth))
    dispatch(getAlumnosStats())
    dispatch(getPrograms())
  }, [])


  return (
    <DashBoardLayout isLogged={isLogged} setIsLogged={setIsLogged}>
      <div className='min-h-[800px] h-[100vh] bg-slate-100 flex flex-col justify-center items-center w-full gap-10'>
      {
        alumnosStats.isLoading ?
        (
          <div className="flex mt-3 justify-center mt-4 mb-3">
            <span className="loading loading-bars loading-lg"></span>
          </div>
        )
          :
        (

        <>
        <div className='flex gap-3'>
          <div className='card bg-white shadow-xl p-4 w-[300px]'>
            <h3 className='mb-3 mt-2 text-center text-black font-bold flex justify-center gap-2 items-center'><RiMoneyDollarCircleFill className='h-5 w-5'/>PAGOS</h3>
            <p className='text-black font-semibold'>Total de pagos del mes: <span className='text-black'>${pagosMensual}</span></p>
            <div className='mb-3'>
              {
                pagosPorMedio?.map((pago, index) => (
                  <div key={index}>
                    <p className={pago._id === "Transferencia" ? 'text-cyan-500': "text-[green]"}>Total en {pago._id}: <span className=''>${pago.total}</span></p>
                  </div>
                )
                )
              }
            </div>
          </div>
          <div className='card bg-white shadow-xl p-4 w-[450px]'>
            <h3 className='text-center my-3 text-black font-bold flex gap-2 justify-center items-center'><FaUsers className='h-5 w-5'/>ALUMNOS</h3>
            <div className='mb-3'>
              <p className='text-black font-semibold'>Total de alumnos: <span className=''>{alumnosStats.totalAlumnos}</span></p>
              <p> <span className='text-black'>Total de Alumnos activos:</span> <span className='text-[green]'>{alumnosStats.alumnosActivosProximoVencimiento}</span></p>
              <p><span className='text-black'>Total de Alumnos con cuotas vencidas</span> <span className='text-[red]'>{alumnosStats.alumnosConVencimientoMayor}</span></p>
              <p className='text-black'>Total de Alumnos vencidos en el mes actual: <span className='text-[red]'>{alumnosStats.cantidadAlumnosVencidosEnMesActual}</span></p>
            </div>
          </div>
        </div>
        <div className='flex gap-3 flex-wrap justify-center'>
            {
              programs?.map((program, index) => (
                <div key={index} className='card bg-white shadow-xl p-4 w-[450px]'>
                  <h3 className='text-center mb-3 text-black font-bold flex items-center justify-center gap-2'><FaDumbbell className='h-5 w-5'/>{program.name}</h3>
                  <div className='mb-3'>
                    <p className='text-black font-semibold'>Cantidad de alumnos:  <span className='text-black'>{
                      alumnosStats.alumnosPorPrograma.some(programa => programa.nombrePrograma === program.name) ? 
                      //aqui debo mostrar el total del programa que coincide con program.name de alumnosStats.alumnosPorPrograma
                      (
                        alumnosStats.alumnosPorPrograma.find(programa => programa.nombrePrograma === program.name).total
                      )
                      : 
                      (0) }</span>
                    </p>
                    <p className='text-black'>Cantidad de alumnos activos:  <span className='text-[green]'>{
                      alumnosStats.alumnosActivosPorPrograma.some(programa => programa.nombrePrograma === program.name) ? 
                      //aqui debo mostrar el total del programa que coincide con program.name de alumnosStats.alumnosPorPrograma
                      (
                        alumnosStats.alumnosActivosPorPrograma.find(programa => programa.nombrePrograma === program.name).total
                      )
                      : 
                      (0) }</span>
                    </p>
                    <p className='text-black'>Cantidad de alumnos cuota vencida:  <span className='text-[red]'>{
                      alumnosStats.alumnosVencidosPorPrograma.some(programa => programa.nombrePrograma === program.name) ? 
                      //aqui debo mostrar el total del programa que coincide con program.name de alumnosStats.alumnosPorPrograma
                      (
                        alumnosStats.alumnosVencidosPorPrograma.find(programa => programa.nombrePrograma === program.name).total
                      )
                      : 
                      (0) }</span>
                    </p>
                    <p className='text-black'>Cantidad de alumnos cuota vencida en el mes actual:  <span className='text-[red]'>{
                      alumnosStats.alumnosVencidosMesActualPorPrograma.some(programa => programa.nombrePrograma === program.name) ? 
                      //aqui debo mostrar el total del programa que coincide con program.name de alumnosStats.alumnosPorPrograma
                      (
                        alumnosStats.alumnosVencidosMesActualPorPrograma.find(programa => programa.nombrePrograma === program.name).total
                      )
                      : 
                      (0) }</span>
                    </p>
                  </div>
                </div>
              )
              )
            }
        </div>
        </>
        )

      }
      </div>
    </DashBoardLayout>
  )
}

export default Main
