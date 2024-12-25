const { promisify } = require('node:util')
const jwt = require('jsonwebtoken');
const {SECRET_ACCESS_KEY, SECRET_REFRESH_KEY, ACCESS_TIME, REFRESH_TIME} = require ('../constans/keys')
const promisifyJWTSign = promisify(jwt.sign)
const promisifyJWTWerify = promisify(jwt.verify)
const tokenConfig ={
    access:{
        secret: SECRET_ACCESS_KEY,
        time: ACCESS_TIME
    },
    refresh:{
        secret: SECRET_REFRESH_KEY,
        time: REFRESH_TIME
    },
}

module.exports.createToken = ({userId, email}, {time, secret}) => promisifyJWTSign({userId, email}, secret, {expiresIn: time})

const verifyToken = (token, {secret}) => {const res = promisifyJWTWerify(token, secret)
    // console.log("info")
    // console.log(res)
    return res
}

module.exports.createTokenPair = async (userId, email) => {

    const accessToken= await this.createToken({userId, email}, tokenConfig.access)
    return {
        accessToken,
        refreshToken: await this.createToken({userId, email}, tokenConfig.refresh),
    }
}

module.exports.verifyAccessToken = async (token) => {
    const res = await verifyToken(token, tokenConfig.access)
    console.log(res)
    // res.userId = res.userId.userId

    return res
}

module.exports.verifyRefreshToken = async (token) => await verifyToken(token, tokenConfig.refresh)
