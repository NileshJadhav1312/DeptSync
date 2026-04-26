const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema(
  {
    name: {
      type: String, // title of achievement
      required: true,
      trim: true,
    },

    description: {
      type: String,
    },

    academicYear: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    // Who achieved it
    achievedByType: {
      type: String,
      enum: ["Student", "Teacher"],
      required: true,
    },

    achievedBy: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "achievedByType", // dynamic reference
      required: true,
    },

    achievedByName: {
      type: String, // store name for quick access
    },

    level: {
      type: String,
      enum: [
        "International",
        "National",
        "State",
        "University",
        "Institute",
        "Department",
        "Departmental",
      ],
      required: true,
    },

    category: {
      type: String,
      enum: [
        "Academic",
        "Sports",
        "Research",
        "Cultural",
        "Technical",
        "Other",
      ],
      default: "Other",
    },

    position: {
      type: String, // e.g., 1st Rank, Winner, Runner-up
    },

    issuingOrganization: {
      type: String, // who gave the award
    },

    certificateNumber: {
      type: String,
    },

    // Documents (separate collection)
    documents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Document",
      },
    ],

    approvalStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    coordinatorComment: {
      type: String,
    },

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },

    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Achievement", achievementSchema);
