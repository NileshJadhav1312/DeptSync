const mongoose = require("mongoose");

const consultancySchema = new mongoose.Schema(
  {
    // Year
    year: {
      type: Number,
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

    // Consultancy Details
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String
    },

    organization: {
      name: {
        type: String,
        required: true,
        index: true
      },
      type: {
        type: String,
        enum: ["Government", "Private", "NGO", "Startup", "Academic", "Other"],
        default: "Other"
      },
      location: String,
      contactEmail: String
    },

    // Revenue Info
    revenueGenerated: {
      type: Number,
      required: true,
      min: 0
    },

    currency: {
      type: String,
      default: "INR"
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Partially Paid", "Paid"],
      default: "Pending"
    },

    paymentDate: {
      type: Date
    },

    // Duration
    startDate: Date,
    endDate: Date,

    durationInMonths: Number,

    // Documents
    agreementDocument: {
      url: String,
      publicId: String
    },

    completionCertificate: {
      url: String,
      publicId: String
    },

    invoiceDocument: {
      url: String,
      publicId: String
    },

    // Classification
    consultancyType: {
      type: String,
      enum: [
        "Research",
        "Technical",
        "Training",
        "Advisory",
        "Audit",
        "Other"
      ],
      default: "Other"
    },

    level: {
      type: String,
      enum: ["International", "National", "State", "Local"],
      default: "National"
    },

    // Performance / Metadata
    impact: {
      type: String // description of outcome/impact
    },

    clientFeedback: {
      rating: { type: Number, min: 0, max: 5 },
      comment: String
    },

    tags: [String],

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

// Compound index
consultancySchema.index({ year: 1, teacherId: 1 });

// Text search
consultancySchema.index({
  title: "text",
  description: "text",
  "organization.name": "text"
});

module.exports = mongoose.model("Consultancy", consultancySchema);