const express = require('express');

const router = express.Router();

const productController = require('../controllers/products');

const checkAuth = require('../middelware/check_auth');

const validationCheck = require('../middelware/validation');

// Add Product
router.post('/products', checkAuth, validationCheck.productValidation, productController.addProduct);

//Edit Product
router.put('/products/:productId', checkAuth, productController.editProduct);

// View User specific products
router.get('/products/', checkAuth, productController.viewAllProducts);

// View Product by ID
router.get('/products/:productId', checkAuth, productController.viewSpecificProduct);

// Delete Product by ID
router.delete('/product/:productId', checkAuth, productController.deleteProduct);

module.exports = router;