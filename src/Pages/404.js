import React from 'react'
import image from '../Images/page not found.jpg';

const Error = () => {
  return (
    <div className='flex flex-col items-center gap-4'>
        <h1 className='text-3xl font-extrabold'>Page Not Found</h1>
        <img src={image} className='w-1/2 h-[500px] rounded'></img>
    </div>
  )
}

export default Error;