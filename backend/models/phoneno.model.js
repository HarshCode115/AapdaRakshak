const mongoose=require('mongoose')
const {Schema,model}=mongoose;

const phonenoschema=new Schema({
    mobileno:{
        type:String,
        required:true
    }
})

const phonenomodel=model('phonenomodel',phonenoschema)
module.exports={phonenomodel}