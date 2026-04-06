const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");

// Department Routes
router.post("/departments", adminController.createDepartment);
router.get("/departments", adminController.getDepartments);
router.get("/departments/:id", adminController.getDepartmentById);
router.get("/departments/generate-code", adminController.generateDeptCode);

// Teacher Routes
router.post("/teachers", adminController.createTeacher);
router.get("/teachers", adminController.getTeachers);
router.put("/teachers/:id", adminController.updateTeacher);
router.delete("/teachers/:id", adminController.deleteTeacher);

// Student Routes
router.get("/departments/:departmentId/students", adminController.getDepartmentStudents);

module.exports = router;
