const express = require("express");
const {
  createBookPublication,
  getAllBookPublications,
  getBookPublicationById,
  updateBookPublication,
  deleteBookPublication
} = require("../controllers/bookPublication.controller");

const router = express.Router();

router.post("/", createBookPublication);
router.get("/", getAllBookPublications);
router.get("/:id", getBookPublicationById);
router.put("/:id", updateBookPublication);
router.delete("/:id", deleteBookPublication);

module.exports = router;
