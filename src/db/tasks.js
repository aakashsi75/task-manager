const { getDB } = require("../config/db");

function getTasksCollection(){
    return getDB().collection("tasks");
}

module.exports = {getTasksCollection};