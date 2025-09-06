const {fundmodel}=require('../../models/fund.model')

async function getdonatecontroller(req,res){
    try {
        const result=await fundmodel.find({status:'success'});
        // console.log(result)/
        return res.status(200).json({
            data:result,
            message:'suuccessfully returned',
            flag:true
        })
    } catch (error) {
        return res.status(500).json({
            message:'Internal server error',
            flag:true
        })
    }
}


module.exports={getdonatecontroller}