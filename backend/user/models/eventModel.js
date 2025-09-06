const mongoose=require("mongoose");

const eventSchema= new mongoose.Schema({
    location:{
        type:String,
        required:[true,"Please Enter Location"],
    },
    subject:{
        type:String,
        required:[true,"Please Enter Subject"],
    },
    cordinate:{
        x:{
            type:Number,
            required:true,
        },
        y:{
            type:Number,
            required:true,
        }
    },
    radius:{
        type:Number,
        required:[true,"Please Enter radius"],
    },
    type:{
        type:String,
        required:[true,"Please Enter type"],
    },
    discrption:{
        type:String,
        required:[true,"Please Enter Discrption"],
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    

});


module.exports=mongoose.model("Event",eventSchema);