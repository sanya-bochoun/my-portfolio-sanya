import ProjectModel from "../model/projectModel.js";
import UserModel from "../model/userModel.js";
import { sendReplyEmail } from "../services/emailService.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Admin PIN - ในโปรเจคจริงควรเก็บใน environment variable
const ADMIN_PIN = process.env.ADMIN_PIN || "1234";

// Security: Login attempt tracking
const loginAttempts = new Map(); // Store IP -> { attempts, lockoutUntil, lastAttempt }
const MAX_ATTEMPTS = 5; // Maximum failed attempts before lockout
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes lockout
const RATE_LIMIT_WINDOW = 5 * 60 * 1000; // 5 minutes window for rate limiting

// Helper function to get client IP
const getClientIP = (req) => {
    return req.ip || 
           req.connection.remoteAddress || 
           req.socket.remoteAddress || 
           (req.connection.socket ? req.connection.socket.remoteAddress : null) ||
           req.headers['x-forwarded-for']?.split(',')[0] ||
           '127.0.0.1';
};

// Helper function to check if IP is locked out
const isLockedOut = (ip) => {
    const attempts = loginAttempts.get(ip);
    if (!attempts) return false;
    
    if (attempts.lockoutUntil && Date.now() < attempts.lockoutUntil) {
        return true;
    }
    
    // Reset if lockout period has passed
    if (attempts.lockoutUntil && Date.now() >= attempts.lockoutUntil) {
        loginAttempts.delete(ip);
        return false;
    }
    
    return false;
};

// Helper function to record failed attempt
const recordFailedAttempt = (ip) => {
    const now = Date.now();
    const attempts = loginAttempts.get(ip) || { attempts: 0, lastAttempt: 0 };
    
    // Reset attempts if outside rate limit window
    if (now - attempts.lastAttempt > RATE_LIMIT_WINDOW) {
        attempts.attempts = 1;
    } else {
        attempts.attempts += 1;
    }
    
    attempts.lastAttempt = now;
    
    // Lock out if max attempts reached
    if (attempts.attempts >= MAX_ATTEMPTS) {
        attempts.lockoutUntil = now + LOCKOUT_DURATION;
        console.log(`[SECURITY] IP ${ip} locked out for ${LOCKOUT_DURATION/60000} minutes after ${attempts.attempts} failed attempts`);
    }
    
    loginAttempts.set(ip, attempts);
    
    // Log suspicious activity
    console.log(`[SECURITY] Failed login attempt ${attempts.attempts}/${MAX_ATTEMPTS} from IP: ${ip}`);
    
    return attempts;
};

// Helper function to clear successful login
const clearLoginAttempts = (ip) => {
    if (loginAttempts.has(ip)) {
        loginAttempts.delete(ip);
        console.log(`[SECURITY] Login attempts cleared for IP: ${ip}`);
    }
};

// Admin Dashboard
const adminDashboard = async (req, res) => {
    try {
        const totalProjects = await ProjectModel.countDocuments();
        const publishedProjects = await ProjectModel.countDocuments({ status: 'published' });
        const draftProjects = await ProjectModel.countDocuments({ status: 'draft' });
        const totalContacts = await UserModel.countDocuments();
        const unreadContacts = await UserModel.countDocuments({ status: 'unread' });

        const recentProjects = await ProjectModel.find()
            .sort({ updatedAt: -1 })
            .limit(5);

        const recentContacts = await UserModel.find()
            .sort({ createdAt: -1 })
            .limit(5);

        res.render('admin/dashboard', {
            stats: {
                totalProjects,
                publishedProjects,
                draftProjects,
                totalContacts,
                unreadContacts
            },
            recentProjects,
            recentContacts
        });
    } catch (error) {
        console.error('Admin Dashboard Error:', error);
        res.status(500).send('Server Error');
    }
};

// Admin Login
const adminLogin = (req, res) => {
    const clientIP = getClientIP(req);
    
    // Check if IP is currently locked out
    if (isLockedOut(clientIP)) {
        const attempts = loginAttempts.get(clientIP);
        const remainingTime = Math.ceil((attempts.lockoutUntil - Date.now()) / 60000);
        
        return res.render('admin/login', {
            error: `Too many failed attempts. Account locked for ${remainingTime} minutes.`,
            lockout: true,
            remainingTime: remainingTime
        });
    }
    
    res.render('admin/login', {
        lockout: false
    });
};

