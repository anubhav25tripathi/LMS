import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import {assets} from '../../assets/assets'
import { Link } from 'react-router-dom'

const CourseCard = ({course}) => {
  const {currency, calculaterating }=useContext(AppContext)
  return (
    <Link to={`/course/${course._id}`} onClick={()=> scrollTo(0,0)} className='border border-gray-500/30 rounded-lg overflow-hidden pb-6 '>
      <img className='w-full' src={course.courseThumbnail} alt="" />
      <div className='p-3 text-left'>
        <h3 className='text-base font-semibold'>{course.courseTitle}</h3>
        <p className='text-gray-500'>{course.educator.name}</p>
        <div className='flex items-center space-x-2'>
          <p>{calculaterating(course)}</p>
          <div className='flex '>
            
            {[...Array(5)].map((_, index) =>  (<img src={index<Math.floor(calculaterating(course))? assets.star : assets.emptystar} alt="Star" key={index} className='w-3.5 h-3.5' />) )}
          </div>
          <p>{course.courseRatings.length}</p>
        </div>
        <p>{currency}{(course.coursePrice*4/5).toFixed(2)}</p>
      </div>
      </Link>
    
  )
}

export default CourseCard
