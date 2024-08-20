import React from 'react'
import notebook from '../assets/Images/notebook.png';

export const EmptyCard = ({message}) => {
  return (
    <div className='flex flex-col items-center mt-32 justify-center font-playfair'>
        <img src = {notebook} className='w-60 opacity-60'/>
        <p className='text-md text-center font-semibold text-custom-green w-1/4 leading-6 mt-5'>{message}</p>
    </div>
  )
}
