 import React from 'react'
 import { assets } from '../../assets/assets'
 import { Link, useLocation } from 'react-router-dom'
 import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
  import { useContext } from 'react'
  import { AppContext } from '../../context/AppContext'

 const Navbar = () => {
  const location = useLocation();
  const {navigate,isEducator}= useContext(AppContext);
   const isCourseListPage = location.pathname.includes('/course-list');
   const {openSignIn} = useClerk();
   const { user } = useUser();

  return (
     <div className={`flex  w-full items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 py-4 border-b border-gray-500 shadow-md ${isCourseListPage ? 'bg-white' : 'bg-cyan-100/70'}`}>
      <img src={assets.logo} alt="Logo" onClick={()=> navigate('/')} className='w-28 lg:w-32 h-[10vh] cursor-pointer' /> 
      <div className='hidden md:flex items-center gap-5 text-gray-700'>
        <div className="flex items-center gap-5">
          {user && <>
           <button className='m-2' onClick={()=> navigate('/educator')}>{isEducator ? 'Educator Dashboard':'Become Educator'}</button>
          <Link to='/my-enrollments' >My Enrollments</Link> </>}
         </div>
         {user ? <UserButton/> :
         <button className='bg-blue-600 text-white px-5 py-2 rounded-full ' onClick={()=>openSignIn()}>Create Account</button>
    }
       </div>
       <div className='md:hidden flex items-center gap-2 sm:gap-5 text-gray-500'>
        <div className='gap-4' >
        { user && <>
           <button className='m-2' onClick={()=> navigate('/educator')}>{isEducator ? 'Educator Dashboard':'Become Educator'}</button>
          <Link to='/my-enrollments' >My Enrollments</Link> </>}
         </div>
         {user? <UserButton/> : <button onClick={()=> openSignIn()}><img src={assets.user_icon} className='w-20 h-[6vh] cursor-pointer' alt=""/></button>}
       </div>
     </div>
   )
 }
 export default Navbar

