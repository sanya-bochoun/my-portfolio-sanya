# 🌟 Portfolio Website with Admin Panel

A modern, responsive portfolio website built with Node.js, Express.js, and MongoDB. Features smooth animations, contact form functionality, dynamic portfolio management, and a comprehensive admin panel with advanced security features.

## ✨ Features

### 🎨 Frontend Features
- **Responsive Design** - Works perfectly on all devices (desktop, tablet, mobile)
- **Smooth Animations** - Beautiful scroll animations using AOS (Animate On Scroll)
- **Dynamic Portfolio** - Database-driven portfolio with advanced filtering
- **Portfolio Filters** - Filter by technology, framework, and project type with Bootstrap dropdowns
- **Contact Form** - Functional contact form with MongoDB integration
- **Modern UI/UX** - Clean and professional design with Bootstrap 5
- **Fast Loading** - Optimized assets and vendor libraries
- **Portfolio Gallery** - Showcase your work with lightbox gallery and multiple images
- **Testimonials** - Client testimonials section
- **Services** - Highlight your services and skills

### 🛡️ Admin Panel Features
- **Secure Admin Dashboard** - Comprehensive overview with statistics
- **Project Management** - Full CRUD operations for portfolio projects
- **Contact Management** - Manage inquiries with reply functionality
- **File Upload System** - Support for main images and gallery images
- **Rich Text Editor** - Quill.js integration for project descriptions
- **Bulk Operations** - Select and delete multiple items
- **Real-time Statistics** - Project counts, message status, and more
- **Email Integration** - Send replies directly from admin panel

### 🔐 Security Features
- **Rate Limiting** - Prevents brute force attacks (5 attempts per IP)
- **Account Lockout** - 15-minute lockout after failed attempts
- **IP Tracking** - Monitor and log login attempts
- **Input Validation** - Secure PIN validation with pattern detection
- **Session Management** - Secure admin sessions
- **Security Logging** - Comprehensive security event logging
- **CSRF Protection** - Secure form submissions
- **Countdown Timer** - Visual lockout status with auto-refresh

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database for projects and contact data
- **Mongoose** - MongoDB object modeling
- **EJS** - Template engine
- **Express-session** - Session management
- **Multer** - File upload handling
- **Nodemailer** - Email sending functionality
- **Body-parser** - Request body parsing middleware
- **Dotenv** - Environment variables management

### Frontend
- **HTML5 & CSS3** - Semantic markup and modern styling
- **JavaScript (ES6+)** - Modern JavaScript features
- **Bootstrap 5** - CSS framework for responsive design
- **Bootstrap Icons** - Icon library
- **Quill.js** - Rich text editor for admin panel
- **SweetAlert2** - Beautiful alert dialogs
- **AOS** - Animate On Scroll library
- **GLightbox** - Modern lightbox library
- **Swiper** - Touch slider library
- **Typed.js** - Text typing animation
- **PureCounter** - Animated counters
- **Waypoints** - Trigger functions on scroll
- **Isotope** - Filter and sort layouts
- **ImagesLoaded** - Image loading detection

### Security & Development
- **Rate Limiting** - Custom implementation for login protection
- **Input Sanitization** - Clean and validate user inputs
- **Security Headers** - Protection against common attacks
- **Favicon Support** - Custom favicon for admin and public pages

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
   ADMIN_PIN=1234
   SESSION_SECRET=portfolio-admin-secret-key-2024
   
   # Email Configuration (for contact replies)
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_FROM=your-email@gmail.com
   EMAIL_FROM_NAME=Your Name
   
   # For local development only (not recommended for production):
   # MONGODB_URI=mongodb://localhost:27017/portfolio
   ```

4. **Start the application**
   
   **Development mode:**
   ```bash
   npm run server
   # or
   nodemon index.js
   ```
   
   **Production mode:**
   ```bash
   npm start
   ```

5. **Access the application**
   
   - **Public Portfolio**: `http://localhost:3000`
   - **Admin Panel**: `http://localhost:3000/admin`
   - **Default Admin PIN**: `1234` (change in `.env` file)

## 📁 Project Structure

