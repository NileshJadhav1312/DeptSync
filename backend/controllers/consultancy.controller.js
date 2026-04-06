const Consultancy = require("../models/consultancy.model");

// Create Consultancy
async function createConsultancy(req, res) {
  try {
    const {
      year,
      teacherId,
      teacherName,
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
    } = req.body;

    if (!year || !title || !revenueGenerated || !teacherId || !departmentId) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const consultancy = await Consultancy.create({
      year,
      teacherId,
      teacherName,
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
      createdBy: teacherId,
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
    const { teacherId, departmentId, year, consultancyType, level } = req.query;
    let query = { isActive: true };

    if (teacherId) query.teacherId = teacherId;
    if (departmentId) query.departmentId = departmentId;
    if (year) query.year = year;
    if (consultancyType) query.consultancyType = consultancyType;
    if (level) query.level = level;

    const consultancies = await Consultancy.find(query).sort({ year: -1 });
    return res.status(200).json({ consultancies });
  } catch (error) {
    console.error("getAllConsultancies error", error);
    return res.status(500).json({ message: "Failed to fetch consultancy entries.", error: error.message });
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
  deleteConsultancy
};
