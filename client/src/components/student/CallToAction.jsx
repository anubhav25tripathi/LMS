import React from 'react'
import {assets} from '../../assets/assets.js'
const CallToAction = () => {
  return ( 
    <div className='flex flex-col items-center gap-4 pt-10 pb-24 px-8 md:px-0'>
      <h1 className='text-xl md:text:4xl tex-gray-800 font-semibold'>Learn anything, anytime, anywhere</h1>
      <p className='text-gray-500 sm:text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Illum eum qui quas eius quisquam? Quod optio consequuntur saepe voluptatibus. 
        Error, blanditiis? Voluptatum dignissimos sunt 
        id a neque inventore excepturi quo qui rem? Laboriosam .</p>
        <div className='flex  items-center font-medium gap-6 mt-4'>
              <button className='text-white bg-blue-600 px-10 py-3 '>Get started</button>
              <button className='flex items-center gap-2  '>Learn more <img src={assets.arrow_icon} alt="arrow_icon" /></button>
        </div>
    </div>
  )
}

export default CallToAction