```
portfolio/
├── controllers/
│   ├── homeController.js       # Public routes controller
│   ├── adminController.js      # Admin panel controller
│   └── uploadController.js     # File upload controller
├── db/
│   └── connectDB.js           # Database connection
├── model/
│   ├── userModel.js           # Contact model
│   └── projectModel.js        # Project model
├── services/
│   └── emailService.js        # Email sending service
├── routes/
│   ├── routes.js              # Public routes
│   └── adminRoutes.js         # Admin panel routes
├── public/
│   └── assets/
│       ├── css/
│       │   └── main.css       # Custom styles
│       ├── js/
│       │   └── main.js        # Custom JavaScript
│       ├── img/               # Images and icons
│       │   ├── portfolio/     # Portfolio project images
│       │   ├── testimonials/  # Testimonial images
│       │   └── Tech Stack/    # Technology icons
│       ├── resume/            # Resume/CV files
│       └── vendor/            # Third-party libraries
├── views/
│   ├── admin/                 # Admin panel templates
│   │   ├── layout.ejs         # Admin layout template
│   │   ├── login.ejs          # Admin login page
│   │   ├── dashboard.ejs      # Admin dashboard
│   │   ├── projects.ejs       # Project management
│   │   ├── project-form.ejs   # Add/Edit project form
│   │   └── contacts.ejs       # Contact management
│   ├── partials/              # Public site components
│   │   ├── header.ejs         # Navigation & profile sidebar
│   │   ├── hero.ejs          # Hero section with typing animation
│   │   ├── about.ejs         # About section with personal info
│   │   ├── stats.ejs         # Statistics counters
│   │   ├── skills.ejs        # Skills progress bars
│   │   ├── resume.ejs        # Resume/CV section
│   │   ├── portfolio.ejs     # Dynamic portfolio gallery
│   │   ├── services.ejs      # Services offered section
│   │   ├── testimonials.ejs  # Client testimonials slider
│   │   ├── contact.ejs       # Contact form and info
│   │   └── footer.ejs        # Footer with scripts
│   └── index.ejs             # Main template (includes partials)
├── uploads/                   # Uploaded project images
├── .env                      # Environment variables
├── .gitignore               # Git ignore file
├── index.js                 # Application entry point
├── package.json             # Dependencies and scripts
├── Procfile                 # Heroku deployment file
└── README.md               # This file
```

## 🎯 Usage

### Public Portfolio
- **Homepage** - Displays your profile, skills, portfolio, services, and contact information
- **Dynamic Portfolio** - Projects are loaded from database with filtering capabilities
- **Contact Form** - Stores inquiries in database for admin review
- **Responsive Design** - Works on all devices with smooth animations

### Admin Panel (`/admin`)

#### 🔐 Security Features
- **Secure Login** - PIN-based authentication with rate limiting
- **Account Lockout** - Automatic lockout after 5 failed attempts
- **Session Management** - Secure admin sessions with timeout
- **IP Tracking** - Monitor login attempts and suspicious activity

#### 📊 Dashboard
- **Overview Statistics** - Total projects, published status, draft counts
- **Recent Projects** - Quick access to latest additions
- **Recent Messages** - Latest contact form submissions
- **Quick Actions** - Fast navigation to common tasks

#### 📁 Project Management
- **CRUD Operations** - Create, read, update, delete portfolio projects
- **Rich Text Editor** - Quill.js for detailed project descriptions
- **File Upload** - Support for main images and gallery images
- **Technology Tagging** - Categorize by frameworks, languages, and project types
- **Status Management** - Draft, published, or hidden projects
- **Bulk Operations** - Select and manage multiple projects

#### 📧 Contact Management
- **Message Overview** - View all contact form submissions
- **Status Tracking** - Unread, read, replied status management
- **Direct Reply** - Send email replies from admin panel
- **Message Filtering** - Filter by status and search functionality
- **Bulk Actions** - Mark as read or delete multiple messages

## ⚙️ Configuration

### Database Setup

**MongoDB Atlas (Cloud) - Recommended:**
- Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
- Create free M0 cluster
- Create database user and whitelist IP addresses
- Get connection string and set `MONGODB_URI`

**Local MongoDB (Development only):**
- Install MongoDB locally
- Set `MONGODB_URI=mongodb://localhost:27017/portfolio`
- Note: Local MongoDB won't work with cloud deployments

### Email Configuration

For contact reply functionality:

**Gmail Setup:**
1. Enable 2-Step Verification
2. Generate App Password
3. Use app password in `EMAIL_PASS` environment variable

