const joi=require('joi')

const validate_schema=joi.object({
email:joi.string().email().required(),
password:joi.string()
})
module.exports={validate_schema}