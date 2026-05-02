const express = require("express");
const router = express.Router();
const {
  createJournalPublication,
  getAllJournalPublications,
  getJournalPublicationById,
  updateJournalPublication,
  deleteJournalPublication,
  reviewJournalPublication,
} = require("../controllers/journalPublication.controller");

router.post("/", createJournalPublication);
router.get("/", getAllJournalPublications);
router.get("/:id", getJournalPublicationById);
router.put("/:id", updateJournalPublication);
router.delete("/:id", deleteJournalPublication);

router.put("/:id/review", reviewJournalPublication);

module.exports = router;

