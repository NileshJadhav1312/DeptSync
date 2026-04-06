const express = require("express");
const { createAchievement, getAchievements, updateAchievement, deleteAchievement, getDepartmentAchievements, reviewAchievement } = require("../controllers/achievement.controller");

const router = express.Router();

router.post("/", createAchievement);
router.get("/", getAchievements);
router.get("/department/:departmentId", getDepartmentAchievements);
router.put("/:id", updateAchievement);
router.put("/review/:id", reviewAchievement);
router.delete("/:id", deleteAchievement);

module.exports = router;
