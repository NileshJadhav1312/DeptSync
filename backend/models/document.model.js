const mongoose = require("mongoose");

const DOCUMENT_TYPES = [
  "Permission Letter",
  "Sanction Letter",
  "Photos",
  "Certificate",
  "Participant List",
  "Report",
  "Payment Details",
  "Invitation/Brochure",
  "Attendance Sheet",
  "Other",
];

const documentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    type: {
      type: String,
      enum: DOCUMENT_TYPES,
      required: true,
    },

    fileUrl: {
      type: String,
      required: true,
      trim: true,
    },

    // Who uploaded it (Student / Teacher / Admin)
    uploadedByType: {
      type: String,
      enum: ["Student", "Teacher", "Admin"],
      required: true,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "uploadedByType",
      required: true,
    },

    uploadedByName: {
      type: String,
      trim: true,
    },

    // Optional linkage to a parent entity (activity, achievement, etc.)
    relatedModel: {
      type: String,
      trim: true,
    },

    relatedId: {
      type: mongoose.Schema.Types.ObjectId,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Document", documentSchema);
