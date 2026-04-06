const express = require("express");
const {
  signupAdmin,
  loginAdmin,
  loginTeacher,
  loginStudent,
  getTeacherProfile,
  getAdminProfile,
  getStudentProfile,
  updateTeacherProfile,
  updateAdminProfile,
  updateStudentProfile,
  changeTeacherPassword,
  changeAdminPassword,
  changeStudentPassword,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/admin/signup", signupAdmin);
router.post("/admin/login", loginAdmin);
router.post("/student/signup", req => require("../controllers/auth.controller").signupStudent(req.res.req, req.res)); // or properly using require at the top
router.post("/teacher/login", loginTeacher);
router.post("/student/login", loginStudent);

// Profile endpoints
router.get("/teacher/profile/:id", getTeacherProfile);
router.get("/admin/profile/:id", getAdminProfile);
router.get("/student/profile/:id", getStudentProfile);
router.put("/teacher/profile/:id", updateTeacherProfile);
router.put("/admin/profile/:id", updateAdminProfile);
router.put("/student/profile/:id", updateStudentProfile);
router.put("/teacher/password/:id", changeTeacherPassword);
router.put("/admin/password/:id", changeAdminPassword);
router.put("/student/password/:id", changeStudentPassword);

module.exports = router;
