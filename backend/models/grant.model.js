const mongoose = require("mongoose");

const grantSchema = new mongoose.Schema({
  academicYear: {
    type: String,
    required: true
  },
  
  projectTitle: {
    type: String,
    required: true
  },
  projectDescription: {
    type: String
  },
  fundingAgency: {
    type: String
  },
  grantAchievedAmount: {
    type: Number,
    default: 0
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  paymentProof: {
    type: String // file URL or path
  },
  remarks: {
    type: String
  },

  // Status
  status: {
    type: String,
    enum: ["pending", "ongoing", "completed"],
    default: "pending"
  },

  // Teacher & Department Info (Required by user)
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

  // Compatibility/Old fields
  facultyName: String,
  facultyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher"
  },
  facultyEmpId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher"
  },

  documents: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Document"
  },

  isActive: {
    type: Boolean,
    default: true
  }

}, {
  timestamps: true // adds createdAt & updatedAt automatically
});

module.exports = mongoose.model("Grant", grantSchema);