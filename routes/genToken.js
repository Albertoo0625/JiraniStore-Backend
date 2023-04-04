const express= require('express');
const router= express.Router();


const mpesaAuth=require('../middleware/mpesaAuth')

router.get('/',mpesaAuth.generateToken);

module.exports=router;