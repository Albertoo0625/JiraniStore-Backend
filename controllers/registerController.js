const User=require('../modal/UserSchema');
const bcrypt=require('bcrypt');

const handleNewUser=async(req,res)=>{
  const username=req.body.user;
  const email=req.body.email;
  const password=req.body.pwd;

    if(!username||!password ||!email)return res.status(400).json({'message': 'username,email and password required.' });
 
   const duplicate=  await User.findOne({ where: { user_username: username } });

    if(duplicate){
      res.status(409).json({'message': 'username already exists' });
    }else{
      try{
        const hashedPassword=await bcrypt.hash(password,10);
        // creates and saves new user
        const result=await User.create(
          {
              user_username:username,
              user_password:hashedPassword,
              user_email:email,
      
          }
      ).then(()=>{
        res.sendStatus(200);
      });

      console.log(result);
       

           
    }catch(err){
      res.status(500).json({'Error Message':`${err}`});
    }}
       
}


module.exports={handleNewUser}