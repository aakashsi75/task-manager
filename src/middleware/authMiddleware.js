const jwt = require("jsonwebtoken");

function authMiddleware(req,res,next){
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({
            error:"No token Provided"
        });
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
        res.status(401).json({
            error:"Token cannot be decoded"
        })
    }
}

module.exports = {authMiddleware};