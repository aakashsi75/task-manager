const { getUsersCollection } = require("../db/users");

async function registerUser(req,res){
    try{
        const users = getUsersCollection;
        const { name, email } = req.body;
        const result = getUsersCollection.insertOne({
            name,
            email
        });

        res.status(201).json({
            message: "user created",
            id: result.insertedId
        });
    }catch(error){
        res.send(500).json({
            error:error.message
        });
    }
}

module.exports = {
    registerUser
};