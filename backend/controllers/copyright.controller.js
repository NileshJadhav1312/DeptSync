const Copyright = require("../models/copyright.model");

async function createCopyright(req, res) {
  try {
    const copyright = await Copyright.create(req.body);
    return res.status(201).json({ message: "Copyright added successfully.", copyright });
  } catch (error) {
    console.error("createCopyright error", error);
    return res.status(500).json({ message: "Failed to add copyright.", error: error.message });
  }
}

async function getAllCopyrights(req, res) {
  try {
    const { teacherId, departmentId } = req.query;
    let query = { isActive: true };

    if (teacherId) query.teacherId = teacherId;
    if (departmentId) query.departmentId = departmentId;

    const copyrights = await Copyright.find(query).sort({ createdAt: -1 });
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

module.exports = {
  createCopyright,
  getAllCopyrights,
  updateCopyright,
  deleteCopyright
};
