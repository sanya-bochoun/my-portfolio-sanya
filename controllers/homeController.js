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

// homeController.js
export { homeController, contactUserController };
