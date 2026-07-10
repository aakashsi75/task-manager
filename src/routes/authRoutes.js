const express = require("express");

const { registerUser } = require("../controllers/authController");
const { loginUser } = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");
const { registerSchema } = require("../validations/authValidation");
const { loginSchema } = require("../validations/authValidation");

const router = express.Router();

router.post("/register",validate(registerSchema),registerUser);
router.post("/login",validate(loginSchema),loginUser);
router.get("/me",authMiddleware,(req,res)=>{
    res.json({
        message:"Protected route accessed",
        user:req.user
    });
});

module.exports = router;