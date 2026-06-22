const { getUsersCollection } = require("../db/users");
const bcrypt = require("bcryptjs");
const AppError = require("../utils/AppError");

async function registerUser(req,res,next){
    try{
        const users = getUsersCollection();
        const { name, email, password } = req.body;
        if(!name || !email || !password){
            throw new AppError("Name, Email and Password required",400);
        }
        const existingUser = await users.findOne({email:email});
        if(existingUser){
            throw new AppError("Email already exists",409);
        }
        const hashedpass = await bcrypt.hash(password,10);
        const result = await users.insertOne({
            name,
            email,
            password: hashedpass
        });

        res.status(201).json({
            message: "user created",
            id: result.insertedId
        });
    }catch(error){
        next(error);
    }
}

async function loginUser(req,res,next){
    try{
        const users = getUsersCollection();
        const { email, password } = req.body;
        if(!email || !password){
            throw new AppError("Email,Password is required",400);
        }
        const user = await users.findOne({email:email});
        if(!user){
            throw new AppError("Invalid email or password",401);
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            throw new AppError("Invalid email or password",401);
        }
        const jwt = require("jsonwebtoken");
        const token = jwt.sign(
            {
                userId: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );
        return res.status(200).json({
            message:"Login Successful",
            token
        });
    }
    catch(error){
        next(error);
    }
}

module.exports = {
    registerUser,
    loginUser
};