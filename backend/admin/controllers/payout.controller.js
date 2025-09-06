const Razorpay = require('razorpay');
const axios=require('axios')
const razorpay = new Razorpay({
  key_id: process.env.key_id,
  key_secret: process.env.key_secret
});
var option={
    "account_number": "2323230030362042",
    "amount": 1000000,
    "currency": "INR",
    "mode": "IMPS",
    "purpose": "refund",
    "fund_account": {
        "account_type": "bank_account",
        "bank_account": {
            "name": "Gaurav Kumar",
            "ifsc": "HDFC0001234",
            "account_number": "1121431121541121"
        },
        "contact": {
            "name": "Gaurav Kumar",
            "email": "gaurav.kumar@example.com",
            "contact": "9876543210",
            "type": "vendor",
            "reference_id": "Acme Contact ID 12345",
            "notes": {
                "notes_key_1": "Tea, Earl Grey, Hot",
                "notes_key_2": "Tea, Earl Grey… decaf."
            }
        }
    },
    "queue_if_low_balance": true,
    "reference_id": "Acme Transaction ID 12345",
    "narration": "Acme Corp Fund Transfer",
    "notes": {
        "notes_key_1": "Beam me up Scotty",
        "notes_key_2": "Engage"
    }
}

async function payout(req,res){
    console.log(req.body)
    try {
       const resp=await axios.post('https://api.razorpay.com/v1/payouts',option,{
        headers: {
          'Authorization': {
            "Username":'rzp_test_Oryb3OlHJ8ljOz',
            "Password":'4vLLwYUfYFpnHUwnRiNwO1Uw'
          }
        }
      })
      console.log(resp)
    } catch (error) {
        console.log(error.message)
    }
    
}
module.exports={payout}
