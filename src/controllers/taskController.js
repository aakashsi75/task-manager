const {getTasksCollection} = require("../db/tasks");
const { ObjectId } = require("mongodb");

async function createTask(req,res){
    try{
        const {title} = req.body;
        const userId = req.user.userId;
        const tasks = getTasksCollection();
        if(!title){
            return res.status(400).json({
                error:"Title not provided"
            })
        };
        await tasks.insertOne({
            title:title,
            completed:false,
            userId:userId,
            createdAt: new Date()
        });
        return res.status(201).json({
            message:"Task created"
        })
    }
    catch(error){
        return res.status(500).json({
            error:error.message
        });
    }
}

async function getTasks(req,res){
    try{
        const tasks = getTasksCollection();
        const userTasks = await tasks
            .find({userId : req.user.userId})
            .toArray();
        return res.status(200).json({
            userTasks
        });
    }
    catch(error){
        return res.status(500).json({
            error:error.message
        })
    }
}

async function updateTask(req,res){
    try{
        const taskId = req.params.id;
        const userId = req.user.userId;
        const tasks = getTasksCollection();
        const task = await tasks.findOne({_id:new ObjectId(taskId),userId:userId});
        if(!task){
            return res.status(404).json({
                error:"Task not Found"
            })
        }
        await tasks.updateOne({_id:new ObjectId(taskId),userId:userId},{$set: {completed:!task.completed}});
        return res.status(200).json({
            message:"Task Updated Successfully",
            taskId
        })

    }
    catch(error){
        return res.status(500).json({
            error:error.message
        });
    }
}

async function deleteTask(req,res){
    try{
        const taskId = req.params.id;
        const userId = req.user.userId;
        const tasks = getTasksCollection();
        const task = await tasks.findOne({_id:new ObjectId(taskId),userId:userId});
        if(!task){
            return res.status(404).json({
                error:"Task Not Found"
            });
        }
        await tasks.deleteOne({_id:new ObjectId(taskId),userId:userId});
        return res.status(200).json({
            message:"Task deleted successfully"
        })  
    }
    catch(error){
        return res.status(500).json({
            error:error.message
        });
    }
}

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask
};