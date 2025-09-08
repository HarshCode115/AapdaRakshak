const fast2sms = require('fast-two-sms')

async function sendsms(array, alertData){
    try{
        const message = `🚨 DISASTER ALERT 🚨\nType: ${alertData.type}\nLocation: ${alertData.location}\nDescription: ${alertData.description}\nStay Safe! - AapdaRakshak`;
        
        var options = {
            authorization: process.env.fastkey, 
            message: message,  
            numbers: array
        }
        
        const result = await fast2sms.sendMessage(options)
        console.log('SMS sent successfully:', result)
        return result

    }
    catch(err){
        console.log('SMS sending failed:', err.message)
        return null
    }
}

module.exports={sendsms}