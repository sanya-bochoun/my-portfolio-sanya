import mongoose from "mongoose";

// userModel.js
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    subjects: { type: String, required: true },
    message: { type: String, required: true }
});
const UserModel = mongoose.model("User", userSchema);

export default UserModel;