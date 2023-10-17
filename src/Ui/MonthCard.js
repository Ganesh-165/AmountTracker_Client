import React from 'react'
import { useNavigate } from 'react-router-dom';

const MonthCard = (props) => {
    const navigate = useNavigate();
    const monthpageHandler = ()=>{
      navigate(`:${props.month}${props.year}`,{state:{month:props.month,year:props.year}});
    }
  return (
    <div className='p-4 rounded-xl hover:cursor-pointer hover:shadow-lg hover:shadow-[#2a2185] shadow-md shadow-[#2a2185]' onClick={monthpageHandler}>
        <h2 className='text-2xl font-bold'>{props.month}</h2>
        <div>
          <p>Amount : {props.amount}</p>
          <p>No Of Items : {props.noofitems}</p>
        </div>
        <button className='w-auto p-2 bg-[#2a2185] text-white rounded mt-3'>View Expenses</button>
    </div>
  )
}

export default MonthCard