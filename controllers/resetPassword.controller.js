const {requestPasswordReset} = require('../services/passwordReset.service');

module.exports.resetPasswordController = async(req,res)=>{
    const requestPasswordResetService = await requestPasswordReset(req.body.email);
    if(!requestPasswordResetService) return res.status(500).json({message:"Resetting password failed, try again"});
    return res.status(200).json(requestPasswordResetService);
}