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
  // Legacy teacher fields
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher"
  },
  teacherName: { type: String },
  // Student fields
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student"
  },
  studentName: { type: String },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department"
  },
  departmentName: { type: String },

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
  timestamps: true // adds createdAt & updatedAt automatically
});

module.exports = mongoose.model("Grant", grantSchema);
