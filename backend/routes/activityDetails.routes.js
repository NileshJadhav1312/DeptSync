const express = require("express");
const { createActivity, getActivities, updateActivity, deleteActivity } = require("../controllers/activityDetails.controller");

const router = express.Router();

router.post("/", createActivity);
router.get("/", getActivities);
router.put("/:id", updateActivity);
router.delete("/:id", deleteActivity);

module.exports = router;
