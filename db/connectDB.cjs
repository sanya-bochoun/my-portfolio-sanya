/* ===============================================
   DATABASE CONNECTION MODULE
   - เชื่อมต่อกับ MongoDB database
   - จัดการ connection errors
=============================================== */

const mongoose = require("mongoose");
const dotenv = require("dotenv");

// โหลด environment variables
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
        // ไม่ออกจากโปรแกรม เพราะเว็บไซต์ทำงานได้โดยไม่ต้องใช้ database
        console.log("⚠️  Continuing without database connection");
    }
};

module.exports = connectDB;
