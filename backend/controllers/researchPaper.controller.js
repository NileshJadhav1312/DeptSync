const ResearchPaper = require("../models/researchPaper.model");

// Create ResearchPaper
async function createResearchPaper(req, res) {
  try {
    const {
      year,
      title,
      description,
      authors,
      publicationLevel,
      publicationType,
      areaOfResearch,
      teacherId,
      teacherName,
      departmentId,
      departmentName,
      publisherName,
      googleScholarLink,
      scopusLink,
      webOfScienceLink,
      citations,
      publicationDate,
      month,
      impactFactor,
      doi,
      issnIsbn,
      keywords,
      affiliation,
      status,
      supportingDocuments,
      supportingDocumentDetails,
    } = req.body;

    if (!year || !title || !publicationLevel || !publicationType || !teacherId || !departmentId) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const researchPaper = await ResearchPaper.create({
      year,
      title,
      description,
      authors,
      publicationLevel,
      publicationType,
      areaOfResearch,
      teacherId,
      teacherName,
      departmentId,
      departmentName,
      publisherName,
      googleScholarLink,
      scopusLink,
      webOfScienceLink,
      citations,
      publicationDate,
      month,
      impactFactor,
      doi,
      issnIsbn,
      keywords,
      affiliation,
      status,
      supportingDocuments,
      supportingDocumentDetails,
    });

    return res.status(201).json({ message: "Research paper added successfully.", researchPaper });
  } catch (error) {
    console.error("createResearchPaper error", error);
    return res.status(500).json({ message: "Failed to add research paper.", error: error.message });
  }
}

// Get all ResearchPapers (with filtering)
async function getAllResearchPapers(req, res) {
  try {
    const { teacherId, departmentId, publicationLevel, publicationType, year } = req.query;
    let query = { isActive: true };

    if (teacherId) query.teacherId = teacherId;
    if (departmentId) query.departmentId = departmentId;
    if (year) query.year = year;
    if (publicationLevel) query.publicationLevel = publicationLevel;
    if (publicationType) query.publicationType = publicationType;

    const researchPapers = await ResearchPaper.find(query).sort({ year: -1 });
    return res.status(200).json({ researchPapers });
  } catch (error) {
    console.error("getAllResearchPapers error", error);
    return res.status(500).json({ message: "Failed to fetch research papers.", error: error.message });
  }
}

// Get ResearchPaper by ID
async function getResearchPaperById(req, res) {
  try {
    const researchPaper = await ResearchPaper.findById(req.params.id);
    if (!researchPaper) {
      return res.status(404).json({ message: "Research paper not found." });
    }
    return res.status(200).json({ researchPaper });
  } catch (error) {
    console.error("getResearchPaperById error", error);
    return res.status(500).json({ message: "Failed to fetch research paper.", error: error.message });
  }
}

// Update ResearchPaper
async function updateResearchPaper(req, res) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const researchPaper = await ResearchPaper.findByIdAndUpdate(id, updateData, { new: true });
    if (!researchPaper) {
      return res.status(404).json({ message: "Research paper not found." });
    }

    return res.status(200).json({ message: "Research paper updated successfully.", researchPaper });
  } catch (error) {
    console.error("updateResearchPaper error", error);
    return res.status(500).json({ message: "Failed to update research paper.", error: error.message });
  }
}

// Delete ResearchPaper (Soft delete)
async function deleteResearchPaper(req, res) {
  try {
    const { id } = req.params;
    const researchPaper = await ResearchPaper.findByIdAndUpdate(id, { isActive: false }, { new: true });
    if (!researchPaper) {
      return res.status(404).json({ message: "Research paper not found." });
    }
    return res.status(200).json({ message: "Research paper deleted successfully." });
  } catch (error) {
    console.error("deleteResearchPaper error", error);
    return res.status(500).json({ message: "Failed to delete research paper.", error: error.message });
  }
}

module.exports = {
  createResearchPaper,
  getAllResearchPapers,
  getResearchPaperById,
  updateResearchPaper,
  deleteResearchPaper
};