// Admin Login POST
const adminLoginPost = (req, res) => {
    const { pin } = req.body;
    const clientIP = getClientIP(req);
    
    // Check if IP is locked out
    if (isLockedOut(clientIP)) {
        const attempts = loginAttempts.get(clientIP);
        const remainingTime = Math.ceil((attempts.lockoutUntil - Date.now()) / 60000);
        
        console.log(`[SECURITY] Blocked login attempt from locked IP: ${clientIP}`);
        return res.render('admin/login', { 
            error: `Too many failed attempts. Account locked for ${remainingTime} minutes.`,
            lockout: true,
            remainingTime: remainingTime
        });
    }
    
    // Validate PIN input
    if (!pin || typeof pin !== 'string') {
        recordFailedAttempt(clientIP);
        return res.render('admin/login', { 
            error: 'Invalid PIN format',
            lockout: false
        });
    }
    
    // Remove any non-numeric characters for security
    const cleanPin = pin.replace(/[^0-9]/g, '');
    
    // Check PIN length (should be reasonable)
    if (cleanPin.length < 3 || cleanPin.length > 10) {
        recordFailedAttempt(clientIP);
        return res.render('admin/login', { 
            error: 'Invalid PIN length',
            lockout: false
        });
    }
    
    // Check PIN against admin PIN
    if (cleanPin === ADMIN_PIN) {
        // Successful login
        clearLoginAttempts(clientIP);
        req.session.isAdmin = true;
        
        console.log(`[SECURITY] Successful admin login from IP: ${clientIP}`);
        res.redirect('/admin');
    } else {
        // Failed login
        const attempts = recordFailedAttempt(clientIP);
        
        let errorMessage = 'Invalid PIN';
        if (attempts.attempts >= 3) {
            const remaining = MAX_ATTEMPTS - attempts.attempts;
            errorMessage = `Invalid PIN. ${remaining} attempts remaining before lockout.`;
        }
        
        res.render('admin/login', { 
            error: errorMessage,
            attempts: attempts.attempts,
            maxAttempts: MAX_ATTEMPTS,
            lockout: false
        });
    }
};

// Admin Logout
const adminLogout = (req, res) => {
    req.session.destroy();
    res.redirect('/admin/login');
};

// Projects Management
const getProjects = async (req, res) => {
    try {
        const projects = await ProjectModel.find().sort({ order: 1, createdAt: -1 });
        res.render('admin/projects', { projects });
    } catch (error) {
        console.error('Get Projects Error:', error);
        res.status(500).send('Server Error');
    }
};

// Add Project Form
const addProjectForm = (req, res) => {
    const techOptions = {
        frameworks: ['react', 'nextjs', 'aspnet', 'reactnative', 'django', 'ejs'],
        languages: ['javascript', 'typescript', 'nodejs', 'csharp', 'python', 'go', 'bun'],
        projectTypes: ['app', 'website', 'mobileapp']
    };
    res.render('admin/project-form', { project: null, action: 'add', techOptions });
};

// Edit Project Form
const editProjectForm = async (req, res) => {
    try {
        const project = await ProjectModel.findById(req.params.id);
        if (!project) {
            return res.status(404).send('Project not found');
        }
        const techOptions = {
            frameworks: ['react', 'nextjs', 'aspnet', 'reactnative', 'django', 'ejs'],
            languages: ['javascript', 'typescript', 'nodejs', 'csharp', 'python', 'go', 'bun'],
            projectTypes: ['app', 'website', 'mobileapp']
        };
        res.render('admin/project-form', { project, action: 'edit', techOptions });
    } catch (error) {
        console.error('Edit Project Form Error:', error);
        res.status(500).send('Server Error');
    }
};

// Save Project
const saveProject = async (req, res) => {
    try {
        const { id } = req.params;
        const projectData = req.body;
        
        console.log('Raw projectData:', JSON.stringify(projectData, null, 2));
        
        // Fix mainImage if it's an array (take the last non-empty value)
        if (Array.isArray(projectData.mainImage)) {
            console.log('mainImage is array:', projectData.mainImage);
            projectData.mainImage = projectData.mainImage.filter(img => img && img.trim()).pop() || '';
            console.log('mainImage after fix:', projectData.mainImage);
        }
        
        // Fix galleryImages if it's not an array
        if (projectData.galleryImages && !Array.isArray(projectData.galleryImages)) {
            projectData.galleryImages = [projectData.galleryImages];
        }
        if (Array.isArray(projectData.galleryImages)) {
            projectData.galleryImages = projectData.galleryImages.filter(img => img && img.trim());
        }
        
        // Ensure mainImage is a string
        if (typeof projectData.mainImage !== 'string') {
            console.log('mainImage is not string, converting:', typeof projectData.mainImage, projectData.mainImage);
            projectData.mainImage = String(projectData.mainImage || '');
        }
        
        // Handle technologies data (no longer need to convert from comma-separated)
        // frameworks and languages now come as arrays from multiple select
        console.log('Technologies data:', projectData.technologies);

        if (id && id !== 'new') {
            // Update existing project
            await ProjectModel.findByIdAndUpdate(id, projectData);
        } else {
            // Create new project
            const project = new ProjectModel(projectData);
            await project.save();
        }

        res.redirect('/admin/projects');
    } catch (error) {
        console.error('Save Project Error:', error);
        res.status(500).send('Server Error');
    }
};

