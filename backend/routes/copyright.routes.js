const express = require("express");
const { createCopyright, getAllCopyrights, updateCopyright, deleteCopyright, reviewCopyright } = require("../controllers/copyright.controller");

const router = express.Router();

router.post("/", createCopyright);
router.get("/", getAllCopyrights);
router.put("/:id", updateCopyright);
router.delete("/:id", deleteCopyright);

router.put("/:id/review", reviewCopyright);

module.exports = router;

