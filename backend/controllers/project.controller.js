const Project = require("../models/project.model");
const mongoose = require("mongoose");

// Create Project
async function createProject(req, res) {
  try {
    const {
      academicYear,
      title,
      guideName,
      name,
      cclass,
      semester,
      abstract,
      fund,
      projectType,
      category,
      supportingDocuments,
      role,
      userId,
      roleModel,
      identificationNumber,
      isGroupProject,
      members,
      departmentId,
      departmentName,
    } = req.body;

    if (
      !academicYear ||
      !title ||
      !guideName ||
      !name ||
      !projectType ||
      !category ||
      !role ||
      !userId ||
      !roleModel ||
      !identificationNumber ||
      !departmentId
    ) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const approvalStatus = roleModel === "Student" ? "Pending" : "Approved";
    const project = await Project.create({
      academicYear,
      title,
      guideName,
      name,
      cclass,
      semester,
      abstract,
      fund,
      projectType,
      category,
      supportingDocuments,
      role,
      userId,
      roleModel,
      identificationNumber,
      isGroupProject,
      members,
      departmentId,
      departmentName,
      approvalStatus
    });

    return res
      .status(201)
      .json({ message: "Project added successfully.", project });
  } catch (error) {
    console.error("createProject error", error);
    return res
      .status(500)
      .json({ message: "Failed to add project.", error: error.message });
  }
}

// Get all Projects (with filtering)
async function getAllProjects(req, res) {
  try {
    const { userId, role, departmentId, academicYear, projectType, category, approvalStatus } =
      req.query;
    let query = { isActive: { $ne: false } };
    if (approvalStatus) query.approvalStatus = approvalStatus;

    if (userId) {
        try {
            const uId = new mongoose.Types.ObjectId(userId);
            query.$or = [
                { userId: uId },
                { studentId: uId },
                { createdById: uId },
                { userId: userId }
            ];
        } catch (e) {
            query.$or = [
                { userId: userId },
                { studentId: userId },
                { createdById: userId }
            ];
        }
    }
    if (role) query.role = role;
    if (departmentId) query.departmentId = departmentId;
    if (academicYear) query.academicYear = academicYear;
    if (projectType) query.projectType = projectType;
    if (category) query.category = category;

    const projects = await Project.find(query)
      .populate("userId", "employeeId prnNumber className email")
      .sort({
        academicYear: -1,
        createdAt: -1,
      });
    return res.status(200).json({ projects });
  } catch (error) {
    console.error("getAllProjects error", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch projects.", error: error.message });
  }
}

// Get Project by ID
async function getProjectById(req, res) {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }
    return res.status(200).json({ project });
  } catch (error) {
    console.error("getProjectById error", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch project.", error: error.message });
  }
}

// Update Project
async function updateProject(req, res) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const project = await Project.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    return res
      .status(200)
      .json({ message: "Project updated successfully.", project });
  } catch (error) {
    console.error("updateProject error", error);
    return res
      .status(500)
      .json({ message: "Failed to update project.", error: error.message });
  }
}

// Delete Project (Soft delete)
async function deleteProject(req, res) {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }
    return res.status(200).json({ message: "Project deleted successfully." });
  } catch (error) {
    console.error("deleteProject error", error);
    return res
      .status(500)
      .json({ message: "Failed to delete project.", error: error.message });
  }
}

async function reviewProject(req, res) {
  try {
    const { id } = req.params;
    const { approvalStatus, coordinatorComment, approvedBy } = req.body;
    if (!["Pending", "Approved", "Rejected"].includes(approvalStatus)) return res.status(400).json({ message: "Invalid approval status." });
    const item = await Project.findByIdAndUpdate(id, { approvalStatus, coordinatorComment, approvedBy }, { new: true });
    if (!item) return res.status(404).json({ message: "Project not found" });
    return res.status(200).json({ item });
  } catch (error) {
    return res.status(500).json({ message: "Failed to review Project.", error: error.message });
  }
}

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  reviewProject,
};

