const { getUsersCollection } = require("../db/users");
const bcrypt = require("bcryptjs");

async function registerUser(req,res){
    try{
        const users = getUsersCollection();
        const { name, email, password } = req.body;
        if(!name || !email || !password){
            return res.status(500).json({
                error:"Name, Email and Password required"
            });
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

module.exports = {
    registerUser
};