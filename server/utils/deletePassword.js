module.exports.deletePassword = (user) => {
    const readyUser = { ...user._doc} 
    delete readyUser.password;
    return readyUser
}