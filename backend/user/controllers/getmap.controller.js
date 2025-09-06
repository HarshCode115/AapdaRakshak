const {adminalertmodel}=require('../../models/adminalert.model')

async function getmapdetails(req,res){
    try {
        const result=await adminalertmodel.find({status:'success'})
        if(result){
            return res.status(200).json({
                data:result,
                flag:true
            })
        }
        return res.status(201).json({
            message:'some error occurred',
            flag:false
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message,
            flag:false
        })
    }
}

module.exports={getmapdetails}