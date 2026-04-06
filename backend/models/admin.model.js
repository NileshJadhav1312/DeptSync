const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const departmentSchema = new mongoose.Schema(
  {
    departmentName: String,
    departmentCode: String,
  },
  { _id: false },
);

const adminSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  gender: { type: String, enum: ["male", "female", "other"] },
  dateOfBirth: Date,
  designation: {type: String, trim: true,default: "HOD" },
  profilePicture: {type: String, },
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
  employeeId: { type: String, trim: true, unique: true, sparse: true },
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
