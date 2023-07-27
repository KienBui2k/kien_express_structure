import express from "express";
const router = express.Router();
import productController from '../../controllers/product.controller'

router.post('/set-product-data', productController.createProductDefault)
router.get('/', productController.getProducts);
router.post('/', productController.createProduct);
router.delete('/:productId', productController.deleteProductById);


module.exports = router;