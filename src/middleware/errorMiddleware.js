const { ZodError } = require("zod");

function errorMiddleware(err,req,res,next){
    if(err instanceof ZodError){
        return res.status(400).json({
            error: err.issues[0].message
        });
    }
    res.status(err.statusCode || 500).json({
        error:err.message
    });
}


module.exports = errorMiddleware;