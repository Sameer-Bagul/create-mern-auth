# MERN Authentication System with Advanced Features

A robust authentication system built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring advanced security measures and user verification methods.

## 🚀 Features

- **User Authentication**
  - Email & Password based authentication
  - JWT (JSON Web Token) based authorization
  - Password hashing and security
  - Password reset functionality
  
- **Advanced Security**
  - OTP (One-Time Password) verification
  - Email verification
  - Session management
  - Protected routes
  
- **Email Integration**
  - SMTP email service integration
  - Email notifications for:
    - Account verification
    - Password reset
    - Security alerts
    - OTP delivery
    
- **Frontend Features**
  - React.js with Context API for state management
  - Responsive design
  - Form validation
  - Protected route components
  - User dashboard
  
- **Backend Features**
  - Express.js REST API
  - MongoDB database integration
  - Middleware for authentication
  - Rate limiting
  - Input sanitization

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB
- npm or yarn
- Git

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Sameer-Bagul/best-mern-auth.git
   cd best-mern-auth
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   SMTP_HOST=your_smtp_host
   SMTP_PORT=your_smtp_port
   SMTP_USER=your_smtp_email
   SMTP_PASS=your_smtp_password
   CLIENT_URL=http://localhost:3000
   ```

4. Create a `.env` file in the frontend directory:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

## 🚀 Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```

The application will be available at:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/verify-email` - Verify email address
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `POST /api/auth/verify-otp` - Verify OTP
- `GET /api/auth/profile` - Get user profile (protected)

## 🔒 Security Features

- Password hashing using bcrypt
- JWT token authentication
- Email verification
- OTP verification
- Rate limiting on API endpoints
- Input validation and sanitization
- Protected routes on both frontend and backend
- HTTP-only cookies for token storage

## 🛠️ Built With

- **Frontend**
  - React.js
  - Context API
  - Axios
  - React Router
  - Material-UI/Tailwind CSS

- **Backend**
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - JWT
  - Nodemailer
  - bcrypt

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

Your Name - sameerbagul2004@gmail.com
Project Link: https://github.com/Sameer-Bagul/best-mern-auth.git

## 🙏 Acknowledgments

- [Node.js](https://nodejs.org/)
- [React.js](https://reactjs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Nodemailer](https://nodemailer.com/) 