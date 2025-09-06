const mongoose=require('mongoose')
const {Schema,model}=mongoose;

const emailschema=new Schema({
    email:{
        type:String,
        required:true
    }
})

const emailmodel=model('emailmodel',emailschema)
module.exports={emailmodel}