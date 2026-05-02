const EditorialBoard = require("../models/editorialBoard.model");

// Create EditorialBoard
async function createEditorialBoard(req, res) {
  try {
    const {
      academicYear,
      teacherId,
      teacherName,
      departmentId,
      departmentName,
      boardName,
      role,
      level,
      startDate,
      endDate,
      durationInMonths,
      appointmentLetter,
      certificate,
      responsibilities,
      achievements,
      remarks,
    } = req.body;

    if (!academicYear || !boardName || !role || !teacherId || !departmentId) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const editorialBoard = await EditorialBoard.create({
      academicYear,
      teacherId,
      teacherName,
      departmentId,
      departmentName,
      boardName,
      role,
      level,
      startDate,
      endDate,
      durationInMonths,
      appointmentLetter,
      certificate,
      responsibilities,
      achievements,
      remarks,
      createdBy: teacherId,
    });

    return res.status(201).json({ message: "Editorial board entry added successfully.", editorialBoard });
  } catch (error) {
    console.error("createEditorialBoard error", error);
    return res.status(500).json({ message: "Failed to add editorial board entry.", error: error.message });
  }
}

// Get all EditorialBoards (with filtering)
async function getAllEditorialBoards(req, res) {
  try {
    const { teacherId, departmentId, academicYear, level } = req.query;
    let query = { isActive: { $ne: false } };

    if (teacherId) query.teacherId = teacherId;
    if (departmentId) query.departmentId = departmentId;
    if (academicYear) query.academicYear = academicYear;
    if (level) query.level = level;

    const editorialBoards = await EditorialBoard.find(query)
      .populate("teacherId", "employeeId")
      .sort({ academicYear: -1 });
    return res.status(200).json({ editorialBoards });
  } catch (error) {
    console.error("getAllEditorialBoards error", error);
    return res.status(500).json({ message: "Failed to fetch editorial board entries.", error: error.message });
  }
}

// Get EditorialBoard by ID
async function getEditorialBoardById(req, res) {
  try {
    const editorialBoard = await EditorialBoard.findById(req.params.id);
    if (!editorialBoard) {
      return res.status(404).json({ message: "Editorial board entry not found." });
    }
    return res.status(200).json({ editorialBoard });
  } catch (error) {
    console.error("getEditorialBoardById error", error);
    return res.status(500).json({ message: "Failed to fetch editorial board entry.", error: error.message });
  }
}

// Update EditorialBoard
async function updateEditorialBoard(req, res) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const editorialBoard = await EditorialBoard.findByIdAndUpdate(id, updateData, { new: true });
    if (!editorialBoard) {
      return res.status(404).json({ message: "Editorial board entry not found." });
    }

    return res.status(200).json({ message: "Editorial board entry updated successfully.", editorialBoard });
  } catch (error) {
    console.error("updateEditorialBoard error", error);
    return res.status(500).json({ message: "Failed to update editorial board entry.", error: error.message });
  }
}

// Delete EditorialBoard (Soft delete)
async function deleteEditorialBoard(req, res) {
  try {
    const { id } = req.params;
    const editorialBoard = await EditorialBoard.findByIdAndUpdate(id, { isActive: false }, { new: true });
    if (!editorialBoard) {
      return res.status(404).json({ message: "Editorial board entry not found." });
    }
    return res.status(200).json({ message: "Editorial board entry deleted successfully." });
  } catch (error) {
    console.error("deleteEditorialBoard error", error);
    return res.status(500).json({ message: "Failed to delete editorial board entry.", error: error.message });
  }
}

module.exports = {
  createEditorialBoard,
  getAllEditorialBoards,
  getEditorialBoardById,
  updateEditorialBoard,
  deleteEditorialBoard
};
