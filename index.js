const {logEvents} =require('./middleware/LogEvents')

const EventEmitter=require('events');

class Emitter extends EventEmitter{};

const myEmitter= new Emitter();

myEmitter.on('log',(msg,logName)=>logEvents(msg,logName));

myEmitter.emit('log',"log event emmited",'oldserver.txt');
