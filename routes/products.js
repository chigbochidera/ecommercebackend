const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  getFeaturedProducts,
  getProductsByCategory,
  getCategories
} = require('../controllers/productController');

const { protect, adminOnly } = require('../middlewares/auth');
const {
  validateProduct,
  validateReview,
  validateObjectId,
  validatePagination
} = require('../middlewares/validation');

// Public routes
router.get('/', validatePagination, getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/categories', getCategories);
router.get('/category/:category', validatePagination, getProductsByCategory);
router.get('/:id', validateObjectId, getProduct);
router.get('/:id/reviews', validateObjectId, getProductReviews);

// Protected routes
router.post('/:id/reviews', protect, validateObjectId, validateReview, createProductReview);

// Admin routes
router.post('/', protect, adminOnly, validateProduct, createProduct);
router.put('/:id', protect, adminOnly, validateObjectId, validateProduct, updateProduct);
router.delete('/:id', protect, adminOnly, validateObjectId, deleteProduct);

module.exports = router;
