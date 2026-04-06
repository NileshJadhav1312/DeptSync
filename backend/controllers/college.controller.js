const College = require("../models/college.model");
const Admin = require("../models/admin.model");
const Department = require("../models/department.model");

async function createCollege(req, res) {
  try {
    const { collegeName, collegeId, address, createdBy } = req.body;

    if (!collegeName || !collegeId || !createdBy) {
      return res.status(400).json({ message: "Missing required college fields." });
    }

    const exists = await College.findOne({ collegeId: collegeId.toUpperCase().trim() });
    if (exists) {
      return res.status(409).json({ message: "College with this ID already exists." });
    }

    const college = await College.create({
      collegeName: collegeName.trim(),
      collegeId: collegeId.toUpperCase().trim(),
      address: address?.trim() || "",
      createdBy: createdBy,
    });

    return res.status(201).json({ message: "College created successfully.", college });
  } catch (error) {
    console.error("createCollege error", error);
    return res.status(500).json({ message: "Failed to create college.", error: error.message });
  }
}

async function getColleges(req, res) {
  try {
    const colleges = await College.find().sort({ createdAt: -1 });
    return res.status(200).json({ colleges });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch colleges.", error: error.message });
  }
}

async function getDepartmentsInCollege(req, res) {
  try {
    const { collegeId } = req.params;
    const departments = await Department.find({ collegeId }).sort({ createdAt: -1 });
    return res.status(200).json({ departments });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch departments for this college.", error: error.message });
  }
}

module.exports = {
  createCollege,
  getColleges,
  getDepartmentsInCollege,
};
