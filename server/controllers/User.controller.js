const {User, Chat, RefreshToken} = require('../models')
const bcrycp = require('bcrypt') 
const {deletePassword} = require('../utils/deletePassword')
const {createTokenPair} = require('../services/tokenService')
const {verifyRefreshToken} = require('../services/tokenService')
const AuthError = require('../errors/tokenError')
module.exports.signUp = async(req, res, next) =>{
    try{
        const {body} = req;
        const createdUser = await User.create(body);
        const readyUser = deletePassword(createdUser)
        const tokens = await createTokenPair(readyUser.id, readyUser.email) 
        console.log(readyUser)
        const add = await RefreshToken.create({
            token: tokens.refreshToken,
            userId: readyUser._id
        })
        console.log(add)
        
        res.status(201).send({data: readyUser, tokens: tokens})

    }catch(err){
        next(err)
    }
}

module.exports.signIn = async(req, res, next) =>{
    try{
        const {body: {email, password}} = req;
        
        const foundUser = await User.findOne({
            email,
            
        })
        if(!foundUser){
            throw new Error('Incorrect nickname or password')
        }
        else{
            const isCorrect = await bcrycp.compare(password, foundUser.password)
        if(isCorrect){
            const readyUser = deletePassword(foundUser)
            const tokens =  await createTokenPair(foundUser._id, foundUser.email)
            const refreshTokenDB = await RefreshToken.findOne(
                    { userId: foundUser._id });
            console.log(tokens.refreshToken)
            console.log(foundUser._id)
            console.log(refreshTokenDB)
            await refreshTokenDB.deleteOne();
            
            const add = await RefreshToken.create({
                token: tokens.refreshToken,
                userId: foundUser._id
            })
            
            res.status(200).send({data:readyUser, tokens: tokens})
        }
        else{
            throw new Error('Incorrect nickname or password')
        }
    }
        

    }catch(err){
        next(err)
    }
}

module.exports.refreshSession = async (req, res, next) => {
    const { body: { refreshToken } } = req;
    if(!refreshToken){
        next(new Error('RefreshToken is undefined'))
    }
    try {
        const verifyResult = await verifyRefreshToken(refreshToken);

        if (!verifyResult) {
            throw new AuthError('Invalid refresh token');
        }
        console.log(verifyResult)
        const foundUser = await User.findOne({ email: verifyResult.email });
        if (!foundUser) {
            throw new AuthError('User not found');
        }
        console.log(foundUser)
        console.log(refreshToken)

        const refreshTokenDB = await RefreshToken.findOne({
            $and: [
                { token: refreshToken },
                { userId: foundUser._id },
            ],
        });

        if (!refreshTokenDB) {
            throw new AuthError('Token not found');
        }

        await refreshTokenDB.deleteOne();
        const tokenPair = await createTokenPair({ userId: foundUser.id, email: foundUser.email });
        await RefreshToken.create({
            token: tokenPair.refreshToken,
            userId: foundUser.id,
        });

        return res.status(200).send({ tokens: { tokenPair } });
    } catch (err) {
        next(err);
    }
};



module.exports.getUser = async (req, res, next) => {
    try{
        const {payload: {userId}} = req;
        const foundUser = await User.findById(userId)
        if(!foundUser){
            throw new Error('user not found')
        }
        res.status(200).send({data: foundUser})
    }
    catch(err){
        next(err)
    }
}
