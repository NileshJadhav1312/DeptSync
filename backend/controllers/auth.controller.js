const jwt = require("jsonwebtoken");
const Admin = require("../models/admin.model");
const Teacher = require("../models/teacher.model");
const Student = require("../models/student.model");

function createToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function formatUserResponse(user) {
  return {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    name: `${user.firstName} ${user.lastName || ""}`.trim(),
    email: user.email,
    username: user.username,
    role: user.role,
    gender: user.gender || "",
    dateOfBirth: user.dateOfBirth || null,
    contactNumber: user.contactNumber || "",
    alternateContactNumber: user.alternateContactNumber || "",
    // Teacher specific
    designation: user.designation || "",
    designations: user.designations || [],
    qualification: user.qualification || "",
    experience: user.experience || null,
    specialization: user.specialization || "",
    departmentId: user.departmentId || null,
    departmentName: user.departmentName || "",
    departmentCode: user.departmentCode || "",
    collegeName: user.collegeName || "",
    // Admin specific
    post: user.post || "",
    employeeId: user.employeeId || "",
    departments: user.departments || [],
    // Student specific
    prnNumber: user.prnNumber || "",
    className: user.className || "",
    semester: user.semester || null,
    classTeacherId: user.classTeacherId || null,
  };
}

async function signupAdmin(req, res) {
  try {
    const {
      firstName,
      lastName,
      gender,
      post,
      email,
      contactNumber,
      alternateContactNumber,
      collegeName,
      username,
      password,
      confirmPassword,
      employeeId,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !gender ||
      !post ||
      !email ||
      !contactNumber ||
      !collegeName ||
      !username ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({ message: "Please fill all required admin fields." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password and confirm password must match." });
    }

    const emailKey = email.trim().toLowerCase();
    const usernameKey = username.trim();
    const duplicateQuery = [{ email: emailKey }, { username: usernameKey }];

    if (employeeId?.trim()) {
      duplicateQuery.push({ employeeId: employeeId.trim() });
    }

    const existingAdmin = await Admin.findOne({ $or: duplicateQuery });
    if (existingAdmin) {
      return res.status(409).json({
        message: "Admin already exists with this email, username, or employee ID.",
      });
    }

    const admin = await Admin.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      gender,
      post: post.trim(),
      email: emailKey,
      contactNumber: contactNumber.trim(),
      alternateContactNumber: alternateContactNumber?.trim() || "",
      collegeName: collegeName.trim(),
      username: usernameKey,
      password,
      employeeId: employeeId?.trim() || undefined,
    });

    const token = createToken(admin);

    return res.status(201).json({
      message: "Admin account created successfully.",
      token,
      admin: formatUserResponse(admin),
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create admin account.", error: error.message });
  }
}

async function loginAdmin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const identifier = email.trim();
    const identifierRegex = new RegExp(`^${escapeRegex(identifier)}$`, "i");
    const admin = await Admin.findOne({
      $or: [{ email: identifier.toLowerCase() }, { username: identifierRegex }],
    });

    if (!admin) {
      return res.status(401).json({ message: "Invalid admin credentials." });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid admin credentials." });
    }

    const token = createToken(admin);

    return res.status(200).json({
      message: "Admin login successful.",
      token,
      admin: formatUserResponse(admin),
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to login admin.", error: error.message });
  }
}

async function loginTeacher(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const identifier = email.trim();
    const identifierRegex = new RegExp(`^${escapeRegex(identifier)}$`, "i");
    const teacher = await Teacher.findOne({
      $or: [{ email: identifier.toLowerCase() }, { username: identifierRegex }],
    });

    if (!teacher) {
      return res.status(401).json({ message: "Invalid teacher credentials." });
    }

    const isMatch = await teacher.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid teacher credentials." });
    }

    const token = createToken(teacher);

    return res.status(200).json({
      message: "Teacher login successful.",
      token,
      teacher: formatUserResponse(teacher),
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to login teacher.", error: error.message });
  }
}

async function loginStudent(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const identifier = email.trim();
    const identifierRegex = new RegExp(`^${escapeRegex(identifier)}$`, "i");
    const student = await Student.findOne({
      $or: [{ email: identifier.toLowerCase() }, { username: identifierRegex }, { prnNumber: identifierRegex }],
    }).populate("classTeacherId", "firstName lastName");

    if (!student) {
      return res.status(401).json({ message: "Invalid student credentials." });
    }

    const isMatch = await student.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid student credentials." });
    }

    const token = createToken(student);
    
    const studentResponse = formatUserResponse(student);
    if (student.classTeacherId) {
      studentResponse.classTeacherName = `${student.classTeacherId.firstName} ${student.classTeacherId.lastName || ""}`.trim();
    }

    return res.status(200).json({
      message: "Student login successful.",
      token,
      student: studentResponse,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to login student.", error: error.message });
  }
}

module.exports = {
  signupAdmin,
  signupStudent,
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
};

async function signupStudent(req, res) {
  try {
    const {
      firstName,
      lastName,
      gender,
      dateOfBirth,
      prnNumber,
      email,
      username,
      password,
      confirmPassword,
      contactNumber,
      alternateContactNumber
    } = req.body;

    if (!firstName || !prnNumber || !email || !username || !password || !confirmPassword || !contactNumber) {
      return res.status(400).json({ message: "Please fill all required student fields." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password and confirm password must match." });
    }

    const emailKey = email.trim().toLowerCase();
    const usernameKey = username.trim();
    const duplicateQuery = [{ email: emailKey }, { username: usernameKey }, { prnNumber: prnNumber.trim() }];

    const existingStudent = await Student.findOne({ $or: duplicateQuery });
    if (existingStudent) {
      return res.status(409).json({ message: "Student already exists with this email, username, or PRN number." });
    }

    const student = await Student.create({
      firstName: firstName.trim(),
      lastName: lastName?.trim() || "",
      gender: gender ? gender.toLowerCase() : undefined,
      dateOfBirth: dateOfBirth || null,
      prnNumber: prnNumber.trim(),
      email: emailKey,
      username: usernameKey,
      password,
      contactNumber: contactNumber.trim(),
      alternateContactNumber: alternateContactNumber?.trim() || "",
    });

    const token = createToken(student);
    return res.status(201).json({
      message: "Student account created successfully.",
      token,
      student: formatUserResponse(student),
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create student account.", error: error.message });
  }
}

async function getTeacherProfile(req, res) {
  try {
    const teacherId = req.params.id || req.body.teacherId;
    if (!teacherId) {
      return res.status(400).json({ message: "Teacher ID is required." });
    }

    const teacher = await Teacher.findById(teacherId).select("-password");
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found." });
    }

    return res.status(200).json({ teacher: formatUserResponse(teacher) });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch teacher profile.", error: error.message });
  }
}

async function getAdminProfile(req, res) {
  try {
    const adminId = req.params.id || req.body.adminId;
    if (!adminId) {
      return res.status(400).json({ message: "Admin ID is required." });
    }

    const admin = await Admin.findById(adminId).select("-password");
    if (!admin) {
      return res.status(404).json({ message: "Admin not found." });
    }

    return res.status(200).json({ admin: formatUserResponse(admin) });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch admin profile.", error: error.message });
  }
}

async function updateTeacherProfile(req, res) {
  try {
    const teacherId = req.params.id || req.body.teacherId;
    const { firstName, lastName, gender, dateOfBirth, designation, qualification, experience, specialization, contactNumber, alternateContactNumber } = req.body;

    if (!teacherId) {
      return res.status(400).json({ message: "Teacher ID is required." });
    }

    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found." });
    }

    if (firstName !== undefined) teacher.firstName = firstName ? firstName.trim() : "";
    if (lastName !== undefined) teacher.lastName = lastName ? lastName.trim() : "";
    if (gender !== undefined) teacher.gender = gender ? gender.toLowerCase() : undefined;
    if (dateOfBirth !== undefined) teacher.dateOfBirth = dateOfBirth || null;
    if (qualification !== undefined) teacher.qualification = qualification ? qualification.trim() : "";
    if (experience !== undefined) teacher.experience = experience;
    if (specialization !== undefined) teacher.specialization = specialization ? specialization.trim() : "";
    if (contactNumber !== undefined) teacher.contactNumber = contactNumber ? contactNumber.trim() : "";
    if (alternateContactNumber !== undefined) teacher.alternateContactNumber = alternateContactNumber ? alternateContactNumber.trim() : "";

    await teacher.save();

    return res.status(200).json({ message: "Teacher profile updated successfully.", teacher: formatUserResponse(teacher) });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update teacher profile.", error: error.message });
  }
}

async function updateAdminProfile(req, res) {
  try {
    const adminId = req.params.id || req.body.adminId;
    const { firstName, lastName, gender, dateOfBirth, post, contactNumber, alternateContactNumber } = req.body;

    if (!adminId) {
      return res.status(400).json({ message: "Admin ID is required." });
    }

    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found." });
    }

    if (firstName !== undefined) admin.firstName = firstName ? firstName.trim() : "";
    if (lastName !== undefined) admin.lastName = lastName ? lastName.trim() : "";
    if (gender !== undefined) admin.gender = gender;
    if (dateOfBirth !== undefined) admin.dateOfBirth = dateOfBirth;
    if (post !== undefined) admin.post = post ? post.trim() : "";
    if (contactNumber !== undefined) admin.contactNumber = contactNumber ? contactNumber.trim() : "";
    if (alternateContactNumber !== undefined) admin.alternateContactNumber = alternateContactNumber ? alternateContactNumber.trim() : "";

    await admin.save();

    return res.status(200).json({ message: "Admin profile updated successfully.", admin: formatUserResponse(admin) });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update admin profile.", error: error.message });
  }
}

async function changeTeacherPassword(req, res) {
  try {
    const teacherId = req.params.id || req.body.teacherId;
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!teacherId || !currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All password fields are required." });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "New password and confirm password must match." });
    }

    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found." });
    }

    const isMatch = await teacher.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect." });
    }

    teacher.password = newPassword;
    await teacher.save();

    return res.status(200).json({ message: "Password changed successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Failed to change teacher password.", error: error.message });
  }
}

