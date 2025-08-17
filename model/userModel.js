import mongoose from "mongoose";

// userModel.js
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, default: 'contact-user' }, // ไม่จำเป็นต้อง required สำหรับ contact form
    subjects: { type: String, required: true },
    message: { type: String, required: true },
    status: { 
        type: String, 
        enum: ['unread', 'read', 'replied'], 
        default: 'unread' 
    },
    adminReply: { type: String, default: '' },
    repliedAt: { type: Date },
    createdAt: { type: Date, default: Date.now }
});
const UserModel = mongoose.model("User", userSchema);

export default UserModel;