// Delete Project
const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Attempting to delete project with ID:', id);
        
        const deletedProject = await ProjectModel.findByIdAndDelete(id);
        
        if (!deletedProject) {
            console.log('Project not found with ID:', id);
            return res.status(404).json({ success: false, error: 'Project not found' });
        }
        
        console.log('Project deleted successfully:', deletedProject.title);
        res.json({ success: true, message: 'Project deleted successfully' });
    } catch (error) {
        console.error('Delete Project Error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// Bulk Delete Projects
const bulkDeleteProjects = async (req, res) => {
    try {
        const { ids } = req.body;
        await ProjectModel.deleteMany({ _id: { $in: ids } });
        res.json({ success: true });
    } catch (error) {
        console.error('Bulk Delete Error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// Contacts Management
const getContacts = async (req, res) => {
    try {
        const contacts = await UserModel.find().sort({ createdAt: -1 });
        res.render('admin/contacts', { contacts });
    } catch (error) {
        console.error('Get Contacts Error:', error);
        res.status(500).send('Server Error');
    }
};

// Reply to Contact
const replyContact = async (req, res) => {
    try {
        const { id } = req.params;
        const { reply } = req.body;
        
        // Get contact details
        const contact = await UserModel.findById(id);
        if (!contact) {
            return res.status(404).json({ success: false, error: 'Contact not found' });
        }
        
        // Update database
        await UserModel.findByIdAndUpdate(id, {
            adminReply: reply,
            status: 'replied',
            repliedAt: new Date()
        });
        
        // Send email reply
        try {
            const emailResult = await sendReplyEmail(
                contact.email,
                contact.name,
                contact.subjects,
                reply,
                contact.message
            );
            
            if (emailResult.success) {
                console.log('Reply email sent successfully to:', contact.email);
                if (emailResult.previewUrl) {
                    console.log('Email preview:', emailResult.previewUrl);
                }
            } else {
                console.error('Failed to send reply email:', emailResult.error);
            }
        } catch (emailError) {
            console.error('Email sending error:', emailError);
            // Don't fail the request if email fails, just log it
        }

        res.json({ 
            success: true, 
            message: 'Reply saved and email sent successfully'
        });
    } catch (error) {
        console.error('Reply Contact Error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// Update Contact Status
const updateContactStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        await UserModel.findByIdAndUpdate(id, { status });
        res.json({ success: true });
    } catch (error) {
        console.error('Update Contact Status Error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// Delete Contact Message
const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Attempting to delete contact with ID:', id);
        
        const deletedContact = await UserModel.findByIdAndDelete(id);
        
        if (!deletedContact) {
            console.log('Contact not found with ID:', id);
            return res.status(404).json({ success: false, error: 'Contact not found' });
        }
        
        console.log('Contact deleted successfully:', deletedContact.email);
        res.json({ success: true, message: 'Contact deleted successfully' });
    } catch (error) {
        console.error('Delete Contact Error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// Bulk Delete Contacts
const bulkDeleteContacts = async (req, res) => {
    try {
        const { ids } = req.body;
        console.log('Attempting to bulk delete contacts with IDs:', ids);
        
        const result = await UserModel.deleteMany({ _id: { $in: ids } });
        
        console.log('Bulk delete result:', result);
        res.json({ success: true, deletedCount: result.deletedCount });
    } catch (error) {
        console.error('Bulk Delete Contacts Error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// Middleware to check admin authentication
const requireAuth = (req, res, next) => {
    if (req.session?.isAdmin) {
        next();
    } else {
        // Check if it's an API request (JSON)
        if (req.headers['content-type'] === 'application/json' || req.xhr) {
            return res.status(401).json({ 
                success: false, 
                error: 'Unauthorized. Please login again.',
                redirect: '/admin/login'
            });
        }
        res.redirect('/admin/login');
    }
};

export {
    adminDashboard,
    adminLogin,
    adminLoginPost,
    adminLogout,
    getProjects,
    addProjectForm,
    editProjectForm,
    saveProject,
    deleteProject,
    bulkDeleteProjects,
    getContacts,
    replyContact,
    updateContactStatus,
    deleteContact,
    bulkDeleteContacts,
    requireAuth
};
