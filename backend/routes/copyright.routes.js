const express = require("express");
const { createCopyright, getAllCopyrights, updateCopyright, deleteCopyright } = require("../controllers/copyright.controller");

const router = express.Router();

router.post("/", createCopyright);
router.get("/", getAllCopyrights);
router.put("/:id", updateCopyright);
router.delete("/:id", deleteCopyright);

module.exports = router;
