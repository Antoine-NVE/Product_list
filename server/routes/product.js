const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');

router.post('/', productController.createProduct);
router.get('/', productController.readProducts);

module.exports = router;
