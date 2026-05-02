const Grant = require("../models/grant.model");
const mongoose = require("mongoose");

// Create Grant
async function createGrant(req, res) {
  try {
    const {
      academicYear,
      projectTitle,
      projectDescription,
      fundingAgency,
      grantAchievedAmount,
      startDate,
      endDate,
      paymentProof,
      remarks,
      status,
      teacherId,
      teacherName,
      departmentId,
      departmentName,
      studentId,
      studentName,
    } = req.body;

    if (!academicYear || !projectTitle || !departmentId) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const approvalStatus = req.body.createdByModel === "Student" ? "Pending" : "Approved";
    const grant = await Grant.create({
      academicYear,
      projectTitle,
      projectDescription,
      fundingAgency,
      grantAchievedAmount,
      startDate,
      endDate,
      paymentProof,
      remarks,
      status,
      teacherId,
      teacherName,
      departmentId,
      departmentName,
      studentId,
      studentName,
      createdByModel: req.body.createdByModel || "Teacher",
      createdById: req.body.createdById,
      createdByName: req.body.createdByName,
      facultyId: teacherId, // For compatibility
      facultyName: teacherName,
      approvalStatus
    });

    return res.status(201).json({ message: "Grant added successfully.", grant });
  } catch (error) {
    console.error("createGrant error", error);
    return res.status(500).json({ message: "Failed to add grant.", error: error.message });
  }
}

// Get all Grants (with filtering)
async function getAllGrants(req, res) {
  try {
    const { teacherId, studentId, departmentId, academicYear, status, approvalStatus } = req.query;
    let query = { isActive: { $ne: false } }; if (approvalStatus) query.approvalStatus = approvalStatus;

    if (teacherId) query.teacherId = teacherId;
    if (studentId) {
      try {
        const sId = new mongoose.Types.ObjectId(studentId);
        query.$or = [
          { studentId: sId },
          { createdById: sId }
        ];
      } catch (e) {
        query.$or = [
          { studentId: studentId },
          { createdById: studentId }
        ];
      }
    }
    if (departmentId) query.departmentId = departmentId;
    if (academicYear) query.academicYear = academicYear;
    if (status) query.status = status;

    const grants = await Grant.find(query)
      .populate("teacherId", "employeeId")
      .populate("studentId", "prnNumber className email")
      .sort({ academicYear: -1 });
    return res.status(200).json({ grants });
  } catch (error) {
    console.error("getAllGrants error", error);
    return res.status(500).json({ message: "Failed to fetch grants.", error: error.message });
  }
}

// Get Grant by ID
async function getGrantById(req, res) {
  try {
    const grant = await Grant.findById(req.params.id);
    if (!grant) {
      return res.status(404).json({ message: "Grant not found." });
    }
    return res.status(200).json({ grant });
  } catch (error) {
    console.error("getGrantById error", error);
    return res.status(500).json({ message: "Failed to fetch grant.", error: error.message });
  }
}

// Update Grant
async function updateGrant(req, res) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const grant = await Grant.findByIdAndUpdate(id, updateData, { new: true });
    if (!grant) {
      return res.status(404).json({ message: "Grant not found." });
    }

    return res.status(200).json({ message: "Grant updated successfully.", grant });
  } catch (error) {
    console.error("updateGrant error", error);
    return res.status(500).json({ message: "Failed to update grant.", error: error.message });
  }
}

// Delete Grant (Soft delete)
async function deleteGrant(req, res) {
  try {
    const { id } = req.params;
    const grant = await Grant.findByIdAndUpdate(id, { isActive: false }, { new: true });
    if (!grant) {
      return res.status(404).json({ message: "Grant not found." });
    }
    return res.status(200).json({ message: "Grant deleted successfully." });
  } catch (error) {
    console.error("deleteGrant error", error);
    return res.status(500).json({ message: "Failed to delete grant.", error: error.message });
  }
}

async function reviewGrant(req, res) {
  try {
    const { id } = req.params;
    const { approvalStatus, coordinatorComment, approvedBy } = req.body;
    if (!["Pending", "Approved", "Rejected"].includes(approvalStatus)) return res.status(400).json({ message: "Invalid approval status." });
    const item = await Grant.findByIdAndUpdate(id, { approvalStatus, coordinatorComment, approvedBy }, { new: true });
    if (!item) return res.status(404).json({ message: "Grant not found" });
    return res.status(200).json({ item });
  } catch (error) {
    return res.status(500).json({ message: "Failed to review Grant.", error: error.message });
  }
}

module.exports = {
  createGrant,
  getAllGrants,
  getGrantById,
  updateGrant,
  deleteGrant,
  reviewGrant
};

