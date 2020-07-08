const jwt = require("jsonwebtoken")

const SECRET_KEY = 'secretKey'

const createJwt = (username, password) => {
    try {
        return jwt.sign({ username, password }, SECRET_KEY)
    } catch (err) {
        console.error(err)
        throw new Error(err)
    }
}

const verifyJwt = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY)
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}


module.exports = { createJwt, verifyJwt }