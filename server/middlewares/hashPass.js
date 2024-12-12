const bcrypt = require('bcrypt');

const SALT_ROUND = 1;

module.exports.hashPass = async (req, res, next) =>{
    try{
        const {body: {password}} = req;
        
        req.body.password = await bcrypt.hash(password, SALT_ROUND)
        
        next();
    }
    catch(err){
        next(err)
    }
}