const express = require("express");
const {
  createEditorialBoard,
  getAllEditorialBoards,
  getEditorialBoardById,
  updateEditorialBoard,
  deleteEditorialBoard
} = require("../controllers/editorialBoard.controller");

const router = express.Router();

router.post("/", createEditorialBoard);
router.get("/", getAllEditorialBoards);
router.get("/:id", getEditorialBoardById);
router.put("/:id", updateEditorialBoard);
router.delete("/:id", deleteEditorialBoard);

module.exports = router;
