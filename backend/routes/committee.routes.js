const express = require("express");
const {
  createCommittee,
  getAllCommittees,
  getCommitteeById,
  updateCommittee,
  deleteCommittee
} = require("../controllers/committee.controller");

const router = express.Router();

router.post("/", createCommittee);
router.get("/", getAllCommittees);
router.get("/:id", getCommitteeById);
router.put("/:id", updateCommittee);
router.delete("/:id", deleteCommittee);

module.exports = router;
