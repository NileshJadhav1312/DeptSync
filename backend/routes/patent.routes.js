const express = require("express");
const { createPatent, getAllPatents, updatePatent, deletePatent } = require("../controllers/patent.controller");

const router = express.Router();

router.post("/", createPatent);
router.get("/", getAllPatents);
router.put("/:id", updatePatent);
router.delete("/:id", deletePatent);

module.exports = router;
