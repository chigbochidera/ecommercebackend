const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  getCartCount,
  validateCart
} = require('../controllers/cartController');

const { protect } = require('../middlewares/auth');
const {
  validateCartItem,
  validateObjectId
} = require('../middlewares/validation');

// All cart routes require authentication
router.use(protect);

// Cart routes
router.get('/', getCart);
router.get('/count', getCartCount);
router.post('/', validateCartItem, addToCart);
router.post('/validate', validateCart);
router.put('/:productId', validateObjectId, validateCartItem, updateCartItem);
router.delete('/:productId', validateObjectId, removeFromCart);
router.delete('/', clearCart);

module.exports = router;
