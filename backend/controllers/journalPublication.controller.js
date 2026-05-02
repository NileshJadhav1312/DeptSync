const JournalPublication = require("../models/journalPublication.model");
const mongoose = require("mongoose");

// Create JournalPublication
async function createJournalPublication(req, res) {
  try {
    const data = req.body;

    if (!data.year || !data.paperTitle || !data.journalName || !data.departmentId) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const payload = { ...data };
    if (payload.createdByModel === "Student") {
      payload.approvalStatus = "Pending";
    } else if (payload.createdByModel === "Teacher") {
      payload.approvalStatus = "Approved";
    }

    const journalPublication = await JournalPublication.create(payload);

    return res.status(201).json({ message: "Journal publication added successfully.", journalPublication });
  } catch (error) {
    console.error("createJournalPublication error", error);
    return res.status(500).json({ message: "Failed to add journal publication.", error: error.message });
  }
}

// Get all JournalPublications (with filtering)
async function getAllJournalPublications(req, res) {
  try {
    const { teacherId, studentId, departmentId, year, approvalStatus } = req.query;
    let query = { isActive: { $ne: false } };

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
                { createdById: studentId, createdByModel: "Student" }
            ];
        }
    }
    if (departmentId) query.departmentId = departmentId;
    if (year) query.year = year;
    if (approvalStatus) query.approvalStatus = approvalStatus;

    const journalPublications = await JournalPublication.find(query)
      .populate("teacherId", "employeeId")
      .populate("studentId", "prnNumber className email")
      .sort({ year: -1, createdAt: -1 });
    return res.status(200).json({ journalPublications });
  } catch (error) {
    console.error("getAllJournalPublications error", error);
    return res.status(500).json({ message: "Failed to fetch journal publications.", error: error.message });
  }
}

// Get JournalPublication by ID
async function getJournalPublicationById(req, res) {
  try {
    const journalPublication = await JournalPublication.findById(req.params.id);
    if (!journalPublication) {
      return res.status(404).json({ message: "Journal publication not found." });
    }
    return res.status(200).json({ journalPublication });
  } catch (error) {
    console.error("getJournalPublicationById error", error);
    return res.status(500).json({ message: "Failed to fetch journal publication.", error: error.message });
  }
}

// Update JournalPublication
async function updateJournalPublication(req, res) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const journalPublication = await JournalPublication.findByIdAndUpdate(id, updateData, { new: true });
    if (!journalPublication) {
      return res.status(404).json({ message: "Journal publication not found." });
    }

    return res.status(200).json({ message: "Journal publication updated successfully.", journalPublication });
  } catch (error) {
    console.error("updateJournalPublication error", error);
    return res.status(500).json({ message: "Failed to update journal publication.", error: error.message });
  }
}

// Delete JournalPublication (Soft delete)
async function deleteJournalPublication(req, res) {
  try {
    const { id } = req.params;
    const journalPublication = await JournalPublication.findByIdAndUpdate(id, { isActive: false }, { new: true });
    if (!journalPublication) {
      return res.status(404).json({ message: "Journal publication not found." });
    }
    return res.status(200).json({ message: "Journal publication deleted successfully." });
  } catch (error) {
    console.error("deleteJournalPublication error", error);
    return res.status(500).json({ message: "Failed to delete journal publication.", error: error.message });
  }
}

async function reviewJournalPublication(req, res) {
  try {
    const { id } = req.params;
    const { approvalStatus, coordinatorComment, approvedBy } = req.body;
    if (!["Pending", "Approved", "Rejected"].includes(approvalStatus)) return res.status(400).json({ message: "Invalid approval status." });
    const item = await JournalPublication.findByIdAndUpdate(id, { approvalStatus, coordinatorComment, approvedBy }, { new: true });
    if (!item) return res.status(404).json({ message: "Journal publication not found" });
    return res.status(200).json({ item });
  } catch (error) {
    return res.status(500).json({ message: "Failed to review Journal Publication.", error: error.message });
  }
}

module.exports = {
  createJournalPublication,
  getAllJournalPublications,
  getJournalPublicationById,
  updateJournalPublication,
  deleteJournalPublication,
  reviewJournalPublication
};
