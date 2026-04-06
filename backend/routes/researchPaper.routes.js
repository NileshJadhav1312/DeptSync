const express = require("express");
const {
  createResearchPaper,
  getAllResearchPapers,
  getResearchPaperById,
  updateResearchPaper,
  deleteResearchPaper
} = require("../controllers/researchPaper.controller");

const router = express.Router();

router.post("/", createResearchPaper);
router.get("/", getAllResearchPapers);
router.get("/:id", getResearchPaperById);
router.put("/:id", updateResearchPaper);
router.delete("/:id", deleteResearchPaper);

module.exports = router;
