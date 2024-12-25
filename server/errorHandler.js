const { JsonWebTokenError, TokenExpiredError } = require('jsonwebtoken')
const AuthError  = require('./errors/tokenError') 

module.exports.errorHandler = async (err, req, res, next) =>{
    // console.log(err)
    if(err instanceof AuthError){
        return res.status(401).send(err.message || 'Need authorization')
    }
    if(err instanceof TokenExpiredError || err instanceof JsonWebTokenError){
        return res.status(403).send('Token is expired')
    }
    return res.status(500).send(err.message)
}