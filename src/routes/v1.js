import express from "express";
const router = express.Router();

import userApi from './apis/user.api'
router.use('/users', userApi)

import productsApi from './apis/product.api'
router.use('/products', productsApi);


import categoryApi from './apis/category.api'
router.use('/categories', categoryApi)


module.exports = router;
