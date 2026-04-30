const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const departmentSchema = new mongoose.Schema(
  {
    departmentName: String,
    departmentUid: String,
  },
  { _id: false },
);

const DESIGNATION_OPTIONS = [
  "Associate Professor",
  "HOD",
  "SDW Coordinator",
  "Assistant Professor",
  "Clerk",
  "Junior Professor",
  "NAAC Coordinator",
  "Research Coordinator",
  "Class Teacher",
  "Other",
];

const adminSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  gender: { type: String, enum: ["male", "female", "other"] },
  dateOfBirth: Date,
  designations: {
    type: [
      {
        type: String,
        enum: DESIGNATION_OPTIONS,
      },
    ],
    default: [],
  },
  profilePicture: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  contactNumber: { type: String, required: true, trim: true },
  alternateContactNumber: { type: String, trim: true },
  collegeName: { type: String, required: true, trim: true },
  employeeId: { type: String, required: true, trim: true, unique: true, sparse: true },
  departments: [departmentSchema],
  role: { type: String, default: "admin" },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

adminSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  this.updatedAt = Date.now();
});

adminSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("Admin", adminSchema);
