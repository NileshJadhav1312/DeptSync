const express = require("express");
const router = express.Router();
const {
  createJournalPublication,
  getAllJournalPublications,
  getJournalPublicationById,
  updateJournalPublication,
  deleteJournalPublication
} = require("../controllers/journalPublication.controller");

router.post("/", createJournalPublication);
router.get("/", getAllJournalPublications);
router.get("/:id", getJournalPublicationById);
router.put("/:id", updateJournalPublication);
router.delete("/:id", deleteJournalPublication);

module.exports = router;
