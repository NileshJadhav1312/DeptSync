const mongoose = require("mongoose");

const bookPublicationSchema = new mongoose.Schema(
  {
    bookTitle: {
      type: String,
      required: true,
      trim: true
    },
    authorsEditors: [
      {
        name: { type: String, required: true },
        role: { type: String }, // e.g. Author, Editor
        order: { type: Number }
      }
    ],
    publisherName: {
      type: String,
      required: true
    },
    publicationYear: {
      type: Number,
      required: true
    },
    isbn: {
      type: String
    },
    edition: {
      type: String
    },
    allAuthors: [
      {
        type: String
      }
    ],
    pccoeAuthors: [
      {
        type: String
      }
    ],
    industryCoAuthorInvolved: {
      type: Boolean,
      default: false
    },
    industryName: {
      type: String
    },
    researchArea: {
      type: String
    },
    indexing: [
      {
        type: String
      }
    ],
    openAccess: {
      type: Boolean,
      default: false
    },
    numberOfPages: {
      type: Number
    },
    awardsRecognition: {
      hasAwards: { type: Boolean, default: false },
      details: { type: String }
    },
    royaltyReceived: {
      type: Boolean,
      default: false
    },
    cashIncentive: {
      received: { type: Boolean, default: false },
      amount: { type: Number, default: 0 },
      vchBillNo: { type: String }
    },
    linkToPublished: {
      type: String
    },
    supportingDocuments: {
      hasDocuments: { type: Boolean, default: false },
      details: { type: String }
    },

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
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("BookPublication", bookPublicationSchema);