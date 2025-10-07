import Task from "../models/task.model.js";
import List from "../models/list.model.js";

export const getTasks = async (req, res) => {
  try {
    const { listId } = req.params;
    const tasks = await Task.find({ listId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, listId } = req.body;
    const task = new Task({ title, description, dueDate, listId });
    await task.save();

    await List.findByIdAndUpdate(listId, { $push: { tasks: task._id } });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
