const BookChapter = require("../models/bookChapter.model");

// Create
async function createBookChapter(req, res) {
  try {
    const bookChapter = await BookChapter.create(req.body);
    return res.status(201).json({ message: "Book chapter added successfully.", bookChapter });
  } catch (error) {
    console.error("createBookChapter error", error);
    return res.status(500).json({ message: "Failed to add book chapter.", error: error.message });
  }
}

// Get all (with filtering)
async function getAllBookChapters(req, res) {
  try {
    const { teacherId, departmentId } = req.query;
    let query = { isActive: true };
    if (teacherId) query.teacherId = teacherId;
    if (departmentId) query.departmentId = departmentId;

    const bookChapters = await BookChapter.find(query)
      .populate("teacherId", "employeeId")
      .sort({ publicationYear: -1 });
    return res.status(200).json({ bookChapters });
  } catch (error) {
    console.error("getAllBookChapters error", error);
    return res.status(500).json({ message: "Failed to fetch book chapters.", error: error.message });
  }
}

// Get by ID
async function getBookChapterById(req, res) {
  try {
    const bookChapter = await BookChapter.findById(req.params.id);
    if (!bookChapter) return res.status(404).json({ message: "Book chapter not found." });
    return res.status(200).json({ bookChapter });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch book chapter.", error: error.message });
  }
}

// Update
async function updateBookChapter(req, res) {
  try {
    const bookChapter = await BookChapter.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!bookChapter) return res.status(404).json({ message: "Book chapter not found." });
    return res.status(200).json({ message: "Book chapter updated successfully.", bookChapter });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update book chapter.", error: error.message });
  }
}

// Delete (Soft)
async function deleteBookChapter(req, res) {
  try {
    const bookChapter = await BookChapter.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!bookChapter) return res.status(404).json({ message: "Book chapter not found." });
    return res.status(200).json({ message: "Book chapter deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete book chapter.", error: error.message });
  }
}

module.exports = {
  createBookChapter,
  getAllBookChapters,
  getBookChapterById,
  updateBookChapter,
  deleteBookChapter
};
