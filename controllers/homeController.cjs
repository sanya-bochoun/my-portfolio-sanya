import UserModel from "../model/userModel.js";

const homeController = async (req, res) => {
    try {
        res.render("index");
    } catch (error) {
        console.log(error.message);
    }
};

// User Contact Controller
const contactUserController = async (req, res) => {

    // เพื่อดูข้อมูลที่ส่งมาว่าถูกต้องไหม
    // console.log('Raw body:', req.body);
    // console.log("Form data:", req.body); // ดูข้อมูลที่ส่งมา
    
    try {
        const data = new UserModel({
            name: req.body.name,
            email: req.body.email,
            password: "defaultPass123",
            subjects: req.body.subject, // เปลี่ยนเป็น subjects แล้ว ต้องใช้ subject จาก form
            message: req.body.message
        });
        if(data) {
            await data.save();
            console.log("✅ Data saved successfully");
        }
        res.render("index");
    } catch (error) {
        console.log("❌ Error:", error);
        res.render("index");
    }
};

/* ===============================================
   HOME CONTROLLER
   - จัดการการ render หน้าต่างๆ ของเว็บไซต์
   - ส่งข้อมูลไปยัง views พร้อม metadata
   - จัดการ form submissions
=============================================== */

// ===============================================
// HOME PAGE CONTROLLER
// - แสดงหน้าแรกพร้อม Hero section
// ===============================================
const renderHome = (req, res) => {
    try {
        // ข้อมูลสำหรับหน้าแรก
        const pageData = {
            title: 'Home',
            description: 'Full Stack Developer & Civil Engineer Portfolio - Sanya Bochoun',
            keywords: 'full stack developer, civil engineer, portfolio, web development, bangkok',
            currentPage: 'home',
            bodyClass: 'index-page'
        };

        // render หน้าแรกด้วย layout
        res.render('partials/layout', {
            ...pageData,
            body: '../home'
        });
    } catch (error) {
        console.error('Error rendering home page:', error);
        res.status(500).send('Internal Server Error');
    }
};

// ===============================================
// ABOUT PAGE CONTROLLER  
// - แสดงหน้า About พร้อมข้อมูลส่วนตัว
// ===============================================
const renderAbout = (req, res) => {
    try {
        const pageData = {
            title: 'About Me',
            description: 'Learn more about Sanya Bochoun - Full Stack Developer and Civil Engineer with 5+ years experience',
            keywords: 'about, full stack developer, civil engineer, skills, experience',
            currentPage: 'about',
            bodyClass: 'about-page'
        };

        res.render('partials/layout', {
            ...pageData,
            body: '../about'
        });
    } catch (error) {
        console.error('Error rendering about page:', error);
        res.status(500).send('Internal Server Error');
    }
};

// ===============================================
// RESUME PAGE CONTROLLER
// - แสดงประวัติการศึกษาและประสบการณ์
// ===============================================
const renderResume = (req, res) => {
    try {
        const pageData = {
            title: 'Resume',
            description: 'Professional resume and work experience of Sanya Bochoun - Full Stack Developer & Civil Engineer',
            keywords: 'resume, cv, experience, education, certifications, skills',
            currentPage: 'resume',
            bodyClass: 'resume-page'
        };

        res.render('partials/layout', {
            ...pageData,
            body: '../resume'
        });
    } catch (error) {
        console.error('Error rendering resume page:', error);
        res.status(500).send('Internal Server Error');
    }
};

// ===============================================
// PORTFOLIO PAGE CONTROLLER
// - แสดงผลงานและโปรเจคต่างๆ
// ===============================================
const renderPortfolio = (req, res) => {
    try {
        const pageData = {
            title: 'Portfolio',
            description: 'View my latest projects and portfolio showcasing web development, mobile apps, and engineering solutions',
            keywords: 'portfolio, projects, web development, mobile apps, engineering, examples',
            currentPage: 'portfolio',
            bodyClass: 'portfolio-page'
        };

        res.render('partials/layout', {
            ...pageData,
            body: '../portfolio'
        });
    } catch (error) {
        console.error('Error rendering portfolio page:', error);
        res.status(500).send('Internal Server Error');
    }
};

