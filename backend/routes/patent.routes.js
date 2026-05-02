const express = require("express");
const { createPatent, getAllPatents, updatePatent, deletePatent, reviewPatent } = require("../controllers/patent.controller");

const router = express.Router();

router.post("/", createPatent);
router.get("/", getAllPatents);
router.put("/:id", updatePatent);
router.delete("/:id", deletePatent);

router.put("/:id/review", reviewPatent);

module.exports = router;

