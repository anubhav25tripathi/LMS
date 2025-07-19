import React from 'react'
import {Link} from 'react-router-dom'
import {useContext} from 'react'
import {AppContext} from '../../context/AppContext'
import CourseCard from './CourseCard'

const CourseSection = () => {
  const {allCourses} = useContext(AppContext)
  return (
    <div className=' py-16 md:px-40 px-8'>
      <h2 className='text-3xl font-medium text-gray-800 mb-2'>Learn from the best</h2>
      <p className='text-sm md:text-base text-gray-500 '>Discover our top-rated courses acorss various 
        categories.  From coding and design to business and wellness,
        aour courses are crafted to deliver results
      </p>
     <div className='grid grid-cols-auto px-4 md:px-0 md:my-16 my-10 gap-4'>
      {allCourses.slice(0, 4).map((course, index) => 
          <CourseCard course={course} key={index} />
        
      )}
      </div> 
      <Link to={'/course-list'} onClick={()=> scrollTo(0,0)}
      className='text-gray-500 border border-gray-500/30 px-10 py-3 rounded space-y-2'>
        Show all courses</Link>

    </div>
  )
}

export default CourseSection
