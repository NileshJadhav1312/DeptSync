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

  // Teacher & Department Info
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

  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("JournalPublication", journalPublicationSchema);
