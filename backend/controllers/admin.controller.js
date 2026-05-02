const mongoose = require("mongoose");
const Admin = require("../models/admin.model");
const Department = require("../models/department.model");
const Teacher = require("../models/teacher.model");
const Student = require("../models/student.model");
const ActivityDetails = require("../models/activityDetails.model");
const BookPublication = require("../models/bookPublication.model");
const Grant = require("../models/grant.model");
const Consultancy = require("../models/consultancy.model");
const Achievement = require("../models/achievement.model");
const Commitee = require("../models/comittee.model");
const EditorialBoard = require("../models/editorialBoard.model");
const JournalPublication = require("../models/journalPublication.model");
const ConferencePublication = require("../models/conferencePublication.model");
const BookChapter = require("../models/bookChapter.model");
const Patent = require("../models/patent.model");
const Copyright = require("../models/copyright.model");
const Project = require("../models/project.model");

async function resolveAdminId(createdBy) {
  if (!createdBy) return null;
  if (mongoose.Types.ObjectId.isValid(createdBy)) return createdBy;

  const admin = await Admin.findOne({
    $or: [{ username: createdBy }, { email: createdBy.toLowerCase() }],
  });

  return admin ? admin._id : null;
}

async function createDepartment(req, res) {
  try {
    const { departmentName, collegeName, createdBy, createdByName } = req.body;

    const resolvedCreatedBy = await resolveAdminId(createdBy);
    if (!departmentName || !collegeName || !resolvedCreatedBy) {
      return res.status(400).json({ message: "Missing or invalid department fields (createdBy)." });
    }

    const department = await Department.create({
      departmentName: departmentName.trim(),
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

// This is largely useless now since departmentUid is auto-generated on save. 
// We may keep it to return a dummy code or remove its route.
async function generateDeptCode(req, res) {
  try {
    const crypto = require("crypto");
    const code = crypto.randomBytes(5).toString("base64url").replace(/[^A-Z0-9]/gi, "").toUpperCase().slice(0, 8);
    return res.status(200).json({ code });
  } catch (error) {
    return res.status(500).json({ message: "Failed to generate unique code.", error: error.message });
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
    const { departmentId } = req.query;
    const filter = {};
    if (departmentId) {
      filter.departmentId = departmentId;
    }
    const teachers = await Teacher.find(filter).select("-password").sort({ createdAt: -1 }).lean();

    const teachersWithCounts = await Promise.all(
      teachers.map(async (teacher) => {
        const [activitiesCount, booksCount, grantsCount, consultanciesCount, achievementsCount, committeesCount, editorialCount, journalsCount, conferencesCount, chaptersCount] = await Promise.all([
          ActivityDetails.countDocuments({ createdBy: teacher._id }),
          BookPublication.countDocuments({ teacherId: teacher._id }),
          Grant.countDocuments({ teacherId: teacher._id }),
          Consultancy.countDocuments({ teacherId: teacher._id }),
          Achievement.countDocuments({ achievedBy: teacher._id }),
          Commitee.countDocuments({ teacherId: teacher._id }),
          EditorialBoard.countDocuments({ teacherId: teacher._id }),
          JournalPublication.countDocuments({ teacherId: teacher._id }),
          ConferencePublication.countDocuments({ teacherId: teacher._id }),
          BookChapter.countDocuments({ teacherId: teacher._id })
        ]);

        const totalContributions = activitiesCount + booksCount + grantsCount + consultanciesCount + achievementsCount + committeesCount + editorialCount + journalsCount + conferencesCount + chaptersCount;

        return {
          ...teacher,
          counts: {
            activities: activitiesCount,
            books: booksCount,
            grants: grantsCount,
            consultancies: consultanciesCount,
            achievements: achievementsCount,
            committees: committeesCount,
            editorial: editorialCount,
            journals: journalsCount,
            conferences: conferencesCount,
            chapters: chaptersCount
          },
          totalContributions
        };
      })
    );

    return res.status(200).json({ teachers: teachersWithCounts });
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
      employeeId,
    } = req.body;

    const resolvedCreatedBy = await resolveAdminId(createdBy);

    if (!departmentId || !email || !username || !password || !confirmPassword || !resolvedCreatedBy || !employeeId) {
      return res.status(400).json({ message: "Missing required teacher fields (including employee ID) or invalid createdBy." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password and confirm password must match." });
    }

    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(404).json({ message: "Department not found." });
    }

    // Individual uniqueness checks
    const existingEmail = await Teacher.findOne({ email: email.trim().toLowerCase() });
    if (existingEmail) {
      return res.status(409).json({ message: "Teacher already exists with this email ID." });
    }

    const existingUsername = await Teacher.findOne({ 
      username: username.trim()
    });
    if (existingUsername) {
      return res.status(409).json({ message: "Teacher already exists with this username." });
    }

    const existingEmployeeId = await Teacher.findOne({ 
      employeeId: employeeId.trim()
    });
    if (existingEmployeeId) {
      return res.status(409).json({ message: "Teacher already exists with this employee ID." });
    }

    const teacher = await Teacher.create({
      firstName: firstName?.trim() || "Not provided",
      lastName: lastName?.trim() || "",
      designations: Array.isArray(designations) ? designations : (designations ? [designations] : []),
      email: email.trim().toLowerCase(),
      username: username.trim(),
      employeeId: employeeId.trim(),
      password,
      contactNumber: (contactNumber || "0000000000").trim(),
      collegeName: (collegeName || department.collegeName || "Unknown").trim(),
      departmentId: department._id,
      departmentName: department.departmentName,
      departmentUid: department.departmentUid,
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
    const students = await Student.find({ 
      departmentId
    }).select("-password").sort({ createdAt: -1 }).lean();

    const studentsWithCounts = await Promise.all(
      students.map(async (student) => {
        const [
          achievementsCount,
          activitiesCount,
          journalsCount,
          conferencesCount,
          grantsCount,
          patentsCount,
          copyrightsCount,
          projectsCount,
          consultanciesCount,
          booksCount,
          chaptersCount,
          editorialCount,
          committeesCount
        ] = await Promise.all([
          Achievement.countDocuments({ achievedBy: student._id, approvalStatus: "Approved" }),
          ActivityDetails.countDocuments({ createdBy: student._id }), // Activities usually don't have approval or are student-led
          JournalPublication.countDocuments({ studentId: student._id, approvalStatus: "Approved" }),
          ConferencePublication.countDocuments({ studentId: student._id, approvalStatus: "Approved" }),
          Grant.countDocuments({ studentId: student._id, approvalStatus: "Approved" }),
          Patent.countDocuments({ studentId: student._id, approvalStatus: "Approved" }),
          Copyright.countDocuments({ studentId: student._id, approvalStatus: "Approved" }),
          Project.countDocuments({ studentId: student._id, approvalStatus: "Approved" }),
          Consultancy.countDocuments({ studentId: student._id, approvalStatus: "Approved" }),
          BookPublication.countDocuments({ studentId: student._id, approvalStatus: "Approved" }),
          BookChapter.countDocuments({ studentId: student._id, approvalStatus: "Approved" }),
          EditorialBoard.countDocuments({ studentId: student._id, approvalStatus: "Approved" }),
          Commitee.countDocuments({ studentId: student._id, approvalStatus: "Approved" })
        ]);

        return {
          ...student,
          counts: {
            achievements: achievementsCount,
            activities: activitiesCount,
            journals: journalsCount,
            conferences: conferencesCount,
            grants: grantsCount,
            patents: patentsCount,
            copyrights: copyrightsCount,
            projects: projectsCount,
            consultancies: consultanciesCount,
            books: booksCount,
            chapters: chaptersCount,
            editorial: editorialCount,
            committees: committeesCount
          },
          totalContributions: achievementsCount + activitiesCount + journalsCount + conferencesCount + grantsCount + patentsCount + copyrightsCount + projectsCount + consultanciesCount + booksCount + chaptersCount + editorialCount + committeesCount
        };
      })
    );

    return res.status(200).json({ students: studentsWithCounts });
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
