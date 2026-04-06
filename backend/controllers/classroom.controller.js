const Classroom = require("../models/classroom.model");
const Student = require("../models/student.model");
const Department = require("../models/department.model");

exports.createClassroom = async (req, res) => {
  try {
    const { name, departmentId, classTeacherId } = req.body;
    if (!name || !departmentId || !classTeacherId) {
      return res.status(400).json({ message: "Name, department, and teacher are required." });
    }
    const classroom = new Classroom({ name, departmentId, classTeacherId });
    await classroom.save();
    return res.status(201).json({ success: true, classroom });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getDepartmentClassrooms = async (req, res) => {
  try {
    const classrooms = await Classroom.find({ departmentId: req.params.departmentId }).populate("classTeacherId", "firstName lastName");
    return res.status(200).json({ success: true, classrooms });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getTeacherClassrooms = async (req, res) => {
  try {
    const classrooms = await Classroom.find({ classTeacherId: req.params.teacherId })
      .populate("pendingStudents", "firstName lastName prnNumber username email")
      .populate("enrolledStudents", "firstName lastName prnNumber username email");
    return res.status(200).json({ success: true, classrooms });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.joinDepartment = async (req, res) => {
  try {
    const { studentId, departmentCode } = req.body;
    const department = await Department.findOne({ departmentCode: departmentCode.trim().toUpperCase() });
    if (!department) {
      return res.status(404).json({ message: "Invalid Department Code." });
    }
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: "Student not found." });

    student.departmentId = department._id;
    student.departmentName = department.departmentName;
    student.departmentCode = department.departmentCode;
    student.departmentUid = department.departmentUid;
    student.collegeName = department.collegeName;
    
    await student.save();
    return res.status(200).json({ success: true, student, message: "Successfully joined department." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.requestJoinClass = async (req, res) => {
  try {
    const { studentId, classId } = req.body;
    const classroom = await Classroom.findById(classId);
    if (!classroom) return res.status(404).json({ message: "Classroom not found." });

    if (classroom.pendingStudents.includes(studentId) || classroom.enrolledStudents.includes(studentId)) {
      return res.status(400).json({ message: "You have already requested to join or are enrolled in this class." });
    }

    classroom.pendingStudents.push(studentId);
    await classroom.save();
    return res.status(200).json({ success: true, message: "Request to join class sent successfully." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.acceptStudent = async (req, res) => {
  try {
    const { studentId, classId } = req.body;
    const classroom = await Classroom.findById(classId);
    if (!classroom) return res.status(404).json({ message: "Classroom not found." });

    classroom.pendingStudents = classroom.pendingStudents.filter(id => id.toString() !== studentId);
    if (!classroom.enrolledStudents.includes(studentId)) {
      classroom.enrolledStudents.push(studentId);
    }
    await classroom.save();

    const student = await Student.findById(studentId);
    if (student) {
      student.className = classroom.name;
      student.classTeacherId = classroom.classTeacherId;
      await student.save();
    }

    return res.status(200).json({ success: true, message: "Student enrolled successfully." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
