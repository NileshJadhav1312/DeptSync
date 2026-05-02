const mongoose = require("mongoose");

const journalPublicationSchema = new mongoose.Schema({
  journalName: {
    type: String,
    required: true
  },
  issnNumber: String,
  isbnNumber: String,
  publisherName: String,
  indexedIn: [String], // Scopus, WoS, IEEE, etc.
  otherIndexing: String,
  quartile: {
    type: String,
    enum: ["Q1", "Q2", "Q3", "Q4", "None"],
    default: "None"
  },
  impactFactor: Number,
  citeScore: Number,
  publicationType: {
    type: String,
    enum: ["Open Access", "Paid", "Free", "Other"],
    required: true
  },
  paperTitle: {
    type: String,
    required: true
  },
  authors: [String], // All authors in order
  pccoeAuthors: [String], // Contributing authors from PCCOE
  industryCoAuthor: String, // Industry Name if Industry Co-author involved
  researchArea: String, // Research Area/Domain
  dateOfSubmission: Date,
  dateOfAcceptance: Date,
  dateOfPublication: Date,
  year: {
    type: Number,
    required: true
  },
  doi: String, // Digital Object Identifier
  volumeAndIssue: String,
  pageNumbers: String,
  awardsReceived: {
    type: Boolean,
    default: false
  },
  awardDetails: String,
  supportingDocuments: {
    type: Boolean,
    default: false
  },
  supportingDocumentDetails: String,
  cashIncentive: {
    type: Boolean,
    default: false
  },
  cashIncentiveAmount: Number,
  vchBillNo: String,
  articleUrl: String,
  scopusLink: String,
  googleScholarLink: String,

  // Owner info — teacher or student
  createdByModel: {
    type: String,
    enum: ["Teacher", "Student"],
    default: "Teacher"
  },
  createdById: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "createdByModel"
  },
  createdByName: { type: String },
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

module.exports = mongoose.model("JournalPublication", journalPublicationSchema);

