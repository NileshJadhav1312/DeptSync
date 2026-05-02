const BookPublication = require("../models/bookPublication.model");

// Create BookPublication
async function createBookPublication(req, res) {
  try {
    const bookPublication = await BookPublication.create({
      ...req.body,
      isActive: true
    });
    return res.status(201).json({ message: "Book publication added successfully.", bookPublication });
  } catch (error) {
    console.error("createBookPublication error", error);
    return res.status(500).json({ message: "Failed to add book publication.", error: error.message });
  }
}

// Get all BookPublications (with filtering)
async function getAllBookPublications(req, res) {
  try {
    const { teacherId, departmentId } = req.query;
    let query = { isActive: true };

    if (teacherId) query.teacherId = teacherId;
    if (departmentId) query.departmentId = departmentId;

    const bookPublications = await BookPublication.find(query)
      .populate("teacherId", "employeeId")
      .sort({ publicationYear: -1 });
    return res.status(200).json({ bookPublications });
  } catch (error) {
    console.error("getAllBookPublications error", error);
    return res.status(500).json({ message: "Failed to fetch book publications.", error: error.message });
  }
}

// Get BookPublication by ID
async function getBookPublicationById(req, res) {
  try {
    const bookPublication = await BookPublication.findById(req.params.id);
    if (!bookPublication) {
      return res.status(404).json({ message: "Book publication not found." });
    }
    return res.status(200).json({ bookPublication });
  } catch (error) {
    console.error("getBookPublicationById error", error);
    return res.status(500).json({ message: "Failed to fetch book publication.", error: error.message });
  }
}

// Update BookPublication
async function updateBookPublication(req, res) {
  try {
    const { id } = req.params;
    const bookPublication = await BookPublication.findByIdAndUpdate(id, req.body, { new: true });
    if (!bookPublication) {
      return res.status(404).json({ message: "Book publication not found." });
    }

    return res.status(200).json({ message: "Book publication updated successfully.", bookPublication });
  } catch (error) {
    console.error("updateBookPublication error", error);
    return res.status(500).json({ message: "Failed to update book publication.", error: error.message });
  }
}

// Delete BookPublication (Soft delete)
async function deleteBookPublication(req, res) {
  try {
    const { id } = req.params;
    const bookPublication = await BookPublication.findByIdAndUpdate(id, { isActive: false }, { new: true });
    if (!bookPublication) {
      return res.status(404).json({ message: "Book publication not found." });
    }
    return res.status(200).json({ message: "Book publication deleted successfully." });
  } catch (error) {
    console.error("deleteBookPublication error", error);
    return res.status(500).json({ message: "Failed to delete book publication.", error: error.message });
  }
}

module.exports = {
  createBookPublication,
  getAllBookPublications,
  getBookPublicationById,
  updateBookPublication,
  deleteBookPublication
};
