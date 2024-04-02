import React, {useState, useEffect} from 'react'
import ActionButton from './ActionButton'
import { FaUser } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { PiIdentificationCardLight } from "react-icons/pi";
import { RiHealthBookLine } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa";
import { CgGym } from "react-icons/cg";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import moment from 'moment';


const FormMember = ({id, name, lastname, dni, whatsapp, obraSocial, programa, proximo_vencimiento, inicioCiclo, ultimoPago, medioPago, montoPago}) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()


    const handleReset = () => {
        document.getElementById(`modal_${id+"data"}`).close()
    }


  return (
    <form
      className="mt-5 flex flex-col gap-5"
      >
      <div className='flex gap-2'>
        <div className='w-50'>
          <label
            className="input input-bordered flex items-center gap-2"
            data-theme="light"
          >
            <PiIdentificationCardLight className="w-6 h-6 opacity-70"/>
            <input
              type="number"
              className="grow w-full"
              placeholder="DNI"
              defaultValue={dni}
              name="dni"
              readOnly
              maxLength={40}
            />
          </label>
        </div>
        <div className="w-50">
          <label
            className="input input-bordered flex items-center gap-2"
            data-theme="light"
          >
            <FaWhatsapp className="w-5 h-5 opacity-70"/>
            <input
              type="number"
              className="grow w-full"
              placeholder="Whatsapp"
              defaultValue={whatsapp}
              name="whatsapp"
              maxLength={40}
              readOnly
            />
          </label>
        </div>
      </div> 
      <div className='flex gap-2'>
        <div className='w-50'>
          <label
            className="input input-bordered flex items-center gap-2"
            data-theme="light"
          >
            <RiHealthBookLine className="w-6 h-6 opacity-70"/>
            <input
              type="text"
              className="grow w-full"
              placeholder="Obra social"
              defaultValue={obraSocial}
              name="obraSocial"
              maxLength={40}
              readOnly
            />
          </label>
        </div>
        <div className='w-50'>
          <label
            className="input input-bordered flex items-center gap-2"
            data-theme="light"
          >
            <CgGym className="w-7 h-7 opacity-70" size={25}/>
            <input
              type="text"
              className="grow w-full"
              placeholder="programa"
              value={programa}
              name="programa"
              maxLength={40}
              readOnly
            />
          </label>
        </div>
      </div>
      <div className='flex gap-2 justify-center'>
        <div className='w-full'>
          <div className='w-full'>
            <label >Fecha de inicio de ciclo</label>
            <label
              className="input input-bordered flex items-center gap-2 w-full"
              data-theme="light"
            >
              <FaRegCalendarAlt className="w-5 h-5 opacity-70"/>
              <input
                type="date"
                className="grow w-full text-center"
                value={moment(inicioCiclo).format('YYYY-MM-DD')}
                name="iniciCiclo"
                maxLength={40}
                readOnly
              />
            </label>
          </div>
        </div>
        <div className='w-full'>
        <div className='text-center'>
          <label >Fecha de próximo vencimiento</label>
            <label
              className="input input-bordered flex items-center gap-2"
              data-theme="light"
            >
              <FaRegCalendarAlt  className="w-5 h-5 opacity-70"/>
              <input
                type="date"
                className="grow text-center"
                value={moment(proximo_vencimiento).format('YYYY-MM-DD')}
                name="vencimiento"
                maxLength={40}
                readOnly
              />
            </label>
        </div>
        </div>
      </div>
      <div className='mb-5'>
        <p>Último pago realizado</p>
            <label
              className="input input-bordered flex items-center gap-2"
              data-theme="light"
            >
              <FaMoneyBillTransfer  className="w-5 h-5 opacity-70"/>
              <input
                type="text"
                className="grow text-center"
                value={medioPago?`${moment(ultimoPago).format('DD/MM/YYYY')} - ${medioPago} - $ ${montoPago}` : "No hay pagos registrados"}
                name="vencimiento"
                maxLength={40}
                readOnly
              />
            </label>
      </div>


    </form>
  )
}

export default FormMember