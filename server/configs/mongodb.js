import mongoose from 'mongoose';
const connectDB = async () => {
    mongoose.connection.on('connected',()=> console.log('Database connected'));
    console.log("Connecting to MongoDB:", process.env.MONGODB_URI);
    await mongoose.connect(`${process.env.MONGODB_URI}/courseseller`)
}
export default connectDB;