**Environment Variables:**
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
EMAIL_FROM=your-email@gmail.com
EMAIL_FROM_NAME=Your Name
```

### Security Configuration

**Admin PIN:**
```env
ADMIN_PIN=your-secure-pin  # Change default PIN
SESSION_SECRET=your-unique-session-secret
```

**Security Settings:**
- **Max Login Attempts**: 5 per IP address
- **Lockout Duration**: 15 minutes
- **Rate Limit Window**: 5 minutes
- **PIN Requirements**: 3-10 digits, no obvious patterns

## 📦 Dependencies

### Production Dependencies
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `ejs` - Template engine
- `express-session` - Session management
- `body-parser` - Request body parsing
- `multer` - File upload handling
- `nodemailer` - Email functionality
- `dotenv` - Environment variables

### Development Dependencies
- `nodemon` - Development server with auto-restart

### Admin Panel Libraries
- **Quill.js** - Rich text editor
- **SweetAlert2** - Alert dialogs
- **Bootstrap 5** - Admin UI framework

### Frontend Libraries (CDN/Vendor)
- **Bootstrap 5** - CSS Framework
- **Bootstrap Icons** - Icon library
- **AOS** - Animate On Scroll
- **GLightbox** - Lightbox gallery
- **Swiper** - Touch slider
- **Typed.js** - Text typing animation
- **PureCounter** - Animated counters
- **Waypoints** - Scroll-triggered functions
- **Isotope** - Layout filtering and sorting
- **ImagesLoaded** - Image loading detection

## 🎨 Customization

### Content Management

**Through Admin Panel:**
- **Projects** - Add/edit portfolio projects with images
- **Contact Replies** - Manage and respond to inquiries
- **Content Status** - Control what's visible on public site

**Direct File Editing:**
- **Profile Info** - `views/partials/header.ejs` and `views/partials/about.ejs`
- **Skills** - `views/partials/skills.ejs`
- **Services** - `views/partials/services.ejs`
- **Testimonials** - `views/partials/testimonials.ejs`

### Styling Customization
- **Main Styles** - `public/assets/css/main.css`
- **Admin Styles** - Inline styles in admin templates
- **Color Variables** - CSS custom properties for easy theming

### Tech Stack Icons
Add your technology icons to `public/assets/img/Tech Stack/` and reference them in the admin panel when creating projects.

## 🚀 Deployment

### 🌐 Heroku Deployment

#### Prerequisites
- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
- Git repository
- MongoDB Atlas account

#### Step-by-Step Guide

1. **Login to Heroku**
   ```bash
   heroku login
   ```

2. **Create Heroku App**
   ```bash
   heroku create your-portfolio-name
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/portfolio"
   heroku config:set ADMIN_PIN="your-secure-pin"
   heroku config:set SESSION_SECRET="your-unique-session-secret"
   heroku config:set EMAIL_USER="your-email@gmail.com"
   heroku config:set EMAIL_PASS="your-app-password"
   heroku config:set EMAIL_FROM="your-email@gmail.com"
   heroku config:set EMAIL_FROM_NAME="Your Name"
   ```

4. **Deploy Application**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

5. **Open Your App**
   ```bash
   heroku open
   ```

### 🔧 Environment Variables

#### Required for Production
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
ADMIN_PIN=your-secure-pin
SESSION_SECRET=your-unique-session-secret
```

#### Optional for Email Features
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com
EMAIL_FROM_NAME=Your Name
```

## 🔐 Security Best Practices

### Admin Security
- **Change Default PIN** - Never use default PIN in production
- **Strong Session Secret** - Use cryptographically secure session secret
- **Regular Monitoring** - Check admin logs for suspicious activity
- **IP Whitelisting** - Consider restricting admin access to specific IPs

### Database Security
- **Atlas Network Access** - Whitelist only necessary IP addresses
- **Strong Credentials** - Use complex database passwords
- **Regular Backups** - Enable automated backups in MongoDB Atlas

### Email Security
- **App Passwords** - Use Gmail app passwords, not account password
- **Environment Variables** - Never commit email credentials to repository

## 🛠️ Advanced Features

### Portfolio Filtering
- **Technology Filters** - Filter by frameworks and languages
- **Project Type Filters** - Apps, websites, mobile applications
- **Dynamic UI** - Bootstrap dropdowns with custom styling
- **Reset Functionality** - Clear all filters and show all projects

### File Upload System
- **Image Validation** - File type and size validation
- **Automatic Resizing** - Optimized for web display
- **Gallery Support** - Multiple images per project
- **Secure Storage** - Organized file structure

### Email Integration
- **HTML Templates** - Rich email formatting
- **Auto-replies** - Configurable response templates
- **Status Tracking** - Track sent emails and responses
- **Error Handling** - Graceful email sending failures

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [BootstrapMade](https://bootstrapmade.com/) for the original iPortfolio template
- Bootstrap team for the amazing CSS framework
- All the open-source library contributors
- MongoDB Atlas for reliable database hosting
- Heroku for easy deployment platform

## 📞 Support

If you have any questions or need help with setup, please create an issue in the repository.

## 🚀 Future Enhancements

- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Comment system for portfolio items
- [ ] SEO optimization tools
- [ ] Advanced user roles and permissions
- [ ] API endpoints for mobile app integration
- [ ] Automated backup system
- [ ] Advanced email templates

---

**Happy Coding!** 🚀✨