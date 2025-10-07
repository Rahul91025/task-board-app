import List from "../models/list.model.js";
import Board from "../models/board.model.js";

export const getLists = async (req, res) => {
  try {
    const { boardId } = req.params;
    const lists = await List.find({ boardId }).populate("tasks");
    res.json(lists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createList = async (req, res) => {
  try {
    const { name, boardId } = req.body;
    const list = new List({ name, boardId });
    await list.save();

    await Board.findByIdAndUpdate(boardId, { $push: { lists: list._id } });
    res.status(201).json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteList = async (req, res) => {
  try {
    const { id } = req.params;
    await List.findByIdAndDelete(id);
    res.json({ message: "List deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateList = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const list = await List.findByIdAndUpdate(id, { name }, { new: true });
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};