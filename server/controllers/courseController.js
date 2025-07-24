import Course from '../models/course.js';

export const getAllCourses= async (req, res) => {
     try{
          const courses= await Course.find({}).select(['-courseContent','-enrolledStudents']).populate({path:'educator'});
          res.json({success: true, courses});
     }
     catch(error){
         res.json({success: false, message: error.message});
     }
}
export const getCourseId= async (req, res) => {
    const {id} = req.params;
    try{
        const courseData= await Course.findById(id).populate({path:'educator'});
        courseData.courseContent.forEach(chapter => {
            chapter.chapterContent.forEach(lecture => {
                lecture.lectureUrl = lecture.isPreviewFree ? lecture.lectureUrl : ''; // Hide URL if not free preview
            });
        })
        res.json({success: true, courseData});
    }
    catch(error){
        res.json({success: false, message: error.message});
    }
}

