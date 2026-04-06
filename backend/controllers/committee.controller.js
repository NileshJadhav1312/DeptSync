const Committee = require("../models/comittee.model");

// Create Committee
async function createCommittee(req, res) {
  try {
    const {
      year,
      committeeName,
      committeeType,
      description,
      level,
      organization,
      teacherId,
      teacherName,
      departmentId,
      departmentName,
      position,
      startDate,
      endDate,
      durationInMonths,
      appointmentLetter,
      certificate,
      contribution,
      remarks,
    } = req.body;

    if (!year || !committeeName || !level || !teacherId || !departmentId || !position) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const committee = await Committee.create({
      year,
      committeeName,
      committeeType,
      description,
      level,
      organization,
      teacherId,
      teacherName,
      departmentId,
      departmentName,
      position,
      startDate,
      endDate,
      durationInMonths,
      appointmentLetter,
      certificate,
      contribution,
      remarks,
      createdBy: teacherId,
    });

    return res.status(201).json({ message: "Committee entry added successfully.", committee });
  } catch (error) {
    console.error("createCommittee error", error);
    return res.status(500).json({ message: "Failed to add committee entry.", error: error.message });
  }
}

// Get all Committees (with filtering)
async function getAllCommittees(req, res) {
  try {
    const { teacherId, departmentId, year, level } = req.query;
    let query = { isActive: true };

    if (teacherId) query.teacherId = teacherId;
    if (departmentId) query.departmentId = departmentId;
    if (year) query.year = year;
    if (level) query.level = level;

    const committees = await Committee.find(query).sort({ year: -1 });
    return res.status(200).json({ committees });
  } catch (error) {
    console.error("getAllCommittees error", error);
    return res.status(500).json({ message: "Failed to fetch committee entries.", error: error.message });
  }
}

// Get Committee by ID
async function getCommitteeById(req, res) {
  try {
    const committee = await Committee.findById(req.params.id);
    if (!committee) {
      return res.status(404).json({ message: "Committee entry not found." });
    }
    return res.status(200).json({ committee });
  } catch (error) {
    console.error("getCommitteeById error", error);
    return res.status(500).json({ message: "Failed to fetch committee entry.", error: error.message });
  }
}

// Update Committee
async function updateCommittee(req, res) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const committee = await Committee.findByIdAndUpdate(id, updateData, { new: true });
    if (!committee) {
      return res.status(404).json({ message: "Committee entry not found." });
    }

    return res.status(200).json({ message: "Committee entry updated successfully.", committee });
  } catch (error) {
    console.error("updateCommittee error", error);
    return res.status(500).json({ message: "Failed to update committee entry.", error: error.message });
  }
}

// Delete Committee (Soft delete)
async function deleteCommittee(req, res) {
  try {
    const { id } = req.params;
    const committee = await Committee.findByIdAndUpdate(id, { isActive: false }, { new: true });
    if (!committee) {
      return res.status(404).json({ message: "Committee entry not found." });
    }
    return res.status(200).json({ message: "Committee entry deleted successfully." });
  } catch (error) {
    console.error("deleteCommittee error", error);
    return res.status(500).json({ message: "Failed to delete committee entry.", error: error.message });
  }
}

module.exports = {
  createCommittee,
  getAllCommittees,
  getCommitteeById,
  updateCommittee,
  deleteCommittee
};
