const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  deleteAccount,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById
} = require('../controllers/authController');

const { protect, adminOnly } = require('../middlewares/auth');
const {
  validateUserRegistration,
  validateUserLogin,
  validateUserUpdate,
  validateObjectId
} = require('../middlewares/validation');

// Public routes
router.post('/register', validateUserRegistration, register);
router.post('/login', validateUserLogin, login);

// Protected routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, validateUserUpdate, updateProfile);
router.put('/change-password', protect, changePassword);
router.delete('/profile', protect, deleteAccount);

// Admin routes
router.get('/users', protect, adminOnly, getUsers);
router.get('/users/:id', protect, adminOnly, validateObjectId, getUserById);
router.put('/users/:id', protect, adminOnly, validateObjectId, updateUserById);
router.delete('/users/:id', protect, adminOnly, validateObjectId, deleteUserById);

module.exports = router;
