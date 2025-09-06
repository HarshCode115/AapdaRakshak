const { string, date } = require('joi');
const mongoose=require('mongoose');
const {Schema,model} =mongoose;
const adminalertschema=new Schema({
   type:{
    type:String,
    required:true
   },
   description:{
    type:String,
    required:true
   },
   location:{
    type:String,
    required:true
   },
   longitude:{
    type:Number,
    required:true
   },
   latitude:{
    type:Number,
    required:true
   },
   createdby:{
    type:Number
   },
   expiresby:{
    type:Number
   }
})

const adminalertmodel=model('adminalertmodel',adminalertschema)

module.exports={adminalertmodel}