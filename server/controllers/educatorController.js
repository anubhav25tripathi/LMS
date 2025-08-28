import {clerkClient} from '@clerk/express';
import Course from '../models/course.js';
import Purchase from '../models/purchase.js';
import { v2 as cloudinary} from 'cloudinary';
import User from '../models/User.js';
export const updateRollToEducator= async (req,res)=>{
    try{
        const userId= req.auth.userId
        await clerkClient.users.updateUser(userId, {
            publicMetadata: {
                role: 'educator',
            }
        });
        res.json({success:true ,message: "you can publish your courses now"});
    }
    catch(error){
        res.json({success: false, message: error.message});
    }
}
export const addCourse = async (req, res) => {
    try{
        
        const {courseData} = req.body;
        const imageFile = req.file;
        const educatorId = req.auth.userId; // Assuming you're using multer for file uploads
        if(!imageFile){
            return res.json({success: false, message: "Image file is required"});
        }
        const parsedCourseData = JSON.parse(courseData);
        parsedCourseData.educator = educatorId; // Set the educator ID from the
        const imageUpload=await cloudinary.uploader.upload(imageFile.path);
        parsedCourseData.courseThumbnail = imageUpload.secure_url; // Set the course thumbnail URL
        const newCourse= await Course.create(parsedCourseData);
        
        res.json({success: true, message: "Course created successfully"});


    }
    catch(error){
        res.json({success: false, message: error.message});
    }
}

export const getEducatorCourses = async (req, res) => {
    try{
        const educatorId = req.auth.userId;
        const courses = await Course.find({educator:educatorId})
        res.json({success: true, courses});
    }
    catch(error){
        res.json({success: false, message: error.message});
    }
}
export const educatorDashboard = async (req, res) => {
    try{
        const educatorId = req.auth.userId;
        const courses = await Course.find({educator:educatorId});
        const totalCourses = courses.length;
        const courseIds = courses.map(course => course._id);
        const purchases= await Purchase.find({ courseId: { $in: courseIds }, status: 'completed' });
        const totalEarnings = purchases.reduce((total, purchase) => total + purchase.amount, 0);
        const enrolledStudentsData=[];
        for (const course of courses) {
            const students=await User.find({ _id: { $in: course.enrolledStudents } },'name imageUrl');
            students.forEach(student => {
                enrolledStudentsData.push({ 
                    courseTitle: course.courseTitle,
                    student
                })
                    
            })
        }
        res.json({
            success: true,
            dashboardData:{
               totalEarnings,
                totalCourses,
                enrolledStudentsData
            }
        });
    }
    catch(error){
        res.json({success: false, message: error.message});
    }
}

/*export const getEnrolledStudentsData = async (req, res) => {
    try{
        const educator = req.auth.userId;
        const courses = await Course.find({educator});
        const courseIds = courses.map(course => course._id);
        const purchases = await Purchase.find({ courseId: { $in: courseIds }, status: 'completed' })
        .populate('userId', 'name imageUrl').populate('courseId', 'courseTitle');
        const enrolledStudentsData= purchases.map(purchase => ({
            student:purchase.userId,
            courseTitle: purchase.courseId.courseTitle,
            purchaseDate: purchase.createdAt,
        }))
        res.json({ success: true, enrolledStudentsData });
    }
    catch(error){
        res.json({success: false, message: error.message});
    }
}*/
export const getEnrolledStudentsData = async (req, res) => {
  try {
    const educatorId = req.auth.userId;

    // get all courses created by educator
    const courses = await Course.find({ educator: educatorId });
    const courseIds = courses.map(course => course._id);

    // find completed purchases for those courses
    const purchases = await Purchase.find({ 
      courseId: { $in: courseIds }, 
      status: 'completed' 
    })
    .populate('courseId', 'courseTitle') // course info
    .populate('userId', 'name imageUrl'); // student info

    // map into frontend-friendly structure
    const enrolledStudents = purchases.map(purchase => ({
      student: {
        _id: purchase.userId._id,
        name: purchase.userId.name,
        imageUrl: purchase.userId.imageUrl
      },
      courseTitle: purchase.courseId.courseTitle,
      purchaseDate: purchase.createdAt,
    }));

    res.json({ success: true, enrolledStudents });
  } catch (error) {
    console.error("Error fetching enrolled students:", error);
    res.json({ success: false, message: error.message });
  }
};