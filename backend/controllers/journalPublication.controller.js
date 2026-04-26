const JournalPublication = require("../models/journalPublication.model");

// Create JournalPublication
async function createJournalPublication(req, res) {
  try {
    const data = req.body;

    if (!data.year || !data.paperTitle || !data.journalName || !data.teacherId || !data.departmentId) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const journalPublication = await JournalPublication.create(data);

    return res.status(201).json({ message: "Journal publication added successfully.", journalPublication });
  } catch (error) {
    console.error("createJournalPublication error", error);
    return res.status(500).json({ message: "Failed to add journal publication.", error: error.message });
  }
}

// Get all JournalPublications (with filtering)
async function getAllJournalPublications(req, res) {
  try {
    const { teacherId, departmentId, year } = req.query;
    let query = { isActive: true };

    if (teacherId) query.teacherId = teacherId;
    if (departmentId) query.departmentId = departmentId;
    if (year) query.year = year;

    const journalPublications = await JournalPublication.find(query).sort({ year: -1, createdAt: -1 });
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

module.exports = {
  createJournalPublication,
  getAllJournalPublications,
  getJournalPublicationById,
  updateJournalPublication,
  deleteJournalPublication
};
