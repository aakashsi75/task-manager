const { getUsersCollection } = require("../db/users");
const bcrypt = require("bcryptjs");

async function registerUser(req,res){
    try{
        const users = getUsersCollection();
        const { name, email, password } = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                error:"Name, Email and Password required"
            });
        }
        const existingUser = await users.findOne({email:email});
        if(existingUser){
            return res.status(409).json({
                error:"Email already exists"
            })
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
        res.status(500).json({
            error:error.message
        });
    }
}

async function loginUser(req,res){
    try{
        const users = getUsersCollection();
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({
                error:"Email,Password is required"
            })
        }
        const user = await users.findOne({email:email});
        if(!user){
            return res.status(401).json({
                error:"Invalid email or password"
            });
        }
        const isMatch = bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({
                error:"Invalid email or password"
            });
        }
        return res.status(200).json({
            message:"Login Successful"
        });
    }
    catch(error){
        res.status(500).json({
            error:error.message
        });
    }
}

module.exports = {
    registerUser,
    loginUser
};