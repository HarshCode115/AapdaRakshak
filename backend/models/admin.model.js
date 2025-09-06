const mongoose=require('mongoose');
const {Schema,model} =mongoose;
const bcrypt=require('bcryptjs')
const adminschema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    }
})
adminschema.pre('save',async function(){
    let salt=await bcrypt.genSalt(10);
    let hash=await bcrypt.hash(this.password,salt)
    this.password=hash
})
const adminmodel=model('adminmodel',adminschema)

module.exports={
    adminmodel
}