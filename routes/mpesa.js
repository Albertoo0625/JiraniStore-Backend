const express= require('express');
const router= express.Router();
const mpesaController=require('../controllers/mpesaController');
const verifyJWT=require('../middleware/verifyJWT');
const ROLES=require('../config/roles_list')


const verifyRoles = require('../middleware/verifyRoles');
router.post('/',mpesaController.handleMpesaPayment);

module.exports=router;