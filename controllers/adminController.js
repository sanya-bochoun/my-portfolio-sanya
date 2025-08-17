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
    res.render('admin/login');
};

// Admin Login POST
const adminLoginPost = (req, res) => {
    const { pin } = req.body;
    
    if (pin === ADMIN_PIN) {
        req.session.isAdmin = true;
        res.redirect('/admin');
    } else {
        res.render('admin/login', { error: 'Invalid PIN' });
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
    res.render('admin/project-form', { project: null, action: 'add' });
};

// Edit Project Form
const editProjectForm = async (req, res) => {
    try {
        const project = await ProjectModel.findById(req.params.id);
        if (!project) {
            return res.status(404).send('Project not found');
        }
        res.render('admin/project-form', { project, action: 'edit' });
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
        
        // Convert comma-separated strings to arrays
        if (projectData.frameworks) {
            projectData.technologies = { 
                ...projectData.technologies,
                frameworks: projectData.frameworks.split(',').map(f => f.trim()).filter(f => f)
            };
        }
        
        if (projectData.languages) {
            projectData.technologies = { 
                ...projectData.technologies,
                languages: projectData.languages.split(',').map(l => l.trim()).filter(l => l)
            };
        }

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
