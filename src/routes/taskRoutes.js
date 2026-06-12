const express = require("express");
const { createTask } = require("../controllers/taskController");
const { authMiddleware } = require("../middleware/authMiddleware");
const { getTasks } = require("../controllers/taskController");
const { updateTask } = require("../controllers/taskController");

const router = express.Router();

router.post("/",authMiddleware,createTask);
router.get("/",authMiddleware,getTasks);
router.put("/:id",authMiddleware,updateTask);

module.exports = router;