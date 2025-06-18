# 🌟 Portfolio Website

A modern, responsive portfolio website built with Node.js, Express.js, and MongoDB. Features smooth animations, contact form functionality, and a clean, professional design.

## ✨ Features

- **Responsive Design** - Works perfectly on all devices (desktop, tablet, mobile)
- **Smooth Animations** - Beautiful scroll animations using AOS (Animate On Scroll)
- **Contact Form** - Functional contact form with MongoDB integration
- **Modern UI/UX** - Clean and professional design with Bootstrap 5
- **Fast Loading** - Optimized assets and vendor libraries
- **Portfolio Gallery** - Showcase your work with lightbox gallery
- **Testimonials** - Client testimonials section
- **Services** - Highlight your services and skills

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database for contact form data
- **Mongoose** - MongoDB object modeling
- **EJS** - Template engine
- **Body-parser** - Request body parsing middleware
- **Dotenv** - Environment variables management

### Frontend
- **HTML5 & CSS3** - Semantic markup and modern styling
- **JavaScript (ES6+)** - Modern JavaScript features
- **Bootstrap 5** - CSS framework for responsive design
- **Bootstrap Icons** - Icon library
- **AOS** - Animate On Scroll library
- **GLightbox** - Modern lightbox library
- **Swiper** - Touch slider library
- **Typed.js** - Text typing animation
- **PureCounter** - Animated counters
- **Waypoints** - Trigger functions on scroll
- **Isotope** - Filter and sort layouts
- **ImagesLoaded** - Image loading detection

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

5. **Open your browser**
   
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
portfolio/
├── controllers/
│   └── homeController.js      # Route controllers
├── db/
│   └── connectDB.js          # Database connection
├── model/
│   └── userModel.js          # User/Contact model
├── public/
│   └── assets/
│       ├── css/
│       │   └── main.css      # Custom styles
│       ├── js/
│       │   └── main.js       # Custom JavaScript
│       ├── img/              # Images and icons
│       │   ├── portfolio/    # Portfolio images
│       │   └── testimonials/ # Testimonial images
│       └── vendor/           # Third-party libraries
├── routes/
│   └── routes.js            # Application routes
├── views/
│   ├── partials/           # Reusable template components
│   │   ├── header.ejs      # Navigation & profile sidebar
│   │   ├── hero.ejs        # Hero section with typing animation
│   │   ├── about.ejs       # About section with personal info
│   │   ├── stats.ejs       # Statistics counters
│   │   ├── skills.ejs      # Skills progress bars
│   │   ├── resume.ejs      # Resume/CV section
│   │   ├── portfolio.ejs   # Portfolio gallery with filters
│   │   ├── services.ejs    # Services offered section
│   │   ├── testimonials.ejs # Client testimonials slider
│   │   ├── contact.ejs     # Contact form and info
│   │   └── footer.ejs      # Footer with scripts
│   └── index.ejs           # Main template (includes partials)
├── .env                    # Environment variables
├── .gitignore             # Git ignore file
├── index.js               # Application entry point
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## 🎯 Usage

### Homepage
- Displays your profile, skills, portfolio, services, and contact information
- Responsive design that works on all devices
- Smooth scrolling and animations

### Contact Form
- Collects visitor information (name, email, subject, message)
- Stores data in MongoDB database
- Form validation and error handling

### Portfolio Gallery
- Showcase your work with categories (Apps, Products, Branding, Books)
- Filterable gallery with smooth transitions
- Lightbox for detailed view

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
- Note: Local MongoDB won't work with cloud deployments like Heroku

### Environment Variables
```env
PORT=3000                    # Server port (Heroku will override this)
MONGODB_URI=<your-atlas-connection-string>   # MongoDB Atlas connection string
NODE_ENV=production          # For production deployment
```

## 📦 Dependencies

### Production Dependencies
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `ejs` - Template engine
- `body-parser` - Request body parsing
- `dotenv` - Environment variables

### Development Dependencies
- `nodemon` - Development server with auto-restart

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
- **PHP Email Form** - Form validation (client-side)

