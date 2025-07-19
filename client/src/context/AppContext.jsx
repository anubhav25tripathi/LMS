import { createContext } from "react";
import { useState, useEffect } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";
export const AppContext = createContext()

export const AppContextProvider = (props)=>{
    const [allCourses, setAllCourses] = useState([]);
    const [isEducator,setIsEducator] = useState(true);
    const [enrolledCourses,setEnrolledCourses]=useState([])
    const navigate = useNavigate();
    const fetchAllCourses= async () => {
        setAllCourses(dummyCourses)
    }
    const fetchUserEnrolledCourses = async() =>{
        setEnrolledCourses(dummyCourses)
    }
    const calculaterating = (course) => {
        if(course.courseRatings.length === 0) return 0;
        const totalRating = course.courseRatings.reduce((acc, curr) => acc + curr.rating, 0);
        return (totalRating / course.courseRatings.length).toFixed(1);
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
        fetchUserEnrolledCourses();
    }, []);
    const value={
         currency:'$', allCourses,navigate,calculaterating,isEducator,
         calculateChapterTime,calculateCourseDuration,
         calculateNoOfLecture,enrolledCourses,fetchUserEnrolledCourses,
    }
    return (
        <AppContext.Provider value={value}>
        {props.children}
        </AppContext.Provider>
    ) 
}