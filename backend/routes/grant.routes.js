const express = require("express");
const {
  createGrant,
  getAllGrants,
  getGrantById,
  updateGrant,
  deleteGrant
} = require("../controllers/grant.controller");

const router = express.Router();

router.post("/", createGrant);
router.get("/", getAllGrants);
router.get("/:id", getGrantById);
router.put("/:id", updateGrant);
router.delete("/:id", deleteGrant);

module.exports = router;
