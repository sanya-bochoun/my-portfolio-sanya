/* ===============================================
   MAIN SERVER FILE
   - ตั้งค่า Express server
   - เชื่อมต่อฐานข้อมูล
   - กำหนด middlewares และ routes
=============================================== */

const express = require('express');
const router = require('./routes/routes.js');
const connectDB = require('./db/connectDB.js');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');

// โหลด environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// ===============================================
// MIDDLEWARE CONFIGURATION
// ===============================================

// กำหนดให้ Express ใช้งาน body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// กำหนดให้ Express ใช้งานไฟล์ในโฟลเดอร์ public
app.use(express.static(path.join(__dirname, 'public')));

// EJS Template Engine Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ===============================================
// DATABASE CONNECTION
// ===============================================

// กำหนดการเชื่อมต่อฐานข้อมูล
const DATABASEURL = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/portfolio';

if (!DATABASEURL) {
    console.error("❌ DATABASEURL is not defined. Check your .env file.");
    process.exit(1);
}

// เชื่อมต่อฐานข้อมูล (ถ้ามีการใช้งาน)
try {
    connectDB(DATABASEURL);
} catch (error) {
    console.log("⚠️  Database connection optional - continuing without DB");
}

// ===============================================
// ROUTES CONFIGURATION
// ===============================================

// สร้างเส้นทางสำหรับเรียกใช้งาน
app.use('/', router);

// ===============================================
// ERROR HANDLING MIDDLEWARE
// ===============================================

// Global error handler
app.use((err, req, res, next) => {
    console.error('Global error handler:', err);
    res.status(500).render('partials/layout', {
        title: 'Server Error',
        description: 'Internal server error occurred',
        keywords: 'error, server error',
        currentPage: 'error',
        bodyClass: 'error-page',
        body: '../404'
    });
});

// ===============================================
// START SERVER
// ===============================================

// เริ่มเซิร์ฟเวอร์และฟังที่พอร์ตที่กำหนด
app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
    console.log(`📁 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`💾 Database: ${DATABASEURL}`);
    console.log(`📂 Static files: ${path.join(__dirname, 'public')}`);
    console.log(`🎨 Views directory: ${path.join(__dirname, 'views')}`);
});