// ===============================================
// SERVICES PAGE CONTROLLER
// - แสดงบริการและแพ็กเกจต่างๆ
// ===============================================
const renderServices = (req, res) => {
    try {
        const pageData = {
            title: 'Services',
            description: 'Professional web development, mobile app development, and engineering consulting services',
            keywords: 'services, web development, mobile app, consulting, packages, pricing',
            currentPage: 'services',
            bodyClass: 'services-page'
        };

        res.render('partials/layout', {
            ...pageData,
            body: '../services'
        });
    } catch (error) {
        console.error('Error rendering services page:', error);
        res.status(500).send('Internal Server Error');
    }
};

// ===============================================
// CONTACT PAGE CONTROLLER
// - แสดงหน้าติดต่อและฟอร์ม
// ===============================================
const renderContact = (req, res) => {
    try {
        const pageData = {
            title: 'Contact',
            description: 'Get in touch with Sanya Bochoun for your next project. Free consultation and quotes available',
            keywords: 'contact, consultation, quote, project, hire developer',
            currentPage: 'contact',
            bodyClass: 'contact-page'
        };

        res.render('partials/layout', {
            ...pageData,
            body: '../contact'
        });
    } catch (error) {
        console.error('Error rendering contact page:', error);
        res.status(500).send('Internal Server Error');
    }
};

// ===============================================
// CONTACT FORM SUBMISSION HANDLER
// - จัดการข้อมูลจากฟอร์มติดต่อ
// - บันทึกลงฐานข้อมูล (ถ้ามี)
// - ส่งอีเมลแจ้งเตือน (ถ้าตั้งค่า)
// ===============================================
const handleContactForm = async (req, res) => {
    try {
        // รับข้อมูลจากฟอร์ม
        const {
            name,
            email,
            phone,
            service,
            subject,
            budget,
            message
        } = req.body;

        // ตรวจสอบข้อมูลที่จำเป็น
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน'
            });
        }

        // ข้อมูลการติดต่อ
        const contactData = {
            name: name.trim(),
            email: email.trim().toLowerCase(),
            phone: phone ? phone.trim() : null,
            service: service || null,
            subject: subject.trim(),
            budget: budget || null,
            message: message.trim(),
            submittedAt: new Date(),
            ip: req.ip || req.connection.remoteAddress
        };

        // TODO: บันทึกลงฐานข้อมูล
        // const savedContact = await Contact.create(contactData);

        // TODO: ส่งอีเมลแจ้งเตือน
        // await sendNotificationEmail(contactData);

        // แสดงข้อมูลใน console สำหรับ development
        console.log('=== NEW CONTACT SUBMISSION ===');
        console.log('Name:', contactData.name);
        console.log('Email:', contactData.email);
        console.log('Phone:', contactData.phone);
        console.log('Service:', contactData.service);
        console.log('Subject:', contactData.subject);
        console.log('Budget:', contactData.budget);
        console.log('Message:', contactData.message);
        console.log('Submitted at:', contactData.submittedAt);
        console.log('=====================================');

        // ส่งกลับผลลัพธ์
        res.status(200).json({
            success: true,
            message: 'ข้อความของคุณถูกส่งเรียบร้อยแล้ว ผมจะติดต่อกลับโดยเร็วที่สุด!'
        });

    } catch (error) {
        console.error('Error handling contact form:', error);
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการส่งข้อความ กรุณาลองใหม่อีกครั้ง'
        });
    }
};

// ===============================================
// 404 ERROR HANDLER
// - จัดการหน้าที่ไม่พบ
// ===============================================
const render404 = (req, res) => {
    try {
        const pageData = {
            title: '404 - Page Not Found',
            description: 'Sorry, the page you are looking for could not be found.',
            keywords: '404, not found, error',
            currentPage: '404',
            bodyClass: 'error-page'
        };

        res.status(404).render('partials/layout', {
            ...pageData,
            body: '../404'
        });
    } catch (error) {
        console.error('Error rendering 404 page:', error);
        res.status(404).send('Page Not Found');
    }
};

// ===============================================
// EXPORTS
// - ส่งออก functions สำหรับใช้ใน routes
// ===============================================
module.exports = {
    renderHome,
    renderAbout,
    renderResume,
    renderPortfolio,
    renderServices,
    renderContact,
    handleContactForm,
    render404
};
