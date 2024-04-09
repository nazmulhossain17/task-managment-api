const express = require("express");
const {
  createTask,
  getAllTask,
  getSingleTask,
  updateTask,
  deleteTask,
} = require("../controller/task-controller");

const router = express.Router();

router.post("/create", createTask);
router.get("/user/:userId/tasks", getAllTask);
router.get("/user/:userId/tasks/:taskId", getSingleTask);
router.put("/user/:userId/tasks/:taskId", updateTask);
router.delete("/user/:userId/tasks/:taskId", deleteTask);

module.exports = router;
