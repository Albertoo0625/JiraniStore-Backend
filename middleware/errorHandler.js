const { logEvents } =require('./LogEvents');

const errorHandler= (err,req,res,next)=>{
    logEvents(`${err.name}\t${err.message}\n`,'errLog.txt');
    res.status(500).send(err.message);
    next();
}

module.exports= errorHandler;