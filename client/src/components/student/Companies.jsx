import React from 'react'
import { assets } from '../../assets/assets'

const Companies = () => {
  return (
    <div className='pt-16'>
       <p className='text-base text-gray-500'>Trusted by learners from</p>
       <div className='flex flex-wrap items-center justify-center gap-6 md:gap-16 mt-5 md:mt-10'>
      <img src= {assets.Microsoft} alt="Microsoft" className='w-20 md:w-28' />
        <img src={assets.walmart} alt="Walmart" className='w-20 md:w-28'/>
        <img src={assets.paypal} alt="paypal" className='w-20 md:w-28'/>
        <img src={assets.Adobe} alt="Adobe" className='w-20 md:w-28'/>
        <img src={assets.Accenture} alt="Accenture" className='w-20 md:w-28'/>
       </div>
    </div>
  )
}

export default Companies
