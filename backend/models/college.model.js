const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema({
  collegeName: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  collegeId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true,
  },
  address: {
    type: String,
    trim: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
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

collegeSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("College", collegeSchema);
