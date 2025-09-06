const Razorpay=require('razorpay')
var instance = new Razorpay({
    key_id: process.env.key_id,
    key_secret: process.env.key_secret,
});

async function createordercontroller(req,res){
    try {
        const {useramount,id}=req.body;
        const {amount,currency,receipt, notes} = {amount:Number(useramount)*100,currency:'INR',receipt:id,notes:"Donate"};		
        instance.orders.create({amount, currency, receipt, notes}, function (err,order){
            if(err){
                console.log(err);
                return res.status(500).json({
                    message:'order is not created',
                    flag:false
                })
            }
            else{
                console.log(order.id)
                res.status(200).json({id:order.id,flag:true});
            }
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            message:error.message,
            flag:false
        })
    }	
}

module.exports={createordercontroller}