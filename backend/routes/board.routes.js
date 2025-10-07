import express from "express";
import { getBoards, createBoard, deleteBoard, updateBoard } from "../controllers/board.controller.js";

const router = express.Router();

router.get("/", getBoards);
router.post("/", createBoard);
router.delete("/:id", deleteBoard);
router.put("/:id", updateBoard);

export default router;
