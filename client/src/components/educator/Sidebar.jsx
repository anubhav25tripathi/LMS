import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
    const {isEducator} = useContext(AppContext)
    const menuItems = [
           { name: 'Dashboard', path: '/educator', icon: assets.dashboard },
           { name:'Add Course', path: '/educator/add-course', icon: assets.add },
           { name: 'My Courses', path: '/educator/my-courses', icon: assets.book },
           { name: 'Student Enrolled', path: '/educator/student-enrolled', icon: assets.person_tick },
        ]
  return isEducator && (
    <div className='w-23 md:w-64 border-r min-h-screen text-base border-gray-500 py-2 flex flex-col gap-4 max-md:space-x-2 '>
        {menuItems.map((item)=>(
          <NavLink
          to={item.path} key={item.name}
            end={item.path==='/educator'} className={({isActive})=> `flex items-center md:flex-row flex-col  md:justify-start justify-center
           py-3.5 px-10 gap-3 ${isActive ? 'bg-indigo-50 border-r-[6px] border-indigo-500/90':'hover:bg-gray-100/90 border-r-[6px] border-white hover:border-gray-100/90'}`}>
            <img src={item.icon} alt="" className='w-6 h-6' />
            <p className='md:block hidden text-center'>{item.name}</p>
          </NavLink>
        ))}
      
    </div>
  )
}

export default Sidebar
