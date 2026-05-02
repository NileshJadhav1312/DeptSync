const mongoose = require("mongoose");

const copyrightSchema = new mongoose.Schema({
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

  academicYear: {
    type: String,
    required: true
  },
  titleOfCopyright: {
    type: String,
    required: true
  },
  nameOfApplicant: {
    type: String,
    required: true
  },
  nameOfAuthors: {
    type: String,
    required: true
  },
  dateOfFiling: {
    type: Date,
    required: true
  },
  dateOfRegistration: {
    type: Date
  },
  dairyNumber: {
    type: String
  },
  rocNumber: {
    type: String
  },
  status: {
    type: String,
    enum: ["Filed", "Registered"],
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

module.exports = mongoose.model("Copyright", copyrightSchema);

