const nodemailer=require('nodemailer');



const sendemail=(req,res)=>{
  const {useremail,message,subject}=req.body

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SENDER,
      pass: process.env.PASS
    }
  });

  const Options ={
    from: process.env.SENDER,
    to: `${useremail}`,
    subject: `${subject}`,
    text: `${message}`
  };



  transporter.sendMail(Options, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json("Email sent")
    }
  });

  
}
  
  module.exports={sendemail}