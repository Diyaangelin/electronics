# Electronics Shop - MERN Stack Application

A complete MERN (MongoDB, Express.js, React, Node.js) stack application for an electronics/bakery shop with user authentication, product display, and shopping cart functionality.

## 🚀 Features

- **User Authentication**: Registration, Login, Forgot Password, OTP verification
- **Product Catalog**: Display of electronics/bakery products with cart functionality
- **Profile Management**: User profile with image upload
- **Responsive Design**: Bootstrap 5 responsive UI
- **Security**: JWT authentication, bcrypt password hashing
- **File Upload**: Multer for profile image uploads
- **Email Service**: Nodemailer for OTP verification

## 📁 Project Structure

```
PROJECT/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   └── authController.js     # Authentication logic
│   ├── middleware/
│   │   ├── authmiddleware.js     # JWT verification
│   │   └── upload.js             # Multer file upload
│   ├── models/
│   │   └── User.js               # User schema
│   ├── routes/
│   │   └── authroutes.js         # API routes
│   ├── uploads/                  # Uploaded files directory
│   ├── frontend/                 # React application
│   │   ├── src/
│   │   │   ├── pages/
│   │   │   │   ├── electroshop.js    # Main shop page
│   │   │   │   ├── Login.js          # Login page
│   │   │   │   ├── Register.js       # Registration page
│   │   │   │   └── ...
│   │   │   ├── component/
│   │   │   │   └── Context.js        # Authentication context
│   │   │   └── App.js               # Main app component
│   │   └── package.json
│   ├── index.js                  # Server entry point
│   └── package.json
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB
- Git

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   Create `.env` file in the backend directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```

4. **Start backend server:**
   ```bash
   node index.js
   ```
   Server will run on `http://localhost:7000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd backend/frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start React development server:**
   ```bash
   npm start
   ```
   Application will run on `http://localhost:3000`

## 🔑 Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
# MongoDB
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/electronics_shop

# JWT
JWT_SECRET=your_super_secret_jwt_key

# Email Configuration (Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_16_digit_app_password
```

## 📋 API Endpoints

### Authentication Routes
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Send reset OTP
- `POST /api/auth/verify-otp` - Verify OTP
- `POST /api/auth/reset-password` - Reset password
- `GET /api/auth/profile` - Get user profile (protected)

## 🎯 Usage

1. **Registration Flow:**
   - Visit `/register`
   - Fill in email, username, password
   - Upload profile picture (optional)
   - Upon successful registration, redirected to shop

2. **Login Flow:**
   - Visit `/login`
   - Enter email and password
   - Upon successful login, redirected to shop

3. **Shop Experience:**
   - Browse products in the electronics/bakery shop
   - Add items to cart
   - View user profile
   - Access authenticated features

## 🔧 Deployment

### Production Build

1. **Build React app:**
   ```bash
   cd backend/frontend
   npm run build
   ```

2. **Deploy backend:**
   - Deploy to services like Heroku, Railway, or DigitalOcean
   - Set environment variables in production
   - Ensure MongoDB connection is accessible

3. **Deploy frontend:**
   - Use the build folder created above
   - Deploy to Netlify, Vercel, or serve from backend

## 🛡️ Security Features

- **Password Hashing**: bcryptjs for secure password storage
- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Middleware for route protection
- **File Upload Security**: Multer with file type restrictions
- **Input Validation**: Server-side validation for all inputs

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach with Bootstrap 5
- **Modern Interface**: Clean and intuitive user interface
- **Shopping Cart**: Interactive cart functionality
- **Product Gallery**: Attractive product display
- **User Feedback**: Toast notifications and form validation

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error:**
   - Check your MongoDB URI in `.env`
   - Ensure network access is configured in MongoDB Atlas

2. **Frontend Build Issues:**
   - Delete `node_modules` and run `npm install` again
   - Check for version conflicts

3. **Authentication Issues:**
   - Verify JWT_SECRET is set
   - Check token expiration settings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

If you encounter any issues or need help with setup, please create an issue in the GitHub repository.

## 📄 License

This project is licensed under the MIT License.

---

**Developed with ❤️ using MERN Stack**
