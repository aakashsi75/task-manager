const { getDB } = require("../config/db");

function getUsersCollection(){
    const db = getDB();

    return db.collection("users");
}

module.exports = {
    getUsersCollection,
}