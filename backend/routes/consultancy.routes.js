const express = require("express");
const {
  createConsultancy,
  getAllConsultancies,
  getConsultancyById,
  updateConsultancy,
  deleteConsultancy,
  reviewConsultancy
} = require("../controllers/consultancy.controller");

const router = express.Router();

router.post("/", createConsultancy);
router.get("/", getAllConsultancies);
router.get("/:id", getConsultancyById);
router.put("/:id", updateConsultancy);
router.put("/:id/review", reviewConsultancy);
router.delete("/:id", deleteConsultancy);

module.exports = router;
