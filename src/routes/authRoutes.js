const express = require("express");

const { registerUser } = require("../controllers/authController");
const { loginUser } = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/me",authMiddleware,(req,res)=>{
    res.json({
        message:"Protected route accessed",
        user:req.user
    });
});

module.exports = router;