import React, {useEffect,useState} from 'react'
import { assets, dummyDashboardData } from '../../assets/assets'
import Loading from '../../components/student/Loading'
const Dashboard = () => {
  const [dashboardData,setDashboardData]=useState(null)
  const fetchdashboardData= async ()=>{
    setDashboardData(dummyDashboardData)
  }
  useEffect(()=>{
    fetchdashboardData()
  },[])
  return dashboardData ? (
    <div className='min-h-screen flex flex-col items-start justify-between gap-8 md:p-8  p-4 pt-8 pb-0'>
        <div className='space-y-5'>
           <div className='flex flex-wrap gap-5 items-center' >

             <div className='flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md' >
               <img src={assets.patient} alt="patients_icon" className='w-12 h-12' />
                <div>
                  <p className='text-2xl font-medium text-gray-600'>{dashboardData.enrolledStudentsData.length}</p>
                  <p className='text-base text-gray-500'>Total Enrolments</p>
                </ div>
             </div>

             <div className='flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md' >
               <img src={assets.schedule} alt="patients_icon" className='w-12 h-12' />
                <div>
                  <p className='text-2xl font-medium text-gray-600'>{dashboardData.totalCourses}</p>
                  <p className='text-base text-gray-500'>Total Courses</p>
                </ div>
             </div>

             <div className='flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md' >
               <img src={assets.earning} alt="patients_icon" className='w-12 h-12' />
                <div>
                  <p className='text-2xl font-medium text-gray-600'>$ {dashboardData.totalEarnings}</p>
                  <p className='text-base text-gray-500'>Total Earning</p>
                </ div>
             </div>

           </div>
           <div>
            <h1 className='font-semibold text-2xl mx-3'>Latest Enrollments</h1>
            <div className="flex flex-col items-center max-w-4x1 w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
            <table className="table-fixed md:table-auto w-full overflow-hidden">
              <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left">
                <tr>
                  <th className='px-4 py-3 font-semibold hidden sm:table-cell text center'>#</th>
                <th className='px-4 py-3 font-semibold'>Student</th>
                <th className='px-4 py-3 font-semibold'>Course</th>
                </tr>
                
              </thead>
              <tbody className='text-sm text-gray-500'>
                {dashboardData.enrolledStudentsData.map((item,index)=>(
                   <tr className='border-b border-gray-500/20'>
                    <td className='px-4 py-3 text-center hidden sm:table-cell'>{index+1}</td>
                    <td className='md:px-4 px-2 py-3 flex items-center space-x-3'><img src={item.student.imageUrl} alt="student" className='w-9 h-9 rounded-full' /> <span className='truncate'>{item.student.name}</span> </td>
                    <td className='px-4 py-3 truncate '>{item.courseTitle}</td>
                   </tr>

              ))}
              </tbody>
              
            </table>
            </div>
           </div>
        </div>
    </div>
  ): <Loading />
}

export default Dashboard
