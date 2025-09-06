const { getFileUrl, deleteFile } = require('../middlewares/upload');
const Product = require('../models/Product');

// @desc    Upload product images
// @route   POST /api/upload/product-images
// @access  Private/Admin
const uploadProductImages = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded'
      });
    }

    const imageUrls = req.files.map(file => 
      getFileUrl(req, file.filename)
    );

    res.status(200).json({
      success: true,
      message: 'Images uploaded successfully',
      data: {
        images: imageUrls,
        count: imageUrls.length
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload single product image
// @route   POST /api/upload/product-image
// @access  Private/Admin
const uploadProductImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const imageUrl = getFileUrl(req, req.file.filename);

    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        image: imageUrl,
        filename: req.file.filename
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload user avatar
// @route   POST /api/upload/avatar
// @access  Private
const uploadAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const avatarUrl = getFileUrl(req, req.file.filename);

    // Update user avatar in database
    const User = require('../models/User');
    await User.findByIdAndUpdate(req.user._id, { avatar: avatarUrl });

    res.status(200).json({
      success: true,
      message: 'Avatar uploaded successfully',
      data: {
        avatar: avatarUrl,
        filename: req.file.filename
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete uploaded file
// @route   DELETE /api/upload/:filename
// @access  Private/Admin
const deleteUploadedFile = async (req, res, next) => {
  try {
    const path = require('path');
    const { filename } = req.params;
    const filePath = path.join(process.env.UPLOAD_PATH || './uploads', filename);

    const deleted = deleteFile(filePath);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }

    // Remove image from products that use it
    await Product.updateMany(
      { images: { $in: [getFileUrl(req, filename)] } },
      { $pull: { images: getFileUrl(req, filename) } }
    );

    res.status(200).json({
      success: true,
      message: 'File deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get upload statistics
// @route   GET /api/upload/stats
// @access  Private/Admin
const getUploadStats = async (req, res, next) => {
  try {
    const fs = require('fs');
    const path = require('path');
    
    const uploadDir = process.env.UPLOAD_PATH || './uploads';
    const files = fs.readdirSync(uploadDir);
    
    let totalSize = 0;
    const fileStats = files.map(file => {
      const filePath = path.join(uploadDir, file);
      const stats = fs.statSync(filePath);
      totalSize += stats.size;
      
      return {
        filename: file,
        size: stats.size,
        created: stats.birthtime
      };
    });

    res.status(200).json({
      success: true,
      data: {
        totalFiles: files.length,
        totalSize,
        files: fileStats
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadProductImages,
  uploadProductImage,
  uploadAvatar,
  deleteUploadedFile,
  getUploadStats
};
