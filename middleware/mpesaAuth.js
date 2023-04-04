const axios=require("axios");
require("dotenv").config();

const generateToken=async(req,res,next)=>{
    const secret=process.env.CONSUMER_SECRET;
    const customer=process.env.CONSUMER_KEY;
    console.log(secret,customer);
   const auth= new Buffer.from(`${customer}:${secret}`).toString("base64");
   console.log(`auth:${auth}`);

   try{
   const response= await axios.get("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    {
            headers:{ 
            Authorization:`Basic ${auth}`,
        }
    });
    const token=response.data.access_token;
    console.log(token);
    req.body.token=token;
    next();
   }catch(err)
 {console.log(err)}
 
}

module.exports={generateToken};


// let unirest = require('unirest');

// const generateToken=async(req,res,next)=>{

//         const secret=process.env.CONSUMER_SECRET;
//     const customer=process.env.CONSUMER_KEY;
//     console.log(secret,customer);
//    const auth= new Buffer.from(`${customer}:${secret}`).toString("base64");
//    console.log(`auth:${auth}`);

// let response = unirest('GET', 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials')

// .headers({ 'Authorization': `Bearer ${auth}` })

// .send()

// .end(res => {

//     if (res.error) throw new Error(res.error);

//     console.log(res.raw_body);

// });

// }

// module.exports={generateToken}

