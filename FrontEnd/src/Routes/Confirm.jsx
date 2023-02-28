import React from 'react'
import symbol from "../car.png";


function Confirm() {
  return (
    <div className='contentConfirm'>
    <div className='cardDetalle__v3'>
        <img className='confirmIcon' src={symbol} alt="" />
        <h1>¡Thank you!</h1>
        <h3>Your reservation has been successful</h3>
        <a type="button" href="/home" className="button2">Ok</a>

    </div>
    </div>
  )
}

export default Confirm