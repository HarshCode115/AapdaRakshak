var crypto = require("crypto");
const razorpay=require('razorpay')
const {fundmodel}=require('../../models/fund.model')
var instance = new razorpay({
    key_id: process.env.key_id,
    key_secret: process.env.key_secret,
});
async function verifypayment(req,res){
    try {
        instance.orders.fetch( req.body.razorpay_order_id)
       .then(async (order) => {
        const amount = order.amount;
        const id=order.receipt;
        console.log(id);
        const res=await fundmodel.findById(id)
        const result=await fundmodel.findByIdAndUpdate(id,{currentamount:res.currentamount+(amount/100)});
        console.log(res,id,amount)
    })
    return res.redirect('http://localhost:3000/donation')
    } catch (error) {
        return res.status(500).json({
            message:error.message,
            flag:false
        })
    }
}

module.exports={verifypayment}