const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');

router.post('/', productController.createProduct);
router.get('/', productController.readProducts);
router.get('/:id', productController.readProduct);
router.put('/:id', productController.updateProduct);

module.exports = router;
