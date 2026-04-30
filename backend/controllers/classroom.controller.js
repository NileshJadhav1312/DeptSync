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

exports.getAllClassrooms = async (req, res) => {
  try {
    const classrooms = await Classroom.find({})
      .populate("classTeacherId", "firstName lastName")
      .populate("pendingStudents", "firstName lastName prnNumber username email")
      .populate("enrolledStudents", "firstName lastName prnNumber username email");
    return res.status(200).json({ success: true, classrooms });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.joinDepartment = async (req, res) => {
  try {
    const { studentId, departmentUid } = req.body;
    const department = await Department.findOne({ departmentUid: departmentUid.trim().toUpperCase() });
    if (!department) {
      return res.status(404).json({ message: "Invalid Department Code." });
    }
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: "Student not found." });

    student.departmentId = department._id;
    student.departmentName = department.departmentName;
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
    const { studentId, classroomCode } = req.body;
    if (!studentId || !classroomCode) {
      return res.status(400).json({ message: "Student ID and Classroom Code are required." });
    }

    const classroom = await Classroom.findOne({ classroomCode: classroomCode.trim().toUpperCase() });
    if (!classroom) return res.status(404).json({ message: "Classroom not found." });

    if (classroom.pendingStudents.includes(studentId) || classroom.enrolledStudents.includes(studentId)) {
      return res.status(400).json({ message: "You have already requested to join or are enrolled in this class." });
    }

    // Add to classroom's pending list
    classroom.pendingStudents.push(studentId);
    await classroom.save();

    // Update student's pending status
    const student = await Student.findById(studentId);
    if (student) {
      student.pendingClassroomId = classroom._id;
      // Also sync department if they were somehow in the wrong one, 
      // though typically they join a department first.
      if (!student.departmentId || student.departmentId.toString() !== classroom.departmentId.toString()) {
        const dept = await Department.findById(classroom.departmentId);
        if (dept) {
          student.departmentId = dept._id;
          student.departmentName = dept.departmentName;
          student.departmentUid = dept.departmentUid;
          student.collegeName = dept.collegeName;
        }
      }
      await student.save();
    }

    return res.status(200).json({ success: true, message: "Request to join class sent successfully.", classroom });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.acceptStudent = async (req, res) => {
  try {
    const { studentId, classId } = req.body;
    const classroom = await Classroom.findByIdAndUpdate(classId, {
      $pull: { pendingStudents: studentId },
      $addToSet: { enrolledStudents: studentId }
    }, { new: true });
    
    if (!classroom) return res.status(404).json({ message: "Classroom not found." });

    await Student.findByIdAndUpdate(studentId, {
      $set: { 
        className: classroom.name,
        classTeacherId: classroom.classTeacherId,
        enrolledClassroomId: classroom._id
      },
      $unset: { pendingClassroomId: 1 }
    });

    return res.status(200).json({ success: true, message: "Student enrolled successfully." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.rejectStudent = async (req, res) => {
  try {
    const { studentId, classId } = req.body;
    await Classroom.findByIdAndUpdate(classId, {
      $pull: { pendingStudents: studentId }
    });

    await Student.findByIdAndUpdate(studentId, {
      $unset: { pendingClassroomId: 1 }
    });

    return res.status(200).json({ success: true, message: "Request rejected successfully." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.removeStudent = async (req, res) => {
  try {
    const { studentId, classId } = req.body;
    await Classroom.findByIdAndUpdate(classId, {
      $pull: { enrolledStudents: studentId }
    });

    const student = await Student.findById(studentId);
    if(student) {
        if(student.enrolledClassroomId) {
            student.pastClassrooms.push({
                classroomId: student.enrolledClassroomId,
                className: student.className
            });
        }
        student.enrolledClassroomId = undefined;
        student.classTeacherId = undefined;
        student.className = "";
        await student.save();
    }

    return res.status(200).json({ success: true, message: "Student removed from classroom." });
  } catch (error) {
    console.error("removeStudent fail:", error);
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteClassroom = async (req, res) => {
  try {
    const { classroomId } = req.params;
    const classroom = await Classroom.findById(classroomId);
    if (!classroom) {
      return res.status(404).json({ message: "Classroom not found." });
    }

    // Remove classroom from enrolled students
    for (const studentId of classroom.enrolledStudents) {
      const student = await Student.findById(studentId);
      if (student) {
        if (student.enrolledClassroomId) {
          student.pastClassrooms.push({
            classroomId: student.enrolledClassroomId,
            className: student.className
          });
        }
        student.enrolledClassroomId = undefined;
        student.classTeacherId = undefined;
        student.className = "";
        await student.save();
      }
    }

    // Remove classroom from pending students
    for (const studentId of classroom.pendingStudents) {
      await Student.findByIdAndUpdate(studentId, {
        $unset: { pendingClassroomId: 1 }
      });
    }

    // Delete the classroom
    await Classroom.findByIdAndDelete(classroomId);

    return res.status(200).json({ success: true, message: "Classroom deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
