const mongoose=require('mongoose')
const {Schema,model}=mongoose;

const volunteerschema=new Schema({
    name:{
        type:String,
        requires:true
    },
    number:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true 
    },
    userid:{
        type:String,
        required:true
    },
    image:[
        {
            name:{
                type:String,
                required:true
            },
            Url:{
                type:String,
                required:true
            }
        }
    ],
    status:{
        type:String,
        required:true
    }
})


const volunteermodel=model('volunteermodel',volunteerschema)
module.exports={volunteermodel}