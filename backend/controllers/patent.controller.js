const Patent = require("../models/patent.model");
const mongoose = require("mongoose");

async function createPatent(req, res) {
  try {
    const payload = { ...req.body };
    // If it's a student, set status to Pending. If teacher, Approved.
    if (payload.createdByModel === "Student") {
      payload.approvalStatus = "Pending";
    } else if (payload.createdByModel === "Teacher") {
      payload.approvalStatus = "Approved";
    }

    const patent = await Patent.create(payload);
    return res.status(201).json({ message: "Patent added successfully.", patent });
  } catch (error) {
    console.error("createPatent error", error);
    return res.status(500).json({ message: "Failed to add patent.", error: error.message });
  }
}

async function getAllPatents(req, res) {
  try {
    const { teacherId, studentId, departmentId, approvalStatus } = req.query;
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

    const patents = await Patent.find(query)
      .populate("teacherId", "employeeId")
      .populate("studentId", "prnNumber className email")
      .sort({ createdAt: -1 });
    return res.status(200).json({ patents });
  } catch (error) {
    console.error("getAllPatents error", error);
    return res.status(500).json({ message: "Failed to fetch patents.", error: error.message });
  }
}

async function updatePatent(req, res) {
  try {
    const patent = await Patent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!patent) {
      return res.status(404).json({ message: "Patent not found." });
    }
    return res.status(200).json({ message: "Patent updated successfully.", patent });
  } catch (error) {
    console.error("updatePatent error", error);
    return res.status(500).json({ message: "Failed to update patent.", error: error.message });
  }
}

async function deletePatent(req, res) {
  try {
    const patent = await Patent.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!patent) {
      return res.status(404).json({ message: "Patent not found." });
    }
    return res.status(200).json({ message: "Patent deleted successfully." });
  } catch (error) {
    console.error("deletePatent error", error);
    return res.status(500).json({ message: "Failed to delete patent.", error: error.message });
  }
}

async function reviewPatent(req, res) {
  try {
    const { id } = req.params;
    const { approvalStatus, coordinatorComment, approvedBy } = req.body;
    if (!["Pending", "Approved", "Rejected"].includes(approvalStatus)) return res.status(400).json({ message: "Invalid approval status." });
    const item = await Patent.findByIdAndUpdate(id, { approvalStatus, coordinatorComment, approvedBy }, { new: true });
    if (!item) return res.status(404).json({ message: "Patent not found" });
    return res.status(200).json({ item });
  } catch (error) {
    return res.status(500).json({ message: "Failed to review Patent.", error: error.message });
  }
}

module.exports = {
  createPatent,
  getAllPatents,
  updatePatent,
  deletePatent,
  reviewPatent
};

