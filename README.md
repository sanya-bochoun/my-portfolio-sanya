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

### 🌐 Heroku (Recommended)

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
   heroku config:set PORT=3000
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

#### Heroku Configuration Files
Create `Procfile` in root directory:
```
web: node index.js
```

Update `package.json` scripts:
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

### ⚡ Vercel

#### Setup
1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Configure Environment Variables**
   - Go to Vercel Dashboard
   - Add `MONGODB_URI` in Environment Variables

#### Vercel Configuration
Create `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.js"
    }
  ]
}
```

### 🚂 Railway

#### Quick Deploy
1. Connect GitHub repository to [Railway](https://railway.app)
2. Set environment variables in Railway dashboard
3. Deploy automatically from Git

#### Railway Configuration
```toml
# railway.toml
[build]
builder = "NIXPACKS"

[deploy]
startCommand = "npm start"
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 10
```

### 🐳 Docker Deployment

#### Dockerfile
Create `Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

USER node

CMD ["npm", "start"]
```

#### Docker Compose
Create `docker-compose.yml`:
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - MONGODB_URI=${MONGODB_URI}
      - PORT=3000
    depends_on:
      - mongodb
  
  mongodb:
    image: mongo:5.0
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

volumes:
  mongodb_data:
```

#### Deploy Commands
```bash
# Build and run
docker-compose up -d

# Stop
docker-compose down
```

### ☁️ AWS EC2

#### Instance Setup
1. **Launch EC2 Instance** (Ubuntu 20.04)
2. **Connect via SSH**
3. **Install Dependencies**
   ```bash
   sudo apt update
   sudo apt install nodejs npm nginx mongodb
   ```

4. **Clone Repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio
   npm install
   ```

5. **Configure Environment**
   ```bash
   sudo nano .env
   # Add your environment variables
   ```

6. **Set up PM2 (Process Manager)**
   ```bash
   sudo npm install -g pm2
   pm2 start index.js --name "portfolio"
   pm2 startup
   pm2 save
   ```

7. **Configure Nginx**
   ```nginx
   # /etc/nginx/sites-available/portfolio
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

8. **Enable Site**
   ```bash
   sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

### 🌊 DigitalOcean Droplet

#### One-Click Setup
1. Create droplet with Node.js one-click app
2. Follow similar steps as AWS EC2
3. Use DigitalOcean's domain management

### 📊 MongoDB Atlas Setup

#### Database Configuration
1. **Create Free Cluster** at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. **Create Database User**
3. **Whitelist IP Addresses** (0.0.0.0/0 for production)
4. **Get Connection String**
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
   ```

### 🔒 Environment Variables

#### Required Variables
```env
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
NODE_ENV=production
```

#### Security Considerations
- Never commit `.env` files
- Use platform-specific secret management
- Rotate credentials regularly
- Use HTTPS in production

### ✅ Pre-Deployment Checklist

- [ ] Test application locally
- [ ] Set up MongoDB Atlas database
- [ ] Configure environment variables
- [ ] Update contact form endpoints
- [ ] Test contact form functionality
- [ ] Optimize images and assets
- [ ] Set up domain name (optional)
- [ ] Configure SSL certificate
- [ ] Set up monitoring/logging

### 🚨 Common Issues & Solutions

#### Port Issues
```javascript
// Ensure your app uses process.env.PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

#### Database Connection
```javascript
// Handle connection errors gracefully
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Database connected'))
    .catch(err => console.error('Database connection error:', err));
```

#### Static Files
```javascript
// Ensure static files are served correctly
app.use(express.static(path.join(__dirname, 'public')));
```

### 📈 Performance Optimization

#### For Production
- Enable compression middleware
- Use CDN for static assets
- Implement caching strategies
- Monitor application performance
- Set up health checks

```javascript
// Add to your app
const compression = require('compression');
app.use(compression());
```

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