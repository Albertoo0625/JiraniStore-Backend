const {format}=require('date-fns');
const {v4:uuid}=require('uuid');
const fspromises=require('fs').promises;
const fs=require('fs');
const path=require('path');

const logEvents= async (message,logName)=>{
    const dateTime=(`${format(new Date(),'yyyyMMdd\t HH:mm:ss')}`);
    const logItem=(`${dateTime}\t${uuid()}\t${message}\n`);
    try{
        if(!fs.existsSync(path.join(__dirname,'..','logs'))){
            await fspromises.mkdir(__dirname,'..','logs');
        }
     await fspromises.appendFile(path.join(__dirname,'..','logs',`${logName}`),logItem);
    }catch(err){
        console.log(err)
    }

}
const logger=(req, res, next)=>{
    logEvents(`${req.url}\t${req.method}\t${req.headers.origin}`, 'reqLog.txt');
    console.log(`${req.method} ${req.path}`);
    next();
}

module.exports ={logger,logEvents};