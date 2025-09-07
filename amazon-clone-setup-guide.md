# Amazon Clone Setup Guide - Complete Step-by-Step Instructions

## Overview
This guide will help you set up and run a complete Amazon clone built with the MERN stack (MongoDB, Express.js, React.js, Node.js). Even if you're new to web development, following these steps carefully will get your application running.

## What You'll Build
- A full-featured e-commerce website similar to Amazon
- Frontend: React-based user interface with shopping cart, product catalog, user authentication
- Backend: Node.js API server with user management, product management, and order processing
- Database: MongoDB for storing products, users, and orders

## Prerequisites & Software Installation

### Step 1: Install Node.js
1. Go to https://nodejs.org/
2. Download the LTS (Long Term Support) version
3. Run the installer and follow the setup wizard
4. Verify installation by opening Command Prompt/Terminal and typing:
   ```bash
   node --version
   npm --version
   ```
   You should see version numbers displayed.

### Step 2: Install MongoDB
1. Go to https://www.mongodb.com/try/download/community
2. Download MongoDB Community Server
3. Install with default settings
4. MongoDB will run as a service automatically

### Step 3: Install Git (Optional but Recommended)
1. Go to https://git-scm.com/
2. Download and install Git
3. This will help you manage your code versions

### Step 4: Choose a Code Editor
- **Recommended**: VS Code (https://code.visualstudio.com/)
- Install extensions: "JavaScript (ES6)", "Node.js", "React"

## Project Setup

### Step 5: Create Project Directory
1. Create a folder called `amazon-clone` on your desktop
2. Open Command Prompt/Terminal
3. Navigate to your project folder:
   ```bash
   cd Desktop/amazon-clone
   ```

### Step 6: Set Up Backend

#### 6.1: Create Backend Folder and Files
1. Create a folder called `backend` inside `amazon-clone`
2. Copy all the backend files I created (server.js, package.json, etc.) into the `backend` folder
3. Your folder structure should look like:
   ```
   amazon-clone/
   ├── backend/
   │   ├── server.js
   │   ├── package.json
   │   ├── .env
   │   ├── config/
   │   │   └── db.js
   │   ├── models/
   │   │   ├── Product.js
   │   │   ├── User.js
   │   │   └── Order.js
   │   ├── routes/
   │   │   ├── productRoutes.js
   │   │   ├── userRoutes.js
   │   │   └── orderRoutes.js
   │   ├── data/
   │   │   └── products.js
   │   └── seeder.js
   ```

#### 6.2: Install Backend Dependencies
1. Open Command Prompt/Terminal
2. Navigate to backend folder:
   ```bash
   cd Desktop/amazon-clone/backend
   ```
3. Install all required packages:
   ```bash
   npm install
   ```
   This will install Express, MongoDB driver, and other dependencies.

#### 6.3: Start MongoDB
1. MongoDB should already be running as a service
2. If not, start it manually:
   - **Windows**: Open Services, find MongoDB, and start it
   - **Mac**: `brew services start mongodb-community`
   - **Linux**: `sudo systemctl start mongod`

#### 6.4: Seed the Database with Sample Data
1. In the backend folder, run:
   ```bash
   node seeder
   ```
   This adds sample products and users to your database.

#### 6.5: Start the Backend Server
1. In the backend folder, run:
   ```bash
   npm run dev
   ```
   or
   ```bash
   node server.js
   ```
2. You should see: "Server running on port 5000" and "MongoDB Connected"
3. Test by opening browser and going to: http://localhost:5000
4. You should see: "Amazon Clone API is running..."

### Step 7: Set Up Frontend

#### 7.1: Access the Frontend Application
The frontend application has been created as a web application that you can access directly:
- **Frontend URL**: https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/10feed8159cd9b538fb397670c7e0d9d/eacb89ad-a7ce-497d-baae-8e945b5672b6/index.html

#### 7.2: Download Frontend Files (Optional)
If you want to host the frontend locally:
1. Create a `frontend` folder in your `amazon-clone` directory
2. Download the frontend files and place them in the `frontend` folder
3. You can serve them using any local web server

## Testing Your Application

### Step 8: Test Backend API Endpoints

#### 8.1: Test Product Endpoints
Open your browser or use a tool like Postman:
- Get all products: http://localhost:5000/api/products
- Get single product: http://localhost:5000/api/products/1

#### 8.2: Test User Registration
Using Postman or similar tool, send POST request to http://localhost:5000/api/users/register with:
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "123456"
}
```

### Step 9: Use the Frontend Application
1. Open the frontend application URL in your browser
2. Browse products, add items to cart, test user registration/login
3. The frontend is fully functional with:
   - Product browsing and search
   - Shopping cart functionality
   - User authentication
   - Responsive design

## Understanding the Project Structure

### Backend Structure
- **server.js**: Main server file that starts the application
- **config/db.js**: Database connection configuration
- **models/**: Database schemas (Product, User, Order)
- **routes/**: API endpoints for different features
- **data/products.js**: Sample product data

### Frontend Structure
- **index.html**: Main HTML file with all page templates
- **style.css**: All styling and responsive design
- **app.js**: JavaScript functionality and state management

## Common Issues and Solutions

### Issue 1: MongoDB Connection Error
**Problem**: "MongoError: connect ECONNREFUSED"
**Solution**: 
- Make sure MongoDB is running
- Check if MongoDB is installed correctly
- Verify MongoDB service is started

### Issue 2: Port Already in Use
**Problem**: "Error: listen EADDRINUSE :::5000"
**Solution**: 
- Kill process using port 5000: `npx kill-port 5000`
- Or change port in .env file

### Issue 3: CORS Errors
**Problem**: Frontend cannot connect to backend
**Solution**: 
- Make sure backend is running
- CORS is already configured in the backend

## Next Steps for Development

### Learning Path
1. **Learn JavaScript fundamentals** if you haven't already
2. **Study React.js** for frontend development
3. **Learn Node.js and Express.js** for backend development
4. **Understand MongoDB** for database operations

### Enhancements You Can Add
1. **Payment Integration**: Add Stripe or PayPal
2. **Image Upload**: Allow product image uploads
3. **Search Functionality**: Improve product search
4. **User Reviews**: Add product review system
5. **Order Tracking**: Implement order status tracking
6. **Admin Panel**: Create admin interface for managing products
7. **Email Notifications**: Send order confirmation emails

### Development Tools
- **Postman**: For testing API endpoints
- **MongoDB Compass**: Visual interface for MongoDB
- **React Developer Tools**: Browser extension for React debugging

## Project File Overview

### Key Backend Files:
- **server.js**: Main server entry point
- **package.json**: Lists all dependencies and scripts
- **models/Product.js**: Product database schema
- **routes/productRoutes.js**: Product-related API endpoints

### Key Frontend Files:
- **index.html**: Single-page application with all components
- **app.js**: JavaScript application logic
- **style.css**: Responsive styling and layout

## Deployment (Advanced)

When you're ready to deploy:
1. **Frontend**: Deploy to Netlify, Vercel, or GitHub Pages
2. **Backend**: Deploy to Heroku, Railway, or DigitalOcean
3. **Database**: Use MongoDB Atlas (cloud database)

## Getting Help

If you encounter issues:
1. Check the console for error messages
2. Verify all services are running (MongoDB, backend server)
3. Make sure all dependencies are installed
4. Review this guide step by step

## Conclusion

You now have a fully functional Amazon clone! The application includes:
- ✅ Product catalog with search and filtering
- ✅ Shopping cart functionality
- ✅ User authentication system
- ✅ Responsive design
- ✅ RESTful API backend
- ✅ MongoDB database integration

Take time to explore the code, experiment with modifications, and gradually add new features as you learn more about web development!