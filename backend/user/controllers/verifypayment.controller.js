var crypto = require("crypto");
const razorpay=require('razorpay')
const {fundmodel}=require('../../models/fund.model')
var instance = new razorpay({
    key_id: process.env.key_id,
    key_secret: process.env.key_secret,
});

async function verifypayment(req,res){
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        
        // Verify payment signature
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.key_secret)
            .update(body.toString())
            .digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            // Payment is verified, update the fund
            const order = await instance.orders.fetch(razorpay_order_id);
            const amount = order.amount;
            const id = order.receipt;
            
            const fund = await fundmodel.findById(id);
            if (fund) {
                await fundmodel.findByIdAndUpdate(id, {
                    currentamount: fund.currentamount + (amount / 100)
                });
                
                console.log(`Payment verified: ₹${amount/100} added to fund ${id}`);
                
                return res.json({
                    success: true,
                    message: "Payment verified successfully",
                    amount: amount / 100
                });
            } else {
                return res.status(404).json({
                    success: false,
                    message: "Fund not found"
                });
            }
        } else {
            return res.status(400).json({
                success: false,
                message: "Payment verification failed"
            });
        }
    } catch (error) {
        console.error("Payment verification error:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports={verifypayment}