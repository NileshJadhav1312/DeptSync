const mongoose = require("mongoose");

const conferencePublicationSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["Attendee", "Presenter", "Session Chair", "Panelist", "Organizer"],
      required: true
    },
    researchPaperTitle: {
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
    correspondingAuthor: {
      type: String
    },
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
    conferenceName: {
      type: String,
      required: true
    },
    organizingInstitution: {
      type: String,
      required: true
    },
    conferenceTheme: {
      type: String
    },
    conferenceDate: {
      type: Date,
      required: true
    },
    location: {
      type: String // City, Country, or Online
    },
    conferenceLevel: {
      type: String,
      enum: ["National", "International"],
      required: true
    },
    publicationType: {
      type: String,
      enum: ["Proceedings", "Indexed Journal", "Book Chapter"],
      required: true
    },
    publisherName: {
      type: String
    },
    isbn: {
      type: String
    },
    issn: {
      type: String
    },
    indexing: [
      {
        type: String // Scopus, WoS, UGC-CARE, etc.
      }
    ],
    doi: {
      type: String
    },
    pageNumbers: {
      type: String
    },
    researchDomain: {
      type: String
    },
    awardsRecognition: {
      hasAwards: { type: Boolean, default: false },
      details: { type: String }
    },
    certificateReceived: {
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

    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
    teacherName: {
      type: String,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    studentName: {
      type: String,
    },
    createdByModel: {
      type: String,
      enum: ["Teacher", "Student"],
      default: "Teacher",
    },
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

module.exports = mongoose.model("ConferencePublication", conferencePublicationSchema);
