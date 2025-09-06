# E-commerce Backend API

A complete, production-ready E-commerce backend built with Node.js, Express.js, and MongoDB Atlas. This API provides all the essential features needed for a modern e-commerce platform.

## 🚀 Features

### Authentication & Authorization
- JWT-based authentication with secure password hashing
- Role-based access control (User/Admin)
- Protected routes and middleware
- User registration and login

### Product Management
- Complete CRUD operations for products
- Product categories and filtering
- Search functionality with text indexing
- Image upload support
- Product reviews and ratings
- Stock management

### Shopping Cart
- Persistent cart storage
- Add/remove/update cart items
- Cart validation and stock checking
- Automatic cart clearing after order

### Order Management
- Complete order lifecycle management
- Order status tracking
- Payment status management
- Admin order management
- Order statistics and analytics

### Security Features
- Helmet for HTTP security headers
- Rate limiting on all routes
- Input validation with express-validator
- CORS configuration
- Request sanitization
- Password strength validation

## 📋 Prerequisites

- Node.js 16+ 
- MongoDB Atlas account
- npm or yarn package manager

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Copy `config.env` and update the values:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
   JWT_SECRET=your_super_secure_jwt_secret_key
   JWT_EXPIRE=7d
   MAX_FILE_SIZE=5242880
   UPLOAD_PATH=./uploads
   ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
   ```

4. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/auth/register` | Register new user | Public |
| POST | `/auth/login` | User login | Public |
| GET | `/auth/profile` | Get user profile | Private |
| PUT | `/auth/profile` | Update user profile | Private |
| PUT | `/auth/change-password` | Change password | Private |
| DELETE | `/auth/profile` | Delete account | Private |
| GET | `/auth/users` | Get all users | Admin |
| GET | `/auth/users/:id` | Get user by ID | Admin |
| PUT | `/auth/users/:id` | Update user | Admin |
| DELETE | `/auth/users/:id` | Delete user | Admin |

### Product Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/products` | Get all products | Public |
| GET | `/products/featured` | Get featured products | Public |
| GET | `/products/categories` | Get all categories | Public |
| GET | `/products/category/:category` | Get products by category | Public |
| GET | `/products/:id` | Get single product | Public |
| GET | `/products/:id/reviews` | Get product reviews | Public |
| POST | `/products` | Create product | Admin |
| PUT | `/products/:id` | Update product | Admin |
| DELETE | `/products/:id` | Delete product | Admin |
| POST | `/products/:id/reviews` | Add product review | Private |

### Cart Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/cart` | Get user's cart | Private |
| GET | `/cart/count` | Get cart item count | Private |
| POST | `/cart` | Add item to cart | Private |
| POST | `/cart/validate` | Validate cart items | Private |
| PUT | `/cart/:productId` | Update cart item | Private |
| DELETE | `/cart/:productId` | Remove item from cart | Private |
| DELETE | `/cart` | Clear entire cart | Private |

### Order Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/orders` | Create new order | Private |
| GET | `/orders` | Get user's orders | Private |
| GET | `/orders/:id` | Get single order | Private |
| PUT | `/orders/:id/pay` | Update order payment | Private |
| PUT | `/orders/:id/cancel` | Cancel order | Private |
| GET | `/orders/admin/all` | Get all orders | Admin |
| GET | `/orders/admin/stats` | Get order statistics | Admin |
| PUT | `/orders/admin/:id/status` | Update order status | Admin |

### Upload Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/upload/avatar` | Upload user avatar | Private |
| POST | `/upload/product-image` | Upload single product image | Admin |
| POST | `/upload/product-images` | Upload multiple product images | Admin |
| DELETE | `/upload/:filename` | Delete uploaded file | Admin |
| GET | `/upload/stats` | Get upload statistics | Admin |

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment | development |
| `MONGODB_URI` | MongoDB connection string | Required |
| `JWT_SECRET` | JWT secret key | Required |
| `JWT_EXPIRE` | JWT expiration time | 7d |
| `MAX_FILE_SIZE` | Maximum file upload size | 5242880 |
| `UPLOAD_PATH` | File upload directory | ./uploads |
| `ALLOWED_ORIGINS` | CORS allowed origins | http://localhost:3000 |

### Rate Limiting

- **General**: 100 requests per 15 minutes
- **Auth**: 5 attempts per 15 minutes
- **Upload**: 20 uploads per hour

## 📁 Project Structure

```
ecommerce-backend/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── productController.js # Product management
│   ├── cartController.js    # Cart operations
│   ├── orderController.js   # Order management
│   └── uploadController.js  # File upload handling
├── middlewares/
│   ├── auth.js              # Authentication middleware
│   ├── errorHandler.js      # Error handling
│   ├── validation.js        # Input validation
│   ├── security.js          # Security middleware
│   └── upload.js            # File upload middleware
├── models/
│   ├── User.js              # User schema
│   ├── Product.js           # Product schema
│   ├── Cart.js              # Cart schema
│   └── Order.js             # Order schema
├── routes/
│   ├── auth.js              # Authentication routes
│   ├── products.js          # Product routes
│   ├── cart.js              # Cart routes
│   ├── orders.js            # Order routes
│   └── upload.js            # Upload routes
├── utils/
│   └── helpers.js           # Utility functions
├── uploads/                 # File upload directory
├── config.env               # Environment variables
├── server.js                # Main server file
└── package.json
```

## 🚀 Deployment

### Quick Deploy to Render

1. **Connect Repository**
   - Go to [Render](https://render.com)
   - Connect your GitHub repository

2. **Create Web Service**
   - Choose "Web Service"
   - Set build command: `npm install`
   - Set start command: `npm start`

3. **Environment Variables**
   - Add all environment variables from your `config.env`
   - Set `NODE_ENV=production`

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete

### Other Platforms

- **Railway**: Connect GitHub repo and deploy
- **Vercel**: Use Vercel CLI or dashboard
- **Heroku**: Use Heroku CLI with Procfile

## 🧪 Testing

### Health Check
```bash
curl http://localhost:5000/health
```

### API Documentation
```bash
curl http://localhost:5000/api
```

### Admin Access
To access admin features, you can use these test credentials:

**Admin User:**
- **Email:** `admin@example.com`
- **Password:** `Admin123`

**Alternative Admin User:**
- **Email:** `test3@example.com`
- **Password:** `Password123`

> **Note:** These are test credentials. In production, change these immediately and use strong, unique passwords.

### Example API Calls

**Register User:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "Password123",
    "country": "USA",
    "phone": "+1234567890"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Password123"
  }'
```

**Get Products:**
```bash
curl http://localhost:5000/api/products
```

## 🔒 Security

- Password hashing with bcrypt
- JWT token authentication
- Rate limiting on all routes
- Input validation and sanitization
- CORS configuration
- Helmet security headers
- File upload restrictions

## 📊 Database Schema

### User Schema
- username, email, password, country, phone
- isAdmin (default: false)
- address, avatar

### Product Schema
- name, description, price, category, stock
- images, brand, model, specifications
- reviews, rating, featured status

### Cart Schema
- userId, items array, totalPrice, totalItems

### Order Schema
- userId, orderNumber, items, shippingAddress
- paymentMethod, paymentStatus, orderStatus
- totalAmount, trackingNumber, notes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

