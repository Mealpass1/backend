const bcrypt = require('bcrypt');
module.exports.verifyPassword = (unhashed, hashed) => {
    return bcrypt.compareSync(unhashed,hashed);
}