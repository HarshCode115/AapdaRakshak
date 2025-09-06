const mongoose =require('mongoose');
require('dotenv').config('../')
// const pool=mongoose.connect("mongodb://localhost:27017/aptguard",{
const pool=mongoose.connect("mongodb+srv://1234:1234@cluster0.0ilq2hx.mongodb.net/",{
    connectTimeoutMS: 10000,
    useNewUrlParser: true 
})
.then(function(db){
  console.log("db is connected 🎉🎉🎉");
})
.catch(function(err){
  console.log('error at mongo connection',err.message);
})

mongoose.connection.on('connected',()=>{
  console.log('connectes to data base')
})
mongoose.connection.on('error',(err)=>{
  console.log(err.message);
}) 
mongoose.connection.on('disconnected',()=>{
  console.log('db disconnected succesfully');
})

process.on('SIGINT',async ()=>{
  await mongoose.connection.close();
  process.exit(0);
})
module.exports=pool;

