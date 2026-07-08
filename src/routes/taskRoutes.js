const express = require("express");
const { createTask } = require("../controllers/taskController");
const { authMiddleware } = require("../middleware/authMiddleware");
const { getTasks } = require("../controllers/taskController");
const { updateTask } = require("../controllers/taskController");
const { deleteTask } = require("../controllers/taskController");
const validate = require("../middleware/validate");
const { taskSchema } = require("../validations/taskValidation");

const router = express.Router();

router.post("/",authMiddleware,validate(taskSchema),createTask);
router.get("/",authMiddleware,getTasks);
router.put("/:id",authMiddleware,updateTask);
router.delete("/:id",authMiddleware,deleteTask);

module.exports = router;