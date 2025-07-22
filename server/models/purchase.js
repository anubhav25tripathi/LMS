import mongoose from "mongoose";
const purchaseSchema = new mongoose.Schema({
    courseId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Course' },
    userId: { type: String, required: true, ref: 'User' },
    amount: { type: Number, required: true }, // Amount paid for the course
    status: { type: String, required: true, enum: ['pending', 'completed', 'failed'], default: 'pending' },
}, { timestamps: true });
const Purchase = mongoose.model('Purchase', purchaseSchema);
export default Purchase;
    
