import express from 'express';
import {
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
} from '../controllers/adminController.js';
import {
    handleSingleUpload,
    handleMultipleUpload,
    deleteFile,
    getUploadedFiles
} from '../controllers/uploadController.js';

const adminRouter = express.Router();

// Public routes (no auth required)
adminRouter.get('/login', adminLogin);
adminRouter.post('/login', adminLoginPost);

// Protected routes (require auth)
adminRouter.use(requireAuth);

// Dashboard
adminRouter.get('/', adminDashboard);
adminRouter.get('/dashboard', adminDashboard);

// Logout
adminRouter.post('/logout', adminLogout);

// Projects Management
adminRouter.get('/projects', getProjects);
adminRouter.get('/projects/add', addProjectForm);
adminRouter.get('/projects/edit/:id', editProjectForm);
adminRouter.post('/projects/save/:id', saveProject);
adminRouter.delete('/projects/delete/:id', deleteProject);
adminRouter.post('/projects/bulk-delete', bulkDeleteProjects);

// Contacts Management
adminRouter.get('/contacts', getContacts);
adminRouter.post('/contacts/reply/:id', replyContact);
adminRouter.patch('/contacts/status/:id', updateContactStatus);
adminRouter.delete('/contacts/delete/:id', deleteContact);
adminRouter.post('/contacts/bulk-delete', bulkDeleteContacts);

// File Upload Routes
adminRouter.post('/upload/single', handleSingleUpload);
adminRouter.post('/upload/multiple', handleMultipleUpload);
adminRouter.get('/files', getUploadedFiles);
adminRouter.delete('/files/:filename', deleteFile);

export default adminRouter;
