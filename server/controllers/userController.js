import User from "../models/User.js";
import Stripe from "stripe";
import Purchase from "../models/purchase.js";
import Course from "../models/course.js";
import { CourseProgress } from "../models/courseProgress.js";
export const getUserData= async (req, res) => {
   
   try{
        const userId=req.auth.userId;
        const user=await User.findById(userId)
        if(!user){
            return res.status(404).json({success: false, message: 'User not found'});
        }
        res.json({success: true, user});
   }
   catch(error){
       res.json({success: false, message: error.message});
   }
}
export const userEnrolledCourses= async (req, res) => {
    try{
        const userId=req.auth.userId;
        const user=await User.findById(userId).populate('enrolledCourses');
        if(!user){
            return res.json({success: false, message: 'User not found'});
        }
        res.json({success: true, enrolledCourses: user.enrolledCourses});
    }
    catch(error){
        res.json({success: false, message: error.message});
    }
}

export const purchaseCourse= async (req, res) => {
     try{
        const {courseId} = req.body;
        const {origin}= req.headers;
        const userId=req.auth.userId;
        const userData=await User.findById(userId);
        const courseData=await Course.findById(courseId);
        if(!courseData || !userData){
            return res.status(404).json({success: false, message: 'Data not found'});
        }
        const purchaseData={
            courseId: courseData._id,
            userId,
            amount: (courseData.coursePrice-courseData.discount*courseData.coursePrice/100).toFixed(2),
        }
        const newPurchase= await Purchase.create(purchaseData);
        const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
        const currency=process.env.CURRENCY.toLowerCase();
        const line_items = [
            {
                price_data: {
                    currency,
                    product_data: {
                        name: courseData.courseTitle,
                    },
                    unit_amount: newPurchase.amount * 100, // Convert to cents
                },
                quantity: 1,
            }
        ]
        const session =await stripeInstance.checkout.sessions.create({
           success_url:`${origin}/loading/my-enrollments`,
            cancel_url:`${origin}/`,
            line_items: line_items,
            mode: 'payment',
            metadata: {
                purchaseId: newPurchase._id.toString(),
            }
        })
        res.json({success: true, session_url: session.url});

     }
     catch(error){
         res.json({success: false, message: error.message});
     }
}

export const updateCourseProgress = async (req, res) => {
    try{
        const userId=req.auth.userId;
        const {courseId, lectureId} = req.body;
        const progressData = await CourseProgress.findOne({ userId, courseId });
        if(progressData){
            if(progressData.lectureCompleted.includes(lectureId)){
                return res.json({success: false, message: 'Lecture already completed'});
            }
            progressData.lectureCompleted.push(lectureId);
            await progressData.save();
        }
        else{
            await CourseProgress.create({
                userId,
                courseId,
                lectureCompleted: [lectureId]
            });
        }
        res.json({success: true, message: 'Progress updated successfully'});
}
    catch(error){
        res.json({success: false, message: error.message});
    }
}

export const getUserCourseProgress= async (req, res) => {
   try{
      const userId=req.auth.userId;
        const {courseId} = req.body;
        const progressData = await CourseProgress.findOne({ userId, courseId });
        res.json({success:true,progressData})
   }
   catch(error){
       res.json({success: false, message: error.message});
   }
}

export const addUserRating = async (req, res) => {
    const userId= req.auth.userId;
    const {courseId, rating} = req.body;
    if(!userId || !courseId || !rating || rating < 1 || rating > 5){
        return res.json({success: false, message: 'Invalid input'});
    }
    try {
       const course=await Course.findById(courseId);
       if(!course){
              return res.json({success: false, message: 'Course not found'});
       }
       const user=await User.findById(userId);
       if(!user || !user.enrolledCourses.includes(courseId)){
           return res.json({success: false, message: 'User has not purchased this course'});
       }
       const existingRatingIndex = course.courseRatings.findIndex(r => r.userId === userId);
       if(existingRatingIndex > -1){
              course.courseRatings[existingRatingIndex].rating = rating;
       }
       else{
                course.courseRatings.push({userId, rating});
       }
       await course.save();
       res.json({success: true, message: 'Rating added successfully'});
    }
    catch (error) {
        res.json({success: false, message: error.message});
    }
}