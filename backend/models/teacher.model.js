const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Department = require("./department.model");

const DESIGNATION_OPTIONS = [
  "Associate Professor",
  "HOD",
  "SWD Coordinator",
  "Assistant Professor",
  "Clerk",
  "Junior Professor",
  "NAAC Coordinator",
  "Research Coordinator",
  "Class Teacher",
  "Other",
];

const teacherSchema = new mongoose.Schema({
  // Basic Info
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, trim: true },

  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },

  dateOfBirth: Date,
  joinDate: Date,

  profilePicture: { type: String },

  // Government IDs
  panNumber: {
    type: String,
    trim: true,
    uppercase: true,
    sparse: true,
  },

  aadharNumber: {
    type: String,
    trim: true,
    sparse: true,
  },

  // Professional Info
  designations: {
    type: [
      {
        type: String,
        enum: DESIGNATION_OPTIONS,
      },
    ],
    default: [],
  },

  highestQualification: {
    type: String,
    trim: true,
  },

  qualification: String,
  specialization: String,

  // Experience
  experienceYears: { type: Number, default: 0 },
  experienceMonths: { type: Number, default: 0 },

  industryExperienceYears: { type: Number, default: 0 },
  industryExperienceMonths: { type: Number, default: 0 },

  totalExperienceYears: { type: Number, default: 0 },
  totalExperienceMonths: { type: Number, default: 0 },

  // Contact Info
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },

  username: {
    type: String,
    unique: true,
    trim: true,
    sparse: true,
  },
  employeeId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    sparse: true,
  },

  password: {
    type: String,
    required: true,
    trim: true,
  },

  contactNumber: {
    type: String,
    required: true,
    trim: true,
  },

  alternateContactNumber: {
    type: String,
    trim: true,
  },

  // Department Info
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },

  departmentName: String,
  departmentUid: String,

  collegeName: {
    type: String,
    required: true,
    trim: true,
  },

  // System Fields
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  },

  createdByName: String,

  role: {
    type: String,
    default: "Teacher",
  },

  isActive: {
    type: Boolean,
    default: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Auto-fill department details
teacherSchema.pre("validate", async function () {
  if (
    this.departmentId &&
    (this.isNew ||
      this.isModified("departmentId") ||
      !this.departmentName ||
      !this.departmentUid ||
      !this.collegeName)
  ) {
    const department = await Department.findById(this.departmentId).lean();
    if (!department) {
      throw new Error("Invalid departmentId provided for teacher.");
    }
    this.departmentName = department.departmentName;
    this.departmentUid = department.departmentUid;
    if (department.collegeName) {
      this.collegeName = department.collegeName;
    }
  }
});

// Hash password before saving
teacherSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  this.updatedAt = Date.now();
});

// Compare password
teacherSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("Teacher", teacherSchema);