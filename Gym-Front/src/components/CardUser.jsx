import React from 'react'

const CardUser = ({title, subTitle,children}) => {
  return (
<div className="overflow-x-auto mb-10 rounded-lg shadow-md p-7 bg-white text-black min-w-[500px]">
            <h2 className='font-bold text-3xl'>{title}</h2>
            <p>{subTitle}</p>
            {children}
        </div>
  )
}

export default CardUser