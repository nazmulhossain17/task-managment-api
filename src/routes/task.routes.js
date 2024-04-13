const express = require("express");
const router = express.Router();
const {
  createTask,
  getAllTask,
  getSingleTask,
  updateTask,
  deleteTask,
  markTaskAsCompleted,
} = require("../controller/task-controller");

const updateSchema = require("../controller/task-validation");
const validateUpdate = (req, res, next) => {
  const validationResult = updateSchema.safeParse(req.body);
  if (validationResult.success) {
    next();
  } else {
    res.status(400).json({ errors: validationResult.error });
  }
};

router.post("/create", createTask);
router.get("/user/:userId/tasks", getAllTask);
router.get("/user/:userId/tasks/:taskId", getSingleTask);
router.put("/user/:userId/tasks/:taskId", validateUpdate, updateTask);
router.delete("/user/:userId/tasks/:taskId", deleteTask);
router.put("/:userId/tasks/:taskId/complete", markTaskAsCompleted);

module.exports = router;
