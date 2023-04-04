const express= require('express');
const router= express.Router();
const productController=require('../controllers/productController');

router.route('/:query')
    .get(productController.searchProduct)

module.exports=router;