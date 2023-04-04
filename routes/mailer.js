const express=require('express');
const router=express.Router();
const mailController=require('../controllers/mailerController');

router.post('/',mailController.sendemail);

module.exports=router;