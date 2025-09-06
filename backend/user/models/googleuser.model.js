const {Schema,model}=require("mongoose");

const googleuserschema= new Schema({
    name:{
        type:String
    },
    email:{
        type:String
    }

});


const googleusermodel=model("googleusermodel",googleuserschema);
module.exports={googleusermodel}