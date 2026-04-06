const Grant = require("../models/grant.model");

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
    } = req.body;

    if (!academicYear || !projectTitle || !teacherId || !departmentId) {
      return res.status(400).json({ message: "Missing required fields." });
    }

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
      facultyId: teacherId, // For compatibility
      facultyName: teacherName,
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
    const { teacherId, departmentId, academicYear, status } = req.query;
    let query = { isActive: true };

    if (teacherId) query.teacherId = teacherId;
    if (departmentId) query.departmentId = departmentId;
    if (academicYear) query.academicYear = academicYear;
    if (status) query.status = status;

    const grants = await Grant.find(query).sort({ academicYear: -1 });
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

module.exports = {
  createGrant,
  getAllGrants,
  getGrantById,
  updateGrant,
  deleteGrant
};
