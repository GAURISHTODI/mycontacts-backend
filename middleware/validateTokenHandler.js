const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) { 

        token = authHeader.split(" ")[1]; // Authorization = Bearer nlsflfjflsfjfdjsd... me  0th index pe bearer hai and first index pe token
        jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, decoded) => {
            if (err) {
                res.status(400);
                throw new Error("Unauthorized user or token expired")
            }
            req.user = decoded.user;
            next();// middleware
        });
        if (!token) {
            res.status(401)
            throw new Error("Unauthorized user or token expired")
        }
    }
})

module.exports = validateToken;