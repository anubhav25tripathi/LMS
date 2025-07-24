import React, {useContext,useState,useEffect} from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/student/Loading'
import { toast } from 'react-toastify'
import axios from 'axios'
const MyCourses = () => {
  const {backendUrl,isEducator,getToken}=useContext(AppContext)
   const [courses,setCourses]=useState(null) 
   const fetchCourses= async ()=>{
     try{
        const token= await getToken();
        const {data}= await axios.get(`${backendUrl}/api/educator/courses`,{headers:{Authorization:`Bearer ${token}`}})
        data.success && setCourses(data.courses);
     }
     catch(error){
        toast.error(error.message);
     }
   }
   useEffect(()=>{
    if(isEducator){
      fetchCourses();
    }
   },[isEducator])
  return courses ? (
      <div className='h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0'>
           <div className='w-full' >
              < h2 className="pb-4 text-lg font-medium">My Courses</h2>
                  <div className='flex flex-col items-center max-w-4xl w-full  overflow-hidden rounded-md bg-white border border-gray-500/20'>
                    <table className='md:table-auto table-fixed w-full overflow-hidden"' >
                      <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left'>
                        <tr>
                          <td className="px-4 py-3 font-semibold truncate">All Courses</td>
                          <td className="px-4 py-3 font-semibold truncate">Earnings</td>
                          <td className="px-4 py-3 font-semibold truncate">Students</td>
                          <td className="px-4 py-3 font-semibold truncate">Published On</td>
                        </tr>
                      </thead>
                      
                      <tbody>
                        {courses.map((course,index)=>(
                          <tr key={course._id || index} className="border-b border-gray-500/20">
                            <td className="md:px-4 px-2 md:py-4 py-3 flex items-center space-x-3 truncate" >
                              <img src={course.courseThumbnail} alt="course image" className='w-16' /><span>{course.courseTitle}</span></td>
                            <td className="px-4 py-3">$ {Math.floor(course.enrolledStudents.length * (course.coursePrice - course.discount * course.coursePrice / 100))}</td>
                            <td className="px-4 py-3">{course.enrolledStudents.length}</td>
                            <td className="px-4 py-3" >{new Date(course.createdAt).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
           </div>
      </div>)
         : <Loading />
     
}

export default MyCourses
