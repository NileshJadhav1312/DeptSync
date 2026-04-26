const mongoose = require("mongoose");

const copyrightSchema = new mongoose.Schema({
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

  academicYear: {
    type: String,
    required: true
  },
  titleOfCopyright: {
    type: String,
    required: true
  },
  nameOfApplicant: {
    type: String,
    required: true
  },
  nameOfAuthors: {
    type: String,
    required: true
  },
  dateOfFiling: {
    type: Date,
    required: true
  },
  dateOfRegistration: {
    type: Date
  },
  dairyNumber: {
    type: String
  },
  rocNumber: {
    type: String
  },
  status: {
    type: String,
    enum: ["Filed", "Registered"],
    required: true
  },
  proofDocument: {
    type: String // Stores the file path or URL
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Copyright", copyrightSchema);
