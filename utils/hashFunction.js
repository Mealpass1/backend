const bcrypt = require('bcrypt');
module.exports.hashFunction=async(val)=>{
    const salt = await bcrypt.genSalt(10);
    const finalVal = await bcrypt.hash(val,salt);
    return finalVal;
}