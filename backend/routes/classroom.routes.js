const express = require("express");
const {
  createClassroom,
  getDepartmentClassrooms,
  getTeacherClassrooms,
  joinDepartment,
  requestJoinClass,
  acceptStudent,
  rejectStudent,
  removeStudent
} = require("../controllers/classroom.controller");

const router = express.Router();

router.post("/create", createClassroom);
router.get("/department/:departmentId", getDepartmentClassrooms);
router.get("/teacher/:teacherId", getTeacherClassrooms);
router.post("/join-department", joinDepartment);
router.post("/join-class", requestJoinClass);
router.post("/accept-student", acceptStudent);
router.post("/reject-student", rejectStudent);
router.post("/remove-student", removeStudent);

module.exports = router;
