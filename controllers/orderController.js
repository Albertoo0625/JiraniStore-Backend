const handleOrders=(req,res)=>{
    const {shippingInfo}=req.body;
 const {name, email,city, address,amount,cartIds,user_id}=shippingInfo;


 console.log(name, email,city, address,amount,cartIds,user_id)

console.log(shippingInfo)

 return res.status(200).send(shippingInfo)
}

module.exports={handleOrders}