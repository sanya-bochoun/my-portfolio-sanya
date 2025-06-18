/* ===============================================
   ROUTES CONFIGURATION
   - กำหนด routes สำหรับหน้าต่างๆ ของเว็บไซต์
   - จัดการ GET และ POST requests
   - เชื่อมต่อกับ controllers
=============================================== */

const express = require('express');
const router = express.Router();

// นำเข้า controllers
const {
    renderHome,
    renderAbout,
    renderResume,
    renderPortfolio,
    renderServices,
    renderContact,
    handleContactForm,
    render404
} = require('../controllers/homeController');

// ===============================================
// MAIN NAVIGATION ROUTES
// - Routes หลักสำหรับการนำทาง
// ===============================================

// หน้าแรก (Home)
router.get('/', renderHome);
router.get('/home', renderHome);

// หน้า About
router.get('/about', renderAbout);

// หน้า Resume
router.get('/resume', renderResume);

// หน้า Portfolio
router.get('/portfolio', renderPortfolio);

// หน้า Services
router.get('/services', renderServices);

// หน้า Contact
router.get('/contact', renderContact);

// ===============================================
// FORM HANDLING ROUTES
// - Routes สำหรับจัดการ form submissions
// ===============================================

// Contact Form Submission
router.post('/contact', handleContactForm);

// ===============================================
// LEGACY ROUTES (เพื่อ backward compatibility)
// - Routes เก่าที่อาจมีการ bookmark ไว้
// ===============================================

// Redirect legacy index.html to home
router.get('/index.html', (req, res) => {
    res.redirect(301, '/');
});

// Redirect legacy index routes
router.get('/index', (req, res) => {
    res.redirect(301, '/');
});

// ===============================================
// API ROUTES (สำหรับ AJAX requests)
// - Routes สำหรับการส่งข้อมูลแบบ JSON
// ===============================================

// API endpoint สำหรับ contact form (AJAX)
router.post('/api/contact', handleContactForm);

// API endpoint สำหรับ portfolio data (ในอนาคต)
router.get('/api/portfolio', (req, res) => {
    // TODO: Implement portfolio API
    res.json({
        success: true,
        message: 'Portfolio API endpoint - Coming soon',
        data: []
    });
});

// API endpoint สำหรับ services data (ในอนาคต)
router.get('/api/services', (req, res) => {
    // TODO: Implement services API
    res.json({
        success: true,
        message: 'Services API endpoint - Coming soon',
        data: []
    });
});

// ===============================================
// UTILITY ROUTES
// - Routes สำหรับการทดสอบและ utilities
// ===============================================

// Health check endpoint
router.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Sitemap.xml (สำหรับ SEO)
router.get('/sitemap.xml', (req, res) => {
    const baseUrl = req.protocol + '://' + req.get('host');
    
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${baseUrl}/</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>${baseUrl}/about</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>${baseUrl}/resume</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>${baseUrl}/portfolio</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>${baseUrl}/services</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>
    <url>
        <loc>${baseUrl}/contact</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
    </url>
</urlset>`;

    res.set('Content-Type', 'text/xml');
    res.send(sitemap);
});

// Robots.txt (สำหรับ SEO)
router.get('/robots.txt', (req, res) => {
    const baseUrl = req.protocol + '://' + req.get('host');
    
    const robots = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

Sitemap: ${baseUrl}/sitemap.xml`;

    res.set('Content-Type', 'text/plain');
    res.send(robots);
});

// ===============================================
// ERROR HANDLING ROUTES
// - Routes สำหรับจัดการ errors
// ===============================================

// 404 Handler - ต้องอยู่ท้ายสุด
router.use('*', render404);

// ===============================================
// EXPORT ROUTER
// ===============================================
module.exports = router;

