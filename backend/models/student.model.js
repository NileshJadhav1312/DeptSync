const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Department = require("./department.model");

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  dateOfBirth: Date,

  prnNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  className: {
    type: String,
    trim: true,
  },

  semester: {
    type: Number,
    min: 1,
    max: 12,
  },

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

  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
  },
  classTeacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
  departmentUid: String,
  departmentName: String,
  departmentCode: String,
  collegeName: {
    type: String,
    trim: true,
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },

  role: { type: String, default: "student" },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Pull department details automatically from departmentId
studentSchema.pre("validate", async function () {
  if (
    this.departmentId &&
    (this.isNew ||
      this.isModified("departmentId") ||
      !this.departmentName ||
      !this.departmentCode ||
      !this.collegeName ||
      !this.departmentUid)
  ) {
    const department = await Department.findById(this.departmentId).lean();
    if (!department) {
      throw new Error("Invalid departmentId provided for student.");
    }
    this.departmentName = department.departmentName;
    this.departmentCode = department.departmentCode;
    this.departmentUid = department.departmentUid;
    if (department.collegeName) {
      this.collegeName = department.collegeName;
    }
  }
});

// Hash password and bump updatedAt
studentSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  this.updatedAt = Date.now();
});

studentSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("Student", studentSchema);
