const {volunteermodel} =require('../../models/volunter.model')
async function checkvolunteercontroller(req, res) {
    try {
        console.log(req.body);
        
        // Set default status
        req.body.status = 'pending';
        
        // Destructure required fields with validation
        const { image, name, number, type, location, desc, description, status, userid, token } = req.body;
        
        // Use either desc or description (for backward compatibility)
        const volunteerDesc = desc || description;
        
        // Check if required fields are present
        if (!volunteerDesc) {
            return res.status(400).json({
                message: 'Description is required',
                flag: false
            });
        }
        
        // Check if user already applied as volunteer
        const userIdToCheck = userid || token; // Handle both userid and token
        const result = await volunteermodel.findOne({ userid: userIdToCheck });
        if (result) {
            return res.status(403).json({
                message: 'Volunteer application already exists',
                flag: false
            });
        }
        
        // Create new volunteer application
        await volunteermodel.create({
            image,
            name,
            number,
            type,
            location,
            desc: volunteerDesc,  // Use the correct description field
            status,
            userid: userIdToCheck
        });
        
        return res.status(200).json({
            message: 'Volunteer application is under review',
            flag: true
        });
    } catch (error) {
        return res.status(500).json({
            message:error.message,
            flag:false
        })
    }
}

module.exports={checkvolunteercontroller}