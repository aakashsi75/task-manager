const {getTasksCollection} = require("../db/tasks");
const { ObjectId } = require("mongodb");
const AppError = require("../utils/AppError");

async function createTask(req,res,next){
    try{
        const {title} = req.body;
        const userId = req.user.userId;
        const tasks = getTasksCollection();
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
        next(error);
    }
}

async function getTasks(req,res,next){
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
        next(error);
    }
}

async function updateTask(req,res,next){
    try{
        const taskId = req.params.id;
        if(!ObjectId.isValid(taskId)){
            throw new AppError("Invalid Task ID",400);
        }
        const userId = req.user.userId;
        const tasks = getTasksCollection();
        const objectId = new ObjectId(taskId);
        const task = await tasks.findOne({_id:objectId,userId:userId});
        if(!task){
            throw new AppError("Task Not Found",404);
        }
        await tasks.updateOne({_id:objectId,userId:userId},{$set: {completed:!task.completed}});
        return res.status(200).json({
            message:"Task Updated Successfully",
            taskId
        })

    }
    catch(error){
        next(error);
    }
}

async function deleteTask(req,res,next){
    try{
        const taskId = req.params.id;
        if(!ObjectId.isValid(taskId)){
            throw new AppError("Invalid Task ID",400);
        }
        const userId = req.user.userId;
        const tasks = getTasksCollection();
        const objectId = new ObjectId(taskId);
        const task = await tasks.findOne({_id:objectId,userId:userId});
        if(!task){
            throw new AppError("Task Not Found",404);
        }
        await tasks.deleteOne({_id:objectId,userId:userId});
        return res.status(200).json({
            message:"Task deleted successfully"
        })  
    }
    catch(error){
        next(error)
    }
}

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask
};