## 📄 EJS Template Structure

### Modular Partials System
The project uses a modular approach with EJS partials for better maintainability:

```javascript
// Main template (views/index.ejs) includes all partials:
<%- include('partials/header') %>
<%- include('partials/hero') %>
<%- include('partials/about') %>
<%- include('partials/stats') %>
<%- include('partials/skills') %>
<%- include('partials/resume') %>
<%- include('partials/portfolio') %>
<%- include('partials/services') %>
<%- include('partials/testimonials') %>
<%- include('partials/contact') %>
<%- include('partials/footer') %>
```

### Partial Components
- **`header.ejs`** - Profile sidebar with navigation menu
- **`hero.ejs`** - Landing section with typed animation
- **`about.ejs`** - Personal information and description
- **`stats.ejs`** - Animated counters (clients, projects, etc.)
- **`skills.ejs`** - Progress bars for technical skills
- **`resume.ejs`** - Education and work experience
- **`portfolio.ejs`** - Filterable project gallery
- **`services.ejs`** - Services offered with icons
- **`testimonials.ejs`** - Client feedback carousel
- **`contact.ejs`** - Contact form and information
- **`footer.ejs`** - Footer with all JavaScript includes

### Benefits of Partials
- **Maintainability** - Easy to edit individual sections
- **Reusability** - Components can be reused across pages
- **Organization** - Cleaner project structure
- **Development** - Faster development and debugging

## 🎨 Customization

### Adding Your Content
1. **Replace images** in `public/assets/img/`
2. **Update text content** in specific `views/partials/*.ejs` files
3. **Modify styles** in `public/assets/css/main.css`
4. **Add custom JavaScript** in `public/assets/js/main.js`

### Editing Specific Sections
- **Profile Info**: Edit `views/partials/header.ejs` and `views/partials/about.ejs`
- **Skills**: Update `views/partials/skills.ejs` with your skill levels
- **Portfolio**: Add your projects in `views/partials/portfolio.ejs`
- **Services**: Customize offerings in `views/partials/services.ejs`
- **Contact**: Update contact details in `views/partials/contact.ejs`

### Color Scheme
- Primary colors are defined in `main.css`
- Easy to customize by changing CSS variables

### Portfolio Items
- Update portfolio images in `public/assets/img/portfolio/`
- Modify portfolio content in the EJS template

## 🚀 Deployment

### 🌐 Heroku Deployment

#### Prerequisites
- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
- Git repository
- MongoDB Atlas account (free tier available)

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

#### Required Configuration Files

**Procfile** (already included):
```
web: node index.js
```

**package.json** (already configured):
```json
{
  "scripts": {
    "start": "node index.js",
    "server": "nodemon index.js"
  },
  "engines": {
    "node": "18.x",
    "npm": "9.x"
  }
}
```

### 📊 MongoDB Atlas Setup

#### Database Configuration
1. **Create Free Cluster** at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. **Create Database User**
3. **Whitelist IP Addresses** (0.0.0.0/0 for production)
4. **Get Connection String**
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
   ```

### 🔧 Environment Variables & Troubleshooting

#### Required Environment Variables
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
# PORT is automatically set by Heroku
```

#### Common Issues & Solutions

**Application Error:**
- Check Heroku logs: `heroku logs --tail`
- Ensure MongoDB Atlas connection string is correct
- Verify database user has read/write permissions

**Database Connection Failed:**
- Whitelist all IP addresses (0.0.0.0/0) in MongoDB Atlas
- Check connection string format
- Ensure database name is included in the URI

**Static Files Not Loading:**
- Files are served from `public/` directory
- Check file paths in HTML templates

#### Deployment Checklist
- [ ] MongoDB Atlas cluster created and configured
- [ ] Database user created with proper permissions
- [ ] IP addresses whitelisted (0.0.0.0/0)
- [ ] Environment variables set in Heroku
- [ ] Application tested locally
- [ ] Procfile and package.json configured

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

## 📞 Support

If you have any questions or need help with setup, please create an issue in the repository.

---

**Happy Coding!** 🚀✨ 