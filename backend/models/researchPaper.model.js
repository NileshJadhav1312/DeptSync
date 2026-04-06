const mongoose = require("mongoose");

const researchPaperSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },

  authors: [
    {
      type: String,
      required: true
    }
  ],

  publicationLevel: {
    type: String,
    enum: ["national", "international", "local", "regional", "other"],
    required: true
  },

  publicationType: {
    type: String,
    enum: ["journal", "conference", "workshop", "book chapter", "other"],
    required: true
  },

  areaOfResearch: {
    type: [String],
    enum: [
      "health",
      "education",
      "social",
      "technology",
      "environment",
      "agriculture",
      "economics",
      "management",
      "science",
      "engineering",
      "pharma",
      "ai_ml",
      "data_science",
      "cybersecurity"
    ],
    required: true
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

  publisherName: {
    type: String
  },

  googleScholarLink: String,
  scopusLink: String,
  webOfScienceLink: String,

  citations: {
    type: Number,
    default: 0
  },

  publicationDate: {
    type: Date
  },

  month: {
    type: String
  },

  impactFactor: {
    type: Number
  },

  doi: {
    type: String,
    unique: true,
    sparse: true
  },

  issnIsbn: String,

  keywords: [String],

  affiliation: String,

  status: {
    type: String,
    enum: ["published", "accepted", "under-review"],
    default: "published"
  },

  isActive: {
    type: Boolean,
    default: true
  }

}, {
  timestamps: true // adds createdAt & updatedAt
});

module.exports = mongoose.model("ResearchPaper", researchPaperSchema);