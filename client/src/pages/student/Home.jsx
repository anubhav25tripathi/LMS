import React from 'react'
import Hero from '../../components/student/Hero'
import Companies from '../../components/student/Companies'
import CoursesSection from '../../components/student/CoursesSection'
import CourseCard from '../../components/student/CourseCard'
import {dummyCourses} from '../../assets/assets'
import TestimonialSection from '../../components/student/TestimonialSection'
import CallToAction from '../../components/student/CallToAction'
import Footer from '../../components/student/footer'
const Home = () => {
  return (
    <div className=' flex flex-col items-center space-y-7 text-center'>
      <Hero /> 
      {/* <p>Welcome to the student portal!</p> */}
      <Companies />

      <CoursesSection/>
      {/* {dummyCourses.map((course, index) => (
        <CourseCard course={course} key={index}/>
      ))} */}
      <TestimonialSection/>
      <CallToAction/>
      <Footer />
    </div>
  )
}

export default Home
