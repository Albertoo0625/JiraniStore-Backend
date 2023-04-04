const User=require('../modal/UserSchema');

const handleLogOut=async(req,res)=>{
    const cookies=req.cookies;
    if(!cookies?.jwt)return res.sendStatus(204);
    const refreshToken=cookies.jwt;
    const foundUser=await User.findOne({where:{user_refreshToken:refreshToken}});
    if(!foundUser){ 
        res.clearCookie('jwt',{httpOnly: true,sameSite:'None',secure:true,maxAge:24*60*60*1000});
        res.sendStatus(204);
    }

    foundUser.user_refreshToken='';
    const result= await foundUser.save();
    console.log(result);


res.clearCookie('jwt',{httpOnly: true,sameSite:'None',secure:true,maxAge:24*60*60*1000}).sendStatus(204);
}

module.exports={handleLogOut}