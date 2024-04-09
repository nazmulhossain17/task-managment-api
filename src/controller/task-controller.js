const prisma = require("../../prisma");

const createTask = async (req, res) => {
  try {
    const { title, description, userId } = req.body;
    if (!title || !description || !userId) {
      return res.status(400).json({
        message: "title, description, userId are required",
      });
    }

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        userId,
      },
    });
    return res.status(201).json({
      message: "new Task created successfully",
      user: newTask,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getAllTask = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userTasks = await prisma.task.findMany({
      where: { userId: userId },
    });
    res.status(200).json(userTasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleTask = async (req, res) => {
  try {
    const userId = req.params.userId;
    const taskId = req.params.taskId;
    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        userId: userId,
      },
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { userId, taskId } = req.params;
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: req.body,
    });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { userId, taskId } = req.params;
    await prisma.task.delete({
      where: { id: taskId },
    });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTask,
  getAllTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
