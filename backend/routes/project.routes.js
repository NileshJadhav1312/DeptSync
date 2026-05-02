const express = require("express");
const {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  reviewProject,
} = require("../controllers/project.controller");

const router = express.Router();

router.post("/", createProject);
router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

router.put("/:id/review", reviewProject);

module.exports = router;

