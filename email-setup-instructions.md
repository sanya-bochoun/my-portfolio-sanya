# Email Setup Instructions

## ตั้งค่าส่งเมลจริง (Gmail)

### 1. สร้างไฟล์ `.env` ในโฟลเดอร์หลัก:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/portfolio

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM="Portfolio Admin" <noreply@portfolio.com>

# Admin Panel
ADMIN_PIN=1234
```

### 2. ตั้งค่า Gmail:

1. **เปิด 2-Factor Authentication** ในบัญชี Google ของคุณ
2. **สร้าง App Password**:
   - ไปที่: https://myaccount.google.com/apppasswords
   - เลือก "Other" และใส่ชื่อ "Portfolio App"
   - คัดลอก password ที่ได้มา
3. **แก้ไขไฟล์ .env**:
   - `EMAIL_USER` = Gmail address ของคุณ
   - `EMAIL_PASS` = App Password ที่ได้จากข้อ 2
   - `EMAIL_FROM` = ชื่อและอีเมลที่จะแสดงเป็นผู้ส่ง

### 3. ติดตั้ง dotenv:

```bash
npm install dotenv
```

### 4. อัพเดท index.js:

เพิ่มบรรทัดนี้ที่ต้นไฟล์:
```javascript
import 'dotenv/config';
```

## การทดสอบ (ไม่ใช้ Gmail จริง)

หากไม่ต้องการตั้งค่า Gmail ระบบจะใช้ Ethereal Email สำหรับทดสอบ:
- เมลจะไม่ส่งจริง แต่จะมี Preview URL ใน console
- เหมาะสำหรับการพัฒนาและทดสอบ

## ผลลัพธ์

เมื่อส่ง Reply แล้ว:
- ✅ บันทึกใน Database  
- ✅ ส่งเมลไปที่ `sbeak@jmail.com`
- ✅ แสดง Preview URL ใน console (หากใช้ Ethereal)
- ✅ แสดงข้อความยืนยันใน Admin Panel
