const Consultancy = require("../models/consultancy.model");
const mongoose = require("mongoose");

// Create Consultancy
async function createConsultancy(req, res) {
  try {
    const {
      year,
      teacherId,
      studentId,
      teacherName,
      studentName,
      departmentId,
      departmentName,
      title,
      description,
      organization,
      revenueGenerated,
      currency,
      paymentStatus,
      paymentDate,
      startDate,
      endDate,
      durationInMonths,
      agreementDocument,
      completionCertificate,
      invoiceDocument,
      consultancyType,
      level,
      impact,
      clientFeedback,
      tags,
      createdById,
      createdByName,
      createdByModel
    } = req.body;

    if (!year || !title || !revenueGenerated || !departmentId) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Determine owner
    const finalCreatedById = createdById || teacherId || studentId;
    const finalCreatedByName = createdByName || teacherName || studentName;
    const finalCreatedByModel = createdByModel || (teacherId ? "Teacher" : "Student");

    if (!finalCreatedById || !finalCreatedByName) {
       return res.status(400).json({ message: "Creator information is missing." });
    }

    const approvalStatus = finalCreatedByModel === "Student" ? "Pending" : "Approved";
    const consultancy = await Consultancy.create({
      year,
      teacherId: teacherId || (finalCreatedByModel === "Teacher" ? finalCreatedById : undefined),
      teacherName: teacherName || (finalCreatedByModel === "Teacher" ? finalCreatedByName : undefined),
      departmentId,
      departmentName,
      title,
      description,
      organization,
      revenueGenerated,
      currency,
      paymentStatus,
      paymentDate,
      startDate,
      endDate,
      durationInMonths,
      agreementDocument,
      completionCertificate,
      invoiceDocument,
      consultancyType,
      level,
      impact,
      clientFeedback,
      tags,
      studentId: finalCreatedByModel === "Student" ? finalCreatedById : studentId,
      studentName: finalCreatedByModel === "Student" ? finalCreatedByName : studentName,
      createdById: finalCreatedById,
      createdByName: finalCreatedByName,
      createdByModel: finalCreatedByModel,
      approvalStatus,
      isActive: true
    });

    return res.status(201).json({ message: "Consultancy entry added successfully.", consultancy });
  } catch (error) {
    console.error("createConsultancy error", error);
    return res.status(500).json({ message: "Failed to add consultancy entry.", error: error.message });
  }
}

// Get all Consultancies (with filtering)
async function getAllConsultancies(req, res) {
  try {
    const { teacherId, studentId, departmentId, year, consultancyType, level, approvalStatus } = req.query;
    let query = { isActive: true };

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
    if (consultancyType) query.consultancyType = consultancyType;
    if (level) query.level = level;
    if (approvalStatus) query.approvalStatus = approvalStatus;

    const consultancies = await Consultancy.find(query)
      .populate("teacherId", "employeeId")
      .populate({
        path: "createdById",
        select: "employeeId prnNumber",
      })
      .sort({ year: -1 });
    return res.status(200).json({ consultancies });
  } catch (error) {
    console.error("getAllConsultancies error", error);
    return res.status(500).json({ message: "Failed to fetch consultancy entries.", error: error.message });
  }
}

async function reviewConsultancy(req, res) {
  try {
    const { id } = req.params;
    const { approvalStatus, coordinatorComment, approvedBy } = req.body;
    if (!["Pending", "Approved", "Rejected"].includes(approvalStatus)) return res.status(400).json({ message: "Invalid approval status." });
    const item = await Consultancy.findByIdAndUpdate(id, { approvalStatus, coordinatorComment, approvedBy }, { new: true });
    if (!item) return res.status(404).json({ message: "Consultancy not found" });
    return res.status(200).json({ item });
  } catch (error) {
    return res.status(500).json({ message: "Failed to review Consultancy.", error: error.message });
  }
}

// Get Consultancy by ID
async function getConsultancyById(req, res) {
  try {
    const consultancy = await Consultancy.findById(req.params.id);
    if (!consultancy) {
      return res.status(404).json({ message: "Consultancy entry not found." });
    }
    return res.status(200).json({ consultancy });
  } catch (error) {
    console.error("getConsultancyById error", error);
    return res.status(500).json({ message: "Failed to fetch consultancy entry.", error: error.message });
  }
}

// Update Consultancy
async function updateConsultancy(req, res) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const consultancy = await Consultancy.findByIdAndUpdate(id, updateData, { new: true });
    if (!consultancy) {
      return res.status(404).json({ message: "Consultancy entry not found." });
    }

    return res.status(200).json({ message: "Consultancy entry updated successfully.", consultancy });
  } catch (error) {
    console.error("updateConsultancy error", error);
    return res.status(500).json({ message: "Failed to update consultancy entry.", error: error.message });
  }
}

// Delete Consultancy (Soft delete)
async function deleteConsultancy(req, res) {
  try {
    const { id } = req.params;
    const consultancy = await Consultancy.findByIdAndUpdate(id, { isActive: false }, { new: true });
    if (!consultancy) {
      return res.status(404).json({ message: "Consultancy entry not found." });
    }
    return res.status(200).json({ message: "Consultancy entry deleted successfully." });
  } catch (error) {
    console.error("deleteConsultancy error", error);
    return res.status(500).json({ message: "Failed to delete consultancy entry.", error: error.message });
  }
}

module.exports = {
  createConsultancy,
  getAllConsultancies,
  getConsultancyById,
  updateConsultancy,
  deleteConsultancy,
  reviewConsultancy
};
