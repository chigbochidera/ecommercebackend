const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getOrder,
  updateOrderToPaid,
  updateOrderStatus,
  getAllOrders,
  getOrderStats,
  cancelOrder
} = require('../controllers/orderController');

const { protect, adminOnly } = require('../middlewares/auth');
const {
  validateOrder,
  validateObjectId,
  validatePagination
} = require('../middlewares/validation');

// All order routes require authentication
router.use(protect);

// User routes
router.post('/', validateOrder, createOrder);
router.get('/', validatePagination, getMyOrders);
router.get('/:id', validateObjectId, getOrder);
router.put('/:id/pay', validateObjectId, updateOrderToPaid);
router.put('/:id/cancel', validateObjectId, cancelOrder);

// Admin routes
router.get('/admin/all', adminOnly, validatePagination, getAllOrders);
router.get('/admin/stats', adminOnly, getOrderStats);
router.put('/admin/:id/status', adminOnly, validateObjectId, updateOrderStatus);

module.exports = router;
