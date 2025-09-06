const {fundmodel}=require('../../models/fund.model')
async function fundcontroller(req,res){
    try {
        req.body.status='pending'
        console.log(req.body)
        const {accNumber,accHolder,ifsc,amount,vicName,supportingdocs,userid,status,desc}=req.body;
        await fundmodel.create({accNumber,accHolder,ifsc,amount,vicName,supportingdocs,userid,status,desc})
        return res.status(200).json({
            message:'Successfully created',
            flag:true
        })

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message:'internal server error',
            flag:false
        })
    }
}

async function getfund(req,res){
    try {
        const result=await fundmodel.find({status:'pending'})
        return res.status(200).json({
            data:result,
            flag:true
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message,
            flag:false
        })
    }
}

async function postfundres(req,res){
    try {
        const {id,response}=req.body;
        const result=await fundmodel.findOneAndUpdate({_id:id},{status:response})
        console.log(result);
        return res.status(200).json({
            message:'Updated Successfully',
            flag:true
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message,
            flag:false
        })
    }
}

module.exports={fundcontroller,getfund,postfundres}