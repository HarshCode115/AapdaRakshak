const fast2sms = require('fast-two-sms')

async function sendsms(array,desc){
    try{
        var options = {authorization : process.env.fastkey , message : desc ,  numbers :array}
        const result=await fast2sms.sendMessage(options)
        console.log(result)
        return 

    }
    catch{(err)=>{
        console.log(err.message)
        return
    }}
}

module.exports={sendsms}