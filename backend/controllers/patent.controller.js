const Patent = require("../models/patent.model");

async function createPatent(req, res) {
  try {
    const patent = await Patent.create(req.body);
    return res.status(201).json({ message: "Patent added successfully.", patent });
  } catch (error) {
    console.error("createPatent error", error);
    return res.status(500).json({ message: "Failed to add patent.", error: error.message });
  }
}

async function getAllPatents(req, res) {
  try {
    const { teacherId, departmentId } = req.query;
    let query = { isActive: true };

    if (teacherId) query.teacherId = teacherId;
    if (departmentId) query.departmentId = departmentId;

    const patents = await Patent.find(query).sort({ createdAt: -1 });
    return res.status(200).json({ patents });
  } catch (error) {
    console.error("getAllPatents error", error);
    return res.status(500).json({ message: "Failed to fetch patents.", error: error.message });
  }
}

async function updatePatent(req, res) {
  try {
    const patent = await Patent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!patent) {
      return res.status(404).json({ message: "Patent not found." });
    }
    return res.status(200).json({ message: "Patent updated successfully.", patent });
  } catch (error) {
    console.error("updatePatent error", error);
    return res.status(500).json({ message: "Failed to update patent.", error: error.message });
  }
}

async function deletePatent(req, res) {
  try {
    const patent = await Patent.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!patent) {
      return res.status(404).json({ message: "Patent not found." });
    }
    return res.status(200).json({ message: "Patent deleted successfully." });
  } catch (error) {
    console.error("deletePatent error", error);
    return res.status(500).json({ message: "Failed to delete patent.", error: error.message });
  }
}

module.exports = {
  createPatent,
  getAllPatents,
  updatePatent,
  deletePatent
};
