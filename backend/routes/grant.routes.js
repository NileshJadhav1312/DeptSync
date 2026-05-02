const express = require("express");
const {
  createGrant,
  getAllGrants,
  getGrantById,
  updateGrant,
  deleteGrant,
  reviewGrant,
} = require("../controllers/grant.controller");

const router = express.Router();

router.post("/", createGrant);
router.get("/", getAllGrants);
router.get("/:id", getGrantById);
router.put("/:id", updateGrant);
router.delete("/:id", deleteGrant);

router.put("/:id/review", reviewGrant);

module.exports = router;

