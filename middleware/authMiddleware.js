const jwt = require('jsonwebtoken')
const User = require('../modles/User')

const protect = async (req, res, next)  => {
    let token;

    if(re.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token = req.headers.authorization.split(" ")[1]

            const decoded = jet.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select("-password")

            next()
        }
        catch(error) {
            return res.status(401).json({ 
                error : "Not Authorized, token failed"})
        }
    }

    if(!token) {
        return res.status(401).json({error: "Not auth, no token!!"})
    }
}

module.exports = protect