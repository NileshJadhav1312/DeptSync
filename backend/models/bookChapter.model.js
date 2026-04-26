const mongoose = require("mongoose");

const bookChapterSchema = new mongoose.Schema(
  {
    chapterTitle: {
      type: String,
      required: true,
      trim: true
    },
    authors: [
      {
        type: String,
        required: true
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
    bookTitle: {
      type: String,
      required: true
    },
    editors: [
      {
        type: String
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
    pageRange: {
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
    awardsRecognition: {
      hasAwards: { type: Boolean, default: false },
      details: { type: String }
    },
    openAccess: {
      type: Boolean,
      default: false
    },
    cashIncentive: {
      received: { type: Boolean, default: false },
      amount: { type: Number, default: 0 },
      vchBillNo: { type: String }
    },
    articleUrl: {
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

module.exports = mongoose.model("BookChapter", bookChapterSchema);
