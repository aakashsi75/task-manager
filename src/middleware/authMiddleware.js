const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

function authMiddleware(req,res,next){
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return next(new AppError("No token Provided",401));
    }
    const arr = authHeader.split(" ");
    const token = arr[1];
    try{
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )
        req.user = decoded;
        next();
    }
    catch(error){
        next(new AppError("Token cannot be decoded",401));
    }
}

module.exports = {authMiddleware};