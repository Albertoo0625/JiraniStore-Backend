const express= require('express');
const router= express.Router();
const pendingProductController=require('../controllers/pendingProductsController');
const ROLES=require('../config/roles_list')
const verifyJWT=require('../middleware/verifyJWT');
const verifyRoles=require('../middleware/verifyRoles');
const fileExtLimiter = require('../middleware/fileExtLimiter');
const fileSizeLimiter = require('../middleware/fileSizeLimiter');
const filePayloadExists = require('../middleware/filesPayloadExists');


router.get('/',pendingProductController.getAllPendingProducts);
router.post('/',verifyJWT,verifyRoles(ROLES.Editor),filePayloadExists,fileSizeLimiter,fileExtLimiter(['.png', '.jpg', '.jpeg']),pendingProductController.addPendingProduct);
// router.put('/:id',pendingProductController.updatePendingProduct);

router.route('/:id')
    .get(pendingProductController.getOnePendingProduct)
    .delete(pendingProductController.deletePendingProduct)
    .put(pendingProductController.updatePendingProduct)
module.exports=router;