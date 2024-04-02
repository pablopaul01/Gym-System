import React, {useState} from 'react'
const Modal = ({ btnText, btnA, id, children}) => {


  return (
    <>
      {
        btnText ? 
        (
          <button
          className='p-1  rounded-lg  text-gray-600 hover:text-green-700 hover:cursor-pointer hover:scale-125 transition-all'
          onClick={() => {document.getElementById(`modal_${id}`).showModal()}}
        >
          {btnText}
        </button>
        ) 
        : 
        (
          <div  onClick={() => {
            document.getElementById(`modal_${id}`).showModal()
          }}>{btnA}</div>
        )
      }
      <dialog id={`modal_${id}`} className='modal border border-black' >
        <div className='modal-box overflow-visible w-auto px-10 bg-white rounded-box bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-80 shadow-2xl'>
          {children}
          <form method='dialog'>
            <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
              X
            </button>
          </form>
        </div>
        <form method='dialog' className='modal-backdrop'>
          <button className='cursor-default'></button>
        </form>
      </dialog>
    </>
  )
}

export default Modal
