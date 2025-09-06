const {volunteermodel}=require('../../models/volunter.model')

async function getvolunteercontroller(req,res){
    try {
        const result=await volunteermodel.find({status:'pending'})
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

async function postvolunteerres(req,res){
    try {
        const {id,response}=req.body;
        const result=await volunteermodel.findOneAndUpdate({_id:id},{status:response})
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
module.exports={getvolunteercontroller,postvolunteerres}