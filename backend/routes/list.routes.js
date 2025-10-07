import express from "express";
import { getLists, createList, deleteList,updateList } from "../controllers/list.controller.js";

const router = express.Router();

router.get("/:boardId", getLists);
router.post("/", createList);
router.delete("/:id", deleteList);
router.put("/:id", updateList);

export default router;
