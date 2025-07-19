import React from 'react'
import { useContext, useEffect, useState } from 'react' 
import { AppContext } from '../../context/AppContext'
import SearchBar from '../../components/student/SearchBar'
import CourseCard from '../../components/student/CourseCard'
import { useParams } from 'react-router-dom'
import {assets} from '../../assets/assets.js'
import Footer from '../../components/student/Footer'

// import { useNavigate } from 'react-router-dom'
const CoursesList = () => {
  const { allCourses, navigate} = useContext(AppContext)
  const [filteredCourses,setFilteredCourses]=useState([])
  const {input}= useParams()
  useEffect(()=>{
    if(allCourses && allCourses.length>0){
       const tempcourses= allCourses.slice()
       input ?
       setFilteredCourses(tempcourses.filter(course=> course.courseTitle.toLowerCase().includes(input.toLowerCase())))
       : setFilteredCourses(tempcourses)
    }
  }
  ,[allCourses,input]
  )
  return (
    <>
    <div className='relative md:px-36 px-8 pt-20 text-left'>
      <div className='flex md:flex-row flex-col justify-between w-full gap-6 items-start'>
       <div >
        <h1 className='text-4xl font-semibold text-gray-800'>Course List</h1>
         <p className='text-gray-500'><span className='text-blue-600 cursor-pointer' onClick={()=>navigate('/')}>Home</span>/<span>Course List</span></p>
       </div>
       <SearchBar data={input} />
       
      </div>
      {input && <div className='inline-flex gap-4 items-center px-4 py-2 border mt-8 mb-8 text-gray-500'>
        <p>{input}</p>
        <img src={assets.cross_icon} alt="cross" onClick={()=> navigate('/course-list')} className='cursor-pointer h-6 w-6' />
        </div>}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-2 md:p-0'>
        {filteredCourses.map((course,index)=> { return <CourseCard key={index} course={course} />})}
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default CoursesList
