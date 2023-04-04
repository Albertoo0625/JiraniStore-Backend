const express= require('express');
const router= express.Router();


const callbackController=require('../controllers/callbackController')

router.post('/',callbackController.handleCallback);

module.exports=router;