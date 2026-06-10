const express = require("express");
const dotenv = require("dotenv");

const { connectDB } = require("./src/config/db");

dotenv.config();
const authRoutes = require("./src/routes/authRoutes");
const app = express();

app.use(express.json());
app.use("/api/auth",authRoutes);

async function startServer(){
    try{
        console.log(process.env.MONGO_URI);
        await connectDB();

        const PORT = process.env.PORT || 3000;

        app.get("/",(req,res)=>{
            res.send("Task Manager API running");
        })

        app.listen(PORT,()=>{
            console.log(`server running at port ${PORT}`);
        })
    }catch(error){
        console.log("failed to start server:",error);
    }
}

startServer();