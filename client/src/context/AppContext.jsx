import { createContext } from "react";
import { useState, useEffect } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import {useAuth, useUser} from "@clerk/clerk-react";
import axios from "axios";
import {toast} from "react-toastify";
export const AppContext = createContext()

export const AppContextProvider = (props)=>{
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [allCourses, setAllCourses] = useState([]);
    const [isEducator,setIsEducator] = useState(false);
    const [enrolledCourses,setEnrolledCourses]=useState([])
    const { getToken } = useAuth();
    const { user } = useUser();
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    const currency = '$';
    const fetchAllCourses= async () => {
        try{
            const {data} = await axios.get(`${backendUrl}/api/course/allCourses`);
            if(data.success){
                setAllCourses(data.courses);
            }else{
                toast.error(data.message);
            }
        }
        catch(err){
            toast.error(err.message);
        }
    }
    //fetch user data
    const fetchUserData= async ()=>{
        if(user.publicMetadata.role==='educator'){
            setIsEducator(true);
        }
        try{
            const token= await getToken();
            const {data}= await axios.get(backendUrl + '/api/user/data',{headers:{Authorization:`Bearer ${token}`}});
            if(data.success){
                setUserData(data.user)
            }
            else{
                toast.error(data.message);
            }
        }
        catch(error){
           toast.error(error.message)
        }
    }
    const fetchUserEnrolledCourses = async() =>{
      try{
            const token=await getToken();
        const {data}= await axios.get(backendUrl +'/api/user/enrolled-courses',{headers:{Authorization:`Bearer ${token}`}})
        if(data.success){
            setEnrolledCourses(data.enrolledCourses.reverse());
        }
        else{
            toast.error(data.message);
        }
      }
      catch(error){
        toast.error(error.message);
      }
        
    }
    const calculaterating = (course) => {
        if(course.courseRatings.length === 0) return 0;
        const totalRating = course.courseRatings.reduce((acc, curr) => acc + curr.rating, 0);
        return Math.floor(totalRating / course.courseRatings.length);
    }
    const calculateChapterTime= (chapter)=>{
      let time=0;
      chapter.chapterContent.map((lecture)=> time+=lecture.lectureDuration)
      return humanizeDuration(time*60*1000,{units:["h","m"]})
    }
    const calculateCourseDuration= (course)=>{
        let time=0;
        course.courseContent.map((chapter)=> chapter.chapterContent.map((lecture)=> time+=lecture.lectureDuration))
        return humanizeDuration(time*60*1000,{units :["h","m"]})
    }
    const calculateNoOfLecture = (course)=>{
        let totalLecture=0;
        course.courseContent.forEach((chapter) => totalLecture+=chapter.chapterContent.length);
        return totalLecture;
    }
    
    useEffect(() => {
        fetchAllCourses();
        
    }, []);
   
    useEffect(() => {
       if(user){
        fetchUserData();
        fetchUserEnrolledCourses();
       }
    },[user])
    const value={
         currency, allCourses,navigate,calculaterating,isEducator,
         calculateChapterTime,calculateCourseDuration,
         calculateNoOfLecture,enrolledCourses,fetchUserEnrolledCourses,backendUrl,
         fetchAllCourses,userData,setUserData,getToken,setIsEducator,
    }
    return (
        <AppContext.Provider value={value}>
        {props.children}
        </AppContext.Provider>
    ) 
}