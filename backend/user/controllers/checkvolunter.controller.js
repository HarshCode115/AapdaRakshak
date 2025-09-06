const {volunteermodel} =require('../../models/volunter.model')
async function checkvolunteercontroller(req,res){
    try {
        console.log(req.body)
        req.body.status='pending'
        const {image,name,number,type,location,desc,status,userid}=req.body
        const result=await volunteermodel.findOne({userid})
        if(result) return res.status(403).json({
            message:'Volunteer already exist',
            flag:false
        })
        await volunteermodel.create({image,name,number,type,location,desc,status,userid})
        return res.status(200).json({
            message:'Volunteer is under review',
            flag:true
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message,
            flag:false
        })
    }
}

module.exports={checkvolunteercontroller}