async function changeAdminPassword(req, res) {
  try {
    const adminId = req.params.id || req.body.adminId;
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!adminId || !currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All password fields are required." });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "New password and confirm password must match." });
    }

    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found." });
    }

    const isMatch = await admin.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect." });
    }

    admin.password = newPassword;
    await admin.save();

    return res.status(200).json({ message: "Password changed successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Failed to change admin password.", error: error.message });
  }
}

async function getStudentProfile(req, res) {
  try {
    const studentId = req.params.id || req.body.studentId;
    if (!studentId) {
      return res.status(400).json({ message: "Student ID is required." });
    }

    const student = await Student.findById(studentId).select("-password").populate("classTeacherId", "firstName lastName");
    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    const studentResponse = formatUserResponse(student);
    if (student.classTeacherId) {
      studentResponse.classTeacherName = `${student.classTeacherId.firstName} ${student.classTeacherId.lastName || ""}`.trim();
    }

    return res.status(200).json({ student: studentResponse });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch student profile.", error: error.message });
  }
}

async function updateStudentProfile(req, res) {
  try {
    const studentId = req.params.id || req.body.studentId;
    const { firstName, lastName, gender, dateOfBirth, contactNumber, alternateContactNumber } = req.body;

    if (!studentId) {
      return res.status(400).json({ message: "Student ID is required." });
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    if (firstName !== undefined) student.firstName = firstName ? firstName.trim() : "";
    if (lastName !== undefined) student.lastName = lastName ? lastName.trim() : "";
    if (gender !== undefined) student.gender = gender ? gender.toLowerCase() : undefined;
    if (dateOfBirth !== undefined) student.dateOfBirth = dateOfBirth || null;
    if (contactNumber !== undefined) student.contactNumber = contactNumber ? contactNumber.trim() : "";
    if (alternateContactNumber !== undefined) student.alternateContactNumber = alternateContactNumber ? alternateContactNumber.trim() : "";

    await student.save();

    return res.status(200).json({ message: "Student profile updated successfully.", student: formatUserResponse(student) });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update student profile.", error: error.message });
  }
}

async function changeStudentPassword(req, res) {
  try {
    const studentId = req.params.id || req.body.studentId;
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!studentId || !currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All password fields are required." });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "New password and confirm password must match." });
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    const isMatch = await student.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect." });
    }

    student.password = newPassword;
    await student.save();

    return res.status(200).json({ message: "Password changed successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Failed to change student password.", error: error.message });
  }
}
