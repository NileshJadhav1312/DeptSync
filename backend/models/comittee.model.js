const mongoose = require("mongoose");

const committeeSchema = new mongoose.Schema(
  {
    // Year
    year: {
      type: Number,
      required: true,
      index: true
    },

    // Committee Info
    committeeName: {
      type: String,
      required: true,
      trim: true,
      index: true
    },

    committeeType: {
      type: String,
      enum: [
        "Academic",
        "Administrative",
        "Research",
        "Examination",
        "Cultural",
        "Disciplinary",
        "Technical",
        "Other"
      ],
      default: "Other"
    },

    description: {
      type: String
    },

    // Level
    level: {
      type: String,
      enum: ["International", "National", "State", "District", "Local"],
      required: true,
      index: true
    },

    // Organization / Body
    organization: {
      name: {
        type: String,
        required: true
      },
      type: {
        type: String,
        enum: ["Government", "Private", "University", "Autonomous", "Other"],
        default: "Other"
      },
      location: String,
      website: String
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

    // Role of Teacher in Committee
    position: {
      type: String,
      enum: [
        "Chairperson",
        "Member",
        "Coordinator",
        "Advisor",
        "Reviewer",
        "Secretary",
        "Convener",
        "Other"
      ],
      required: true
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

    // Achievements / Contribution
    contribution: {
      type: String // what teacher contributed
    },

    // Verification / Proof should be done by HOD of department 
    verificationStatus: {
      type: String,
      enum: ["Pending", "Verified", "Rejected"],
      default: "Pending"
    },
    
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher" // or HOD
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

// Index for faster reporting
committeeSchema.index({ year: 1, teacherId: 1, level: 1 });

// Text search
committeeSchema.index({
  committeeName: "text",
  description: "text",
  "organization.name": "text"
});

module.exports = mongoose.model("Committee", committeeSchema);