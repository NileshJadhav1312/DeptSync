const Copyright = require("../models/copyright.model");
const mongoose = require("mongoose");

async function createCopyright(req, res) {
  try {
    const copyright = await Copyright.create({ ...req.body, approvalStatus: req.body.createdByModel === 'Student' ? 'Pending' : 'Approved' });
    return res.status(201).json({ message: "Copyright added successfully.", copyright });
  } catch (error) {
    console.error("createCopyright error", error);
    return res.status(500).json({ message: "Failed to add copyright.", error: error.message });
  }
}

async function getAllCopyrights(req, res) {
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

    const copyrights = await Copyright.find(query)
      .populate("teacherId", "employeeId")
      .populate("studentId", "prnNumber className email")
      .sort({ createdAt: -1 });
    return res.status(200).json({ copyrights });
  } catch (error) {
    console.error("getAllCopyrights error", error);
    return res.status(500).json({ message: "Failed to fetch copyrights.", error: error.message });
  }
}

async function updateCopyright(req, res) {
  try {
    const copyright = await Copyright.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!copyright) {
      return res.status(404).json({ message: "Copyright not found." });
    }
    return res.status(200).json({ message: "Copyright updated successfully.", copyright });
  } catch (error) {
    console.error("updateCopyright error", error);
    return res.status(500).json({ message: "Failed to update copyright.", error: error.message });
  }
}

async function deleteCopyright(req, res) {
  try {
    const copyright = await Copyright.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!copyright) {
      return res.status(404).json({ message: "Copyright not found." });
    }
    return res.status(200).json({ message: "Copyright deleted successfully." });
  } catch (error) {
    console.error("deleteCopyright error", error);
    return res.status(500).json({ message: "Failed to delete copyright.", error: error.message });
  }
}

async function reviewCopyright(req, res) {
  try {
    const { id } = req.params;
    const { approvalStatus, coordinatorComment, approvedBy } = req.body;
    if (!["Pending", "Approved", "Rejected"].includes(approvalStatus)) return res.status(400).json({ message: "Invalid approval status." });
    const item = await Copyright.findByIdAndUpdate(id, { approvalStatus, coordinatorComment, approvedBy }, { new: true });
    if (!item) return res.status(404).json({ message: "Copyright not found" });
    return res.status(200).json({ item });
  } catch (error) {
    return res.status(500).json({ message: "Failed to review Copyright.", error: error.message });
  }
}

module.exports = {
  createCopyright,
  getAllCopyrights,
  updateCopyright,
  deleteCopyright,
  reviewCopyright
};

