const express= require('express');
const router= express.Router();
const productController=require('../controllers/productController');
const ROLES=require('../config/roles_list')
const verifyJWT=require('../middleware/verifyJWT');
const verifyRoles=require('../middleware/verifyRoles');


router.get('/',productController.getAllProducts);
router.post('/',productController.addProduct);
router.put('/:id',productController.updateProduct);


router.route('/:id')
    .get(productController.getOneProduct)
    .delete(productController.deleteProduct);

// router.route('/search/:query')
//     .get(productController.searchProduct)
 
module.exports=router;