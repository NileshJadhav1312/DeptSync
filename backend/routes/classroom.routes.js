const express = require("express");
const {
  createClassroom,
  getDepartmentClassrooms,
  getTeacherClassrooms,
  getAllClassrooms,
  joinDepartment,
  requestJoinClass,
  acceptStudent,
  rejectStudent,
  removeStudent,
  deleteClassroom
} = require("../controllers/classroom.controller");

const router = express.Router();

router.post("/create", createClassroom);
router.get("/all", getAllClassrooms);
router.get("/department/:departmentId", getDepartmentClassrooms);
router.get("/teacher/:teacherId", getTeacherClassrooms);
router.post("/join-department", joinDepartment);
router.post("/join-class", requestJoinClass);
router.post("/accept-student", acceptStudent);
router.post("/reject-student", rejectStudent);
router.post("/remove-student", removeStudent);
router.delete("/:classroomId", deleteClassroom);

module.exports = router;
