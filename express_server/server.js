const express = require("express")
const bodyParser = require('body-parser')
const httpStatus = require('http-status-codes')
const cors = require('cors')

const {encryptPassword, authenicate, validateUser} = require("./src/middleware/auth")
const db = require("./src/db/database")
const jwtService = require("./src/services/jwt")
const userModel = require("./src/models/user")
const candidateModel = require("./src/models/candidate")
const app = express()

const PORT = 8080

app.use(cors())
app.use(bodyParser.json())

app.post("/api/auth/signup",
    encryptPassword,
    async (req, res) => {
        try {
            const params = req.body
            await userModel.add(db, params.username, params.encryptedPassword, params.email)
            const token = jwtService.createJwt(params.username, params.password)
            return res.status(httpStatus.CREATED).json({token})
        } catch (err) {
            console.log(err)
            if (err === 'SQLITE_CONSTRAINT: UNIQUE constraint failed: user.email') {
                return res.status(httpStatus.CONFLICT).json({message: "Already registered"})
            } else {
                return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: "Internal error"})
            }
        }
    }
)

app.post("/api/auth/signin",
    validateUser(db, userModel),
    async (req, res) => {
        try {
            const params = req.body
            const token = jwtService.createJwt(params.username, params.password, params.email)
            return res.status(httpStatus.OK).json({token})
        } catch(err) {
            console.log(err)
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: "Internal error"})
        }
        
    }
)

app.get("/api/candidates",
    authenicate,
    validateUser(db, userModel),
    async (req, res) => {
        try {
            const candidatesList = await candidateModel.list(db)
            return res.status(httpStatus.OK).json({data: candidatesList})
        } catch (err) {
            console.log(err)
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: "Internal error"})
        }
    }
)


app.use((req, res) => {
    res.status(httpStatus.NOT_FOUND).json({ message: 'Request not found' })
})

app.use((err, req, res, next) => {
    if(err instanceof SyntaxError && err.status == 400) {
        res.status(400).json({message: "Bad JSON"})
    } else {
        next(err)
    }
})

// set port, listen for requests
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})
