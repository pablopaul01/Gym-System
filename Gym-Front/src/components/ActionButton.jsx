import React from 'react'

const ActionButton = ({value, type,accion, variante, width}) => {
  return (
    <button type={type} className={`btn ${width ? width : ""} ${variante ? variante : "bg-[#18181B]"} text-white hover:bg-[#18181BE6]  `} onClick={accion}>{value}</button>
  )
}

export default ActionButton