const mongoose=require('mongoose')
const {Schema,model}=mongoose;
const fundschema=new Schema({
    supportingdocs:{
        type:[{
            name:{
                type:String
            },
            Url:{
                type:String
            }
        }],
        required:true
    },
    accNumber:{
        type:String,
        required:true
    },
    accHolder:{
        type:String,
        required:true
    },
    ifsc:{
        type:String,
        required:true
    },
    amount:{
        type:String,
        required:true
    },
    vicName:{
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
    status:{
        type:String
    }
    ,currentamount:{
        type:Number,
        default:0
    }

})

const fundmodel=model('fundmodel',fundschema)

module.exports={fundmodel}