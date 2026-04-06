const mongoose = require("mongoose");

const editorialBoardSchema = new mongoose.Schema(
  {
    // Academic Year (e.g., 2024-25)
    academicYear: {
      type: String,
      required: true,
      index: true
    },

    // Teacher & Department Info (Required by user)
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
      index: true
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

    // Board Details
    boardName: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
 
    // Role of Teacher
    role: {
      type: String,
      enum: [
        "Editor-in-Chief",
        "Associate Editor",
        "Assistant Editor",
        "Editorial Board Member",
        "Reviewer",
        "Guest Editor",
        "Other"
      ],
      required: true
    },

    // Level
    level: {
      type: String,
      enum: ["International", "National", "State", "Local"],
      default: "National"
    },

    // Duration
    startDate: Date,
    endDate: Date,

    durationInMonths: Number,

    // Documents
    appointmentLetter: {
      url: String,
      publicId: String
    },

    certificate: {
      url: String,
      publicId: String
    },

    // Contribution
    responsibilities: String,
    achievements: String,

    // Verification
    verificationStatus: {
      type: String,
      enum: ["Pending", "Verified", "Rejected"],
      default: "Pending"
    },

    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher"
    },

    remarks: String,

    // System Fields
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher"
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher"
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

// Index for reporting
editorialBoardSchema.index({ academicYear: 1, teacherId: 1 });

// Text search
editorialBoardSchema.index({
  boardName: "text",
  responsibilities: "text"
});

module.exports = mongoose.model("EditorialBoard", editorialBoardSchema);