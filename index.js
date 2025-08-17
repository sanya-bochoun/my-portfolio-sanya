import express from 'express';
import router from './routes/routes.js';
import connectDB from './db/connectDB.js';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// กำหนดให้ Express ใช้งาน body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// กำหนดการเชื่อมต่อฐานข้อมูล
const DATABASEURL = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio';

if (!DATABASEURL) {
    console.error("❌ DATABASEURL is not defined. Check your .env file.");
    process.exit(1);
}

// เชื่อมต่อฐานข้อมูล (ทำให้เป็น optional เพื่อไม่ให้ app crash)
connectDB(DATABASEURL).catch(err => {
    console.log("⚠️ MongoDB connection failed, but server will continue running");
    console.log("Error:", err.message);
});

// กำหนดให้ Express ใช้งานไฟล์ในโฟลเดอร์ public
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

// ejs setup
app.set('view engine', 'ejs');
app.set('views', './views');

// // สร้างเส้นทางสำหรับเรียกใช้งาน
app.use('/', router);

// // เริ่มเซิร์ฟเวอร์และฟังที่พอร์ตที่กำหนด
app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});

