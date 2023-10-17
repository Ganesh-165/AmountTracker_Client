import React from 'react'
import Card from '../Ui/Card'
import YearCard from '../Ui/YearCard'
import { useYear } from '../store/yearContext'
import useAuth from '../hooks/useAuth'

const YearWiseTracking = () => {
  const {uniqueYearsData} = useYear();
  const {auth} = useAuth();
  const userid = auth.userid;
  return (
    <Card>
      <div className='flex xl:flex-row flex-col max-w-5xl justify-between'>
        <h2 className='ml-20 xl:text-4xl text-2xl font-bold'>Year Wise Tracking</h2>
      </div>
      <div className='max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-10 mt-20 ml-20 min-h-fit'>
        {uniqueYearsData.length === 0 && <p className='text-2xl font-bold'>No Items Added</p>}
       {uniqueYearsData.map((years)=><YearCard key={years.year} year={years.year} amount={years.amount} noofitems={years.numberOfItems} id={userid}/>)}
      </div>
    </Card>
  )
}

export default YearWiseTracking