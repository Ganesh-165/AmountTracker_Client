import React from 'react'
import { useNavigate } from 'react-router-dom'

const YearCard = (props) => {
    const navigate = useNavigate();
    const yearpageHandler = ()=>{
        navigate(`:${props.year}`);
    }
  return (
    <div className='p-4 rounded-xl hover:cursor-pointer hover:shadow-lg h-auto hover:shadow-[#2a2185] shadow-md shadow-[#2a2185]'>
       <h2 className='text-2xl font-bold'>Year : {props.year}</h2>
       <div>
          <p className=' font-bold text-lg'>Total Amount : {props.amount}</p>
          <p className=' font-bold text-lg'>No Of Items : {props.noofitems}</p>
        </div>
        <button className='p-2 text-white bg-[#2a2185] mt-2 rounded-xl' onClick={yearpageHandler}>View Expenses</button>
    </div>
  )
}

export default YearCard