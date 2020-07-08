const bcryptjs = require("bcryptjs")
const authService = require("../services/jwt")
const httpStatus = require("http-status-codes")

const encryptPassword = (req, res, next) => {
    if (req.body.password) {
        req.body.encryptedPassword = bcryptjs.hashSync(req.body.password, 8)
    }
    next()
}

const authenicate = (req, res, next) => {
    try {
        const bearerHeader = req.headers['authorization']
        if (typeof bearerHeader === 'undefined') {
            return res.status(httpStatus.UNAUTHORIZED).json({message: "Token not provided"})
        }
        const [bearer, token] = bearerHeader.split(' ')


        if (!token) {
            return res.status(httpStatus.UNAUTHORIZED).json({message: "Invalid token"})
        }

        const {username, password} = authService.verifyJwt(token)
        if (!username || !password) {
            return res.status(httpStatus.UNAUTHORIZED).json({message: "Invalid token"})
        }
        req.body.username = username
        req.body.password = password

        return next()
    } catch (err) {
        console.log(err)
        if(err.message === 'JsonWebTokenError: invalid token') {
            return res.status(httpStatus.UNAUTHORIZED).json({message: "Invalid token"})
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: "Internal error"})
    }
}


const validateUser = (db, userModel) => {
    return async (req, res, next) => {
        try {
            const params = req.body
            const user = await userModel.find(db, params.username)
            if (!user) {
                return res.status(httpStatus.UNAUTHORIZED).json({message: 'User not found'})
            }
            const validPassword = bcryptjs.compareSync(params.password, user.password)
            if (!validPassword) {
                return res.status(httpStatus.UNAUTHORIZED).json({message: "Invalid password"})
            }
            return next()
        } catch (err) {
            console.log(err)
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: "Internal error"})
        }
    }
}

module.exports = {encryptPassword, authenicate, validateUser}