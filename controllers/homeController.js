import UserModel from "../model/userModel.js";
import ProjectModel from "../model/projectModel.js";

const homeController = async (req, res) => {
    try {
        // Get published projects for portfolio
        const projects = await ProjectModel.find({ status: 'published' })
            .sort({ order: 1, createdAt: -1 });
        
        res.render("index", { projects });
    } catch (error) {
        console.log(error.message);
        res.render("index", { projects: [] });
    }
};

// User Contact Controller
const contactUserController = async (req, res) => {

    // Debug: ดูข้อมูลที่ส่งมา
    console.log('📝 Form data received:', req.body);
    
    try {
        const data = new UserModel({
            name: req.body.name,
            email: req.body.email,
            subjects: req.body.subject || req.body.subjects, // รองรับทั้ง subject และ subjects
            message: req.body.message
        });
        if(data) {
            await data.save();
            console.log("✅ Data saved successfully");
        }
        res.redirect("/#contact");
    } catch (error) {
        console.log("❌ Error:", error);
        res.render("index");
    }
};

// homeController.js
export { homeController, contactUserController };
