const {verifyAccessToken} = require('../services/tokenService')
const AuthError = require('../errors/tokenError') 

module.exports.checkToken = async (req, res, next) =>{
    try{
        const {headers: {authorization} } = req;
        if(!authorization){
            throw new AuthError('Youre not authorized')
        }
        const [, token] = authorization.split(' ')
        
        req.payload =  await verifyAccessToken(token)
        // console.log(req.payload)
        next()
    }
    catch(err){
        next(err)
    }
}