const mongoose = require("mongoose");
const Admin = require("../models/admin.model");
const Department = require("../models/department.model");
const Teacher = require("../models/teacher.model");
const Student = require("../models/student.model");

async function resolveAdminId(createdBy)
{
  if (!createdBy) return null;
  if (mongoose.Types.ObjectId.isValid(createdBy)) return createdBy;

  const admin = await Admin.findOne({
    $or: [{ username: createdBy }, { email: createdBy.toLowerCase() }],
  });

  return admin ? admin._id : null;
}

async function createDepartment(req, res) {
  try {
    const { departmentName, departmentCode, collegeName, createdBy, createdByName } = req.body;

    const resolvedCreatedBy = await resolveAdminId(createdBy);
    if (!departmentName || !departmentCode || !collegeName || !resolvedCreatedBy) {
      return res.status(400).json({ message: "Missing or invalid department fields (createdBy)." });
    }

    const exists = await Department.findOne({ departmentCode: departmentCode.trim().toUpperCase() });
    if (exists) {
      return res.status(409).json({ message: "Department with this code already exists." });
    }

    const department = await Department.create({
      departmentName: departmentName.trim(),
      departmentCode: departmentCode.trim().toUpperCase(),
      collegeName: collegeName.trim(),
      createdBy: resolvedCreatedBy,
      createdByName: createdByName || "Admin",
    });

    return res.status(201).json({ message: "Department created successfully.", department });
  } catch (error) {
    console.error("createDepartment error", error);
    return res.status(500).json({ message: "Failed to create department.", error: error.message });
  }
}

async function generateDeptCode(req, res) {
  try {
    const code = await Department.generateUniqueCode();
    return res.status(200).json({ code });
  } catch (error) {
    return res.status(500).json({ message: "Failed to generate code.", error: error.message });
  }
}

async function getDepartments(req, res) {
  try {
    const departments = await Department.find().sort({ createdAt: -1 }).lean();
    
    // Add student count to each department
    const departmentsWithCounts = await Promise.all(
      departments.map(async (dept) => {
        const studentCount = await Student.countDocuments({ departmentId: dept._id });
        return { ...dept, studentCount };
      })
    );

    return res.status(200).json({ departments: departmentsWithCounts });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch departments.", error: error.message });
  }
}

async function getTeachers(req, res) {
  try {
    const teachers = await Teacher.find().select("-password").sort({ createdAt: -1 });
    return res.status(200).json({ teachers });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch teachers.", error: error.message });
  }
}

async function getDepartmentById(req, res) {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ message: "Department not found." });
    }
    const studentCount = await Student.countDocuments({ departmentId: req.params.id });
    return res.status(200).json({ department, studentCount });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch department.", error: error.message });
  }
}

async function createTeacher(req, res) {
  try {
    const {
      departmentId,
      email,
      username,
      password,
      confirmPassword,
      contactNumber,
      collegeName,
      firstName,
      lastName,
      designations,
      createdBy,
    } = req.body;

    const resolvedCreatedBy = await resolveAdminId(createdBy);
    if (!departmentId || !email || !username || !password || !confirmPassword || !resolvedCreatedBy) {
      return res.status(400).json({ message: "Missing required teacher fields or invalid createdBy." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password and confirm password must match." });
    }

    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(404).json({ message: "Department not found." });
    }

    const existingTeacher = await Teacher.findOne({
      $or: [{ email: email.trim().toLowerCase() }, { username: username.trim() }],
    });

    if (existingTeacher) {
      return res.status(409).json({ message: "Teacher already exists with this email or username." });
    }

    const teacher = await Teacher.create({
      firstName: firstName?.trim() || "Not provided",
      lastName: lastName?.trim() || "",
      designations: Array.isArray(designations) ? designations : (designations ? [designations] : []),
      email: email.trim().toLowerCase(),
      username: username.trim(),
      password,
      contactNumber: (contactNumber || "0000000000").trim(),
      collegeName: (collegeName || department.collegeName || "Unknown").trim(),
      departmentId: department._id,
      departmentName: department.departmentName,
      departmentCode: department.departmentCode,
      createdBy: resolvedCreatedBy,
      role: "teacher",
    });

    department.teachers.push({ teacherId: teacher._id, name: `${teacher.firstName} ${teacher.lastName}`.trim() });
    department.totalTeachers = department.teachers.length;
    await department.save();

    return res.status(201).json({ message: "Teacher created successfully.", teacher });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create teacher.", error: error.message });
  }
}

async function updateTeacher(req, res) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Remove fields that should not be updated directly
    delete updateData.password;
    delete updateData.role;
    delete updateData._id;

    const teacher = await Teacher.findByIdAndUpdate(id, updateData, { new: true }).select("-password");

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found." });
    }

    // Update department teacher info if needed
    if (updateData.firstName || updateData.lastName) {
      const department = await Department.findById(teacher.departmentId);
      if (department) {
        const teacherIndex = department.teachers.findIndex(t => t.teacherId.toString() === id);
        if (teacherIndex !== -1) {
          department.teachers[teacherIndex].name = `${teacher.firstName} ${teacher.lastName}`.trim();
          await department.save();
        }
      }
    }

    return res.status(200).json({ message: "Teacher updated successfully.", teacher });
  } catch (error) {
    console.error("updateTeacher error", error);
    return res.status(500).json({ message: "Failed to update teacher.", error: error.message });
  }
}

async function deleteTeacher(req, res) {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findByIdAndDelete(id);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found." });
    }

    // Remove from department
    const department = await Department.findById(teacher.departmentId);
    if (department) {
      department.teachers = department.teachers.filter(t => t.teacherId.toString() !== id);
      department.totalTeachers = department.teachers.length;
      await department.save();
    }

    return res.status(200).json({ message: "Teacher deleted successfully." });
  } catch (error) {
    console.error("deleteTeacher error", error);
    return res.status(500).json({ message: "Failed to delete teacher.", error: error.message });
  }
}

async function getDepartmentStudents(req, res) {
  try {
    const { departmentId } = req.params;
    const students = await Student.find({ departmentId }).select("-password").sort({ createdAt: -1 });
    return res.status(200).json({ students });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch department students.", error: error.message });
  }
}

module.exports = {
  createDepartment,
  getDepartments,
  getTeachers,
  getDepartmentById,
  createTeacher,
  generateDeptCode,
  updateTeacher,
  deleteTeacher,
  getDepartmentStudents,
};
