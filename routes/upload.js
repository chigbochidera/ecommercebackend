const express = require('express');
const router = express.Router();
const {
  uploadProductImages,
  uploadProductImage,
  uploadAvatar,
  deleteUploadedFile,
  getUploadStats
} = require('../controllers/uploadController');

const { protect, adminOnly } = require('../middlewares/auth');
const { uploadSingle, uploadMultiple } = require('../middlewares/upload');

// All upload routes require authentication
router.use(protect);

// User routes
router.post('/avatar', uploadSingle('avatar'), uploadAvatar);

// Admin routes
router.post('/product-image', adminOnly, uploadSingle('image'), uploadProductImage);
router.post('/product-images', adminOnly, uploadMultiple('images', 10), uploadProductImages);
router.delete('/:filename', adminOnly, deleteUploadedFile);
router.get('/stats', adminOnly, getUploadStats);

module.exports = router;
