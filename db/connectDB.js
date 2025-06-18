import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async (DATABASEURL) => {
    try {
        const DB_OPTIONS = {
            dbName: "portfolio",
        };

        await mongoose.connect(DATABASEURL, DB_OPTIONS);
        console.log("✅ Database connection successful");
    } catch (err) {
        console.error("❌ Database connection failed:", err.message);
        process.exit(1); // ออกจากโปรแกรมถ้าเชื่อมต่อไม่ได้
    }
};

export default connectDB;
