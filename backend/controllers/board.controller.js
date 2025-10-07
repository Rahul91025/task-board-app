import Board from "../models/board.model.js";
import List from "../models/list.model.js";

export const getBoards = async (req, res) => {
  try {
    const boards = await Board.find().populate("lists");
    res.json(boards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBoard = async (req, res) => {
  try {
    const { name } = req.body;
    const board = new Board({ name });
    await board.save();
    res.status(201).json(board);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBoard = async (req, res) => {
  try {
    const { id } = req.params;
    await List.deleteMany({ boardId: id });
    await Board.findByIdAndDelete(id);
    res.json({ message: "Board deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateBoard = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const board = await Board.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    res.json(board);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
  ;
