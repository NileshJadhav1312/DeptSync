const ConferencePublication = require("../models/conferencePublication.model");

// Create
async function createConferencePublication(req, res) {
  try {
    const conferencePublication = await ConferencePublication.create(req.body);
    return res.status(201).json({ message: "Conference publication added successfully.", conferencePublication });
  } catch (error) {
    console.error("createConferencePublication error", error);
    return res.status(500).json({ message: "Failed to add conference publication.", error: error.message });
  }
}

// Get all (with filtering)
async function getAllConferencePublications(req, res) {
  try {
    const { teacherId, studentId, departmentId, approvalStatus } = req.query;
    let query = { isActive: true };
    if (teacherId) query.teacherId = teacherId;
    if (studentId) query.studentId = studentId;
    if (departmentId) query.departmentId = departmentId;
    if (approvalStatus) query.approvalStatus = approvalStatus;

    const conferencePublications = await ConferencePublication.find(query)
      .populate('studentId', 'prnNumber className')
      .sort({ conferenceDate: -1 });
    return res.status(200).json({ conferencePublications });
  } catch (error) {
    console.error("getAllConferencePublications error", error);
    return res.status(500).json({ message: "Failed to fetch conference publications.", error: error.message });
  }
}

// Get by ID
async function getConferencePublicationById(req, res) {
  try {
    const conferencePublication = await ConferencePublication.findById(req.params.id);
    if (!conferencePublication) return res.status(404).json({ message: "Conference publication not found." });
    return res.status(200).json({ conferencePublication });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch conference publication.", error: error.message });
  }
}

// Update
async function updateConferencePublication(req, res) {
  try {
    const conferencePublication = await ConferencePublication.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!conferencePublication) return res.status(404).json({ message: "Conference publication not found." });
    return res.status(200).json({ message: "Conference publication updated successfully.", conferencePublication });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update conference publication.", error: error.message });
  }
}

// Delete (Soft)
async function deleteConferencePublication(req, res) {
  try {
    const conferencePublication = await ConferencePublication.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!conferencePublication) return res.status(404).json({ message: "Conference publication not found." });
    return res.status(200).json({ message: "Conference publication deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete conference publication.", error: error.message });
  }
}

// Review
async function reviewConferencePublication(req, res) {
  try {
    const { id } = req.params;
    const { approvalStatus, coordinatorComment, approvedBy } = req.body;
    
    if (!["Pending", "Approved", "Rejected"].includes(approvalStatus)) {
      return res.status(400).json({ message: "Invalid approval status." });
    }

    const conferencePublication = await ConferencePublication.findByIdAndUpdate(
      id,
      { approvalStatus, coordinatorComment, approvedBy },
      { new: true }
    );
    
    if (!conferencePublication) return res.status(404).json({ message: "Conference publication not found" });
    
    return res.status(200).json({ conferencePublication });
  } catch (error) {
    return res.status(500).json({ message: "Failed to review conference publication.", error: error.message });
  }
}

module.exports = {
  createConferencePublication,
  getAllConferencePublications,
  getConferencePublicationById,
  updateConferencePublication,
  deleteConferencePublication,
  reviewConferencePublication
};
