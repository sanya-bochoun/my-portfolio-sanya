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

### Frontend
- **HTML5 & CSS3** - Semantic markup and modern styling
- **JavaScript (ES6+)** - Modern JavaScript features
- **Bootstrap 5** - CSS framework for responsive design
- **AOS** - Animate On Scroll library
- **GLightbox** - Modern lightbox library
- **Swiper** - Touch slider library
- **Typed.js** - Text typing animation
- **Isotope** - Filter and sort layouts

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
   MONGODB_URI=mongodb://localhost:27017/portfolio
   # Or use MongoDB Atlas
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
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
1. **Local MongoDB:**
   - Install MongoDB locally
   - Set `MONGODB_URI=mongodb://localhost:27017/portfolio`

2. **MongoDB Atlas (Cloud):**
   - Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create cluster and get connection string
   - Set `MONGODB_URI` with your Atlas connection string

### Environment Variables
```env
PORT=3000                    # Server port
MONGODB_URI=<your-db-url>   # Database connection string
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

### Frontend Libraries
- Bootstrap 5 - CSS Framework
- AOS - Animate On Scroll
- GLightbox - Lightbox gallery
- Swiper - Touch slider
- Typed.js - Text animation
- Isotope - Layout filtering
- And more...

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

### Heroku
1. Create Heroku app
2. Set environment variables in Heroku dashboard
3. Deploy with Git

### Other Platforms
- **Vercel**: Configure for Node.js
- **Railway**: Easy deployment with Git
- **DigitalOcean**: VPS hosting

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