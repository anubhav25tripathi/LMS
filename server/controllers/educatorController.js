import {clerkClient} from '@clerk/express';
import Course from '../models/course.js';
import Purchase from '../models/purchase.js';
import { v2 as cloudinary} from 'cloudinary';
export const updateRollToEducator= async (req,res)=>{
    try{
        const userId= req.auth.userId
        await clerkClient.users.updateUser(userId, {
            publicMetadata: {
                role: 'educator',
            }
        });
        res.status(200).json({message: "you can publish your courses now"});
    }
    catch(error){
        res.status(500).json({success: false, message: error.message});
    }
}
export const addCourse = async (req, res) => {
    try{
        
        const {courseData} = req.body;
        const imageFile = req.file;
        const educatorId = req.auth.userId; // Assuming you're using multer for file uploads
        if(!imageFile){
            return res.status(400).json({success: false, message: "Image file is required"});
        }
        const parsedCourseData = await JSON.parse(courseData);
        parsedCourseData.educator = educatorId; // Set the educator ID from the
        const newCourse= await Course.create(parsedCourseData);
        const imageUpload=await cloudinary.uploader.upload(imageFile.path);
        newCourse.courseThumbnail = imageUpload.secure_url; // Set the course thumbnail URL
        await newCourse.save();
        res.json({success: true, message: "Course created successfully"});


    }
    catch(error){
        res.status(500).json({success: false, message: error.message});
    }
}

export const getEducatorCourses = async (req, res) => {
    try{
        const educatorId = req.auth.userId;
        const courses = await Course.find({educator:educatorId})
        res.json({success: true, courses});
    }
    catch(error){
        res.status(500).json({success: false, message: error.message});
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
        res.status(500).json({success: false, message: error.message});
    }
}

export const getEnrolledStudentsData = async (req, res) => {
    try{
        const educatorId = req.auth.userId;
        const courses = await Course.find({educator: educatorId});
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
        res.status(500).json({success: false, message: error.message});
    }
}