const mongoose = require("mongoose");

const patentSchema = new mongoose.Schema({
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true
  },
  teacherName: {
    type: String,
    required: true
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true
  },
  departmentName: {
    type: String,
    required: true
  },

  isPccoeApplicant: {
    type: Boolean,
    default: true
  },
  typeOfPatent: {
    type: String,
    enum: ["Utility", "Design", "Other"],
    required: true
  },
  nationalInternational: {
    type: String,
    enum: ["National", "International"],
    required: true
  },
  titleOfPatent: {
    type: String,
    required: true
  },
  nameOfApplicant: {
    type: String,
    required: true
  },
  nameOfInventors: {
    type: String,
    required: true
  },
  applicationNumber: {
    type: String,
    required: true
  },
  dateOfFiling: {
    type: Date,
    required: true
  },
  dateOfPublication: {
    type: Date
  },
  dateOfGrant: {
    type: Date
  },
  status: {
    type: String,
    enum: ["Filed", "Published", "Registered", "Granted"],
    required: true
  },
  proofDocument: {
    type: String // Stores the file path or URL
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Patent", patentSchema);
