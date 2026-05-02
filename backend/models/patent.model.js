const mongoose = require("mongoose");

const patentSchema = new mongoose.Schema({
  // Owner info — teacher or student
  createdByModel: {
    type: String,
    enum: ["Teacher", "Student"],
    required: true,
    default: "Teacher"
  },
  createdById: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "createdByModel",
    required: true
  },
  createdByName: {
    type: String,
    required: true
  },
  // Legacy teacher fields (kept for backwards compatibility)
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher"
  },
  teacherName: {
    type: String
  },
  // Student-specific fields
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student"
  },
  studentName: {
    type: String
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department"
  },
  departmentName: {
    type: String
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
      approvalStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
    coordinatorComment: {
      type: String,
    },
    isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Patent", patentSchema);

